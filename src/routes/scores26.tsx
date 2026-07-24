import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Crown,
  Trophy,
  Medal,
  ArrowLeft,
  TrendingUp,
  Users,
  Hash,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/scores26")({
  head: () => ({
    meta: [
      { title: "SIMMAM 2026 — Final House Rankings" },
      {
        name: "description",
        content:
          "Final house rankings and scores for SIMMAM 2026. Dhronas crowned champions with 63,217 points.",
      },
      { property: "og:title", content: "SIMMAM 2026 — Final House Rankings" },
      {
        property: "og:description",
        content: "The final standings of all six houses at SIMMAM 2026.",
      },
    ],
  }),
  component: Scores26Page,
});

/* ─── Color Palette ────────────────────────────────────────── */

const C = {
  bg: "#0a0908",
  bgCard: "#0f0e0c",
  bgCardHover: "#141210",
  borderGold: "#6b5a32",
  borderSoft: "#3d3424",
  headingGold: "#d4a843",
  mainText: "#f0e8da",
  secondText: "#a89a7e",
  dimText: "#6b5f4d",
  accentGold: "#c9a238",
  glowGold: "#d4a84340",
} as const;

/* ─── Final Scores Data ─────────────────────────────────────── */

const finalScores = [
  {
    name: "Dhronas",
    short: "DHR",
    score: 63217,
    accent: "#B90000",
    gradient: "linear-gradient(135deg, #B90000, #7A0000)",
    logo: "/teams 26/dronas 26.png",
    isChampion: true,
  },
  {
    name: "Suryas",
    short: "SUR",
    score: 59775,
    accent: "#8A2BE2",
    gradient: "linear-gradient(135deg, #8A2BE2, #4B0082)",
    logo: "/teams 26/suryas 26.PNG",
    isChampion: false,
  },
  {
    name: "Rudras",
    short: "RUD",
    score: 59260,
    accent: "#E0E0E0",
    gradient: "linear-gradient(135deg, #FFFFFF, #B0BEC5)",
    logo: "/teams 26/rudras26.png",
    isChampion: false,
  },
  {
    name: "Marutas",
    short: "MAR",
    score: 54261,
    accent: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #FFB300)",
    logo: "/teams 26/marutas26.png",
    isChampion: false,
  },
  {
    name: "Agniyas",
    short: "AGN",
    score: 44100,
    accent: "#FF6B00",
    gradient: "linear-gradient(135deg, #FF6B00, #FF3D00)",
    logo: "/teams 26/agniya-26.PNG",
    isChampion: false,
  },
  {
    name: "Vajras",
    short: "VAJ",
    score: 39901,
    accent: "#50C878",
    gradient: "linear-gradient(135deg, #50C878, #008000)",
    logo: "/teams 26/vajras-26.png",
    isChampion: false,
  },
];

const totalScore = finalScores.reduce((s, h) => s + h.score, 0);

/* ─── Animated Number ───────────────────────────────────────── */

