"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

/**
 * Meme@Me — streamer setup guide (/setup).
 *
 * An interactive, step-by-step walkthrough for streamers connecting their
 * Twitch account. The real Twitch OAuth app and backend DO NOT EXIST YET, so:
 *   - "Install from Steam" points at "#" with the same coming-soon pattern as
 *     the landing page (no fake Steam URL).
 *   - "Connect Twitch" opens a SIMULATED consent explainer (scopes preview)
 *     instead of redirecting anywhere — clearly labeled as a preview.
 *   - Chaos settings live purely in component state; nothing is persisted.
 *   - "Test a meme bomb" triggers a pure-CSS animation on the page as a local
 *     demo of what viewers will trigger.
 */

const STEPS = [
  { key: "install", label: "Install", emoji: "🎮" },
  { key: "connect", label: "Connect Twitch", emoji: "🔗" },
  { key: "configure", label: "Chaos settings", emoji: "🎛️" },
  { key: "golive", label: "Go live", emoji: "📡" },
  { key: "ready", label: "Ready", emoji: "✅" },
] as const;

// What a real Twitch consent screen WOULD request (preview only).
const SCOPES = [
  {
    scope: "chat:read",
    label: "Read your chat",
    why: "So viewers' troll messages and combos register as game input.",
  },
  {
    scope: "bits:read",
    label: "See Bits events",
    why: "So a Bits cheer can trigger a paid meme bomb on your stream.",
  },
  {
    scope: "channel:read:subscriptions",
    label: "Read subscriber status",
    why: "So subs can get bonus chaos and cosmetic meme armor.",
  },
  {
    scope: "user:read:email",
    label: "Your account email",
    why: "So we can link your Steam copy of Meme@Me to your Twitch channel.",
  },
];

