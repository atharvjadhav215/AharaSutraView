import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
/*
  CreateOwnChart.jsx — full-screen "story" quiz
  - full-screen panels, dynamic animated background layers per step
  - larger typography (>= text-lg), attractive UI and transitions
  - no backend, client-only, navigates to /my-diet-chart with generated plan
*/

const PLANS = [
  {
    id: "cooling-pitta",
    name: "Cooling Pitta Plan",
    description: "Cooling, light meals — basmati, coconut water, mild spices.",
    meals: {
      breakfast: [{ name: "Rice Porridge", calories: 300 }],
      lunch: [{ name: "Steamed Veg + Rice", calories: 520 }],
      snack: [{ name: "Coconut Water + Dates", calories: 140 }],
      dinner: [{ name: "Paneer & Greens", calories: 400 }],
    },
  },
  {
    id: "iron-rich",
    name: "Iron-Focused Plan",
    description:
      "Lentils, greens and energy-dense snacks to support iron needs.",
    meals: {
      breakfast: [{ name: "Ragi Porridge with Dates", calories: 340 }],
      lunch: [{ name: "Spinach Dal + Rice", calories: 600 }],
      snack: [{ name: "Almond-Date Smoothie", calories: 220 }],
      dinner: [{ name: "Lentil Stew with Veg", calories: 420 }],
    },
  },
  {
    id: "balanced-active",
    name: "Balanced Active Plan",
    description:
      "Higher protein and balanced carbs for active users / muscle goals.",
    meals: {
      breakfast: [{ name: "Oats + Milk + Banana", calories: 360 }],
      lunch: [{ name: "Quinoa Salad + Chicken/Paneer", calories: 600 }],
      snack: [{ name: "Greek Yogurt + Nuts", calories: 200 }],
      dinner: [{ name: "Grilled Veg + Protein", calories: 420 }],
    },
  },
  {
    id: "light-digestive",
    name: "Light Digestive Plan",
    description: "Easy-to-digest, warm meals for sensitive digestion.",
    meals: {
      breakfast: [{ name: "Rice Porridge with Ghee", calories: 320 }],
      lunch: [{ name: "Kitchari / Moong Dal Stew", calories: 480 }],
      snack: [{ name: "Warm Apple", calories: 110 }],
      dinner: [{ name: "Light Kitchari", calories: 380 }],
    },
  },
];

const STEPS = [
  {
    id: 0,
    title: "Hello 👋",
    subtitle: "Let's create a diet chart — quick & friendly",
    kind: "intro",
  },
  {
    id: 1,
    title: "Tell us about you",
    subtitle: "Name, age and gender",
    kind: "basic",
  },
  {
    id: 2,
    title: "Your body",
    subtitle: "Height & weight (used for BMI)",
    kind: "anthro",
  },
  {
    id: 3,
    title: "Goal",
    subtitle: "What's your primary goal?",
    kind: "goals",
  },
  {
    id: 4,
    title: "Habits",
    subtitle: "Dietary preference & activity",
    kind: "lifestyle",
  },
  {
    id: 5,
    title: "Food likes / dislikes",
    subtitle: "Allergies and aversions",
    kind: "prefs",
  },
  {
    id: 6,
    title: "Review",
    subtitle: "Pick or tweak your plan",
    kind: "review",
  },
];

