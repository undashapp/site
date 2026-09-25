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
  'Choropleth',
];

const heat = Array.from({ length: 24 }, (_, i) =>
  (0.15 + 0.85 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))).toFixed(2),
);

const swatches = [100, 82, 64, 48, 32, 18].map(
  (p) => `color-mix(in srgb, var(--u-c1) ${p}%, var(--vp-c-bg))`,
);
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
            <span class="brand-word"><b>un</b>dash</span>
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
                <span class="tile-label">{{ t.demo.byRegion }} <em>{{ t.demo.clickToFilter }}</em></span>
                <div class="bars">
                  <button
                    v-for="(name, r) in t.demo.regions"
                    :key="r"
                    class="bar-col"
                    :class="{ dim: !selected.has(r) }"
                    :aria-label="t.demo.filter(name)"
                    @click="toggleRegion(r)"
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
                  </button>
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
            <div class="window-foot">{{ t.demo.footer }}</div>
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
            <div class="ai-card">
              <svg viewBox="0 0 24 24" class="icon-lg sparkle" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path v-for="d in icons.sparkles" :key="d" :d="d" />
              </svg>
              <div class="ai-tags">
                <span v-for="(tag, i) in t.flow.tags" :key="i" class="tag" :class="`t${i + 1}`">{{ tag }}</span>
              </div>
            </div>
          </div>
          <span class="step-num">02</span>
          <h3>{{ t.flow.steps[1].title }}</h3>
          <p>{{ t.flow.steps[1].text }}</p>
        </li>
        <li class="step reveal">
          <div class="step-visual">
            <div class="mini-dash">
              <span class="md md-a"></span>
              <span class="md md-b"></span>
              <span class="md md-c"></span>
              <span class="md md-d"></span>
            </div>
          </div>
          <span class="step-num">03</span>
          <h3>{{ t.flow.steps[2].title }}</h3>
          <p>{{ t.flow.steps[2].text }}</p>
        </li>
      </ol>
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
          <div class="speed" aria-hidden="true">
            <span v-for="i in 14" :key="i" :style="{ animationDelay: `${i * 0.08}s` }"></span>
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

        <!-- Cross filtering -->
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

        <!-- Customize -->
        <article class="card card-custom reveal">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path v-for="d in icons.adjustments" :key="d" :d="d" /></svg>
          </div>
          <h3>{{ t.features.custom.title }}</h3>
          <p>{{ t.features.custom.text }}</p>
          <div class="custom-demo" aria-hidden="true">
            <div class="swatches">
              <span v-for="c in swatches" :key="c" :style="{ background: c }"></span>
            </div>
            <div class="fonts">
              <span v-for="f in fontSamples" :key="f" :style="{ fontFamily: f }">Aa</span>
            </div>
          </div>
        </article>
