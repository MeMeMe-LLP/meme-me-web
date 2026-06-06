"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Meme@Me — game landing page.
 * Steam page + Twitch app don't exist yet, so every CTA points at "#" and
 * fires a "coming soon" toast instead of inventing a fake external URL.
 */

const STEPS = [
  {
    n: "01",
    emoji: "📺",
    title: "Pick your victim",
    body: "Sit in front of a wall of virtual TVs — one mini-channel per real viewer in your chat. Pick ONE channel to watch, target, and torment.",
  },
  {
    n: "02",
    emoji: "💬",
    title: "Fight through the noise",
    body: "The other 999 viewers flood a Group Chat Simulator. Time your troll messages, stack combos, and break through the spam so your meme bomb gets picked up.",
  },
  {
    n: "03",
    emoji: "🔨",
    title: "Land the chaos",
    body: "Damage shoots down a sparking virtual cable into the victim's screen. A cartoon anvil labeled \"Cringe\" flattens their setup. Doge swings in on a wrecking ball. Clip it.",
  },
];

const CLIPS = [
  { tag: "ANVIL DROP", channel: "@trolllord", time: "0:12" },
  { tag: "DOGE WRECKING BALL", channel: "@bigstreamer", time: "0:08" },
  { tag: "PAINT BUCKET KO", channel: "@chaosgremlin", time: "0:21" },
  { tag: "CRINGE OVERLOAD", channel: "@vtuber_dies", time: "0:15" },
  { tag: "BITS RAIN", channel: "@no_mercy", time: "0:09" },
  { tag: "FULL SCREEN BONK", channel: "@last_viewer", time: "0:18" },
];

