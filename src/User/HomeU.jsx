import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const HERO_IMG =
  "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/product1.png";

const STORY_CARDS = [
  {
    id: "chart",
    title: "What is a Diet Chart?",
    subtitle: "A simple, daily plan tailored to you",
    bullets: [
      "Structured meals for breakfast, lunch, snacks, dinner",
      "Portion guidance and timing to strengthen digestion (Agni)",
      "Includes foods, herbs and small lifestyle notes",
    ],
    img: HERO_IMG,
    accent: "#10B981",
  },
  {
    id: "importance",
    title: "Why it matters",
    subtitle: "Good diet + routine = sustainable health",
    bullets: [
      "Improves digestion, sleep and energy",
      "Prevents overeating and imbalanced cravings",
      "Supports weight, immunity and mood",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/pngwing.com.png",
    accent: "#F59E0B",
  },
  {
    id: "benefits",
    title: "Benefits you’ll notice",
    subtitle: "Small changes, big results",
    bullets: [
      "More consistent energy through the day",
      "Better digestion and clearer skin",
      "Calmer mind and improved sleep",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/dog-with-girl.png",
    accent: "#6366F1",
  },
  {
    id: "howto",
    title: "How to use the Diet Chart",
    subtitle: "Step-by-step for first-time users",
    bullets: [
      "Answer a few questions about you (dosha, preferences)",
      "Receive a daily plan with portions and swap options",
      "Follow for 2–4 weeks and adjust based on energy & digestion",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/blog_img4.png",
    accent: "#06B6D4",
  },
  {
    id: "next",
    title: "Ready to start?",
    subtitle: "Create your personalised chart",
    bullets: [
      "Click 'Create Chart' to begin the short onboarding",
      "Share with your practitioner or export as PDF",
      "Revisit the story anytime for quick reminders",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/blog6.jpg",
    accent: "#34D399",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya",
    text: "Following my chart improved my digestion in 2 weeks.",
  },
  { name: "Rohan", text: "Clear steps and easy swaps — love it." },
  { name: "Asha", text: "I sleep better and have steady energy." },
];

const FAQ = [
  {
    q: "How long before I see results?",
    a: "Usually 2–4 weeks; small consistent changes matter.",
  },
  {
    q: "Can I share the chart?",
    a: "Yes — export or share with your practitioner.",
  },
  {
    q: "Do I need to follow strictly?",
    a: "Use it as guidance; adapt by symptoms and energy.",
  },
];

// --- SlideCard component: centered, balanced image + text (timing constants added) ---
const SlideCard = ({
  data,
  index,
  carouselItems,
  onPrev,
  onNext,
  isPlaying,
  setIsPlaying,
}) => {
  // centralised durations for this sidecard only
  const D = {
    enter: 0.6, // main card enter/exit
    imgScale: 0.6, // image hover/scale
    imgIntro: 0.8, // image initial scale animation
    textDelay: 0.18, // title/subtitle stagger start
    textDur: 0.55, // title/subtitle duration
    bulletStagger: 0.14, // each bullet stagger
    controlTap: 0.08, // button tap scale
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-l from-white to-[#f1eacf] flex items-center justify-center pointer-events-auto">
      {/* Card container */}
      <motion.div
        key={data.id}
        initial={{ opacity: 1, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 1, y: -30, scale: 0.98 }}
        transition={{ duration: D.enter, ease: "easeInOut" }}
        className="w-full max-w-[1600px]  rounded-2xl  overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center h-[85vh] sm:h-[80vh] md:h-[78vh]"
      >
        {/* Image */}
        <motion.div
          className="flex items-center justify-center "
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: D.imgIntro, ease: "easeOut" }}
        >
          <motion.img
            src={data.img}
            alt={data.title}
            className="shadow-2xl rounded-full shadow-black h-[40vh] w-[40vh] sm:h-[50vh] sm:w-[50vh] md:h-[60vh] md:w-[60vh] object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: D.imgScale }}
          />
        </motion.div>

        {/* Text area */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-900 mb-2 sm:mb-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: D.textDelay, duration: D.textDur }}
          >
            {data.title}
          </motion.h2>
          <motion.p
            className="text-emerald-800 text-xl mb-3 sm:mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: D.textDelay + 0.12, duration: D.textDur }}
          >
            {data.subtitle}
          </motion.p>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            {data.bullets.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2 sm:gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: D.textDelay + 0.25 + i * D.bulletStagger,
                  duration: 0.45,
                }}
              >
                <span
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1 sm:mt-2"
                  style={{ background: data.accent }}
                />
                <p className="text-xl text-emerald-900">{b}</p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-between mt-4 sm:mt-6">
            <div className="flex gap-1 sm:gap-2">
              {Array.isArray(carouselItems) &&
                carouselItems.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setIsPlaying && setIsPlaying(false);
                      // parent controls index; this only pauses playback
                    }}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition ${
                      i === index
                        ? "bg-emerald-700 scale-110 shadow-md"
                        : "bg-gray-300 opacity-80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    whileHover={{ scale: 1.18 }}
                    transition={{ duration: 0.12 }}
                  />
                ))}
            </div>
          </div>

          {/* Prev / Play / Next */}
          <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-6 md:mt-20">
            <motion.button
              onClick={onPrev}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -3 }}
              transition={{ duration: D.controlTap }}
              className="bg-white p-1.5 sm:p-2 rounded-lg shadow hover:shadow-md text-sm sm:text-base"
              aria-label="Previous"
            >
              ◀
            </motion.button>

            <motion.button
              onClick={onNext}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -3 }}
              transition={{ duration: D.controlTap }}
              className="bg-white p-1.5 sm:p-2 rounded-lg shadow hover:shadow-md text-sm sm:text-base"
              aria-label="Next"
            >
              ▶
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function HomeU() {
  // consolidated state: index + playback (isPlaying)
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // reveal on scroll (Tailwind classes toggled)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            e.target.classList.remove("opacity-0", "translate-y-6");
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6");
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // hero users counter once visible
  useEffect(() => {
    const el = document.querySelector(".count-users");
    if (!el) return;
    let animated = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            // Counter animation placeholder - would implement actual counter here
            const dur = 1100;
            const step = 40;
            const steps = Math.ceil(dur / step);
            let i = 0;
            const t = setInterval(() => {
              i++;
              // Counter animation placeholder - would update a state variable here
              if (i >= steps) clearInterval(t);
            }, step);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // autoplay using isPlaying
  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % STORY_CARDS.length);
    }, 4200);
    return () => clearInterval(iv);
  }, [isPlaying]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % STORY_CARDS.length);
        setIsPlaying(false);
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + STORY_CARDS.length) % STORY_CARDS.length);
        setIsPlaying(false);
      } else if (e.key === " ") {
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // navigation helpers used by SlideCard
  const onNext = () => {
    setIndex((prev) => (prev + 1) % STORY_CARDS.length);
  };
  const onPrev = () => {
    setIndex((prev) => (prev - 1 + STORY_CARDS.length) % STORY_CARDS.length);
  };
  const jumpTo = (i) => {
    setIndex(i);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen text-gray-800">
      {/* Slider at start - centered */}
      <section className="w-full h-screen relative  overflow-hidden">
        {/* Profile icon fixed to top-right of the viewport */}
        <a
          href="/uprofile"
          aria-label="View your profile"
          className="fixed top-3 right-3 sm:top-5 sm:right-10 z-50 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-amber-950 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:opacity-90"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[18px] sm:h-[18px]"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>

        <AnimatePresence initial={false} mode="wait">
          {STORY_CARDS.map((item, i) =>
            i === index ? (
              <SlideCard
                key={item.id}
                data={item}
                index={index}
                carouselItems={STORY_CARDS}
                onPrev={onPrev}
                onNext={onNext}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            ) : null
          )}
        </AnimatePresence>

        {/* Dots centered bottom */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
          {STORY_CARDS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => jumpTo(i)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                i === index
                  ? "bg-emerald-700 scale-110 shadow-lg"
                  : "bg-gray-300 opacity-80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </section>

      {/* keep rest of UI unchanged */}
      <div className="bg-gradient-to-l from-white to-[#f1eacf]">
        {/* HERO */}
        <header
          className="reveal-on-scroll translate-y-6 transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)] py-8 sm:py-10 md:py-12"
          aria-hidden={true}
        >
          <div className="max-w-8xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row justify-evenly items-center gap-6 sm:gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800">
                AharaSutra
              </div>
              <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-emerald-900">
                Learn how a personalised diet chart improves digestion, energy
                &amp; wellbeing
              </h1>
              <p className="mt-3 sm:mt-4 text-xl text-emerald-800/90">
                Interactive, animated guidance for new users. Swipe or use the
                controls to step through short story cards that explain the diet
                chart, benefits and how to use it.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  className="px-4 sm:px-5 text-xl sm:text-2xl py-3 sm:py-4 md:py-5 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg transform transition hover:-translate-y-1"
                  onClick={() => {
                    setIndex(0);
                    setIsPlaying(true);
                    window.scrollTo({ top: 420, behavior: "smooth" });
                  }}
                >
                  Start the Guide
                </button>

                <Link to="/create-own-chart">
                  <button className="px-3 sm:px-4 text-xl sm:text-2xl py-3 sm:py-4 md:py-5 rounded-xl bg-white shadow-md text-emerald-600 font-semibold w-full sm:w-auto">
                    Create Your Own Chart
                  </button>
                </Link>
                <button
                  className="px-3 sm:px-4 text-xl sm:text-2xl py-3 sm:py-4 md:py-5 cursor-not-allowed rounded-xl bg-white shadow-md text-emerald-600 font-semibold w-full sm:w-auto"
                  onClick={() => window.alert("Create Chart placeholder")}
                >
                  Go to Dietitian
                </button>
              </div>
            </div>

            <div className="w-full sm:w-[400px] md:w-[500px]">
              <div className="rounded-full overflow-visible shadow-2xl">
                <img
                  src={HERO_IMG}
                  alt="hero"
                  className="w-full h-48 sm:h-56 md:h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        {/* INFO STRIP */}
        <div className="reveal-on-scroll bg-gradient-to-b  from-white to-[#f7f6f2] opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)] max-w-7xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6">
          <div className="bg-gradient-to-r from-white to-emerald-50 rounded-xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex text-xl items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg sm:text-xl">
                1
              </div>
              <div>
                <div className="font-semibold text-emerald-900">
                  Easy onboarding
                </div>
                <div className="text-emerald-800/80">
                  Answer a few simple questions and get your first chart in
                  minutes.
                </div>
              </div>
            </div>

            <div className="flex text-xl items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg sm:text-xl">
                2
              </div>
              <div>
                <div className="font-semibold text-emerald-900">
                  Actionable guidance
                </div>
                <div className="text-emerald-800/80">
                  Portions, swaps and simple habits you can implement today.
                </div>
              </div>
            </div>

            <div className="flex text-xl items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-lg sm:text-xl">
                3
              </div>
              <div>
                <div className="font-semibold text-emerald-900">
                  Sustainable results
                </div>
                <div className="text-emerald-800/80">
                  Iterate the plan using energy & digestion feedback.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto text-xl px-4 sm:px-6 mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">
              Personalised Portions
            </h3>
            <p className="mt-2 text-emerald-800">
              Visual portion guidance so you eat the right amounts without
              counting calories.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">Seasonal Wisdom</h3>
            <p className="mt-2 text-emerald-800">
              Simple swaps depending on season and your constitution.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">Herbs & Allies</h3>
            <p className="mt-2 text-emerald-800">
              Recommendations for gentle herb support like Triphala, Turmeric
              and Tulsi.
            </p>
          </div>
        </section>

        {/* FAQ and Testimonials */}
        <section className="max-w-7xl text-xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 sm:gap-6">
          <div>
            <h3 className="text-emerald-900 font-bold mb-3 sm:mb-4">
              Frequently asked
            </h3>
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="mb-2 sm:mb-3 bg-white p-3 sm:p-4 rounded-lg shadow"
                open={i === 0}
              >
                <summary className="font-semibold text-emerald-900 cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-2 text-emerald-800">{f.a}</p>
              </details>
            ))}
          </div>

          <aside>
            <h3 className="text-emerald-900 font-bold mb-3 sm:mb-4">
              What users say
            </h3>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white p-3 sm:p-4 rounded-lg shadow mb-2 sm:mb-3 transform hover:-translate-y-1 transition"
              >
                <div className="font-semibold text-emerald-900">{t.name}</div>
                <div className="text-emerald-800 mt-2">{t.text}</div>
              </div>
            ))}
          </aside>
        </section>

        {/* CTA strip */}
        <section className="max-w-7xl text-xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10 md:mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg gap-3 sm:gap-0">
            <div>
              <div className="font-bold text-emerald-900">
                New user? Start the guided tour
              </div>
              <div className="text-emerald-800 mt-1">
                Learn the essentials of a diet chart in a few quick, animated
                cards.
              </div>
            </div>

            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:-translate-y-1 transition text-xl"
                onClick={() => {
                  setIndex(0);
                  setIsPlaying(true);
                  window.scrollTo({ top: 420, behavior: "smooth" });
                }}
              >
                Start Guide
              </button>
              <button
                className="px-3 sm:px-4 py-2 rounded-xl bg-white shadow text-emerald-600 text-xl"
                onClick={() => window.alert("Create Chart placeholder")}
              >
                Create Chart
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-8xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10 pb-8 sm:pb-12 text-gray-500 text-xl">
          AharaSutra — quick, animated diet guidance. Designed for new users to
          access core information easily.
        </footer>
      </div>
    </div>
  );
}