</div>
    </section>

    <!-- CTA -->
    <section class="cta container reveal">
      <div class="cta-card">
        <div class="cta-glow" aria-hidden="true"></div>
        <img class="cta-logo cta-logo-light" src="/images/light/logo.svg" alt="" />
        <img class="cta-logo cta-logo-dark" src="/images/dark/logo.svg" alt="" />
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
  --u-c1: #4f46e5;
  /* Monochromatic tints and shades of the primary color */
  --u-c2: color-mix(in srgb, var(--u-c1) 72%, var(--vp-c-bg));
  --u-c3: color-mix(in srgb, var(--u-c1) 50%, var(--vp-c-bg));
  --u-c4: color-mix(in srgb, var(--u-c1) 32%, var(--vp-c-bg));
  --u-c1-deep: color-mix(in srgb, var(--u-c1) 72%, #000);
  --u-c1-light: color-mix(in srgb, var(--u-c1) 55%, #fff);
  --u-card: rgba(255, 255, 255, 0.72);
  --u-card-solid: #ffffff;
  --u-border: rgba(60, 60, 67, 0.12);
  --u-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 12px 40px -12px rgba(30, 27, 75, 0.18);
  --u-grid: rgba(60, 60, 67, 0.07);
  --u-muted: var(--vp-c-text-2);
  --u-radius: 18px;
  overflow: hidden;
  color: var(--vp-c-text-1);
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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

.grid {
  position: absolute;
  inset: -1px 0 0;
  background-image:
    linear-gradient(var(--u-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--u-grid) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 75%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  animation: float 16s ease-in-out infinite;
}
.blob-1 { width: 420px; height: 420px; background: var(--u-c1); top: -120px; right: 8%; }
.blob-2 { width: 320px; height: 320px; background: var(--u-c2); top: 180px; right: 30%; animation-delay: -5s; opacity: 0.3; }
.blob-3 { width: 260px; height: 260px; background: var(--u-c4); top: 40px; left: -80px; animation-delay: -10s; opacity: 0.22; }

@media (max-width: 999px) {
  .blob { opacity: 0.18 !important; }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 25px) scale(0.96); }
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1000px) {
  .hero-inner { grid-template-columns: 0.9fr 1.1fr; }
  .hero { padding: 96px 0 80px; }
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--u-c1);
  background: color-mix(in srgb, var(--u-c1) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--u-c1) 25%, transparent);
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--u-c1);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--u-c1) 60%, transparent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  70% { box-shadow: 0 0 0 8px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

.hero-title {
  margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  font-size: clamp(44px, 7vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 800;
}

.brand-word {
  font-size: 0.42em;
  letter-spacing: -0.01em;
  font-style: italic;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}
.brand-word b { font-weight: 800; color: var(--vp-c-text-1); }

.gradient-text {
  background: linear-gradient(110deg, var(--u-c1-deep) 0%, var(--u-c1) 50%, var(--u-c1-light) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-bottom: 0.08em;
}

.hero-tagline {
  margin: 22px 0 0;
  max-width: 480px;
  font-size: 19px;
  line-height: 1.55;
  color: var(--u-muted);
}
.hero-tagline strong { color: var(--vp-c-text-1); font-weight: 600; }

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.hero-points li::before {
  content: '✓';
  margin-right: 6px;
  color: var(--u-c1);
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0 22px;
  height: 44px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.btn:hover { transform: translateY(-1px); }

.btn-brand {
  color: #fff;
  background: linear-gradient(110deg, var(--u-c1), var(--u-c1-deep));
  box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--u-c1) 70%, transparent);
}
.btn-brand:hover { box-shadow: 0 12px 30px -8px color-mix(in srgb, var(--u-c1) 80%, transparent); }

.btn-alt {
  color: var(--vp-c-text-1);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  backdrop-filter: blur(8px);
}

/* Demo window */

.hero-demo {
  perspective: 1600px;
  min-width: 0;
}

.window {
  background: var(--u-card);
  border: 1px solid var(--u-border);
  border-radius: 16px;
  box-shadow: var(--u-shadow), 0 40px 90px -30px color-mix(in srgb, var(--u-c1) 45%, transparent);
  backdrop-filter: blur(18px);
  overflow: hidden;
  transform: rotateY(-7deg) rotateX(3deg);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.window:hover { transform: rotateY(0) rotateX(0); }

@media (max-width: 999px) {
  .window, .window:hover { transform: none; }
}

.window-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--u-border);
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--vp-c-text-3); opacity: 0.35; }

.window-title {
  margin-left: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.window-badge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--u-c1);
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--u-c1) 12%, transparent);
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
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
  background: var(--u-card-solid);
  transition: all 0.2s;
  cursor: pointer;
}
.chip:hover { border-color: var(--vp-c-text-3); }
.chip.active { color: #fff; border-color: transparent; }
.chip.active { background: var(--u-c1); }
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
  border-radius: 12px;
  padding: 12px 14px;
  min-width: 0;
}

.tile-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}
.tile-label em {
  font-style: normal;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
  color: var(--u-c1);
  margin-left: 6px;
}