const BG_LAYERS = [
  {
    id: 0,
    gradient:
      "radial-gradient( circle at 10% 20%, rgba(99,102,241,0.14), transparent 20% ), linear-gradient(45deg,#ECFCCB,#F0FDF4)",
  },
  {
    id: 1,
    gradient:
      "radial-gradient( circle at 80% 10%, rgba(20,184,166,0.12), transparent 18% ), linear-gradient(135deg,#FEF3C7,#FFEDD5)",
  },
  {
    id: 2,
    gradient:
      "radial-gradient( circle at 30% 80%, rgba(59,130,246,0.10), transparent 18% ), linear-gradient(90deg,#F0FFF4,#ECFEFF)",
  },
  {
    id: 3,
    gradient:
      "radial-gradient( circle at 60% 40%, rgba(249,168,212,0.10), transparent 18% ), linear-gradient(120deg,#FFF7ED,#FFF1F2)",
  },
  {
    id: 4,
    gradient:
      "radial-gradient( circle at 40% 30%, rgba(16,185,129,0.08), transparent 18% ), linear-gradient(60deg,#ECFEFF,#F3F4F6)",
  },
  {
    id: 5,
    gradient:
      "radial-gradient( circle at 20% 80%, rgba(14,165,233,0.08), transparent 18% ), linear-gradient(45deg,#FFF7ED,#FFFBEB)",
  },
  {
    id: 6,
    gradient:
      "radial-gradient( circle at 50% 50%, rgba(99,102,241,0.10), transparent 18% ), linear-gradient(90deg,#EFF6FF,#F0FDF4)",
  },
];

const pageVariants = {
  enter: { opacity: 0, y: 40 },
  center: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 30 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.18 } },
};