export default function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const comingSoon = useCallback((e: React.MouseEvent, what: string) => {
    e.preventDefault();
    setToast(
      `${what} isn't live yet — wishlist to get pinged the second it drops.`
    );
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-sans selection:bg-fuchsia-500 selection:text-black">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 backdrop-blur-md bg-black/40 border-b border-fuchsia-500/20">
        <a href="#top" className="font-mono font-black text-lg tracking-tight">
          <span className="text-fuchsia-400">Meme</span>
          <span className="text-cyan-300">@</span>
          <span className="text-white">Me</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <a href="#how" className="hidden sm:inline text-white/60 hover:text-white transition">
            How it works
          </a>
          <a href="#streamers" className="hidden sm:inline text-white/60 hover:text-white transition">
            For streamers
          </a>
          <a
            href="#"
            onClick={(e) => comingSoon(e, "The Steam page")}
            data-coming-soon="steam"
            title="Coming soon"
            className="rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 px-3 py-1.5 font-semibold transition active:scale-95"
          >
            🎮 Wishlist
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header
        id="top"
        className="relative overflow-hidden mm-gradient-bg"
      >
        {/* scanline / grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* sparking cable accent */}
        <div
          aria-hidden
          className="mm-spark absolute left-0 top-1/2 h-[3px] w-1/3 origin-left bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-transparent blur-[1px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 text-center">
          {/* floating glitch doge mascot (pure CSS) */}
          <div className="mb-8 flex justify-center">
            <div className="mm-doge relative">
              <div className="mm-doge-glitch text-7xl sm:text-8xl drop-shadow-[0_0_25px_rgba(34,211,238,0.7)]">
                🐕
              </div>
              <span className="absolute -right-3 -top-2 rounded bg-cyan-300 px-1.5 py-0.5 font-mono text-[10px] font-black text-black rotate-6">
                glitch.exe
              </span>
            </div>
          </div>

          <p className="mb-3 inline-block rounded-full border border-white/30 bg-black/30 px-4 py-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
            ▶ A role-reversal Twitch meta-game
          </p>

          <h1
            className="mm-glitch-text mx-auto max-w-4xl text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tighter"
            data-text="Meme@Me"
          >
            Meme@Me
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl sm:text-2xl font-bold text-white">
            The Revenge Simulator —{" "}
            <span className="text-cyan-200">bully your own chat.</span>
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-white/80">
            You play the anonymous, all-powerful troll viewer. Your chat plays
            desperate virtual streamers trying to survive. Looney-Tunes anvils,
            doge wrecking balls, paint buckets — all transmitted down a sparking
            cable straight into their screen.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              onClick={(e) => comingSoon(e, "The Steam wishlist")}
              data-coming-soon="steam"
              title="Steam page coming soon"
              className="mm-pulse-ring group relative w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-lg font-black text-[#0a0612] shadow-2xl transition hover:bg-cyan-200 active:scale-95"
            >
              🎮 Wishlist on Steam
              <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-fuchsia-600 group-hover:text-fuchsia-700">
                soon
              </span>
            </a>
            <a
              href="#"
              onClick={(e) => comingSoon(e, "Twitch Connect")}
              data-coming-soon="twitch"
              title="Twitch integration coming soon"
              className="w-full sm:w-auto rounded-xl border-2 border-purple-300/60 bg-purple-600/30 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition hover:bg-purple-600/50 active:scale-95"
            >
              🔗 Connect Twitch
              <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                soon
              </span>
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-white/50">
            Premium indie title • coming to Steam • ~$5–10
          </p>
        </div>

        {/* brainrot marquee */}
        <div className="relative border-y border-white/20 bg-black/50 py-2 overflow-hidden">
          <div className="mm-marquee-track font-mono text-sm font-black uppercase tracking-wider text-cyan-200">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="px-4">
                CRINGE&nbsp;&nbsp;🔨&nbsp;&nbsp;ANVIL DROP&nbsp;&nbsp;🐕&nbsp;&nbsp;DOGE WRECKING BALL&nbsp;&nbsp;💸&nbsp;&nbsp;BITS = CHAOS&nbsp;&nbsp;🪣&nbsp;&nbsp;PAINT BUCKET&nbsp;&nbsp;⚡&nbsp;&nbsp;SPARKING CABLE&nbsp;&nbsp;😈&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ===== VIRAL CLIPS ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Viral <span className="text-fuchsia-400">Clips</span>
          </h2>
          <p className="mt-3 text-white/60">
            Every anvil is a TikTok. Clips drop here once streamers start the
            carnage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CLIPS.map((clip) => (
            <article
              key={clip.tag}
              className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/60 via-[#140a26] to-fuchsia-900/40 transition hover:border-fuchsia-400/60 hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.5)]"
            >
              {/* faux thumbnail texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, #fff 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              {/* play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-fuchsia-500/80">
                  <span className="ml-1 text-2xl">▶</span>
                </div>
              </div>
              {/* duration badge */}
              <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-xs">
                {clip.time}
              </span>
              {/* placeholder ribbon */}
              <span className="absolute left-2 top-2 rounded bg-yellow-300 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
                Clip coming soon
              </span>
              {/* meta footer */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-fuchsia-300">
                  {clip.tag}
                </span>
                <span className="font-mono text-xs text-white/60">
                  {clip.channel}
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-xs text-white/40">
          Placeholder cards — no real videos embedded yet.
        </p>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="relative border-y border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              How it <span className="text-cyan-300">works</span>
            </h2>
            <p className="mt-3 text-white/60">
              The power dynamic of streaming, fully inverted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
              >
                <span className="font-mono text-5xl font-black text-fuchsia-500/30">
                  {s.n}
                </span>
                <div className="mt-2 text-4xl">{s.emoji}</div>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY STREAMERS LOVE IT ===== */}
      <section id="streamers" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="mb-3 inline-block rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-fuchsia-300">
              For streamers
            </p>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Turn your chat into a{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                chaos engine
              </span>{" "}
              and double your Bits revenue.
            </h2>
            <p className="mt-5 text-white/70">
              Viewers spend Twitch Bits to trigger massive, screen-blocking meme
              events — premium armor, premium bribes, the works. You keep the Bit
              revenue. The game is the ultimate revenge fantasy: you finally get
              to bully your own chat, and every reaction is auto-clippable
              marketing fuel.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                ["💸", "Streamers keep 100% of the Bit revenue they generate."],
                ["📈", "Endless interactive content — hours of high-engagement streaming."],
                ["🎬", "Streamer reactions clip themselves straight to TikTok & Shorts."],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-3 text-sm">
                  <span className="text-lg">{icon}</span>
                  <span className="text-white/80">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              onClick={(e) => comingSoon(e, "Twitch Connect")}
              data-coming-soon="twitch"
              title="Twitch integration coming soon"
              className="mt-8 inline-block rounded-xl border-2 border-purple-300/60 bg-purple-600/40 px-6 py-3 font-bold transition hover:bg-purple-600/60 active:scale-95"
            >
              🔗 Connect Twitch{" "}
              <span className="text-[10px] uppercase tracking-wider text-cyan-200">
                soon
              </span>
            </a>
          </div>

          {/* Bits stat card */}
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/50 to-fuchsia-900/30 p-8 text-center mm-gradient-bg">
            <div className="rounded-xl bg-black/50 p-8 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
                Viewer pitch
              </p>
              <p className="mt-4 text-2xl sm:text-3xl font-black leading-snug">
                &ldquo;Pay <span className="text-cyan-300">$1</span> to throw a
                screaming cat directly at your favorite streamer&rsquo;s
                face.&rdquo;
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 font-mono">
                <div>
                  <div className="text-2xl font-black text-fuchsia-400">2×</div>
                  <div className="text-[10px] uppercase text-white/50">Bits</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-300">999</div>
                  <div className="text-[10px] uppercase text-white/50">
                    rivals
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-yellow-300">∞</div>
                  <div className="text-[10px] uppercase text-white/50">
                    chaos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA + FOOTER ===== */}
      <footer className="relative overflow-hidden border-t border-fuchsia-500/20 mm-gradient-bg">
        <div className="relative bg-black/60">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Wishlist now. Bully later.
            </h2>
            <p className="mt-3 text-white/70">
              Get pinged the moment Meme@Me hits Steam.
            </p>
            <a
              href="#"
              onClick={(e) => comingSoon(e, "The Steam wishlist")}
              data-coming-soon="steam"
              title="Steam page coming soon"
              className="mm-pulse-ring group mt-8 inline-block rounded-xl bg-white px-10 py-4 text-lg font-black text-[#0a0612] shadow-2xl transition hover:bg-cyan-200 active:scale-95"
            >
              🎮 Wishlist on Steam
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-fuchsia-600">
                soon
              </span>
            </a>

            <div className="mt-14 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-sm text-white/50">
              <p className="font-mono font-black text-white/80">
                <span className="text-fuchsia-400">Meme</span>
                <span className="text-cyan-300">@</span>
                <span>Me</span>
              </p>
              <p>© {new Date().getFullYear()} MeMeMe-LLP. All rights reserved.</p>
              <p className="text-xs text-white/40">
                Not affiliated with or endorsed by Twitch or Valve. Steam &
                Twitch integrations coming soon.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== TOAST ===== */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
          <div className="max-w-md rounded-xl border border-fuchsia-400/50 bg-black/90 px-5 py-3 text-center text-sm font-medium text-white shadow-2xl backdrop-blur">
            ⏳ {toast}
          </div>
        </div>
      )}
    </div>
  );
}