.tile-kpi { display: flex; flex-direction: column; justify-content: center; container-type: inline-size; }
.kpi {
  margin-top: 6px;
  /* Scale with the tile so long values ("16,40 Mio. €") stay on one line */
  font-size: min(36px, 16cqi);
  white-space: nowrap;
  font-weight: 800;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.kpi-sub { font-size: 12px; color: var(--vp-c-text-2); }

.donut-wrap { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
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

.tile-bars { grid-row: span 1; container-type: inline-size; }
.tile-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@container (max-width: 280px) {
  .tile-bars .tile-label em { display: none; }
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 130px;
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
  cursor: pointer;
  transition: opacity 0.3s;
  padding: 0;
  background: none;
  border: 0;
}
.bar-col.dim { opacity: 0.22; }
.bar-col:hover .bar { filter: brightness(1.1); }
.bar-value { font-size: min(11px, 7cqi); white-space: nowrap; font-weight: 600; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.bar-track { position: relative; flex: 1; width: 100%; }
.bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px 6px 2px 2px;
  transition: height 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.bar.c1 { background: linear-gradient(var(--u-c1), color-mix(in srgb, var(--u-c1) 70%, transparent)); }
.bar.c2 { background: linear-gradient(var(--u-c2), color-mix(in srgb, var(--u-c2) 70%, transparent)); transition-delay: 0.08s; }
.bar.c3 { background: linear-gradient(var(--u-c3), color-mix(in srgb, var(--u-c3) 70%, transparent)); transition-delay: 0.16s; }
.bar.c4 { background: linear-gradient(var(--u-c4), color-mix(in srgb, var(--u-c4) 70%, transparent)); transition-delay: 0.24s; }
.bar-label { font-size: 11px; color: var(--vp-c-text-2); }

.line { display: block; width: 100%; height: auto; margin-top: 6px; overflow: visible; }
.gridlines line { stroke: var(--u-grid); stroke-width: 1; }
.area { transition: d 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.stroke {
  fill: none;
  stroke: var(--u-c1);
  stroke-width: 2.4;
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
  font-size: 11px;
  color: var(--vp-c-text-3);
}

@media (max-width: 560px) {
  .tiles { grid-template-columns: 1fr; }
}

/* -------------------------------------------------------------- Sections */

.section-head { max-width: 720px; margin: 0 auto 48px; text-align: center; }
.eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--u-c1);
}
.section-head h2 {
  margin: 12px 0 0;
  font-size: clamp(30px, 4.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
  border: 0;
  padding: 0;
}
.muted { color: var(--vp-c-text-3); }
.section-head p { margin: 16px auto 0; font-size: 18px; line-height: 1.6; color: var(--u-muted); }

/* ------------------------------------------------------------------ Flow */

.flow { margin-top: 64px; margin-bottom: 120px; }

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
  .steps { grid-template-columns: repeat(3, 1fr); }
  .steps::before {
    content: '';
    position: absolute;
    top: 90px;
    left: 16%;
    right: 16%;
    height: 2px;
    background: linear-gradient(90deg, var(--u-c1), var(--u-c2), var(--u-c3));
    opacity: 0.35;
    z-index: 0;
  }
}

.step { position: relative; z-index: 1; text-align: center; padding: 0 12px; }
.step-visual {
  height: 180px;
  display: grid;
  place-items: center;
  border-radius: var(--u-radius);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  box-shadow: var(--u-shadow);
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  overflow: hidden;
}
.step-num {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--u-c1);
}
.step h3 { margin: 4px 0 6px; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
.step p { margin: 0; color: var(--u-muted); font-size: 15px; line-height: 1.55; }

.icon-lg { width: 40px; height: 40px; }

.dropzone {
  width: 70%;
  height: 120px;
  border: 2px dashed color-mix(in srgb, var(--u-c1) 45%, transparent);
  border-radius: 14px;
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
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
}

.ai-card { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.sparkle { color: var(--u-c1); animation: twinkle 2.4s ease-in-out infinite; }
@keyframes twinkle {
  50% { transform: scale(1.12) rotate(8deg); filter: drop-shadow(0 0 10px var(--u-c1)); }
}
.ai-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 220px; }
.tag {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  color: #fff;
  opacity: 0;
  transform: translateY(6px);
}
.tag { background: var(--u-c1); }
.is-visible .tag { animation: pop 0.5s forwards; }
.is-visible .t2 { animation-delay: 0.25s; }
.is-visible .t3 { animation-delay: 0.5s; }
.is-visible .t4 { animation-delay: 0.75s; }
@keyframes pop { to { opacity: 1; transform: none; } }

.mini-dash {
  width: 74%;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
}
.md {
  border-radius: 8px;
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
.md::after { content: ''; position: absolute; inset: 10px; border-radius: 4px; }
.md-a::after { background: linear-gradient(90deg, var(--u-c1) 60%, transparent 60%); height: 6px; top: 50%; }
.md-b::after { background: repeating-linear-gradient(90deg, var(--u-c2) 0 10px, transparent 10px 16px); clip-path: polygon(0 60%, 15% 30%, 30% 50%, 45% 10%, 60% 40%, 75% 20%, 100% 5%, 100% 100%, 0 100%); }
.md-c::after { background: conic-gradient(var(--u-c1) 0 40%, var(--u-c2) 0 70%, var(--u-c3) 0); border-radius: 50%; inset: 8px auto 8px 50%; aspect-ratio: 1; transform: translateX(-50%); }
.md-d::after { background: linear-gradient(to top, var(--u-c4) 0 100%); clip-path: polygon(0 100%, 0 70%, 20% 70%, 20% 100%, 27% 100%, 27% 30%, 47% 30%, 47% 100%, 54% 100%, 54% 50%, 74% 50%, 74% 100%, 81% 100%, 81% 10%, 100% 10%, 100% 100%); }

/* ----------------------------------------------------------------- Bento */

.features { margin-bottom: 120px; scroll-margin-top: 80px; }

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
}

.card {
  position: relative;
  padding: 28px;
  border-radius: var(--u-radius);
  background: var(--u-card);
  border: 1px solid var(--u-border);
  box-shadow: var(--u-shadow);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: transform 0.3s, border-color 0.3s;
  min-width: 0;
}
.card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--u-c1) 35%, var(--u-border));
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(600px circle at 0% 0%, color-mix(in srgb, var(--u-c1) 7%, transparent), transparent 40%);
  pointer-events: none;
}

