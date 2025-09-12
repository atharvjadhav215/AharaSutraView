import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HERO_IMG =
  "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/product1.png";

const STORY_CARDS = [
  {
    id: "chart",
    title: "What is a Diet Chart?",
    subtitle: "A structured clinical nutrition plan",
    bullets: [
      "Daily meal framework based on patient’s age, condition, and goals",
      "Guidelines for portion sizes, meal timings, and nutrient distribution",
      "Can integrate medical nutrition therapy and lifestyle recommendations",
    ],
    img: HERO_IMG,
    accent: "#10B981",
  },
  {
    id: "importance",
    title: "Why it matters",
    subtitle: "Diet charts as a clinical tool",
    bullets: [
      "Helps standardize recommendations for consistency and compliance",
      "Prevents under/over-nutrition and supports therapeutic outcomes",
      "Facilitates patient education and long-term health monitoring",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/pngwing.com.png",
    accent: "#F59E0B",
  },
  {
    id: "benefits",
    title: "Benefits for your practice",
    subtitle: "Enhance patient care with structured plans",
    bullets: [
      "Easier to track patient progress and adherence",
      "Supports evidence-based recommendations",
      "Improves patient satisfaction and long-term outcomes",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/dog-with-girl.png",
    accent: "#6366F1",
  },
  {
    id: "howto",
    title: "How to create and use",
    subtitle: "Practical steps for dietitians",
    bullets: [
      "Collect patient details: medical history, preferences, activity",
      "Design individualized plans with options and adjustments",
      "Monitor progress over 2–4 weeks and refine accordingly",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/blog_img4.png",
    accent: "#06B6D4",
  },
  {
    id: "next",
    title: "Next steps",
    subtitle: "Integrate diet charts into your workflow",
    bullets: [
      "Use charts for consultations, follow-ups, and patient education",
      "Export and share with patients or interdisciplinary teams",
      "Leverage data for case studies and evidence-based practice",
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
      {/* Card container */}
      <motion.div
        key={data.id}
        initial={{ opacity: 1, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 1, y: -30, scale: 0.98 }}
        transition={{ duration: D.enter, ease: "easeInOut" }}
        className="w-full max-w-[1600px] bg-white/90 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center h-[72vh] md:h-[78vh]"
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
            className=" shadow-2xl rounded-full shadow-black h-[60vh] w-[60vh] object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: D.imgScale }}
          />
        </motion.div>

        {/* Text area */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: D.textDelay, duration: D.textDur }}
          >
            {data.title}
          </motion.h2>
          <motion.p
            className="text-emerald-800 text-xl mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: D.textDelay + 0.12, duration: D.textDur }}
          >
            {data.subtitle}
          </motion.p>

          <div className="space-y-3 mb-4">
            {data.bullets.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: D.textDelay + 0.25 + i * D.bulletStagger,
                  duration: 0.45,
                }}
              >
                <span
                  className="w-3 h-3 rounded-full mt-1"
                  style={{ background: data.accent }}
                />
                <p className="text-xl text-emerald-900">{b}</p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {Array.isArray(carouselItems) &&
                carouselItems.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setIsPlaying && setIsPlaying(false);
                      // parent controls index; this only pauses playback
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition ${
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
          <div className="flex gap-2 mt-20">
            <motion.button
              onClick={onPrev}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -3 }}
              transition={{ duration: D.controlTap }}
              className="bg-white p-2 rounded-lg shadow hover:shadow-md"
              aria-label="Previous"
            >
              ◀
            </motion.button>

            <motion.button
              onClick={() => setIsPlaying && setIsPlaying(!isPlaying)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -3 }}
              transition={{ duration: D.controlTap }}
              className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md font-semibold"
              aria-label="Play Pause"
            >
              {isPlaying ? "Pause" : "Play"}
            </motion.button>

            <motion.button
              onClick={onNext}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -3 }}
              transition={{ duration: D.controlTap }}
              className="bg-white p-2 rounded-lg shadow hover:shadow-md"
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

export default function HomeD() {
  // consolidated state: index + direction + playback (isPlaying)
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(1200);

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
            let start = 1000;
            const goal = 5200;
            const dur = 1100;
            const step = 40;
            const steps = Math.ceil(dur / step);
            let i = 0;
            const t = setInterval(() => {
              i++;
              const val = Math.round(start + ((goal - start) * i) / steps);
              setUsersCount(val);
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
      setDirection("next");
      setIndex((i) => (i + 1) % STORY_CARDS.length);
    }, 4200);
    return () => clearInterval(iv);
  }, [isPlaying]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setDirection("next");
        setIndex((i) => (i + 1) % STORY_CARDS.length);
        setIsPlaying(false);
      } else if (e.key === "ArrowLeft") {
        setDirection("prev");
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
    setDirection("next");
    setIndex((prev) => (prev + 1) % STORY_CARDS.length);
  };
  const onPrev = () => {
    setDirection("prev");
    setIndex((prev) => (prev - 1 + STORY_CARDS.length) % STORY_CARDS.length);
  };
  const jumpTo = (i) => {
    setDirection(i > index ? "next" : "prev");
    setIndex(i);
    setIsPlaying(false);
  };

  const current = STORY_CARDS[index];

  return (
    <div className="min-h-screen text-gray-800">
      {/* Slider at start - centered */}
      <section className="w-full h-screen relative overflow-hidden">
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          <div className="mt-4 sm:mt-0 flex gap-3 w-[500px]">
            <button
              className="px-4 py-4 w-full rounded-xl bg-emerald-600 text-white shadow hover:-translate-y-1 transition"
              onClick={() => navigate("/add-patient")}
            >
              Add Patient
            </button>
            <button
              className="px-4 py-2 w-full rounded-xl bg-white shadow text-emerald-600 shadow hover:-translate-y-1 transition"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* keep rest of UI unchanged */}
      <div className="bg-gradient-to-l from-white to-[#f1eacf]">
        {/* HERO */}
        <header
          className="reveal-on-scroll translate-y-6 transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)] py-12"
          aria-hidden={true}
        >
          <div className="max-w-8xl mx-auto px-6 flex flex-col lg:flex-row justify-evenly items-center gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="text-2xl font-extrabold text-emerald-800">
                AharaSutra — Dietitian
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-emerald-900">
                Tools for dietitians — plan, review and manage personalised
                charts
              </h1>
              <p className="mt-4 text-xl text-emerald-800/90">
                Fast access to add a patient, review dashboards, personalise
                meal plans and share recommendations.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition"
                  onClick={() => navigate("/add-patient")}
                >
                  Add Patient
                </button>

                <button
                  className="px-5 py-3 rounded-xl bg-white shadow-md text-emerald-600 font-semibold"
                  onClick={() => navigate("/dashboard")}
                >
                  View your dashboard
                </button>
              </div>

              {/* quick dietitian tools / stats */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow text-center">
                  <div className="text-sm text-emerald-900 font-semibold">
                    Patients
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900 count-users">
                    {usersCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">connected</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow text-center">
                  <div className="text-sm text-emerald-900 font-semibold">
                    Active Plans
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900">
                    24
                  </div>
                  <div className="text-xs text-gray-600">
                    editable templates
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow text-center">
                  <div className="text-sm text-emerald-900 font-semibold">
                    Resources
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900">
                    Recipes
                  </div>
                  <div className="text-xs text-gray-600">
                    curated & evidence-based
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-[500px]">
              <div className="rounded-full overflow-visible shadow-2xl">
                <img
                  src={HERO_IMG}
                  alt="hero"
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        {/* INFO STRIP */}
        <div className="reveal-on-scroll bg-gradient-to-b  from-white to-[#f7f6f2] opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)] max-w-7xl mx-auto mt-8 px-6">
          <div className="bg-gradient-to-r from-white to-emerald-50 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row gap-4">
            <div className="flex text-xl items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
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

            <div className="flex text-xl  items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
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

            <div className="flex  text-xl items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
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
        <section className="max-w-7xl mx-auto text-xl px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white  rounded-xl p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">
              Personalised Portions
            </h3>
            <p className="mt-2 text-emerald-800">
              Visual portion guidance so you eat the right amounts without
              counting calories.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">Seasonal Wisdom</h3>
            <p className="mt-2 text-emerald-800">
              Simple swaps depending on season and your constitution.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 transition">
            <h3 className="font-bold text-emerald-900">Herbs & Allies</h3>
            <p className="mt-2 text-emerald-800">
              Recommendations for gentle herb support like Triphala, Turmeric
              and Tulsi.
            </p>
          </div>
        </section>

        {/* FAQ and Testimonials */}
        <section className="max-w-7xl text-xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div>
            <h3 className="text-emerald-900 font-bold mb-4">
              Frequently asked
            </h3>
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="mb-3 bg-white p-4 rounded-lg shadow"
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
            <h3 className="text-emerald-900 font-bold mb-4">What users say</h3>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow mb-3 transform hover:-translate-y-1 transition"
              >
                <div className="font-semibold text-emerald-900">{t.name}</div>
                <div className="text-emerald-800 mt-2">{t.text}</div>
              </div>
            ))}
          </aside>
        </section>

        {/* CTA strip */}
        <section className="max-w-7xl text-xl mx-auto px-6 mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg">
            <div>
              <div className="font-bold text-emerald-900">Dietitian tools</div>
              <div className="text-emerald-800 mt-1">
                Manage patients, create templates, review analytics and share
                recommendations.
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-3">
              <button
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:-translate-y-1 transition"
                onClick={() => navigate("/add-patient")}
              >
                Add Patient
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-white shadow text-emerald-600"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-8xl mx-auto px-6 mt-10 pb-12 text-gray-500">
          AharaSutra — quick, animated diet guidance. Designed for new users to
          access core information easily.
        </footer>
      </div>
    </div>
  );
}
