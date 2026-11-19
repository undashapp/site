<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { messages } from './landing-i18n';
import { deBundeslaender, usStates } from './landing-maps';

const { lang, theme } = useData();
const t = computed(() => messages[lang.value.split('-')[0]] ?? messages.en);

// Link to the guide only on builds that include it (sidebar configured)
const hasGuide = computed(() => {
  const sidebar = theme.value.sidebar;
  return Array.isArray(sidebar)
    ? sidebar.length > 0
    : !!sidebar && Object.keys(sidebar).length > 0;
});
const mapRegions = computed(() =>
  lang.value.startsWith('de') ? deBundeslaender : usStates,
);

const heroActions = computed(() => {
  const { guide, explore, follow } = t.value.hero;
  return hasGuide.value ? [guide, explore] : [explore, follow];
});

// Demo data for the hero dashboard. Illustrative only.
const regions = ['North', 'South', 'East', 'West'];
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const categories = ['Hardware', 'Software', 'Services'];

const base = [410, 290, 350, 240];
const trend = [0.9, 1.25, 1.05, 1.4];
const mix = [
  [0.5, 0.3, 0.2],
  [0.25, 0.5, 0.25],
  [0.35, 0.35, 0.3],
  [0.2, 0.4, 0.4],
];

const revenue = regions.map((_, r) =>
  months.map((_, m) => {
    const season = 1 + 0.32 * Math.sin((m / 12) * Math.PI * 2 + r);
    const growth = 1 + ((trend[r] - 1) * m) / 11;
    return Math.round(base[r] * season * growth);
  }),
);

const selected = ref<Set<number>>(new Set([0, 1, 2, 3]));

function toggleRegion(r: number) {
  const next = new Set(selected.value);
  if (next.size === 4) {
    next.clear();
    next.add(r);
  } else if (next.has(r)) {
    next.delete(r);
    if (next.size === 0) [0, 1, 2, 3].forEach((i) => next.add(i));
  } else {
    next.add(r);
  }
  selected.value = next;
}

function resetRegions() {
  selected.value = new Set([0, 1, 2, 3]);
}

const regionTotals = computed(() =>
  revenue.map((row) => row.reduce((a, b) => a + b, 0)),
);
const maxRegion = computed(() => Math.max(...regionTotals.value));

const monthly = computed(() =>
  months.map((_, m) =>
    [...selected.value].reduce((sum, r) => sum + revenue[r][m], 0),
  ),
);

const total = computed(() =>
  [...selected.value].reduce((sum, r) => sum + regionTotals.value[r], 0),
);

const categoryShare = computed(() => {
  const sums = categories.map((_, c) =>
    [...selected.value].reduce(
      (sum, r) => sum + regionTotals.value[r] * mix[r][c],
      0,
    ),
  );
  const all = sums.reduce((a, b) => a + b, 0);
  return sums.map((s) => s / all);
});

const lineW = 300;
const lineH = 110;
const linePoints = computed(() => {
  const max = Math.max(...monthly.value) * 1.1;
  return monthly.value.map((v, i) => [
    8 + (i * (lineW - 16)) / 11,
    lineH - 8 - (v / max) * (lineH - 20),
  ]);
});
const linePath = computed(() =>
  linePoints.value
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' '),
);
const areaPath = computed(
  () =>
    `${linePath.value} L${lineW - 8} ${lineH} L8 ${lineH} Z`,
);

function arc(a0: number, a1: number, r0: number, r1: number) {
  const p = (a: number, r: number) =>
    `${(40 + r * Math.sin(a)).toFixed(2)} ${(40 - r * Math.cos(a)).toFixed(2)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${p(a0, r1)} A${r1} ${r1} 0 ${large} 1 ${p(a1, r1)} L${p(a1, r0)} A${r0} ${r0} 0 ${large} 0 ${p(a0, r0)} Z`;
}
const donutSegments = computed(() => {
  let start = 0;
  return categoryShare.value.map((share) => {
    const end = start + share * Math.PI * 2;
    const d = arc(start + 0.03, end - 0.03, 24, 38);
    start = end;
    return d;
  });
});

// Animated KPI
const shownTotal = ref(0);
let raf = 0;
function tweenTo(target: number) {
  cancelAnimationFrame(raf);
  const from = shownTotal.value;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / 700);
    const e = 1 - Math.pow(1 - t, 3);
    shownTotal.value = from + (target - from) * e;
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}
watch(total, (v) => tweenTo(v));


// SQL console typing
const sqlLines = [
  'SELECT',
  '  region,',
  "  date_trunc('month', date) AS month,",
  '  sum(revenue) AS revenue',
  'FROM sales',
  'GROUP BY ALL',
];
const sqlFull = sqlLines.join('\n');
const typed = ref(sqlFull);
const typingDone = ref(true);
let typingTimer: ReturnType<typeof setTimeout> | undefined;

function runTyping() {
  const full = sqlFull;
  let i = 0;
  typed.value = '';
  typingDone.value = false;
  const tick = () => {
    i += 1;
    typed.value = full.slice(0, i);
    if (i < full.length) {
      typingTimer = setTimeout(tick, full[i - 1] === '\n' ? 180 : 38);
    } else {
      typingDone.value = true;
      typingTimer = setTimeout(runTyping, 5000);
    }
  };
  typingTimer = setTimeout(tick, 400);
}

const sqlRows = [
  ['North', '2025-01', '372'],
  ['South', '2025-01', '301'],
  ['East', '2025-01', '331'],
];

// Engine scan: column chunks of varying "values"
const scanCells = Array.from({ length: 5 }, (_, c) =>
  Array.from({ length: 8 }, (_, r) =>
    (0.35 + 0.65 * Math.abs(Math.sin(c * 2.1 + r * 1.7 + c * r * 0.3))).toFixed(2),
  ),
);

// Reveal on scroll
const root = ref<HTMLElement | null>(null);
const mounted = ref(false);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  mounted.value = true;
  tweenTo(total.value);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) runTyping();

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  root.value
    ?.querySelectorAll('.reveal')
    .forEach((el) => observer?.observe(el));
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  clearTimeout(typingTimer);
  observer?.disconnect();
});

// Icons (tabler, from /public/images)
const icons: Record<string, string[]> = {
  desktop: [
    'M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z',
    'M7 20h10',
    'M9 16v4',
    'M15 16v4',
  ],
  tablet: [
    'M5 4a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16z',
    'M11 17a1 1 0 1 0 2 0a1 1 0 0 0 -2 0',
  ],
  pencil: [
    'M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4',
    'M13.5 6.5l4 4',
  ],
  phone: [
    'M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z',
    'M11 4h2',
    'M12 17v.01',
  ],
  check: ['M5 12l5 5l10 -10'],
  sparkles: [
    'M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6',
  ],
  rocket: [
    'M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3',
    'M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3',
    'M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  ],
  import: [
    'M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3',
    'M4 6v6c0 1.657 3.582 3 8 3c.856 0 1.68 -.05 2.454 -.144m5.546 -2.856v-6',
    'M4 12v6c0 1.657 3.582 3 8 3c.171 0 .341 -.002 .51 -.006',
    'M19 22v-6',
    'M22 19l-3 -3l-3 3',
  ],
  pie: [
    'M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8',
    'M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5',
  ],
  filter: [
    'M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227',
  ],
  presentation: [
    'M3 4l18 0',
    'M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10',
    'M12 16l0 4',
    'M9 20l6 0',
    'M8 12l3 -3l2 2l3 -3',
  ],
  offline: [
    'M6.528 6.536a6 6 0 0 0 7.942 7.933m2.247 -1.76a6 6 0 0 0 -8.427 -8.425',
    'M12 3c1.333 .333 2 2.333 2 6c0 .337 -.006 .66 -.017 .968m-.55 3.473c-.333 .884 -.81 1.403 -1.433 1.559',
    'M12 3c-.936 .234 -1.544 1.29 -1.822 3.167m-.16 3.838c.116 3.029 .776 4.695 1.982 4.995',
    'M6 9h3m4 0h5',
    'M3 20h7',
    'M14 20h7',
    'M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0',
    'M12 15v3',
    'M3 3l18 18',
  ],
  export: [
    'M14 3v4a1 1 0 0 0 1 1h4',
    'M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3',
  ],
  adjustments: [
    'M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0',
    'M6 4v4',
    'M6 12v8',
    'M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0',
    'M12 4v10',
    'M12 18v2',
    'M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0',
    'M18 4v1',
    'M18 9v11',
  ],
  keyboard: [
    'M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8',
    'M6 10l0 .01',
    'M10 10l0 .01',
    'M14 10l0 .01',
    'M18 10l0 .01',
    'M6 14l0 .01',
    'M18 14l0 .01',
    'M10 14l4 .01',
  ],
  world: [
    'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0',
    'M3.6 9h16.8',
    'M3.6 15h16.8',
    'M11.5 3a17 17 0 0 0 0 18',
    'M12.5 3a17 17 0 0 1 0 18',
  ],
  code: [
    'M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5',
    'M6 5l-2 2l2 2',
    'M10 9l2 -2l-2 -2',
  ],
};
const shieldPath =
  'M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z';

const chartGallery = [
  'Bar',
  'Lollipop',
  'Line',
  'Area',
  'Scatter',
  'ConnectedScatter',
  'Balloon',
  'Heatmap',
  'Density',
  'Density2D',
  'Streamgraph',
  'Radar',
  'Donut',
  'KPI',
  'Pivot',
  'Choropleth',
];

const heat = Array.from({ length: 24 }, (_, i) =>
  (0.15 + 0.85 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))).toFixed(2),
);