.span-2, .span-3 { display: grid; gap: 28px; align-items: center; }
@media (min-width: 700px) {
  .span-2 { grid-template-columns: 1fr 1fr; }
  .span-3 { grid-template-columns: 0.8fr 2fr; }
}

.card-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: var(--u-c1);
  background: color-mix(in srgb, var(--u-c1) 12%, transparent);
  margin-bottom: 18px;
}
.card-icon svg { width: 22px; height: 22px; }

.card h3 { margin: 0 0 8px; font-size: 20px; font-weight: 700; letter-spacing: -0.015em; }
.card p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--u-muted); }

/* Private */
.private-visual { display: grid; place-items: center; min-height: 200px; }
.orbit { position: relative; width: 200px; height: 200px; }
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed color-mix(in srgb, var(--u-c1) 40%, transparent);
  animation: spin 30s linear infinite;
}
.r2 { inset: 36px; border-style: solid; border-color: color-mix(in srgb, var(--u-c1) 25%, transparent); animation-direction: reverse; animation-duration: 20s; }
@keyframes spin { to { transform: rotate(360deg); } }
.core {
  position: absolute;
  inset: 68px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, var(--u-c1), var(--u-c1-deep));
  box-shadow: 0 0 40px color-mix(in srgb, var(--u-c1) 60%, transparent);
}
.core svg { width: 30px; height: 30px; }
.sat {
  position: absolute;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
  animation: bob 4s ease-in-out infinite;
}
.sat.s1 { top: 6px; left: 50%; transform: translateX(-50%); }
.sat.s2 { bottom: 26px; left: -4px; animation-delay: -1.3s; }
.sat.s3 { bottom: 26px; right: -4px; animation-delay: -2.6s; }
@keyframes bob { 50% { margin-top: -5px; } }

/* Engine */
.speed { display: flex; align-items: flex-end; gap: 4px; height: 48px; margin-top: 22px; }
.speed span {
  flex: 1;
  border-radius: 3px;
  background: linear-gradient(to top, var(--u-c1), var(--u-c2));
  animation: eq 1.1s ease-in-out infinite alternate;
  height: 30%;
}
@keyframes eq { to { height: 100%; } }