function AnimatedNumber({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const animate = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animate(); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

/* ─── Ember Particles ───────────────────────────────────────── */

function EmberParticles({ count = 18 }: { count?: number }) {
  type Ember = {
    id: number; left: number; size: number; delay: number;
    duration: number; drift: number; gold: boolean;
  };
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1.2,
        delay: Math.random() * 14,
        duration: Math.random() * 12 + 10,
        drift: (Math.random() - 0.5) * 50,
        gold: Math.random() > 0.3,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: `-${e.size + 4}px`,
            width: e.size,
            height: e.size,
            background: e.gold ? C.accentGold : "#8b6914",
            boxShadow: e.gold ? `0 0 6px ${C.accentGold}90` : "0 0 6px #8b691480",
            opacity: 0,
            animation: `ember-rise ${e.duration}s ${e.delay}s ease-out infinite`,
            "--ember-drift": `${e.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Final Badge ───────────────────────────────────────────── */

function FinalBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
      style={{
        border: `1px solid ${C.borderSoft}`,
        background: `${C.bg}cc`,
      }}
    >
      <Trophy className="w-3.5 h-3.5" style={{ color: C.headingGold }} />
      <span
        className="text-[10px] font-semibold tracking-[0.25em]"
        style={{ color: C.headingGold }}
      >
        FINAL RESULTS
      </span>
    </div>
  );
}

/* ─── Podium Card ───────────────────────────────────────────── */

function PodiumCard({
  house,
  rank,
  featured = false,
}: {
  house: typeof finalScores[0];
  rank: number;
  featured?: boolean;
}) {
  const Icon = rank === 1 ? Crown : rank === 2 ? Trophy : Medal;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${featured ? "sm:-translate-y-4 sm:scale-[1.02]" : ""}`}
      style={{
        background: C.bgCard,
        border: `1px solid ${C.borderGold}`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${house.accent}cc 50%, transparent 90%)`,
        }}
      />

      {/* Subtle top glow */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-32 opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${house.accent}50, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${featured ? "p-6 sm:p-8" : "p-6"}`}>

        {/* Champion label */}
        {rank === 1 && (
          <div className="absolute top-5 right-5">
            <span className="text-[9px] tracking-[0.2em] font-semibold" style={{ color: C.headingGold }}>
              CHAMPION
            </span>
          </div>
        )}

        {/* Rank icon */}
        <div className="flex justify-center mb-1">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: `${C.headingGold}15`,
              border: `1px solid ${C.borderGold}`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: C.headingGold }} />
          </div>
        </div>

        {/* Emblem */}
        <div className="flex justify-center mb-4 mt-2">
          <div
            className={`relative flex items-center justify-center rounded-2xl overflow-hidden ${featured ? "w-28 h-28" : "w-24 h-24"} transition-transform duration-500 group-hover:scale-110`}
            style={{
              background: `linear-gradient(135deg, ${house.accent}30, ${house.accent}10)`,
              boxShadow: `0 0 30px ${house.accent}40`,
              border: `2px solid ${house.accent}70`,
              padding: "6px",
            }}
          >
            <img
              src={house.logo}
              alt={`${house.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h3
            className={`font-display font-bold tracking-wide ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
            style={{ color: C.headingGold }}
          >
            {house.name.toUpperCase()}
          </h3>
        </div>

        {/* Score */}
        <div className="mt-5 text-center">
          <div
            className={`font-display font-bold tabular-nums ${featured ? "text-4xl" : "text-3xl"}`}
            style={{ color: C.mainText }}
          >
            <AnimatedNumber value={house.score} />
          </div>
          <span
            className="text-[10px] tracking-[0.3em] mt-1 block"
            style={{ color: C.dimText }}
          >
            TOTAL SCORE
          </span>
        </div>

        {/* Rank badge */}
        <div className="absolute bottom-5 right-5">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em]"
            style={{
              background: `${C.borderSoft}40`,
              color: C.headingGold,
              border: `1px solid ${C.borderGold}`,
            }}
          >
            <span>RANK</span>
            <span>#{rank.toString().padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.borderGold}80, transparent)` }}
      />
    </div>
  );
}

/* ─── Score Bar Row ─────────────────────────────────────────── */