const deviceIcons = ['desktop', 'tablet', 'phone'];

// One palette of each kind: Tableau 10, Blues and RdBu, six colors each
const palettes = [
  ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948'],
  ['#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c'],
  ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
];
const fontSamples = [
  'ui-sans-serif, system-ui, sans-serif',
  'Georgia, serif',
  'ui-monospace, Menlo, monospace',
  '"Avenir Next", Avenir, sans-serif',
  '"Gill Sans", "Gill Sans MT", sans-serif',
  'Palatino, "Palatino Linotype", serif',
];
</script>

<template>
  <div ref="root" class="landing" :class="{ 'is-mounted': mounted }">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="grid"></div>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>

      <div class="container hero-inner">
        <div class="hero-copy">
          <span class="pill"><span class="pulse"></span>{{ t.hero.pill }}</span>
          <h1 class="hero-title">
            <span class="brand-lockup">
              <img class="brand-logo logo-light" src="/images/light/logo.svg" alt="" />
              <img class="brand-logo logo-dark" src="/images/dark/logo.svg" alt="" />
              <span class="brand-word"><b>un</b>dash</span>
            </span>
            <span class="gradient-text">Unthink BI.</span>
          </h1>
          <p class="hero-tagline">
            {{ t.hero.tagline }}
            <strong>{{ t.hero.taglineStrong }}</strong>
          </p>
          <ul class="hero-points">
            <li v-for="point in t.hero.points" :key="point">{{ point }}</li>
          </ul>
          <div class="hero-actions">
            <a
              v-for="(action, i) in heroActions"
              :key="action.link"
              class="btn"
              :class="i === 0 ? 'btn-brand' : 'btn-alt'"
              :href="action.link"
              v-bind="action.link.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}"
              >{{ action.text }}</a
            >
          </div>
        </div>

        <div class="hero-demo">
          <div class="window">
            <div class="window-bar">
              <span class="dot"></span><span class="dot"></span
              ><span class="dot"></span>
              <span class="window-title">{{ t.demo.title }}</span>
              <span class="window-badge">
                <svg viewBox="0 0 24 24" class="icon-xs"><path :d="shieldPath" fill="currentColor" /></svg>
                {{ t.demo.local }}
              </span>
            </div>

            <div class="window-controls">
              <span class="controls-label">
                <svg viewBox="0 0 24 24" class="icon-xs" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-for="d in icons.filter" :key="d" :d="d" />
                </svg>
                {{ t.demo.region }}
              </span>
              <button
                v-for="(name, r) in t.demo.regions"
                :key="r"
                class="chip"
                :class="[`c${r + 1}`, { active: selected.has(r) && selected.size < 4 }]"
                @click="toggleRegion(r)"
              >
                {{ name }}
              </button>
              <button
                class="chip chip-reset"
                :class="{ hidden: selected.size === 4 }"
                @click="resetRegions"
              >
                {{ t.demo.reset }}
              </button>
            </div>

            <div class="tiles">
              <div class="tile tile-kpi">
                <span class="tile-label">{{ t.demo.revenue }}</span>
                <span class="kpi">{{ t.demo.money(shownTotal) }}</span>
                <span class="kpi-sub">{{ t.demo.ofRegions(selected.size) }}</span>
              </div>

              <div class="tile tile-donut">
                <span class="tile-label">{{ t.demo.byCategory }}</span>
                <div class="donut-wrap">
                  <svg viewBox="0 0 80 80" class="donut">
                    <path
                      v-for="(d, i) in donutSegments"
                      :key="i"
                      :d="d"
                      class="donut-seg"
                      :class="`s${i + 1}`"
                    />
                  </svg>
                  <ul class="legend">
                    <li v-for="(c, i) in t.demo.categories" :key="i">
                      <i :class="`s${i + 1}`"></i>{{ c }}
                      <b>{{ Math.round(categoryShare[i] * 100) }}%</b>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tile tile-bars">
                <span class="tile-label">{{ t.demo.byRegion }}</span>
                <div class="bars">
                  <div
                    v-for="(name, r) in t.demo.regions"
                    :key="r"
                    class="bar-col"
                    :class="{ dim: !selected.has(r) }"
                  >
                    <span class="bar-value">{{ t.demo.compact(regionTotals[r]) }}</span>
                    <span class="bar-track">
                      <span
                        class="bar"
                        :class="`c${r + 1}`"
                        :style="{ height: mounted ? `${(regionTotals[r] / maxRegion) * 100}%` : '0%' }"
                      ></span>
                    </span>
                    <span class="bar-label">{{ name }}</span>
                  </div>
                </div>
              </div>

              <div class="tile tile-line">
                <span class="tile-label">{{ t.demo.monthly }}</span>
                <svg :viewBox="`0 0 ${lineW} ${lineH}`" class="line">
                  <defs>
                    <linearGradient id="u-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="var(--u-c1)" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="var(--u-c1)" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <g class="gridlines">
                    <line v-for="i in 3" :key="i" x1="0" :x2="lineW" :y1="i * 28" :y2="i * 28" />
                  </g>
                  <path :d="areaPath" fill="url(#u-area)" class="area" />
                  <path :d="linePath" class="stroke" pathLength="1" />
                  <circle
                    v-for="([x, y], i) in linePoints"
                    :key="i"
                    :cx="x"
                    :cy="y"
                    r="2.4"
                    class="pt"
                  />
                </svg>
                <div class="months">
                  <span v-for="(m, i) in t.demo.months" :key="i">{{ m }}</span>
                </div>
              </div>
            </div>
            <div class="window-foot" v-html="t.demo.footer"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- One click flow -->
    <section class="flow container">
      <header class="section-head reveal">
        <span class="eyebrow">{{ t.flow.eyebrow }}</span>
        <h2>{{ t.flow.title }} <span class="muted">{{ t.flow.titleMuted }}</span></h2>
        <p>{{ t.flow.lead }}</p>
      </header>

      <ol class="steps">
        <li class="step reveal">
          <div class="step-visual">
            <div class="dropzone">
              <svg viewBox="0 0 24 24" class="icon-lg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="d in icons.import" :key="d" :d="d" />
              </svg>
              <div class="formats">
                <span>CSV</span><span>TSV</span><span>JSON</span><span>Parquet</span>
              </div>
            </div>
          </div>
          <span class="step-num">01</span>
          <h3>{{ t.flow.steps[0].title }}</h3>
          <p>{{ t.flow.steps[0].text }}</p>
        </li>
        <li class="step reveal">
          <div class="step-visual">
            <div class="ai-panel" aria-hidden="true">
              <div class="ai-head">
                <svg viewBox="0 0 24 24" class="sparkle" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path v-for="d in icons.sparkles" :key="d" :d="d" />
                </svg>
                <span class="ai-title">{{ t.flow.proposal.title }}</span>
                <span class="ai-status">
                  <span class="ai-dots"><i></i><i></i><i></i></span>
                  <svg viewBox="0 0 24 24" class="ai-done" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <path v-for="d in icons.check" :key="d" :d="d" />
                  </svg>
                </span>
              </div>
              <div
                v-for="(row, i) in t.flow.proposal.rows"
                :key="row.key"
                class="ai-row"
                :style="{ animationDelay: `${i * 0.45}s`, '--skel': `${[38, 62, 44, 70][i]}%` }"
              >
                <span class="ai-key">{{ row.key }}</span>
                <span class="ai-values">
                  <span class="ai-skel" :style="{ animationDelay: `${i * 0.45}s` }"></span>
                  <span class="ai-chips" :style="{ animationDelay: `${i * 0.45}s` }">
                    <span v-for="v in row.values" :key="v" class="ai-chip" :class="`k${i + 1}`">{{ v }}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <span class="step-num">02</span>
          <h3>{{ t.flow.steps[1].title }}</h3>
          <p>{{ t.flow.steps[1].text }}<sup class="fn-mark">{{ t.flow.steps[1].mark }}</sup></p>
        </li>
        <li class="step reveal">
          <div class="step-visual">
            <div class="mini-dash">
              <span class="md md-a">
                <svg viewBox="0 0 80 48">
                  <rect x="4" y="6" width="68" height="8" rx="2" class="f1" />
                  <rect x="4" y="20" width="50" height="8" rx="2" class="f1 o7" />
                  <rect x="4" y="34" width="32" height="8" rx="2" class="f1 o5" />
                </svg>
              </span>
              <span class="md md-b">
                <svg viewBox="0 0 116 48">
                  <path d="M4 38 L20 30 L36 33 L52 20 L68 24 L84 12 L100 16 L112 6 L112 44 L4 44 Z" class="f2 o3" />
                  <path d="M4 38 L20 30 L36 33 L52 20 L68 24 L84 12 L100 16 L112 6" class="s2" />
                  <line x1="4" x2="112" y1="44.5" y2="44.5" class="md-axis" />
                </svg>
              </span>
              <span class="md md-c">
                <svg viewBox="0 0 80 48">
                  <circle cx="40" cy="24" r="15" class="md-donut" stroke="var(--u-c1)" stroke-dasharray="37.7 94.2" />
                  <circle cx="40" cy="24" r="15" class="md-donut" stroke="var(--u-c2)" stroke-dasharray="28.3 94.2" stroke-dashoffset="-37.7" />
                  <circle cx="40" cy="24" r="15" class="md-donut" stroke="var(--u-c3)" stroke-dasharray="28.3 94.2" stroke-dashoffset="-66" />
                </svg>
              </span>
              <span class="md md-d">
                <svg viewBox="0 0 116 48">
                  <rect v-for="(h, i) in [18, 30, 22, 38, 26, 34]" :key="i" :x="8 + i * 18" :y="44 - h" width="12" :height="h" rx="2" class="md-col" />
                  <line x1="4" x2="112" y1="44.5" y2="44.5" class="md-axis" />
                </svg>
              </span>
            </div>
          </div>
          <span class="step-num">03</span>
          <h3>{{ t.flow.steps[2].title }}</h3>
          <p>{{ t.flow.steps[2].text }}</p>
        </li>
      </ol>
      <p class="flow-footnote reveal">{{ t.flow.footnote }}</p>
    </section>

    <!-- Bento features -->
    <section id="features" class="features container">
      <header class="section-head reveal">
        <span class="eyebrow">{{ t.features.eyebrow }}</span>
        <h2>{{ t.features.title }} <span class="muted">{{ t.features.titleMuted }}</span></h2>
      </header>

      <div class="bento">
        <!-- Private -->
        <article class="card card-private span-2 reveal">
          <div class="card-text">
            <div class="card-icon">
              <svg viewBox="0 0 24 24"><path :d="shieldPath" fill="currentColor" /></svg>
            </div>
            <h3>{{ t.features.private.title }}</h3>
            <p v-html="t.features.private.text"></p>
          </div>
          <div class="private-visual" aria-hidden="true">
            <div class="orbit">
              <div class="ring r1"></div>
              <div class="ring r2"></div>
              <div class="core">
                <svg viewBox="0 0 24 24"><path :d="shieldPath" fill="currentColor" /></svg>
              </div>
              <span v-for="(label, i) in t.features.private.orbit" :key="i" class="sat" :class="`s${i + 1}`">{{ label }}</span>
            </div>
          </div>
        </article>

        <!-- Fast engine -->
        <article class="card card-engine reveal">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.rocket" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.engine.title }}</h3>
          <p>{{ t.features.engine.text }}</p>
          <div class="scan" aria-hidden="true">
            <div class="scan-cols">
              <div v-for="(col, c) in scanCells" :key="c" class="scan-col">
                <span
                  v-for="(v, r) in col"
                  :key="r"
                  class="scan-cell"
                  :style="{ '--v': v, animationDelay: `${r * 0.18}s` }"
                ></span>
              </div>
              <span class="scan-beam"></span>
            </div>
            <svg class="scan-arrow" viewBox="0 0 16 16"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            <div class="scan-result">
              <span v-for="(w, i) in [92, 64, 41]" :key="i" class="scan-bar" :style="{ '--w': `${w}%`, animationDelay: `${i * 0.08}s` }"></span>
            </div>
          </div>
        </article>

        <!-- Import -->
        <article class="card card-import reveal">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.import" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.import.title }}</h3>
          <p>{{ t.features.import.text }}</p>
          <div class="type-row" aria-hidden="true">
            <span v-for="type in t.features.import.types" :key="type">{{ type }}</span>
          </div>
        </article>

        <!-- SQL console -->
        <article class="card card-sql span-2 reveal">
          <div class="card-text">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.code" :key="d" :d="d" /></svg>
            </div>
            <h3>{{ t.features.sql.title }}</h3>
            <p>{{ t.features.sql.text }}</p>
          </div>
          <div class="console" aria-hidden="true">
            <pre class="console-code"><code class="ghost">{{ sqlFull }}</code><code class="live">{{ typed }}<span class="caret"></span></code></pre>
            <table class="console-result" :class="{ show: typingDone }">
              <thead>
                <tr><th>region</th><th>month</th><th>revenue</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in sqlRows" :key="row[0]">
                  <td v-for="cell in row" :key="cell">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <!-- Chart types -->
        <article class="card card-charts span-3 reveal">
          <div class="card-text narrow">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.pie" :key="d" :d="d" /></svg>
            </div>
            <h3>{{ t.features.charts.title }}</h3>
            <p>{{ t.features.charts.text }}</p>
          </div>
          <div class="gallery" aria-hidden="true">
            <figure v-for="name in chartGallery" :key="name" class="thumb">
              <svg viewBox="0 0 60 40">
                <template v-if="name === 'Bar'">
                  <rect x="6" y="18" width="8" height="18" rx="1.5" class="f1" />
                  <rect x="18" y="8" width="8" height="28" rx="1.5" class="f1" />
                  <rect x="30" y="14" width="8" height="22" rx="1.5" class="f1" />
                  <rect x="42" y="4" width="8" height="32" rx="1.5" class="f1" />
                </template>
                <template v-else-if="name === 'Lollipop'">
                  <g v-for="([x, y], i) in [[10, 20], [22, 10], [34, 16], [46, 6]]" :key="i">
                    <line :x1="x + 2" :x2="x + 2" y1="36" :y2="y" class="s1 stem" />
                    <circle :cx="x + 2" :cy="y" r="3.2" class="f1" />
                  </g>
                </template>
                <template v-else-if="name === 'Balloon'">
                  <template v-for="(row, j) in [[2, 5, 3], [4, 2.5, 6], [3, 4.5, 2]]" :key="j">
                    <circle
                      v-for="(r, i) in row"
                      :key="i"
                      :cx="14 + i * 16"
                      :cy="8 + j * 12"
                      :r="r"
                      class="f1"
                      :style="{ opacity: 0.45 + r / 12 }"
                    />
                  </template>
                </template>
                <template v-else-if="name === 'Line'">
                  <path d="M4 32 L14 24 L24 27 L34 14 L44 18 L56 6" class="s1" />
                  <path d="M4 36 L14 30 L24 32 L34 26 L44 28 L56 20" class="s2" />
                </template>
                <template v-else-if="name === 'Area'">
                  <path d="M4 30 L16 20 L28 24 L40 12 L56 16 L56 36 L4 36 Z" class="f1 o5" />
                  <path d="M4 34 L16 28 L28 30 L40 22 L56 26 L56 36 L4 36 Z" class="f2 o7" />
                </template>
                <template v-else-if="name === 'Scatter'">
                  <circle v-for="(p, i) in [[8,30],[14,26],[18,28],[22,20],[28,22],[32,16],[36,18],[42,12],[46,14],[52,8],[26,30],[40,24]]" :key="i" :cx="p[0]" :cy="p[1]" r="2.2" :class="i % 3 ? 'f1' : 'f3'" />
                </template>
                <template v-else-if="name === 'ConnectedScatter'">
                  <path d="M8 32 L16 24 L26 28 L30 16 L42 20 L38 9 L52 6" class="s1 stem" />
                  <circle v-for="(p, i) in [[8,32],[16,24],[26,28],[30,16],[42,20],[38,9],[52,6]]" :key="i" :cx="p[0]" :cy="p[1]" r="2.6" :class="i === 6 ? 'f3' : 'f1'" />
                </template>
                <template v-else-if="name === 'Heatmap'">
                  <rect
                    v-for="(o, i) in heat"
                    :key="i"
                    :x="6 + (i % 6) * 8.2"
                    :y="4 + Math.floor(i / 6) * 8.2"
                    width="7.4"
                    height="7.4"
                    rx="1"
                    class="f1"
                    :style="{ opacity: o }"
                  />
                </template>
                <template v-else-if="name === 'Density'">
                  <path d="M4 36 C14 36 16 8 26 8 C34 8 34 24 40 24 C46 24 48 36 56 36 Z" class="f1 o5" />
                  <path d="M4 36 C14 36 16 8 26 8 C34 8 34 24 40 24 C46 24 48 36 56 36" class="s1" />
                </template>
                <template v-else-if="name === 'Density2D'">
                  <g transform="rotate(-18 28 22)">
                    <ellipse cx="26" cy="22" rx="21" ry="12" class="f1 o3" />
                    <ellipse cx="26" cy="22" rx="14" ry="8" class="f1 o5" />
                    <ellipse cx="26" cy="22" rx="7" ry="4" class="f1 o9" />
                  </g>
                  <ellipse cx="46" cy="10" rx="7" ry="5" class="f1 o3" />
                  <ellipse cx="46" cy="10" rx="3.5" ry="2.5" class="f1 o7" />
                </template>
                <template v-else-if="name === 'Donut'">
                  <path d="M31.0 4.0 A16 16 0 0 1 35.8 34.9 L33.3 28.4 A9 9 0 0 0 30.5 11.0Z" class="f1" />
                  <path d="M34.0 35.5 A16 16 0 0 1 14.0 21.0 L21.0 20.5 A9 9 0 0 0 32.3 28.7Z" class="f2" />
                  <path d="M14.0 19.0 A16 16 0 0 1 29.0 4.0 L29.5 11.0 A9 9 0 0 0 21.0 19.5Z" class="f3" />
                </template>
                <template v-else-if="name === 'Streamgraph'">
                  <path d="M4 16 C16 10 24 14 32 8 C42 2 50 10 56 8 L56 20 C48 22 40 18 32 22 C24 26 14 20 4 22 Z" class="f1 o7" />
                  <path d="M4 22 C14 20 24 26 32 22 C40 18 48 22 56 20 L56 30 C48 34 40 28 32 32 C22 36 14 28 4 28 Z" class="f2 o7" />
                  <path d="M4 28 C14 28 22 36 32 32 C40 28 48 34 56 30 L56 34 C46 38 38 34 32 36 C22 38 14 32 4 32 Z" class="f3 o7" />
                </template>
                <template v-else-if="name === 'Radar'">
                  <polygon points="30,4 46,14 42,34 18,34 14,14" class="grid-poly" />
                  <polygon points="30,10 42,16 38,30 22,28 20,16" class="f1 o5 s1" />
                </template>
                <template v-else-if="name === 'KPI'">
                  <text x="30" y="27" text-anchor="middle" class="kpi-text">42k</text>
                </template>
                <template v-else-if="name === 'Pivot'">
                  <rect x="6" y="4" width="48" height="8" rx="1.5" class="f1 o3" />
                  <rect x="6" y="12" width="14" height="24" class="f1 o3" style="opacity: 0.15" />
                  <rect x="6" y="4" width="48" height="32" rx="1.5" class="grid-poly" />
                  <line v-for="y in [12, 20, 28]" :key="'h' + y" x1="6" x2="54" :y1="y" :y2="y" class="grid-poly" />
                  <line v-for="x in [20, 31.33, 42.67]" :key="'v' + x" :x1="x" :x2="x" y1="4" y2="36" class="grid-poly" />
                  <rect v-for="(w, i) in [5, 6, 5]" :key="'c' + i" :x="29.33 + i * 11.33 - w" y="7" :width="w" height="2" rx="1" class="f1" />
                  <rect v-for="(w, i) in [8, 6, 9]" :key="'r' + i" x="8.5" :y="15 + i * 8" :width="w" height="2" rx="1" class="f1" />
                  <template v-for="(row, j) in [[6, 4, 7], [5, 8, 3], [7, 5, 6]]" :key="'d' + j">
                    <rect v-for="(w, i) in row" :key="i" :x="29.33 + i * 11.33 - w" :y="15 + j * 8" :width="w" height="2" rx="1" class="f2 o7" />
                  </template>
                </template>
                <template v-else-if="name === 'Choropleth'">
                  <path
                    v-for="(region, i) in mapRegions"
                    :key="i"
                    :d="region.d"
                    class="f1 region"
                    :style="{ fillOpacity: region.o }"
                  />
                </template>
              </svg>
              <figcaption>{{ t.features.charts.names[name] }}</figcaption>
            </figure>
          </div>
        </article>

        <!-- Filtering -->
        <article class="card card-filter span-2 reveal">
          <div class="card-text">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.filter" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.filter.title }}</h3>
          <p>{{ t.features.filter.text }}</p>
          </div>
          <div class="controls-demo" aria-hidden="true">
            <div class="picker"><span class="on">A</span><span>B</span><span class="on">C</span></div>
            <div class="range"><span class="track"><span class="fill"></span></span></div>
            <div class="toggle"><span class="knob"></span></div>
          </div>
        </article>

        <!-- Keyboard -->
        <article class="card card-keys reveal">
          <div class="card-text">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.keyboard" :key="d" :d="d" /></svg>
            </div>
            <h3>{{ t.features.keys.title }}</h3>
            <p>{{ t.features.keys.text }}</p>
          </div>
          <div class="keys" aria-hidden="true">
            <kbd class="k-h">h</kbd><kbd class="k-j">j</kbd><kbd class="k-k">k</kbd><kbd class="k-l">l</kbd>
          </div>
        </article>

        <!-- Offline -->
        <article class="card card-offline reveal">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.offline" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.offline.title }}</h3>
          <p v-html="t.features.offline.text"></p>
          <div class="status-row" aria-hidden="true">
            <span class="status"><i class="off"></i>{{ t.features.offline.offline }}</span>
            <span class="status"><i class="ok"></i>{{ t.features.offline.working }}</span>
          </div>
        </article>

        <!-- Present -->
        <article class="card card-present span-2 reveal">
          <div class="card-text">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.presentation" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.present.title }}</h3>
          <p>{{ t.features.present.text }}</p>
          </div>
          <div class="screen" aria-hidden="true">
            <div class="layout">
              <span class="l1"></span><span class="l2"></span><span class="l3"></span>
            </div>
          </div>
        </article>

        <!-- Export -->
        <article class="card card-export span-2 reveal">
          <div class="card-text">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.export" :key="d" :d="d" /></svg>
            </div>
            <h3>{{ t.features.export.title }}</h3>
            <p>{{ t.features.export.text }}</p>
          </div>
          <div class="export-grid" aria-hidden="true">
            <div class="export-group">
              <span class="export-title">{{ t.features.export.charts }}</span>
              <div class="files">
                <span class="file f-pdf">PDF</span>
                <span class="file f-svg">SVG</span>
                <span class="file f-png">PNG</span>
                <span class="file f-jpg">JPEG</span>
              </div>
            </div>
            <div class="export-group">
              <span class="export-title">{{ t.features.export.data }}</span>
              <div class="files">
                <span class="file f-csv">CSV</span>
                <span class="file f-xls">Excel</span>
                <span class="file f-json">JSON</span>
                <span class="file f-pq">Parquet</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Locales -->
        <article class="card card-locales span-2 reveal">
          <div class="card-text">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.world" :key="d" :d="d" /></svg>
            </div>
            <h3>{{ t.features.locales.title }}</h3>
            <p>{{ t.features.locales.text }}</p>
          </div>
          <ul class="locale-list" aria-hidden="true">
            <li v-for="[code, name] in t.features.locales.items" :key="code">
              <b>{{ code }}</b><span>{{ name }}</span>
            </li>
          </ul>
        </article>

        <!-- Customize -->
        <article class="card card-custom reveal">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.adjustments" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.custom.title }}</h3>
          <p v-html="t.features.custom.text"></p>
          <div class="custom-demo" aria-hidden="true">
            <div class="palettes">
              <template v-for="(colors, i) in palettes" :key="i">
                <span class="palette-label">{{ t.features.custom.palettes[i] }}</span>
                <div class="swatches">
                  <span v-for="c in colors" :key="c" :style="{ background: c }"></span>
                </div>
              </template>
            </div>
            <div class="fonts">
              <span v-for="f in fontSamples" :key="f" :style="{ fontFamily: f }">Aa</span>
            </div>
          </div>
        </article>