/* SQL */
.bento { container: bento / inline-size; }
.card.card-sql { grid-template-columns: 1fr; }
.card-sql .console { display: none; }
@container bento (min-width: 680px) {
  .card.card-sql { grid-template-columns: 0.9fr 1.1fr; }
  .card-sql .console { display: block; }
}
.console {
  border-radius: 12px;
  background: #16161c;
  color: #e4e4e7;
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
  color: color-mix(in srgb, var(--u-c1) 40%, #fff);
}
.caret {
  display: inline-block;
  width: 7px;
  height: 15px;
  margin-left: 1px;
  vertical-align: -2px;
  background: color-mix(in srgb, var(--u-c1) 55%, #fff);
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
.console-result th { color: #71717a; font-weight: 600; }
.console-result tr { background: transparent !important; border: 0; }
.console-result td:last-child, .console-result th:last-child { text-align: right; color: color-mix(in srgb, var(--u-c1) 55%, #fff); }

/* Import */
.type-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 22px; }
.type-row span {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
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
  border-radius: 12px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  text-align: center;
  transition: transform 0.25s, border-color 0.25s;
}
.thumb:hover { transform: translateY(-3px) scale(1.03); border-color: color-mix(in srgb, var(--u-c1) 40%, transparent); }
.thumb svg { width: 100%; height: 44px; overflow: visible; }
.thumb figcaption { margin-top: 6px; font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
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
.kpi-text { font-size: 17px; font-weight: 800; fill: var(--vp-c-text-1); letter-spacing: -0.03em; }

/* Filters */
.controls-demo { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; }
.picker { display: flex; gap: 6px; }
.picker span {
  font-size: 12px;
  font-weight: 700;
  width: 30px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
  background: var(--u-card-solid);
}
.picker .on { background: var(--u-c1); color: #fff; border-color: transparent; }
.picker span:nth-child(2) { animation: toggleOn 4s infinite; }
@keyframes toggleOn {
  40%, 80% { background: var(--u-c1); color: #fff; border-color: transparent; }
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
  border-radius: 10px;
  background: #16161c;
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
.l1 { grid-row: span 2; background: linear-gradient(135deg, var(--u-c1), var(--u-c1-deep)); }
.l2 { background: var(--u-c2); }
.l3 { background: var(--u-c3); }
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
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  color: var(--vp-c-text-2);
}
.status i { width: 8px; height: 8px; border-radius: 50%; }
.status .off { background: var(--vp-c-text-3); }
.status .ok { background: var(--u-c1); box-shadow: 0 0 0 3px color-mix(in srgb, var(--u-c1) 25%, transparent); }

/* Export */
.export-grid { display: flex; flex-direction: column; gap: 18px; }
.export-title { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--vp-c-text-3); margin-bottom: 8px; }
.files { display: flex; flex-wrap: wrap; gap: 8px; }
.file {
  position: relative;
  width: 58px;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
  border-radius: 6px 16px 6px 6px;
  transition: transform 0.25s;
}
.file:hover { transform: translateY(-4px) rotate(-3deg); }
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
.export-group + .export-group .file { background: var(--u-c1-deep); }

/* Customize */
.custom-demo { margin-top: 22px; display: flex; flex-direction: column; gap: 12px; }
.swatches { display: flex; gap: 8px; }
.swatches span {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
  transition: transform 0.2s;
}
.swatches span:hover { transform: scale(1.2); }
.fonts { display: flex; gap: 6px; }
.fonts span {
  flex: 1;
  text-align: center;
  font-size: 17px;
  padding: 4px 0;
  border-radius: 8px;
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
  font-family: var(--vp-font-family-mono);
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border-radius: 12px;
  background: var(--u-card-solid);
  border: 1px solid var(--u-border);
  box-shadow: 0 4px 0 var(--u-border), 0 6px 14px -6px rgba(0, 0, 0, 0.25);
  animation: press 3.2s infinite;
}
.k-j { animation-delay: 0.4s; }
.k-k { animation-delay: 0.8s; }
.k-l { animation-delay: 1.2s; }
@keyframes press {
  0%, 12%, 100% { transform: none; box-shadow: 0 4px 0 var(--u-border), 0 6px 14px -6px rgba(0, 0, 0, 0.25); color: var(--vp-c-text-1); }
  6% { transform: translateY(3px); box-shadow: 0 1px 0 var(--u-border); color: var(--u-c1); }
}

/* ------------------------------------------------------------------- CTA */

.cta { margin-bottom: 96px; }
.cta-card {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 72px 24px;
  border-radius: 28px;
  background: var(--u-card);
  border: 1px solid var(--u-border);
  box-shadow: var(--u-shadow);
}
.cta-glow {
  position: absolute;
  inset: -40% 10% auto;
  height: 380px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--u-c1) 40%, transparent), transparent);
  filter: blur(40px);
  pointer-events: none;
}
.cta-logo { position: relative; height: 56px; margin: 0 auto 24px; }
.cta h2 {
  position: relative;
  margin: 0;
  font-size: clamp(30px, 4.6vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
  border: 0;
  padding: 0;
}
.cta p { position: relative; margin: 16px 0 28px; font-size: 18px; color: var(--u-muted); }
.cta .btn { position: relative; }

/* ---------------------------------------------------------------- Reveal */

.is-mounted .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.is-mounted .reveal.is-visible { opacity: 1; transform: none; }
.card.reveal.is-visible:hover { transform: translateY(-3px); }

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
  --u-c1: #818cf8;
  --u-card: rgba(30, 30, 36, 0.7);
  --u-card-solid: #1e1e24;
  --u-border: rgba(255, 255, 255, 0.09);
  --u-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 18px 50px -18px rgba(0, 0, 0, 0.7);
  --u-grid: rgba(255, 255, 255, 0.05);
}

.landing .cta-logo-dark { display: none; }
.dark .landing .cta-logo-light { display: none; }
.dark .landing .cta-logo-dark { display: block; }
</style>
