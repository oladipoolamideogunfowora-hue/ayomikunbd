import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { Music, VolumeX, Mail, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const themeSong = { url: "/assets/birthday-song.mp3" };
const card1 = { url: "/assets/card1.jpg" };
const card2 = { url: "/assets/card2.jpg" };
const card3 = { url: "/assets/card3.jpg" };
const card4 = { url: "/assets/card4.jpg" };
const card5 = { url: "/assets/card5.jpg" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Ayomikun 🎉" },
      {
        name: "description",
        content:
          "A special interactive birthday letter and flip-through memory card for Ayomikun.",
      },
      { property: "og:title", content: "Happy Birthday, Ayomikun 🎉" },
      {
        property: "og:description",
        content: "A special birthday letter and photo cards for Ayomikun.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const cards = [
  {
    image: card1.url,
    script: "Happy",
    headline: "Birthday",
    message:
      "Happy Birthday, Ayomikun! I wanted to take a moment today to remind you how special you are.",
  },
  {
    image: card2.url,
    script: "Thank",
    headline: "You",
    message:
      "Thank you for the food, the love, and everything in between — your kindness means the world to me, and I'll never forget it.",
  },
  {
    image: card3.url,
    script: "That",
    headline: "Smile",
    message:
      "Your smile is so contagious, and I genuinely love the energy you bring whenever you are around.",
  },
  {
    image: card4.url,
    script: "So much",
    headline: "Greatness",
    message:
      "I see so much ambition and greatness in you. My biggest prayer for you this new year is that you realize just how capable you are...",
  },
  {
    image: card5.url,
    script: "Go",
    headline: "Shine",
    message:
      "...and step fully into the incredible potential God has placed inside you. Don't be afraid to push yourself out there! I'm always in your corner cheering you on. Have the absolute best birthday.",
  },
];

type ScreenView = "envelope" | "letter" | "cards";

function Index() {
  const [view, setView] = useState<ScreenView>("envelope");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const card = cards[index]!;
  const isLast = index === cards.length - 1;

  useEffect(() => {
    const audio = new Audio(themeSong.url);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const startOnAnyPress = () => {
      const a = audioRef.current;
      if (!a || a.paused) {
        fadeIn();
        setPlaying(true);
      }
    };
    document.addEventListener("pointerdown", startOnAnyPress);

    return () => {
      document.removeEventListener("pointerdown", startOnAnyPress);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play();
    let v = 0;
    const tick = setInterval(() => {
      v += 0.05;
      if (v >= 0.7) {
        v = 0.7;
        clearInterval(tick);
      }
      audio.volume = v;
    }, 100);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      fadeIn();
      setPlaying(true);
    }
  };

  const handleOpenEnvelope = () => {
    if (!playing) {
      fadeIn();
      setPlaying(true);
    }
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d94523", "#e8743b", "#f59e0b", "#f4ece1"],
    });
    setView("letter");
  };

  const handleGoToCards = () => {
    if (!playing) {
      fadeIn();
      setPlaying(true);
    }
    setView("cards");
  };

  const handleNext = () => {
    if (!playing) {
      fadeIn();
      setPlaying(true);
    }
    if (isLast) {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.7 },
        colors: ["#d94523", "#e8743b", "#2b2320", "#f4ece1"],
      });
      return;
    }
    setIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (index === 0) {
      setView("letter");
    } else {
      setIndex((i) => i - 1);
    }
  };

  return (
    <main className="paper relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-5 py-8">
      <span className="watermark pointer-events-none absolute -left-6 top-24 select-none">
        Happy
      </span>
      <span className="edge-text pointer-events-none absolute bottom-24 left-0 select-none">
        FOR AYOMIKUN · WITH LOVE
      </span>

      {/* Top Header */}
      <div className="relative z-10 w-full max-w-sm text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-ink/80">
          Wishing you the best of the best
        </p>
        <p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-ink/60">
          in this new year of your life
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center py-4">
        <AnimatePresence mode="wait">
          {/* ================= STAGE 1: CLOSED ENVELOPE ================= */}
          {view === "envelope" && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-4 text-center">
                <span className="script text-3xl text-ink">Special Delivery</span>
                <h1 className="stacked text-4xl mt-1">FOR AYOOO</h1>
              </div>

              {/* The Envelope */}
              <div
                onClick={handleOpenEnvelope}
                className="group relative flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-brand/30 bg-card/95 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-brand/20 hover:border-brand/60"
              >
                {/* Envelope Flap Lines */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  {/* Diagonal top flap crease */}
                  <svg
                    viewBox="0 0 340 240"
                    fill="none"
                    className="absolute inset-0 h-full w-full opacity-35"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 0 L170 125 L340 0"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-brand"
                    />
                    <path
                      d="M0 240 L125 105"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-brand/50"
                    />
                    <path
                      d="M340 240 L215 105"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-brand/50"
                    />
                  </svg>
                </div>

                {/* Wax Seal Button */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep shadow-lg ring-4 ring-card transition-shadow group-hover:shadow-brand/40"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <Sparkles className="h-5 w-5 text-white/95" />
                    <span className="font-display text-[0.68rem] tracking-wider text-white">
                      OPEN
                    </span>
                  </div>
                  {/* Subtle seal rim decoration */}
                  <div className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-white/40" />
                </motion.div>

                {/* Delivery Prompt */}
                <p className="relative z-10 mt-5 flex items-center gap-1.5 text-center text-[0.72rem] font-bold uppercase tracking-[0.22em] text-brand transition-colors group-hover:text-brand-deep">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Tap wax seal to open your letter
                  <Sparkles className="h-3 w-3 animate-pulse" />
                </p>
                <p className="mt-1 text-[0.6rem] font-medium text-ink/60">
                  A personalized birthday letter awaits inside 💌
                </p>
              </div>
            </motion.div>
          )}

          {/* ================= STAGE 2: CELEBRATION LETTER ================= */}
          {view === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex w-full flex-col items-center"
            >
              <div className="flex items-end justify-center gap-2">
                <span className="script -mb-2 text-4xl text-ink">To The One and Only</span>
                <span className="stacked text-5xl">AYOOO 🎉</span>
              </div>

              {/* Celebration Birthday Letter Card */}
              <div className="relative mt-5 w-full rounded-2xl border-2 border-brand/20 bg-card/95 p-6 shadow-xl backdrop-blur-sm">
                <div className="absolute right-4 top-4 opacity-15">
                  <Sparkles className="h-12 w-12 text-brand" />
                </div>

                <div className="space-y-3.5 text-left text-[0.92rem] font-medium leading-relaxed text-ink">
                  <p>
                    Happy Birthday, AYOOO! 🎉
                  </p>
                  <p>
                    Today is all about celebrating you — one of the most genuine, radiant, and amazing people I know!
                  </p>
                  <p>
                    Your laughter is contagious, your energy lights up any room, and you have this incredible way of bringing good vibes and joy everywhere you go. Having you as a friend is a true blessing, and I don't take it for granted at all. (Plus, you already know you make the best food and have the biggest heart!)
                  </p>
                  <p>
                    As you step into this new year of life, my prayer for you is that God grants you massive wins, peace of mind, good health, and opens doors of greatness that no one can shut. May every good thing you desire come running to you!
                  </p>
                  <p className="font-semibold text-brand">
                    Never stop shining, having fun, and being the superstar that you are. Enjoy every single moment of your day today — you deserve all the celebration coming your way! ✨
                  </p>
                </div>

                <div className="mt-5 border-t border-brand/15 pt-4 text-right">
                  <p className="script text-3xl text-brand">Always in your corner,</p>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink/70">
                    YOUR BIGGEST CHEERLEADER ✨
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setView("envelope")}
                  className="stamp-btn-outline"
                >
                  ← Envelope
                </button>
                <button onClick={handleGoToCards} className="stamp-btn">
                  See The Memories 📸 ➔
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STAGE 3: PHOTO CARDS ================= */}
          {view === "cards" && (
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex w-full flex-col items-center"
            >
              <div className="flex items-end justify-center gap-2">
                <span className="script -mb-3 text-4xl text-ink">{card.script}</span>
                <span className="stacked text-5xl">{card.headline}</span>
              </div>

              <div className="photo-frame mt-5 w-full">
                <motion.img
                  src={card.image}
                  alt={`Memory ${index + 1} of Ayomikun`}
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="aspect-[4/5] w-full object-cover object-center sepia-[.3] contrast-[1.1] saturate-[.95]"
                />
                <span className="vignette" aria-hidden="true" />
                <span className="halftone" aria-hidden="true" />
              </div>

              <p className="mt-5 max-w-[19rem] text-center text-[0.95rem] font-semibold leading-relaxed text-ink">
                {card.message}
              </p>

              {/* Navigation Controls: Back & Forth */}
              <div className="mt-7 flex flex-col items-center gap-4 w-full">
                <div className="flex items-center justify-center gap-3">
                  <button onClick={handlePrev} className="stamp-btn-outline">
                    {index === 0 ? "← Letter 💌" : "← Prev"}
                  </button>
                  <button onClick={handleNext} className="stamp-btn">
                    {isLast ? "Finish 🎉" : "Next ➔"}
                  </button>
                </div>

                {/* Progress Dots (Clickable for quick jumping) */}
                <div className="flex items-center gap-2">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === index
                          ? "w-7 bg-brand shadow-sm shadow-brand/40"
                          : "w-2 bg-ink/25 hover:bg-ink/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Footer */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-4">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 rounded-full border border-ink/25 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:bg-ink/5"
          aria-label={playing ? "Mute music" : "Play music"}
        >
          {playing ? <Music className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          {playing ? "Music on" : "Play music"}
        </button>

        <a
          href={`https://wa.me/2348121146922?text=${encodeURIComponent(
            "Hi! I just went through the birthday card you made for Ayomikun — it's beautiful 💛 Please recreate one like this for my loved ones!",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-ink/25 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:bg-ink/5"
          aria-label="Recreate this for your loved ones — message on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.92 9.92 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.09c-.25.7-1.45 1.33-2 1.38-.51.05-1.16.07-1.87-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.28-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.07.92 2.22.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.3.15.47.13.65-.08.17-.2.75-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
          </svg>
          Recreate this for a loved one
        </a>

        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/40">
          @ladoblow
        </p>
      </div>
    </main>
  );
}