</div>
    </section>

    <!-- Devices -->
    <section class="devices container reveal">
      <div class="devices-card">
        <div class="devices-text">
          <h3>{{ t.devices.title }}</h3>
          <p v-html="t.devices.text"></p>
        </div>
        <ul class="device-list">
          <li
            v-for="(d, i) in deviceIcons"
            :key="i"
            class="device"
          >
            <span class="device-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="p in icons[d]" :key="p" :d="p" />
              </svg>
              <svg v-if="i === 1" class="device-pencil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="p in icons.pencil" :key="p" :d="p" />
              </svg>
            </span>
            <span class="device-name">{{ t.devices.items[i] }}</span>
            <span class="device-status" :title="t.devices.supported">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="p in icons.check" :key="p" :d="p" />
              </svg>
              <span class="sr-only">{{ t.devices.supported }}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta container reveal">
      <div class="cta-card">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="brand-lockup cta-brand">
          <img class="brand-logo" src="/images/dark/logo.svg" alt="" />
          <span class="brand-word"><b>un</b>dash</span>
        </div>
        <h2>{{ t.cta.title }} <span class="gradient-text">{{ t.cta.titleAccent }}</span></h2>
        <p v-html="t.cta.text"></p>
        <a
          class="btn btn-brand"
          href="https://twitter.com/undashapp"
          target="_blank"
          rel="noopener"
          >{{ t.cta.button }}</a
        >
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  -webkit-tap-highlight-color: transparent;
  --u-c1: #7a5b42;
  /* Monochromatic tints and shades of the primary color */
  --u-c2: color-mix(in srgb, var(--u-c1) 72%, var(--vp-c-bg));
  --u-c3: color-mix(in srgb, var(--u-c1) 50%, var(--vp-c-bg));
  --u-c4: color-mix(in srgb, var(--u-c1) 32%, var(--vp-c-bg));
  --u-c1-deep: color-mix(in srgb, var(--u-c1) 72%, #000);
  --u-c1-light: color-mix(in srgb, var(--u-c1) 55%, #fff);
  --u-signal: #e3a54c;
  --u-signal-soft: #f2cb92;
  --u-ink: var(--vp-c-text-1);
  --u-panel: #eeece5;
  --u-card: #fefdf9;
  --u-card-solid: #faf9f5;
  --u-border: #e3e0d7;
  --u-shadow: 0 1px 0 rgba(37, 36, 31, 0.03);
  --u-lift: 0 1px 0 rgba(37, 36, 31, 0.04), 0 18px 36px -24px rgba(37, 36, 31, 0.35);
  --u-grid: rgba(37, 36, 31, 0.06);
  --u-muted: var(--vp-c-text-2);
  --u-radius: 12px;
  --u-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --u-mono: 'Geist Mono', ui-monospace, Menlo, monospace;
  --u-dark: #262320;
  --u-dark-2: #312d28;
  --u-dark-line: #3d3832;
  overflow: hidden;
  color: var(--vp-c-text-1);
}


.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 768px) {
  .container { padding: 0 48px; }
}