export default function CreateOwnChart() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    basic: { name: "", age: "", gender: "" },
    anthro: { height: "", weight: "" },
    goals: { goal: "", note: "" },
    lifestyle: {
      dietaryHabits: "omnivore",
      cuisinePreference: "Indian",
      activity: "moderate",
    },
    intolerances: { allergies: "", dislikes: [] },
  });
  const [selectedPlanId, setSelectedPlanId] = useState(PLANS[0].id);
  const containerRef = useRef(null);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, answers]);

  const update = (section, field, value) =>
    setAnswers((s) => ({ ...s, [section]: { ...s[section], [field]: value } }));
  const toggleDislike = (food) =>
    setAnswers((s) => {
      const arr = s.intolerances.dislikes || [];
      return {
        ...s,
        intolerances: {
          ...s.intolerances,
          dislikes: arr.includes(food)
            ? arr.filter((x) => x !== food)
            : [...arr, food],
        },
      };
    });

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  // generator heuristic
  const generatedPlan = useMemo(() => {
    const { goals, lifestyle, anthro } = answers;
    const goal = (goals.goal || "").toLowerCase();
    const diet = (lifestyle.dietaryHabits || "").toLowerCase();
    const act = (lifestyle.activity || "").toLowerCase();
    if (goal.includes("iron") || goal.includes("anemia"))
      return PLANS.find((p) => p.id === "iron-rich");
    if (diet.includes("vegan") || diet.includes("vegetarian"))
      return PLANS.find((p) => p.id === "light-digestive");
    if (
      act.includes("active") ||
      goal.includes("muscle") ||
      goal.includes("gain")
    )
      return PLANS.find((p) => p.id === "balanced-active");
    const h = parseFloat(String(anthro.height).replace(/[^\d.]/g, ""));
    const w = parseFloat(String(anthro.weight).replace(/[^\d.]/g, ""));
    if (h > 0 && w > 0) {
      const bmi = w / ((h / 100) * (h / 100));
      if (bmi < 20) return PLANS.find((p) => p.id === "balanced-active");
      if (bmi > 27) return PLANS.find((p) => p.id === "light-digestive");
    }
    return PLANS[0];
  }, [answers]);

  useEffect(
    () => setSelectedPlanId(generatedPlan?.id || PLANS[0].id),
    [generatedPlan]
  );

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const finish = () => {
    const plan = PLANS.find((p) => p.id === selectedPlanId) || generatedPlan;
    navigate("/my-diet-chart", {
      state: { generated: plan, fromQuiz: true, answers },
    });
  };

  const quickFoods = [
    "Milk",
    "Eggs",
    "Spinach",
    "Shellfish",
    "Nuts",
    "Gluten",
    "Dairy",
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* dynamic background layers */}
      <div className="absolute inset-0 -z-10">
        {BG_LAYERS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === step ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundImage: b.gradient }}
            className="absolute inset-0"
          />
        ))}

        {/* subtle floating blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 80,
            ease: "linear",
          }}
          className="absolute -left-40 -top-40 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-emerald-200 to-emerald-50 opacity-30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 100,
            ease: "linear",
          }}
          className="absolute -right-32 bottom-[-60px] w-[360px] h-[360px] rounded-full bg-gradient-to-bl from-pink-200 to-yellow-100 opacity-25 blur-3xl pointer-events-none"
        />
      </div>
      <Link to ="/uhome">
        <button className="px-4 py-3 mt-5 ml-5 rounded-full bg-white border text-emerald-700 text-lg disabled:opacity-50">
          ← Back to Home
        </button>
      </Link>

      {/* container changed to top-aligned scrollable column so header is visible */}
      <div
        ref={containerRef}
        className="h-full flex flex-col items-center justify-start p-6 overflow-auto"
      >
        <div className="w-full max-w-7xl">
          {/* header made sticky + reduced vertical offset so it stays visible */}
          <div className="flex items-center bg-white p-5  rounded-2xl text-emerald-800 justify-between mb-6 sticky  z-20 shadow">
            <div>
              <div className="text-lg font-medium">Create your plan</div>
              <div className="text-xl font-bold">
                Friendly questions, instant plan
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg mr-4">
                Step {step + 1} / {STEPS.length}
              </div>
              <div className="w-48 hidden md:block">
                <div className="bg-white/20 h-2 rounded overflow-hidden">
                  <motion.div
                    className="bg-white h-2 rounded"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 220 }}
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(0)}
                className="px-3 py-2 rounded bg-white/20 text-lg hidden sm:inline"
              >
                Restart
              </button>
            </div>
          </div>

          <div className="relative mt-4">
            <AnimatePresence mode="wait">
              <motion.section
                key={step}
                initial="enter"
                animate="center"
                exit="exit"
                variants={pageVariants}
                className="min-h-[68vh] bg-white/90 rounded-3xl p-8 md:p-12 shadow-2xl"
                transition={{ layout: { duration: 0.32 } }}
              >
                {/* header / illustration */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900">
                      {STEPS[step].title}
                    </h2>
                    <p className="text-lg text-gray-700 mt-2 max-w-xl">
                      {STEPS[step].subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg text-gray-600">Quick tip</div>
                      <div className="text-xl font-semibold text-emerald-800">
                        Keep answers short — it's fast
                      </div>
                    </div>
                    <div className="hidden md:block w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-emerald-200 to-emerald-50 flex items-center justify-center text-3xl font-bold text-emerald-800">
                      🍽️
                    </div>
                  </div>
                </div>

                {/* content per step */}
                <div className="min-h-[320px] ">
                  {step === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="text-lg text-gray-700">
                        Welcome — in a few screens we'll recommend a plan
                        tailored to your goal and habits. Click continue to
                        begin the story.
                      </div>
                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() =>
                            setStep((s) => Math.min(STEPS.length - 1, s + 1))
                          }
                          className="px-6 py-3 rounded-full bg-emerald-600 text-white text-lg shadow-lg"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => {
                            setAnswers({
                              basic: { name: "", age: "", gender: "" },
                              anthro: { height: "", weight: "" },
                              goals: { goal: "", note: "" },
                              lifestyle: {
                                dietaryHabits: "omnivore",
                                cuisinePreference: "Indian",
                                activity: "moderate",
                              },
                              intolerances: { allergies: "", dislikes: [] },
                            });
                            setStep(1);
                          }}
                          className="px-6 py-3 rounded-full bg-white border text-emerald-700 text-lg"
                        >
                          Quick start
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div>
                        <label className="block text-lg text-gray-700">
                          Full Name
                        </label>
                        <input
                          value={answers.basic.name}
                          onChange={(e) =>
                            update("basic", "name", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-lg text-gray-700">
                          Age
                        </label>
                        <input
                          value={answers.basic.age}
                          onChange={(e) =>
                            update("basic", "age", e.target.value)
                          }
                          type="number"
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="Years"
                        />
                      </div>
                      <div>
                        <label className="block text-lg text-gray-700">
                          Gender
                        </label>
                        <select
                          value={answers.basic.gender}
                          onChange={(e) =>
                            update("basic", "gender", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                        >
                          <option value="">Select</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-lg text-gray-700">
                          Height (cm)
                        </label>
                        <input
                          value={answers.anthro.height}
                          onChange={(e) =>
                            update("anthro", "height", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="e.g. 165"
                        />
                      </div>
                      <div>
                        <label className="block text-lg text-gray-700">
                          Weight (kg)
                        </label>
                        <input
                          value={answers.anthro.weight}
                          onChange={(e) =>
                            update("anthro", "weight", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="e.g. 60"
                        />
                      </div>
                      <div className="md:col-span-2 text-lg text-gray-600 mt-3">
                        Tip: BMI will be used to tailor calorie suggestions in
                        the plan.
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="space-y-4"
                    >
                      <label className="block text-lg text-gray-700">
                        Primary Goal
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          "Maintain weight",
                          "Lose weight",
                          "Gain muscle",
                          "Increase iron",
                          "Improve digestion",
                        ].map((g) => (
                          <button
                            key={g}
                            onClick={() => update("goals", "goal", g)}
                            className={`p-4 rounded-lg text-lg ${
                              answers.goals.goal === g
                                ? "bg-emerald-600 text-white"
                                : "bg-white border text-emerald-900"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-lg text-gray-700">
                          Note (optional)
                        </label>
                        <input
                          value={answers.goals.note}
                          onChange={(e) =>
                            update("goals", "note", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="e.g., vegetarian, prefer warm breakfasts"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-lg text-gray-700">
                          Dietary Habit
                        </label>
                        <select
                          value={answers.lifestyle.dietaryHabits}
                          onChange={(e) =>
                            update("lifestyle", "dietaryHabits", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                        >
                          <option value="omnivore">Omnivore</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="pescatarian">Pescatarian</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg text-gray-700">
                          Activity Level
                        </label>
                        <select
                          value={answers.lifestyle.activity}
                          onChange={(e) =>
                            update("lifestyle", "activity", e.target.value)
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="light">Light</option>
                          <option value="moderate">Moderate</option>
                          <option value="active">Active</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-lg text-gray-700">
                          Cuisine preference
                        </label>
                        <input
                          value={answers.lifestyle.cuisinePreference}
                          onChange={(e) =>
                            update(
                              "lifestyle",
                              "cuisinePreference",
                              e.target.value
                            )
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="e.g., Indian, Mediterranean"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-lg text-gray-700">
                          Allergies / Intolerances
                        </label>
                        <input
                          value={answers.intolerances.allergies}
                          onChange={(e) =>
                            setAnswers((s) => ({
                              ...s,
                              intolerances: {
                                ...s.intolerances,
                                allergies: e.target.value,
                              },
                            }))
                          }
                          className="mt-1 p-4 border rounded-lg text-lg w-full"
                          placeholder="e.g., nuts, shellfish"
                        />
                      </div>

                      <div>
                        <label className="block text-lg text-gray-700">
                          Foods you dislike
                        </label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {quickFoods.map((f) => (
                            <button
                              key={f}
                              onClick={() => toggleDislike(f)}
                              className={`px-4 py-2 rounded-lg text-lg ${
                                answers.intolerances.dislikes.includes(f)
                                  ? "bg-emerald-600 text-white"
                                  : "bg-white border text-emerald-900"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-4"
                    >
                      {/* fixed header part (always visible) */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-medium text-emerald-900">
                            Suggested Plan
                          </div>
                          <div className="text-xl font-semibold text-emerald-900 mt-1">
                            {generatedPlan.name}
                          </div>
                          <div className="text-lg text-gray-700 mt-1">
                            {generatedPlan.description}
                          </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-2">
                          <div className="text-sm text-gray-600">
                            Estimated total
                          </div>
                          <div className="text-lg font-semibold text-emerald-800">
                            {Object.values(
                              (
                                PLANS.find((x) => x.id === selectedPlanId) ||
                                generatedPlan
                              ).meals
                            )
                              .flat()
                              .reduce((s, m) => s + (m.calories || 0), 0)}{" "}
                            kcal
                          </div>
                        </div>
                      </div>

                      {/* scrollable content area */}
                      <div className="max-h-[44vh] md:max-h-[52vh] overflow-auto pr-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {PLANS.map((p) => (
                            <div
                              key={p.id}
                              className={`p-4 rounded-lg text-lg ${
                                p.id === selectedPlanId
                                  ? "ring-2 ring-emerald-200 bg-[#f6f3e8]"
                                  : "bg-white"
                              } shadow`}
                            >
                              <div className="font-medium text-emerald-900">
                                {p.name}
                              </div>
                              <div className="text-gray-700 mt-1">
                                {p.description}
                              </div>
                              <div className="mt-3 flex gap-2">
                                <button
                                  onClick={() => setSelectedPlanId(p.id)}
                                  className="px-3 py-2 rounded bg-emerald-600 text-white text-lg"
                                >
                                  Choose
                                </button>
                                <button
                                  onClick={() => setSelectedPlanId(p.id)}
                                  className="px-3 py-2 rounded bg-white border text-emerald-700 text-lg"
                                >
                                  Preview
                                </button>
                              </div>
                              <div className="text-gray-600 mt-2 text-lg">
                                Est kcal:{" "}
                                {Object.values(p.meals)
                                  .flat()
                                  .reduce(
                                    (s, m) => s + (m.calories || 0),
                                    0
                                  )}{" "}
                                kcal
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2 bg-white p-4 rounded-lg border">
                          <div className="font-medium text-emerald-900">
                            Selected plan preview
                          </div>
                          <div className="mt-2 text-lg text-gray-700 space-y-3">
                            {(
                              PLANS.find((x) => x.id === selectedPlanId) ||
                              generatedPlan
                            ).meals &&
                              Object.entries(
                                (
                                  PLANS.find((x) => x.id === selectedPlanId) ||
                                  generatedPlan
                                ).meals
                              ).map(([k, items]) => (
                                <div key={k}>
                                  <div className="font-medium text-emerald-900 capitalize">
                                    {k} •{" "}
                                    {items.reduce(
                                      (s, i) => s + (i.calories || 0),
                                      0
                                    )}{" "}
                                    kcal
                                  </div>
                                  <div className="text-lg text-gray-700 mt-1">
                                    {items.map((it) => it.name).join(", ")}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* optional footer controls inside scroll area (keeps everything reachable on small screens) */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setSelectedPlanId((s) => s)}
                            className="px-4 py-2 rounded bg-emerald-600 text-white text-lg"
                          >
                            Confirm Selection
                          </button>
                          <button
                            onClick={() => setStep((s) => Math.max(0, s - 1))}
                            className="px-4 py-2 rounded bg-white border text-emerald-700 text-lg"
                          >
                            Review answers
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* footer actions */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-lg text-gray-600">
                    Privacy: quiz runs locally only.
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prev}
                      disabled={step === 0}
                      className="px-4 py-3 rounded-full bg-white border text-emerald-700 text-lg disabled:opacity-50"
                    >
                      ← Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={next}
                        className="px-6 py-3 rounded-full bg-emerald-600 text-white text-lg shadow-lg"
                      >
                        Continue →
                      </button>
                    ) : (
                      <button
                        onClick={finish}
                        className="px-6 py-3 rounded-full bg-emerald-800 text-white text-lg shadow-lg"
                      >
                        Use this plan
                      </button>
                    )}
                  </div>
                </div>
              </motion.section>
            </AnimatePresence>
          </div>

          {/* bottom progress / dots */}
          <div className="mt-6 flex items-center justify-center gap-3 mb-10">
            {STEPS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setStep(i)}
                whileHover={{ scale: 1.08 }}
                className={`w-3 h-3 rounded-full ${
                  i === step ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