function ScoreBarRow({
  house,
  rank,
  maxScore,
}: {
  house: typeof finalScores[0];
  rank: number;
  maxScore: number;
}) {
  const pct = (house.score / maxScore) * 100;
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group grid items-center gap-4 px-5 md:px-8 py-4 transition-colors duration-300 cursor-default rounded-xl"
      style={{
        gridTemplateColumns: "48px 48px 1fr 130px",
        background: C.bgCard,
        border: `1px solid ${C.borderSoft}50`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = C.bgCardHover;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${house.accent}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = C.bgCard;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${C.borderSoft}50`;
      }}
    >
      {/* Rank */}
      <div className="flex items-center">
        <span
          className="font-display text-2xl font-black tabular-nums"
          style={{ color: rank <= 3 ? C.headingGold : C.dimText }}
        >
          {String(rank).padStart(2, "0")}
        </span>
      </div>

      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${house.accent}18`,
          border: `1.5px solid ${house.accent}50`,
          padding: "4px",
        }}
      >
        <img
          src={house.logo}
          alt={`${house.name} logo`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Name + Bar */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-sm tracking-wide"
            style={{ color: C.mainText }}
          >
            {house.name.toUpperCase()}
          </span>
          {house.isChampion && (
            <Crown className="w-3.5 h-3.5 shrink-0" style={{ color: C.headingGold }} />
          )}
        </div>
        {/* Progress bar */}
        <div
          className="relative h-2 rounded-full overflow-hidden"
          style={{ background: `${C.borderSoft}40` }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-[1800ms] ease-out"
            style={{
              width: animated ? `${pct}%` : "0%",
              background: `linear-gradient(90deg, ${house.accent}cc, ${house.accent})`,
              boxShadow: `0 0 8px ${house.accent}80`,
            }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="text-right">
        <div
          className="font-display text-lg font-bold tabular-nums"
          style={{ color: rank <= 3 ? C.headingGold : C.mainText }}
        >
          <AnimatedNumber value={house.score} />
        </div>
        <div className="text-[9px] tracking-[0.2em]" style={{ color: C.dimText }}>
          TOTAL SCORE
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */

function Scores26Page() {
  const first = finalScores[0];
  const second = finalScores[1];
  const third = finalScores[2];
  const rest = finalScores.slice(3);
  const maxScore = finalScores[0].score;

  return (
    <div className="relative min-h-screen" style={{ background: C.bg }}>
      <Navbar />
      <Particles count={20} className="!fixed inset-0 -z-10" />

      <main
        className="relative overflow-hidden py-32 pb-24"
        style={{ background: C.bg }}
      >
        <EmberParticles count={20} />

        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${C.headingGold}50, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] mb-10"
            style={{ color: `${C.headingGold}cc` }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO HOME
          </Link>

          {/* ── Header ── */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="h-px w-10"
                style={{ background: `linear-gradient(90deg, transparent, ${C.borderGold})` }}
              />
              <FinalBadge />
              <span
                className="h-px w-10"
                style={{ background: `linear-gradient(90deg, ${C.borderGold}, transparent)` }}
              />
            </div>

            <div className="flex items-center justify-center gap-3 mb-5">
              <span
                className="h-px w-10"
                style={{ background: `linear-gradient(90deg, transparent, ${C.borderGold})` }}
              />
              <span
                className="text-[10px] md:text-[11px] tracking-[0.4em] font-semibold"
                style={{ color: C.secondText }}
              >
                SIMMAM 2026
              </span>
              <span
                className="h-px w-10"
                style={{ background: `linear-gradient(90deg, ${C.borderGold}, transparent)` }}
              />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">
              <span style={{ color: C.headingGold }}>HOUSE</span>{" "}
              <span style={{ color: C.mainText }}>RANKINGS</span>
            </h1>

            <p
              className="mt-4 text-sm tracking-wide max-w-lg mx-auto"
              style={{ color: C.secondText }}
            >
              The final standings of all six houses at SIMMAM 2026. Glory earned on every stage, field, and arena.
            </p>
          </div>

          {/* ── Top 3 Podium ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16">
            <div className="order-2 sm:order-1 sm:mt-6">
              <PodiumCard house={second} rank={2} />
            </div>
            <div className="order-1 sm:order-2">
              <PodiumCard house={first} rank={1} featured />
            </div>
            <div className="order-3 sm:mt-6">
              <PodiumCard house={third} rank={3} />
            </div>
          </div>

          {/* ── Full Standings with Score Bars ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${C.borderGold}60, transparent)` }}
              />
              <span
                className="text-[10px] tracking-[0.3em] font-semibold"
                style={{ color: C.dimText }}
              >
                FULL STANDINGS
              </span>
              <span
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, transparent, ${C.borderGold}60)` }}
              />
            </div>

            <div className="space-y-3">
              {finalScores.map((house, i) => (
                <ScoreBarRow
                  key={house.short}
                  house={house}
                  rank={i + 1}
                  maxScore={maxScore}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