/* ------------------------------------------------------------------ Hero */

.hero {
  position: relative;
  padding: 72px 0 56px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.grid,
.blob { display: none; }

.hero { padding: 56px 0 24px; }

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  justify-items: center;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 820px;
}

@media (min-width: 1000px) {
  .hero { padding: 72px 0 40px; }
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 6px 11px;
  border-radius: 6px;
  font-family: var(--u-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  background: var(--u-card);
  border: 1px solid var(--u-border);
}

.pulse {
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: var(--u-signal);
  animation: signal 2.4s steps(1) infinite;
}
@keyframes signal { 50% { opacity: 0.25; } }

/* Logo and wordmark side by side, the same on top and bottom */
.brand-lockup {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  font-size: 0.26em;
  line-height: 1;
  margin-bottom: 18px;
}
.brand-logo { display: block; height: 1.25em; }

.hero-title {
  margin: 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: clamp(56px, 8.4vw, 108px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 600;
}

.brand-word {
  letter-spacing: -0.03em;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.brand-word b { font-weight: 600; color: var(--vp-c-text-1); }

/* The accent words: hairline weight in the text ink */
.gradient-text {
  font-weight: 300;
  letter-spacing: -0.05em;
  color: var(--u-ink);
}

.hero-tagline {
  margin: 28px 0 0;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.75;
  color: var(--u-muted);
}
.hero-tagline strong { display: block; color: var(--vp-c-text-1); font-weight: 500; }

.hero-points {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  font-family: var(--u-mono);
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}
.hero-points li::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 9px 2px 0;
  border-radius: 0;
  background: var(--u-signal);
  vertical-align: middle;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 28px;
  margin-top: 36px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 24px;
  height: 46px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 180ms,
    color 180ms,
    border-color 180ms,
    transform 220ms var(--u-ease),
    box-shadow 220ms;
}
.btn:active { transform: scale(0.98); }

.btn-brand {
  color: var(--vp-c-bg);
  background: var(--u-ink);
  border: 1px solid transparent;
}
.btn-brand:hover {
  background: color-mix(in srgb, var(--u-ink) 86%, var(--u-c1));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--u-ink) 10%, transparent);
}