export default function SetupPage() {
  const [step, setStep] = useState(0);

  // Step 1 / coming-soon toast (mirrors landing page behaviour).
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comingSoon = useCallback((what: string) => {
    setToast(`${what} isn't live yet — this guide is a preview.`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  // Step 2 — simulated OAuth consent.
  const [consentOpen, setConsentOpen] = useState(false);
  const [twitchConnected, setTwitchConnected] = useState(false);

  // Step 3 — chaos settings (illustrative state only, no backend).
  const [bitThreshold, setBitThreshold] = useState(100);
  const [intensity, setIntensity] = useState(50);
  const [screenBlocking, setScreenBlocking] = useState(true);
  const [autoClip, setAutoClip] = useState(true);

  // Step 4 — meme-bomb demo.
  const [bombLive, setBombLive] = useState(false);
  const [bombCount, setBombCount] = useState(0);
  const bombTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fireBomb = useCallback(() => {
    setBombCount((c) => c + 1);
    setBombLive(false);
    // next frame so the animation restarts even on rapid re-clicks
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBombLive(true));
    });
    if (bombTimer.current) clearTimeout(bombTimer.current);
    bombTimer.current = setTimeout(() => setBombLive(false), 1700);
  }, []);

  const atFirst = step === 0;
  const atLast = step === STEPS.length - 1;
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-sans selection:bg-fuchsia-500 selection:text-black">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 backdrop-blur-md bg-black/40 border-b border-fuchsia-500/20">
        <Link href="/" className="font-mono font-black text-lg tracking-tight">
          <span className="text-fuchsia-400">Meme</span>
          <span className="text-cyan-300">@</span>
          <span className="text-white">Me</span>
        </Link>
        <Link
          href="/"
          className="text-xs sm:text-sm text-white/60 hover:text-white transition"
        >
          ← Back to home
        </Link>
      </nav>

      {/* ===== HEADER ===== */}
      <header className="relative overflow-hidden mm-gradient-bg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          aria-hidden
          className="mm-spark absolute left-0 top-1/2 h-[3px] w-1/3 origin-left bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-transparent blur-[1px]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-14 sm:py-20 text-center">
          <p className="mb-3 inline-block rounded-full border border-white/30 bg-black/30 px-4 py-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
            ▶ Streamer setup guide · preview
          </p>
          <h1
            className="mm-glitch-text mx-auto max-w-3xl text-4xl sm:text-6xl font-black leading-[0.95] tracking-tighter"
            data-text="Connect Your Twitch"
          >
            Connect Your Twitch
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl font-bold text-cyan-200">
            Become the Troll.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
            Five quick steps to wire your channel into the chaos engine. Nothing
            here connects to a live server yet — it&rsquo;s a guided preview of
            what setup will feel like at launch.
          </p>
        </div>
      </header>

      {/* ===== STEPPER ===== */}
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* progress bar */}
        <div className="mb-5">
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STEPS.length - 1}
            aria-valuenow={step}
            aria-label="Setup progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-300 transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* step dots */}
        <ol className="mb-10 flex items-center justify-between gap-1">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.key} className="flex flex-1 flex-col items-center">
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={current ? "step" : undefined}
                  className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-black transition active:scale-95 ${
                    current
                      ? "border-cyan-300 bg-cyan-300 text-black shadow-[0_0_18px_-2px_rgba(34,211,238,0.8)]"
                      : done
                        ? "border-fuchsia-400 bg-fuchsia-500/30 text-white"
                        : "border-white/20 bg-white/5 text-white/50 hover:border-white/40"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </button>
                <span
                  className={`mt-2 hidden text-center font-mono text-[10px] uppercase tracking-wide sm:block ${
                    current ? "text-cyan-200" : "text-white/40"
                  }`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* ===== STEP PANELS ===== */}
        <section
          aria-live="polite"
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-black/40 text-2xl">
              {STEPS[step].emoji}
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fuchsia-300">
                Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
              </p>
              <h2 className="text-2xl font-black tracking-tight">
                {STEPS[step].label}
              </h2>
            </div>
          </div>

          {/* --- Step 1: Install from Steam --- */}
          {step === 0 && (
            <div>
              <p className="text-white/75">
                Grab Meme@Me from Steam and let it install. You&rsquo;ll launch
                it once to register your machine, then come back here to link
                your Twitch channel.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>• Premium indie title, roughly $5–10.</li>
                <li>• Runs alongside your usual streaming setup (OBS, etc.).</li>
                <li>• No Twitch login needed for this step.</li>
              </ul>
              <button
                type="button"
                onClick={() => comingSoon("The Steam page")}
                className="mm-pulse-ring mt-6 inline-block rounded-xl bg-white px-7 py-3.5 text-base font-black text-[#0a0612] shadow-2xl transition hover:bg-cyan-200 active:scale-95"
              >
                🎮 Install from Steam
                <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-fuchsia-600">
                  soon
                </span>
              </button>
            </div>
          )}

          {/* --- Step 2: Connect Twitch (simulated OAuth) --- */}
          {step === 1 && (
            <div>
              <p className="text-white/75">
                Linking lets viewers&rsquo; chat messages and Bits cheers drive
                the on-stream chaos. Clicking below opens a{" "}
                <span className="font-bold text-cyan-200">preview</span> of the
                Twitch consent screen — it does <em>not</em> redirect to Twitch
                or log you in. The real OAuth flow ships at launch.
              </p>

              {!consentOpen && !twitchConnected && (
                <button
                  type="button"
                  onClick={() => setConsentOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-purple-300/60 bg-purple-600/40 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:bg-purple-600/60 active:scale-95"
                >
                  🔗 Connect Twitch
                  <span className="text-[10px] uppercase tracking-wider text-cyan-200">
                    preview
                  </span>
                </button>
              )}

              {/* simulated consent panel */}
              {consentOpen && !twitchConnected && (
                <div className="mt-6 overflow-hidden rounded-xl border border-purple-400/40 bg-[#1a0f2e]">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-purple-700/40 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded bg-purple-500 text-sm font-black">
                      t
                    </span>
                    <span className="font-bold">
                      Authorize <span className="text-cyan-200">Meme@Me</span>
                    </span>
                    <span className="ml-auto rounded bg-yellow-300 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
                      Preview — not real
                    </span>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-sm text-white/70">
                      Meme@Me is requesting permission to:
                    </p>
                    <ul className="mt-3 space-y-3">
                      {SCOPES.map((s) => (
                        <li key={s.scope} className="flex items-start gap-3">
                          <span className="mt-0.5 text-cyan-300">✓</span>
                          <span>
                            <span className="font-semibold">{s.label}</span>
                            <code className="ml-2 rounded bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-fuchsia-300">
                              {s.scope}
                            </code>
                            <span className="mt-0.5 block text-xs text-white/55">
                              {s.why}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setTwitchConnected(true);
                          setConsentOpen(false);
                        }}
                        className="rounded-lg bg-purple-500 px-5 py-2.5 font-bold transition hover:bg-purple-400 active:scale-95"
                      >
                        Authorize (simulated)
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsentOpen(false)}
                        className="rounded-lg border border-white/20 px-5 py-2.5 font-semibold text-white/70 transition hover:bg-white/5 active:scale-95"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="mt-3 font-mono text-[11px] text-white/40">
                      No request leaves your browser. No real Twitch token is
                      issued.
                    </p>
                  </div>
                </div>
              )}

              {twitchConnected && (
                <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3">
                  <span className="font-semibold text-cyan-200">
                    ✓ Twitch linked (simulated) — you&rsquo;re good to go.
                  </span>
                  <button
                    type="button"
                    onClick={() => setTwitchConnected(false)}
                    className="font-mono text-xs text-white/50 underline hover:text-white"
                  >
                    undo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --- Step 3: Chaos settings --- */}
          {step === 2 && (
            <div>
              <p className="text-white/75">
                Dial in how brutal the chaos gets. These are illustrative — they
                tune nothing real yet, but they&rsquo;re the knobs you&rsquo;ll
                control at launch.
              </p>

              <div className="mt-6 space-y-6">
                {/* slider: bit threshold */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="bit-threshold"
                      className="font-semibold"
                    >
                      Bit threshold to trigger a meme bomb
                    </label>
                    <span className="font-mono text-cyan-200">
                      {bitThreshold} bits
                    </span>
                  </div>
                  <input
                    id="bit-threshold"
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={bitThreshold}
                    onChange={(e) => setBitThreshold(Number(e.target.value))}
                    className="mt-2 w-full accent-fuchsia-500"
                  />
                  <p className="mt-1 text-xs text-white/50">
                    Lower = cheaper chaos, more often. Higher = rarer but
                    bigger.
                  </p>
                </div>

                {/* slider: intensity */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="intensity" className="font-semibold">
                      Looney-Tunes intensity
                    </label>
                    <span className="font-mono text-cyan-200">
                      {intensity}%
                    </span>
                  </div>
                  <input
                    id="intensity"
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="mt-2 w-full accent-fuchsia-500"
                  />
                  <p className="mt-1 text-xs text-white/50">
                    {intensity < 33
                      ? "Mild — gentle bonks."
                      : intensity < 66
                        ? "Spicy — anvils with attitude."
                        : "Maximum brainrot — full cartoon physics."}
                  </p>
                </div>

                {/* toggle: screen-blocking */}
                <Toggle
                  id="screen-blocking"
                  label="Allow screen-blocking overlays"
                  hint="Lets viewers fully cover your screen for a beat. Big reactions, big clips."
                  checked={screenBlocking}
                  onChange={setScreenBlocking}
                />

                {/* toggle: auto-clip */}
                <Toggle
                  id="auto-clip"
                  label="Auto-clip every meme bomb"
                  hint="Grabs a short clip whenever chaos lands, ready for TikTok / Shorts."
                  checked={autoClip}
                  onChange={setAutoClip}
                />
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-white/60">
                Preview config: threshold {bitThreshold} bits · intensity{" "}
                {intensity}% · screen-blocking{" "}
                {screenBlocking ? "ON" : "OFF"} · auto-clip{" "}
                {autoClip ? "ON" : "OFF"}
              </div>
            </div>
          )}

          {/* --- Step 4: Go live + meme-bomb demo --- */}
          {step === 3 && (
            <div>
              <p className="text-white/75">
                Hit go live and your wall of viewer-channels lights up. Want a
                taste of what a viewer triggers? Drop a test meme bomb on your
                own stage below.
              </p>

              {/* demo stage */}
              <div
                className={`mm-bomb-stage relative mt-6 grid aspect-video w-full place-items-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/60 via-[#140a26] to-fuchsia-900/40 ${
                  bombLive ? "mm-bomb-live" : ""
                }`}
                aria-label="Meme bomb demo stage"
              >
                {/* faux scanline texture */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, #fff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                {/* idle hint */}
                {bombCount === 0 && (
                  <p className="z-10 px-4 text-center font-mono text-sm text-white/40">
                    Your stream preview — press the button to drop chaos.
                  </p>
                )}

                {/* shockwave ring */}
                <span
                  aria-hidden
                  className="mm-shockwave absolute left-1/2 top-[58%] h-24 w-24 rounded-full border-4 border-cyan-300/80 opacity-0"
                />

                {/* dust puffs */}
                <span
                  aria-hidden
                  className="mm-dust absolute left-[42%] top-[64%] text-2xl opacity-0"
                  style={{ ["--mm-dx" as string]: "-44px" }}
                >
                  💨
                </span>
                <span
                  aria-hidden
                  className="mm-dust absolute left-[56%] top-[64%] text-2xl opacity-0"
                  style={{ ["--mm-dx" as string]: "44px" }}
                >
                  💨
                </span>

                {/* doge swinging in on a wrecking ball (pendulum from top-left) */}
                <div
                  aria-hidden
                  className="mm-doge-swing absolute left-6 top-0 origin-top opacity-0"
                  style={{ height: "62%" }}
                >
                  <div className="mx-auto h-full w-[3px] bg-gradient-to-b from-white/70 to-white/20" />
                  <div className="-mt-1 text-4xl drop-shadow-[0_0_18px_rgba(34,211,238,0.7)]">
                    🐕
                  </div>
                </div>

                {/* the anvil */}
                <span
                  aria-hidden
                  className="mm-anvil absolute left-1/2 top-[18%] text-6xl opacity-0 drop-shadow-[0_8px_0_rgba(0,0,0,0.4)]"
                >
                  🔨
                </span>

                {/* CRINGE! bonk balloon */}
                <span
                  aria-hidden
                  className="mm-bonk absolute left-1/2 top-1/2 rounded-xl border-2 border-black bg-yellow-300 px-3 py-1 font-black text-black opacity-0"
                  style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  CRINGE!
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={fireBomb}
                  className="mm-pulse-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-6 py-3 text-base font-black text-white shadow-2xl transition hover:brightness-110 active:scale-95"
                >
                  🔨 Test a meme bomb
                </button>
                {bombCount > 0 && (
                  <span className="font-mono text-xs text-white/50">
                    bombs dropped: {bombCount}
                  </span>
                )}
              </div>
              <p className="mt-3 font-mono text-[11px] text-white/40">
                Local CSS demo · no assets, no network. Respects your
                reduced-motion setting.
              </p>
            </div>
          )}

          {/* --- Step 5: Ready --- */}
          {step === 4 && (
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-4xl shadow-[0_0_40px_-8px_rgba(217,70,239,0.8)]">
                😈
              </div>
              <h3 className="text-2xl font-black">You&rsquo;re ready to troll.</h3>
              <p className="mx-auto mt-3 max-w-md text-white/70">
                That&rsquo;s the whole flow. At launch this is exactly how
                you&rsquo;ll hand your chat the keys to your own destruction —
                wishlist now so you&rsquo;re first in line.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => comingSoon("The Steam wishlist")}
                  className="mm-pulse-ring rounded-xl bg-white px-7 py-3.5 font-black text-[#0a0612] shadow-2xl transition hover:bg-cyan-200 active:scale-95"
                >
                  🎮 Wishlist on Steam
                  <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider text-fuchsia-600">
                    soon
                  </span>
                </button>
                <Link
                  href="/"
                  className="rounded-xl border-2 border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/5 active:scale-95"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ===== NEXT / BACK ===== */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={atFirst}
            className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold transition enabled:hover:bg-white/5 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
          </button>
          {atLast ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold transition hover:bg-white/5 active:scale-95"
            >
              ↺ Restart guide
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-fuchsia-600 px-6 py-2.5 font-bold transition hover:bg-fuchsia-500 active:scale-95"
            >
              Next →
            </button>
          )}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-white/40">
          Not affiliated with or endorsed by Twitch or Valve. Twitch & Steam
          integrations coming soon — this guide is a preview.
        </p>
      </main>

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

/* ---- small toggle switch ---- */
function Toggle({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer">
        <span className="font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs text-white/50">{hint}</span>
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 h-7 w-12 shrink-0 rounded-full border transition active:scale-95 ${
          checked
            ? "border-cyan-300 bg-cyan-400/80"
            : "border-white/20 bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