.btn-alt {
  color: var(--vp-c-text-1);
  background: var(--u-card);
  border: 1px solid var(--u-border);
}
.btn-alt:hover { border-color: color-mix(in srgb, var(--u-ink) 30%, var(--u-border)); }

/* Demo window */

.hero-demo {
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 56px 64px 48px;
  border-radius: 12px;
  background: var(--u-panel);
  border: 1px solid var(--u-border);
  isolation: isolate;
  overflow: hidden;
}
/* Graph paper, fading out toward the edges */
.hero-demo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--u-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--u-grid) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: -1px -1px;
  mask-image: radial-gradient(ellipse 75% 70% at 50% 45%, #000 40%, transparent 100%);
  pointer-events: none;
}
/* A brown horizon line under the window */
.hero-demo::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 30%;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--u-c1) 40%, transparent) 20%, color-mix(in srgb, var(--u-signal) 50%, transparent) 50%, color-mix(in srgb, var(--u-c1) 40%, transparent) 80%, transparent);
  pointer-events: none;
}

@media (max-width: 760px) {
  .hero-demo { padding: 20px 12px; border-radius: 12px; }
}

.window {
  max-width: 920px;
  margin: 0 auto;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  border-radius: 12px;
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--u-card) 60%, transparent),
    0 30px 60px -30px rgba(37, 36, 31, 0.35);
  overflow: hidden;
}

.window-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--u-card);
  border-bottom: 1px solid var(--u-border);
}
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--u-border); }

.window-title {
  margin-left: 10px;
  font-family: var(--u-mono);
  font-size: 11px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.window-badge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--u-c1);
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--u-c1) 22%, transparent);
  background: color-mix(in srgb, var(--u-c1) 7%, transparent);
}

.icon-xs { width: 13px; height: 13px; }

.window-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 12px 14px 4px;
}

.controls-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-right: 4px;
}

.chip {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
  background: var(--u-card-solid);
  transition: all 0.2s var(--u-ease);
  cursor: pointer;
}
.chip:hover { border-color: var(--vp-c-text-3); }
.chip.active { color: #fff; border-color: transparent; }
.chip.active { background: var(--u-ink); color: var(--vp-c-bg); }
.chip-reset { border-style: dashed; }
.chip-reset.hidden { opacity: 0; pointer-events: none; }

.tiles {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 10px;
  padding: 10px 14px;
}

.tile {
  position: relative;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  border-radius: 8px;
  padding: 13px 15px;
  min-width: 0;
}

.tile-label {
  display: block;
  font-family: var(--u-mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* KPI and donut content centered, their titles stay left */
.tile-kpi { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; container-type: inline-size; }
.tile-kpi .tile-label { align-self: stretch; text-align: left; }
.kpi {
  margin-top: 6px;
  /* Scale with the tile so long values ("16,40 Mio. €") stay on one line */
  font-size: min(38px, 16cqi);
  white-space: nowrap;
  font-weight: 600;
  letter-spacing: -0.045em;
  font-variant-numeric: tabular-nums;
}
.kpi-sub { font-size: 12px; color: var(--vp-c-text-2); }

.donut-wrap { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 6px; }
.donut { width: 76px; height: 76px; flex: none; }
.donut-seg { transition: d 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.donut-seg.s1 { fill: var(--u-c1); }
.donut-seg.s2 { fill: var(--u-c2); }
.donut-seg.s3 { fill: var(--u-c3); }

.legend { list-style: none; margin: 0; padding: 0; font-size: 12px; min-width: 0; }
.legend li { display: flex; align-items: center; gap: 6px; line-height: 1.8; color: var(--vp-c-text-2); }
.legend i { width: 8px; height: 8px; border-radius: 2px; flex: none; }
.legend i.s1 { background: var(--u-c1); }
.legend i.s2 { background: var(--u-c2); }
.legend i.s3 { background: var(--u-c3); }
.legend b { margin-left: auto; padding-left: 8px; color: var(--vp-c-text-1); font-variant-numeric: tabular-nums; }

/* Bars fill the tile, which stretches to the height of the line chart beside it */
.tile-bars { grid-row: span 1; container-type: inline-size; display: flex; flex-direction: column; }
.tile-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex: 1;
  min-height: 130px;
  margin-top: 8px;
}
.bar-col {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  transition: opacity 0.3s;
}
.bar-col.dim { opacity: 0.22; }
.bar-value { font-size: min(11px, 7cqi); white-space: nowrap; font-weight: 600; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.bar-track { position: relative; flex: 1; width: 100%; }
.bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 3px 3px 1px 1px;
  transition: height 1s var(--u-ease);
}
.bar.c1 { background: var(--u-c1); }
.bar.c2 { background: var(--u-c2); transition-delay: 0.08s; }
.bar.c3 { background: var(--u-c3); transition-delay: 0.16s; }
.bar.c4 { background: var(--u-c4); transition-delay: 0.24s; }
.bar-label { font-size: 11px; color: var(--vp-c-text-2); }

.line { display: block; width: 100%; height: auto; margin-top: 6px; overflow: visible; }
.gridlines line { stroke: var(--u-grid); stroke-width: 1; }
.area { transition: d 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.stroke {
  fill: none;
  stroke: var(--u-c1);
  stroke-width: 1.8;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: d 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.is-mounted .stroke { animation: draw 1.6s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.pt {
  fill: var(--u-card-solid);
  stroke: var(--u-c1);
  stroke-width: 1.6;
  vector-effect: non-scaling-stroke;
  transition: cy 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.months {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.window-foot {
  padding: 6px 14px 12px;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

@media (max-width: 560px) {
  .tiles { grid-template-columns: 1fr; }
}

/* -------------------------------------------------------------- Sections */

.section-head { max-width: 760px; margin: 0 0 56px; text-align: left; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--u-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}
.eyebrow::before {
  content: '';
  width: 14px;
  height: 2px;
  background: var(--u-signal);
}
.section-head h2 {
  margin: 22px 0 0;
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.045em;
  font-weight: 600;
  text-wrap: balance;
  border: 0;
  padding: 0;
}
.muted {
  font-weight: 300;
  color: var(--vp-c-text-3);
}
.section-head p { margin: 22px 0 0; max-width: 560px; font-size: 15px; line-height: 1.75; color: var(--u-muted); }

/* ------------------------------------------------------------------ Flow */

.flow { margin-top: 128px; margin-bottom: 140px; }

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  position: relative;
}
@media (min-width: 860px) {
  .steps { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}

.step { position: relative; z-index: 1; text-align: left; padding: 0; }
.step-visual {
  height: 200px;
  display: grid;
  place-items: center;
  border-radius: var(--u-radius);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  box-shadow: var(--u-shadow);
  margin-bottom: 22px;
  overflow: hidden;
}
.step-num {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 2px 7px;
  border-radius: 5px;
  font-family: var(--u-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
}
.step h3 { margin: 0 0 8px; font-size: 20px; font-weight: 600; letter-spacing: -0.03em; }
.step p { margin: 0; max-width: 340px; color: var(--u-muted); font-size: 14px; line-height: 1.75; }
.fn-mark { margin-left: 1px; color: var(--vp-c-text-3); }
.flow-footnote {
  margin: 40px 0 0;
  max-width: 640px;
  text-align: left;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

.icon-lg { width: 40px; height: 40px; }

.dropzone {
  width: 70%;
  height: 120px;
  border: 1px dashed color-mix(in srgb, var(--u-c1) 45%, transparent);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--u-c1);
  animation: breathe 3s ease-in-out infinite;
}
@keyframes breathe {
  50% { background: color-mix(in srgb, var(--u-c1) 7%, transparent); }
}
.formats { display: flex; gap: 6px; }
.formats span {
  font-size: 10px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
}

/* AI proposal: placeholder lines resolve into a proposed model, row by row */
.ai-panel {
  --cycle: 7s;
  width: 82%;
  /* Rows share these columns, so the key column fits the longest label */
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 6px;
  /* Clear the step number badge in the top left corner */
  margin-top: 14px;
  padding: 8px 14px 6px;
  border-radius: 10px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  box-shadow: 0 10px 30px -18px color-mix(in srgb, var(--u-c1) 45%, transparent);
}
.ai-head {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 6px;
  margin-bottom: 2px;
  border-bottom: 1px solid var(--u-border);
}
.sparkle { width: 13px; height: 13px; color: var(--u-signal); animation: twinkle 2.4s ease-in-out infinite; }
@keyframes twinkle {
  50% { transform: scale(1.12) rotate(8deg); }
}
.ai-title { font-size: 11.5px; line-height: 1; font-weight: 600; letter-spacing: -0.01em; }
.ai-status { position: relative; margin-left: auto; width: 22px; height: 13px; }
.ai-dots { position: absolute; inset: 0; display: flex; align-items: center; justify-content: flex-end; gap: 3px; }
.ai-dots i { width: 4px; height: 4px; border-radius: 50%; background: var(--vp-c-text-3); animation: ai-dot 0.9s ease-in-out infinite; }
.ai-dots i:nth-child(2) { animation-delay: 0.15s; }
.ai-dots i:nth-child(3) { animation-delay: 0.3s; }
@keyframes ai-dot { 50% { transform: translateY(-3px); opacity: 0.4; } }
.ai-done { position: absolute; right: 0; top: 0; width: 13px; height: 13px; color: var(--u-c1); opacity: 0; }
.is-visible .ai-dots { animation: ai-thinking var(--cycle) infinite; }
.is-visible .ai-done { animation: ai-finished var(--cycle) var(--u-ease) infinite; }
@keyframes ai-thinking { 0%, 40% { opacity: 1; } 43%, 92% { opacity: 0; } 96%, 100% { opacity: 1; } }
@keyframes ai-finished { 0%, 41% { opacity: 0; transform: scale(0.4); } 46%, 88% { opacity: 1; transform: none; } 93%, 100% { opacity: 0; transform: none; } }

.ai-row {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
  height: 25px;
}
.ai-row + .ai-row { border-top: 1px dashed color-mix(in srgb, var(--u-border) 80%, transparent); }
.ai-key {
  font-family: var(--u-mono);
  font-size: 10px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ai-values { position: relative; display: flex; align-items: center; height: 100%; min-width: 0; }
.ai-skel {
  position: absolute;
  left: 0;
  top: 50%;
  width: var(--skel);
  height: 8px;
  margin-top: -4px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--u-border), color-mix(in srgb, var(--u-border) 40%, transparent), var(--u-border)) 0 0 / 200% 100%;
}
.ai-chips { display: flex; gap: 4px; min-width: 0; opacity: 0; }
.ai-chip {
  font-size: 10.5px;
  font-weight: 500;
  line-height: 1;
  padding: 3px 7px;
  border-radius: 5px;
  white-space: nowrap;
  color: var(--u-c1);
  background: color-mix(in srgb, var(--u-c1) 10%, transparent);
}
.ai-chip.k1 { color: var(--vp-c-bg); background: var(--u-ink); }
.ai-chip.k3 { color: color-mix(in srgb, var(--u-signal) 55%, var(--u-ink)); background: color-mix(in srgb, var(--u-signal) 12%, transparent); }
.is-visible .ai-skel { animation: ai-skel var(--cycle) infinite backwards, ai-shimmer 1.2s linear infinite; }
.is-visible .ai-chips { animation: ai-chips var(--cycle) var(--u-ease) infinite backwards; }
@keyframes ai-skel { 0%, 12% { opacity: 1; } 16%, 86% { opacity: 0; } 92%, 100% { opacity: 1; } }
@keyframes ai-chips {
  0%, 12% { opacity: 0; transform: translateX(-6px); filter: blur(3px); }
  18%, 86% { opacity: 1; transform: none; filter: none; }
  92%, 100% { opacity: 0; transform: none; filter: none; }
}
@keyframes ai-shimmer { to { background-position: -200% 0; } }
@keyframes pop { to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .ai-skel, .ai-dots { display: none; }
  .is-visible .ai-chips, .ai-chips, .is-visible .ai-done, .ai-done { animation: none !important; opacity: 1; transform: none; filter: none; }
}

.mini-dash {
  width: 74%;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
}
.md {
  border-radius: 6px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  position: relative;
  overflow: hidden;
  transform: scale(0.85);
  opacity: 0;
}
.is-visible .md { animation: pop 0.5s forwards; }
.is-visible .md-b { animation-delay: 0.15s; }
.is-visible .md-c { animation-delay: 0.3s; }
.is-visible .md-d { animation-delay: 0.45s; }
.md svg { position: absolute; inset: 8px; width: calc(100% - 16px); height: calc(100% - 16px); overflow: visible; }
.md-axis { stroke: var(--u-border); stroke-width: 1; }
.md-donut { fill: none; stroke-width: 7; transform: rotate(-90deg); transform-origin: 40px 24px; }
.md-col { fill: var(--u-c4); }

/* ----------------------------------------------------------------- Bento */

.features { margin-bottom: 120px; scroll-margin-top: 100px; }

.bento {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
}
@media (min-width: 700px) {
  .bento { grid-template-columns: repeat(2, 1fr); }
  .span-2, .span-3 { grid-column: span 2; }
}
@media (min-width: 700px) and (max-width: 999px) {
  .card-custom { grid-column: span 2; }
}
@media (min-width: 1000px) {
  .bento { grid-template-columns: repeat(3, 1fr); }
  .span-2 { grid-column: span 2; }
  .span-3 { grid-column: span 3; }
  /* Make It Yours stands beside Export and Locales, over both their rows */
  .card-custom { grid-row: span 2; }
}

/* VitePress focuses the hash target of an in-page link (Explore Features
   scrolls to #features). Touch browsers draw a focus ring around it. */
.landing section:focus { outline: none; }

.card {
  position: relative;
  padding: 36px;
  border-radius: var(--u-radius);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  box-shadow: var(--u-shadow);
  overflow: hidden;
  transition: border-color 220ms, box-shadow 220ms;
  min-width: 0;
}
.card:hover {
  border-color: color-mix(in srgb, var(--u-ink) 18%, var(--u-border));
  box-shadow: var(--u-lift);
}
@media (max-width: 700px) {
  .card { padding: 26px 22px; }
}

.span-2, .span-3 { display: grid; gap: 36px; align-items: center; }
@media (min-width: 700px) {
  .span-2 { grid-template-columns: 1fr 1fr; }
  .span-3 { grid-template-columns: 0.8fr 2fr; }
}

.card-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--u-c1);
  background: color-mix(in srgb, var(--u-c1) 8%, transparent);
  border: 0;
  margin-bottom: 22px;
}
.card-icon svg { width: 20px; height: 20px; stroke-width: 1.6; }

.card h3 { margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.25; }
.card p { margin: 0; font-size: 14px; line-height: 1.75; color: var(--u-muted); }

/* Private: the one dark panel, the strongest promise */
.card-private {
  background:
    radial-gradient(circle at 78% 50%, color-mix(in srgb, var(--u-signal) 16%, transparent), transparent 45%),
    var(--u-dark);
  border-color: var(--u-dark);
  color: #f6f3ec;
}
.card-private:hover { border-color: var(--u-dark-line); }
.card-private h3 { color: #ffffff; }
.card-private p { color: #b3aca0; }
.card-private :deep(a) { color: var(--u-signal-soft); }
.card-private .card-icon { background: rgba(255, 255, 255, 0.08); color: var(--u-signal-soft); }
/* Private */
.private-visual { display: grid; place-items: center; min-height: 200px; }
.orbit { position: relative; width: 200px; height: 200px; }
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed #4a443c;
  animation: spin 40s linear infinite;
}
.r2 { inset: 36px; border-style: solid; border-color: #3d3832; animation-direction: reverse; animation-duration: 28s; }
@keyframes spin { to { transform: rotate(360deg); } }
.core {
  position: absolute;
  inset: 68px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: var(--u-signal);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--u-signal) 18%, transparent);
}
.core svg { width: 30px; height: 30px; }
.sat {
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--u-mono);
  background: var(--u-dark-2);
  border: 1px solid var(--u-dark-line);
  color: #d3cdc2;
  animation: bob 4s ease-in-out infinite;
}
.sat.s1 { top: 6px; left: 50%; transform: translateX(-50%); }
.sat.s2 { bottom: 26px; left: -4px; animation-delay: -1.3s; }
.sat.s3 { bottom: 26px; right: -4px; animation-delay: -2.6s; }
@keyframes bob { 50% { margin-top: -5px; } }

/* Engine: a beam sweeps column chunks in parallel, then the result appears */
.scan {
  --cycle: 3.2s;
  display: grid;
  grid-template-columns: 1fr auto 0.7fr;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
}
.scan-cols {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}
.scan-col { display: grid; gap: 2px; }
.scan-cell {
  height: 5px;
  border-radius: 1.5px;
  background: color-mix(in srgb, var(--u-ink, var(--vp-c-text-1)) 7%, transparent);
}
.is-visible .scan-cell { animation: scan-cell var(--cycle) linear infinite backwards; }
@keyframes scan-cell {
  0% { background: color-mix(in srgb, var(--u-ink, var(--vp-c-text-1)) 7%, transparent); box-shadow: none; }
  3% { background: var(--u-signal); box-shadow: 0 0 6px color-mix(in srgb, var(--u-signal) 70%, transparent); }
  14%, 48% { background: color-mix(in srgb, var(--u-c1) calc(var(--v) * 100%), transparent); box-shadow: none; }
  56%, 100% { background: color-mix(in srgb, var(--u-ink, var(--vp-c-text-1)) 7%, transparent); }
}
.scan-beam {
  position: absolute;
  left: -4px;
  right: -4px;
  top: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--u-signal);
  box-shadow: 0 0 8px 1px color-mix(in srgb, var(--u-signal) 60%, transparent);
  opacity: 0;
}
.scan-beam::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 14px;
  background: linear-gradient(to top, color-mix(in srgb, var(--u-signal) 22%, transparent), transparent);
}
.is-visible .scan-beam { animation: scan-beam var(--cycle) cubic-bezier(0.45, 0, 0.55, 1) infinite; }
@keyframes scan-beam {
  0% { top: 0; opacity: 0; }
  3% { opacity: 1; }
  45% { top: 100%; opacity: 1; }
  50%, 100% { top: 100%; opacity: 0; }
}
.scan-arrow { width: 16px; height: 16px; fill: none; stroke: var(--u-faint, var(--vp-c-text-3)); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.scan-result { display: grid; gap: 6px; }
.scan-bar {
  height: 8px;
  width: var(--w);
  border-radius: 2px;
  background: var(--u-c1);
  transform-origin: left;
  transform: scaleX(0);
}
.scan-bar:first-child { background: var(--u-signal); }
.is-visible .scan-bar { animation: scan-bar var(--cycle) var(--u-ease, ease-out) infinite backwards; }
@keyframes scan-bar {
  0%, 46% { transform: scaleX(0); opacity: 1; }
  60%, 86% { transform: scaleX(1); opacity: 1; }
  96%, 100% { transform: scaleX(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .is-visible .scan-cell, .scan-cell {
    animation: none !important;
    background: color-mix(in srgb, var(--u-c1) calc(var(--v) * 100%), transparent);
  }
  .scan-beam { display: none; }
  .is-visible .scan-bar, .scan-bar { animation: none !important; transform: none; }
}

/* SQL */
.bento { container: bento / inline-size; }
.card.card-sql { grid-template-columns: 1fr; }
.card-sql .console { display: none; }
@container bento (min-width: 680px) {
  .card.card-sql { grid-template-columns: 0.9fr 1.1fr; }
  .card-sql .console { display: block; }
}
.console {
  border-radius: 10px;
  background: var(--u-dark);
  color: #ece7de;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  min-width: 0;
}
.console-code {
  margin: 0;
  padding: 16px 18px;
  display: grid;
  white-space: pre;
  overflow: hidden;
  line-height: 1.6;
  color: #dcc9b0;
}
.caret {
  display: inline-block;
  width: 7px;
  height: 15px;
  margin-left: 1px;
  vertical-align: -2px;
  background: var(--u-signal);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.console-code code { grid-area: 1 / 1; }
.console-code .ghost { visibility: hidden; }
.console-result {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  font-size: 12px;
}
.console-result.show { opacity: 1; transition: opacity 0.3s; }
.console-result th, .console-result td {
  border: 0;
  padding: 6px 18px;
  text-align: left;
  background: transparent;
}
.console-result td { padding-top: 2px; padding-bottom: 2px; }
.console-result th { padding-bottom: 3px; }
.console-result tbody tr:last-child td { padding-bottom: 6px; }
.console-result th { color: #8a8378; font-weight: 500; }
.console-result tr { background: transparent !important; border: 0; }
.console-result td:last-child, .console-result th:last-child { text-align: right; color: var(--u-signal-soft); }

/* Import */
.type-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 22px; }
.type-row span {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 6px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
}

/* Charts gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: 10px;
}
.thumb {
  margin: 0;
  padding: 12px 8px 8px;
  border-radius: 8px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  text-align: center;
  transition: transform 220ms var(--u-ease), border-color 220ms, box-shadow 220ms;
}
.thumb:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--u-ink) 18%, var(--u-border)); box-shadow: var(--u-lift); }
.thumb svg { width: 100%; height: 44px; overflow: visible; }
.thumb figcaption { margin-top: 6px; font-size: 10px; font-weight: 500; color: var(--vp-c-text-2); }
.f1 { fill: var(--u-c1); }
.f2 { fill: var(--u-c2); }
.f3 { fill: var(--u-c3); }
.o3 { opacity: 0.3; }
.o5 { opacity: 0.5; }
.o7 { opacity: 0.75; }
.o9 { opacity: 0.95; }
.s1 { fill: none; stroke: var(--u-c1); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.s2 { fill: none; stroke: var(--u-c2); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.f1.s1 { fill: var(--u-c1); }
.stem { stroke-width: 1.6; }
.grid-poly { fill: none; stroke: var(--u-border); stroke-width: 1; }
.region { stroke: var(--u-card-solid); stroke-width: 0.3; stroke-linejoin: round; }
.kpi-text { font-size: 18px; font-weight: 500; fill: var(--vp-c-text-1); letter-spacing: -0.05em; }

/* Filters */
.controls-demo { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; }
.picker { display: flex; gap: 6px; }
.picker span {
  font-size: 12px;
  font-weight: 500;
  width: 30px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
  background: var(--u-card-solid);
}
.picker .on { background: var(--u-ink); color: var(--vp-c-bg); border-color: transparent; }
.picker span:nth-child(2) { animation: toggleOn 4s infinite; }
@keyframes toggleOn {
  40%, 80% { background: var(--u-ink); color: var(--vp-c-bg); border-color: transparent; }
}
.range .track {
  display: block;
  position: relative;
  height: 6px;
  border-radius: 3px;
  background: var(--u-grid);
}
.range .fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20%;
  right: 30%;
  border-radius: 3px;
  background: var(--u-c1);
  animation: slide 4s ease-in-out infinite;
}
.range .fill::before, .range .fill::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--u-card-solid);
  border: 2px solid var(--u-c1);
  transform: translate(-50%, -50%);
}
.range .fill::after { left: 100%; }
@keyframes slide { 50% { left: 35%; right: 12%; } }
.toggle {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--u-grid);
  position: relative;
  animation: toggleBg 4s infinite;
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  animation: knob 4s infinite;
}
@keyframes toggleBg { 30%, 80% { background: var(--u-c1); } }
@keyframes knob { 30%, 80% { left: 21px; } }

/* Present */
.screen {
  margin-top: 22px;
  padding: 8px;
  border-radius: 8px;
  background: var(--u-dark);
  aspect-ratio: 16 / 7;
  position: relative;
}
.screen::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 42%;
  right: 42%;
  height: 10px;
  background: var(--u-border);
  border-radius: 0 0 4px 4px;
}
.layout { display: grid; height: 100%; gap: 5px; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; animation: relayout 6s ease-in-out infinite; }
.layout span { border-radius: 5px; }
.l1 { grid-row: span 2; background: var(--u-c1); }
.l2 { background: var(--u-signal); }
.l3 { background: color-mix(in srgb, var(--u-c1) 45%, #fff); }
@keyframes relayout {
  0%, 40% { grid-template-columns: 2fr 1fr; }
  50%, 90% { grid-template-columns: 1fr 2fr; }
}

/* Offline */
.status-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 999px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
}
.status i { width: 6px; height: 6px; border-radius: 50%; }
.status .off { background: var(--vp-c-text-3); }
.status .ok { background: var(--u-c1); box-shadow: 0 0 0 3px color-mix(in srgb, var(--u-c1) 25%, transparent); }

/* Export */
.export-grid { display: flex; flex-direction: column; gap: 18px; }
.export-title { display: block; font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; color: var(--vp-c-text-2); margin-bottom: 10px; }
.files { display: flex; flex-wrap: wrap; gap: 8px; }
.file {
  position: relative;
  width: 58px;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #fff;
  border-radius: 5px 14px 5px 5px;
  transition: transform 220ms var(--u-ease);
}
.file:hover { transform: translateY(-3px) rotate(-2deg); }
.file::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 0 16px 0 6px;
}
.file { background: var(--u-c1); }
.export-group + .export-group .file { background: var(--u-dark); }

/* Customize */
.custom-demo { margin-top: 22px; display: flex; flex-direction: column; gap: 10px; }
/* Labels and swatches as one block, centered, the label column as wide as the longest label */
.palettes {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  gap: 10px 12px;
}
.palette-label {
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
.swatches { display: flex; gap: 6px; }
.swatches span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
  transition: transform 0.2s;
}
.swatches span:hover { transform: scale(1.2); }
.fonts { display: flex; gap: 6px; margin-top: 12px; }

/* Locales: a slim panel under Export, text beside the language chips */
.card-locales { display: grid; gap: 20px; align-items: center; }
@media (min-width: 700px) {
  .card-locales { grid-template-columns: 1fr 1fr; gap: 28px; }
}
.card-locales .card-icon { margin-bottom: 12px; }
.locale-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.locale-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  font-size: 12px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  min-width: 0;
}
.locale-list b {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--u-c1);
  background: color-mix(in srgb, var(--u-c1) 10%, transparent);
}
.locale-list span { overflow: hidden; text-overflow: ellipsis; }
.fonts span {
  flex: 1;
  text-align: center;
  font-size: 17px;
  padding: 4px 0;
  border-radius: 6px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
}

/* Keys */
.keys {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}
kbd {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  font-family: inherit;
  font-size: 17px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  border-radius: 8px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  box-shadow: 0 3px 0 var(--u-border);
  animation: press 3.2s infinite;
}
.k-j { animation-delay: 0.4s; }
.k-k { animation-delay: 0.8s; }
.k-l { animation-delay: 1.2s; }
@keyframes press {
  0%, 12%, 100% { transform: none; box-shadow: 0 3px 0 var(--u-border); color: var(--vp-c-text-1); }
  6% { transform: translateY(2px); box-shadow: 0 1px 0 var(--u-border); color: var(--u-c1); }
}

/* --------------------------------------------------------------- Devices */

/* Pull up into the features bottom margin, matching the gap to the CTA */
.devices { margin-top: -88px; margin-bottom: 32px; }
.devices-card {
  display: grid;
  gap: 28px;
  align-items: center;
  padding: 32px;
  border-radius: var(--u-radius);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  transition: border-color 220ms, box-shadow 220ms;
}
.devices-card:hover {
  border-color: color-mix(in srgb, var(--u-ink) 18%, var(--u-border));
  box-shadow: var(--u-lift);
}
@media (min-width: 860px) {
  .devices-card { grid-template-columns: 1fr 1.1fr; padding: 48px 56px; }
}
.devices-text h3 { margin: 0 0 10px; font-size: 26px; font-weight: 500; letter-spacing: -0.04em; }
.devices-text p { margin: 0; font-size: 14px; line-height: 1.75; color: var(--u-muted); }

.device-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.device {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 22px 8px 16px;
  border-radius: 10px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  text-align: center;
}
.device-icon {
  position: relative;
  width: 44px;
  height: 44px;
  color: var(--u-c1);
}
.device-icon > svg { width: 100%; height: 100%; stroke-width: 1.4; }
.device-icon .device-pencil {
  position: absolute;
  right: -10px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  color: var(--u-c2);
}
.device-name { font-size: 12px; font-weight: 500; color: var(--vp-c-text-1); }
.device-status {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: var(--u-c1);
}
.device-status svg { width: 11px; height: 11px; }
@media (max-width: 480px) {
  .devices-card { padding: 24px; }
  .device-list { gap: 8px; }
  .device { padding: 18px 4px 14px; }
  .device-name { font-size: 12px; }
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ------------------------------------------------------------------- CTA */

.cta { margin-bottom: 96px; }
.cta-card {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 96px 24px 88px;
  border-radius: 16px;
  background: var(--u-dark);
  border: 1px solid var(--u-dark);
  color: #f6f3ec;
  isolation: isolate;
}
/* Graph paper with an amber sunrise at the bottom edge */
.cta-glow {
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 60% at 50% 115%, color-mix(in srgb, var(--u-signal) 35%, transparent), transparent 70%),
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px) -1px -1px / 32px 32px,
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px) -1px -1px / 32px 32px;
  mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, #000 50%, transparent 100%);
  pointer-events: none;
}
.cta-card .gradient-text { color: var(--u-signal-soft); }
.cta-card .btn-brand { color: var(--u-dark); background: #ffffff; }
.cta-card .btn-brand:hover { background: #ffffff; box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.15); }
/* Same wordmark as the hero: 0.26 of the hero title size */
.cta-brand { font-size: clamp(14.56px, 2.184vw, 28.08px); letter-spacing: -0.03em; }
.cta-brand .brand-word { color: #b3aca0; }
.cta-brand .brand-word b { color: #ffffff; }
.cta h2 {
  position: relative;
  margin: 0;
  font-size: clamp(40px, 6vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.05em;
  font-weight: 600;
  text-wrap: balance;
  border: 0;
  padding: 0;
}
.cta p { position: relative; margin: 22px auto 32px; max-width: 520px; font-size: 15px; line-height: 1.75; color: #b3aca0; }
.cta .btn { position: relative; }

/* ---------------------------------------------------------------- Reveal */

.is-mounted .reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.9s var(--u-ease), transform 0.9s var(--u-ease), border-color 220ms, box-shadow 220ms;
}
.is-mounted .reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .landing *, .landing *::before, .landing *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .is-mounted .reveal { opacity: 1; transform: none; }
}
</style>

<style>
.dark .landing {
  --u-c1: #c9a07a;
  --u-signal: #f0b964;
  --u-panel: #1c1a17;
  --u-card: #1b1916;
  --u-card-solid: #211f1b;
  --u-border: #2e2b26;
  --u-shadow: none;
  --u-lift: 0 18px 40px -24px rgba(0, 0, 0, 0.9);
  --u-grid: rgba(255, 255, 255, 0.05);
  --u-dark: #1f1c19;
  --u-dark-2: #2a2622;
  --u-dark-line: #3a352f;
}
.dark .landing .window { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03), 0 30px 60px -30px rgba(0, 0, 0, 0.9); }
.dark .landing .card-private,
.dark .landing .cta-card { border-color: var(--u-dark-line); }
/* Data file icons: --u-dark nearly matches the card in dark mode, so invert them to paper */
.dark .landing .export-group + .export-group .file { background: #e6dfd3; color: #262320; }
.dark .landing .export-group + .export-group .file::before { background: rgba(38, 35, 32, 0.18); }

.landing .logo-dark { display: none; }
.dark .landing .logo-light { display: none; }
.dark .landing .logo-dark { display: block; }
</style>
