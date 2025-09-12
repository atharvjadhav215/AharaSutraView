import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
/*
  Simplified hard-coded personalized Diet Chart
  - Single dosha (Pitta) with a few rasa (tastes)
  - Multiple hard-coded daily plans; user picks which plan is "Today's plan"
  - Full UI is client-side only (no backend / no localStorage)
  - All font sizes use >= text-lg / text-xl
  - Animated and dynamic transitions using framer-motion + simple pie charts
*/

/* single dosha (hard-coded) */
const DOSHA = {
  type: "Pitta",
  color: "#F97316",
  description:
    "Cooling, calming and moderate foods. Avoid excessive heat, spice and sour stimulants.",
  rule: "Avoid hot spices, fried foods and alcohol. Favor cooling herbs & light meals.",
  foods: [
    "Basmati rice",
    "Leafy greens",
    "Coconut water",
    "Sweet fruits",
    "Milk & ghee (moderately)",
    "Coriander, fennel, mint",
  ],
  taste: [
    { name: "Sweet", value: 30, color: "#22C55E" },
    { name: "Bitter", value: 25, color: "#64748B" },
    { name: "Astringent", value: 20, color: "#8B5CF6" },
    { name: "Sour", value: 15, color: "#F97316" },
    { name: "Salty", value: 10, color: "#3B82F6" },
  ],
  plate: [
    { name: "Carbs", value: 30, color: "#F97316" },
    { name: "Veggies", value: 30, color: "#10B981" },
    { name: "Protein", value: 30, color: "#EAB308" },
    { name: "Fruits", value: 10, color: "#EF4444" },
  ],
};

/* multiple hard-coded daily plans (user chooses) */
const PLANS = [
  {
    id: "pitta-easy",
    name: "Cooling & Gentle",
    description:
      "Basmati rice porridge, steamed veg, coconut water and mellow spices.",
    meals: {
      breakfast: [
        {
          name: "Rice Porridge",
          calories: 300,
          items: ["rice", "milk", "ghee"],
        },
      ],
      lunch: [
        {
          name: "Steamed Veg + Rice",
          calories: 550,
          items: ["rice", "mixed veg", "ghee"],
        },
      ],
      snack: [
        {
          name: "Coconut Water + Dates",
          calories: 150,
          items: ["coconut water", "dates"],
        },
      ],
      dinner: [
        {
          name: "Paneer & Greens",
          calories: 400,
          items: ["paneer", "spinach", "mild spices"],
        },
      ],
    },
  },
  {
    id: "pitta-light",
    name: "Light & Cooling",
    description: "Barley salad, cucumber raita and fruit.",
    meals: {
      breakfast: [
        {
          name: "Soaked Oats with Milk",
          calories: 320,
          items: ["oats", "milk", "banana"],
        },
      ],
      lunch: [
        {
          name: "Barley Salad",
          calories: 480,
          items: ["barley", "cucumber", "mint"],
        },
      ],
      snack: [
        {
          name: "Fresh Pear",
          calories: 80,
          items: ["pear"],
        },
      ],
      dinner: [
        {
          name: "Moong Dal & Greens",
          calories: 360,
          items: ["moong dal", "greens"],
        },
      ],
    },
  },
  {
    id: "pitta-rich",
    name: "Nourishing + Iron",
    description: "Increased iron focus: lentils, spinach, dates & nuts.",
    meals: {
      breakfast: [
        {
          name: "Ragi Porridge with Dates",
          calories: 340,
          items: ["ragi", "dates", "milk"],
        },
      ],
      lunch: [
        {
          name: "Spinach Dal + Rice",
          calories: 600,
          items: ["lentils", "spinach", "rice"],
        },
      ],
      snack: [
        {
          name: "Almond-Date Smoothie",
          calories: 220,
          items: ["almonds", "dates", "milk"],
        },
      ],
      dinner: [
        {
          name: "Lentil Stew with Veg",
          calories: 420,
          items: ["toor dal", "veg", "ghee"],
        },
      ],
    },
  },
];

/* small pie chart component */
const Chart = ({ data, innerRadius = 40, outerRadius = 80 }) => (
  <ResponsiveContainer width="100%" height={180}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        isAnimationActive
      >
        {data.map((d, i) => (
          <Cell key={i} fill={d.color} />
        ))}
      </Pie>
      <Tooltip
        wrapperStyle={{ fontSize: 14 }}
        formatter={(v, name) => [`${v}%`, name]}
      />
    </PieChart>
  </ResponsiveContainer>
);

/* DayChart simplified (show plan details + totals) */
const DayChart = ({ plan, expanded, onToggleRecipe }) => {
  const meals = Object.values(plan.meals).flat();
  const totals = useMemo(() => {
    const calories = meals.reduce((s, m) => s + (m.calories || 0), 0);
    const carbs_g = Math.round((calories * 0.5) / 4);
    const protein_g = Math.round((calories * 0.2) / 4);
    const fat_g = Math.round((calories * 0.3) / 9);
    return { calories, carbs_g, protein_g, fat_g };
  }, [plan]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-2xl font-semibold text-emerald-900">
            {plan.name}
          </div>
          <div className="text-lg text-emerald-800/90">{plan.description}</div>
        </div>

        <div className="text-right">
          <div className="text-xl text-emerald-900 font-medium">
            {totals.calories} kcal
          </div>
          <div className="text-lg text-gray-600">Est. energy</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(plan.meals).map(([mealKey, items]) => (
          <motion.div
            key={mealKey}
            layout
            className="bg-[#f6f3e8] rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-lg text-emerald-900 capitalize">
                {mealKey} • {items.reduce((s, i) => s + (i.calories || 0), 0)}{" "}
                kcal
              </div>
              <button
                className="text-lg text-emerald-700"
                onClick={() => onToggleRecipe(mealKey)}
              >
                {expanded === mealKey ? "Hide" : "View"}
              </button>
            </div>

            <div className="space-y-2 text-lg text-gray-800">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-2"
                    style={{ background: "#10B981" }}
                  />
                  <div>
                    <div className="font-medium">
                      {it.name}{" "}
                      <span className="text-base text-gray-500">
                        ({it.items.join(", ")})
                      </span>
                    </div>
                    {expanded === mealKey && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 p-3 bg-white rounded shadow-inner text-lg"
                      >
                        <div className="font-medium text-emerald-900">
                          Recipe
                        </div>
                        <div className="text-lg text-gray-700 mt-1">
                          {it.recept ||
                            "Simple preparation as per Ayurveda: keep it warm, mild spices."}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 text-lg">
          <div className="font-medium text-emerald-900">Carbs (est.)</div>
          <div className="text-xl font-extrabold text-emerald-900">
            {totals.carbs_g} g
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 text-lg">
          <div className="font-medium text-emerald-900">Protein (est.)</div>
          <div className="text-xl font-extrabold text-emerald-900">
            {totals.protein_g} g
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 text-lg">
          <div className="font-medium text-emerald-900">Fat (est.)</div>
          <div className="text-xl font-extrabold text-emerald-900">
            {totals.fat_g} g
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MyDietChart() {
  const [selectedTaste, setSelectedTaste] = useState(DOSHA.taste[0].name);
  const [selectedPlanId, setSelectedPlanId] = useState(PLANS[0].id);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [todayPlanId, setTodayPlanId] = useState(null);

  useEffect(() => {
    // small entrance animation placeholder if needed
  }, []);

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlanId) || PLANS[0],
    [selectedPlanId]
  );

  const setToday = (id) => setTodayPlanId(id === todayPlanId ? null : id);

  return (
    <div className="min-h-screen bg-gradient-to-l from-white to-[#f6f3e8] p-2 sm:p-4 md:p-6">
      <Link to="/uhome">
        <button className="px-3 sm:px-4 py-2 sm:py-3 mt-20 mb-4 sm:mt-4 md:mt-5 ml-2 sm:ml-3 md:ml-5 rounded-full bg-white border text-emerald-700 text-xl disabled:opacity-50 hover:shadow-md transition-shadow">
          ← Back to Home
        </button>
      </Link>
      <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-900">
            Personalized Pitta Diet
          </h1>
          <p className="text-xl text-emerald-800/90 mt-2">
            Dosha : Pitta with selectable rasas. Pick a plan and mark it as
            today's plan.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white rounded-xl p-3 sm:p-4 shadow"
          >
            <div className="text-xl font-semibold text-emerald-900 mb-3">
              Dosha • {DOSHA.type}
            </div>

            <div className="text-xl text-emerald-900 font-medium mb-2">
              Rule
            </div>
            <div className="text-xl text-gray-700 mb-3">{DOSHA.rule}</div>

            <div className="text-xl font-medium text-emerald-900 mb-2">
              Recommended Foods
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xl text-gray-800">
              {DOSHA.foods.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="mt-4">
              <div className="text-xl font-medium text-emerald-900 mb-2">
                Rasa (tastes)
              </div>
              <div className="flex flex-wrap gap-2">
                {DOSHA.taste.map((t) => (
                  <motion.button
                    key={t.name}
                    onClick={() => setSelectedTaste(t.name)}
                    whileHover={{ scale: 1.03 }}
                    className={`text-xl px-3 py-2 rounded ${
                      selectedTaste === t.name
                        ? "bg-emerald-600 text-white"
                        : "bg-white border text-emerald-900"
                    } shadow`}
                  >
                    {t.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xl font-medium text-emerald-900 mb-2">
                Taste Palette
              </div>
              <div className="bg-[#f6f3e8] rounded-lg p-3">
                <Chart data={DOSHA.taste} innerRadius={30} outerRadius={60} />
              </div>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold text-emerald-900">
                    Available Plans
                  </div>
                  <div className="text-lg text-emerald-800/90 mt-1">
                    Choose a plan to preview. Mark one as today's plan below.
                  </div>
                </div>

                <div className="text-lg">
                  <div className="text-lg font-medium">Selected taste:</div>
                  <div className="text-xl font-semibold text-emerald-900">
                    {selectedTaste}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <AnimatePresence>
                  {PLANS.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`p-3 rounded-lg ${
                        p.id === selectedPlanId
                          ? "ring-2 ring-emerald-200 bg-[#f6f3e8]"
                          : "bg-white"
                      } shadow`}
                    >
                      <div className="font-medium text-lg text-emerald-900">
                        {p.name}
                      </div>
                      <div className="text-lg text-gray-700 mt-1">
                        {p.description}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPlanId(p.id)}
                          className="px-3 py-2 rounded bg-white text-emerald-700 border text-lg"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => setToday(p.id)}
                          className={`px-3 py-2 rounded text-lg ${
                            todayPlanId === p.id
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-emerald-600 border"
                          }`}
                        >
                          {todayPlanId === p.id
                            ? "Today's Plan"
                            : "Set as Today"}
                        </button>
                      </div>

                      <div className="mt-3 text-lg text-gray-600">
                        Estimated calories:{" "}
                        {Object.values(p.meals)
                          .flat()
                          .reduce((s, m) => s + (m.calories || 0), 0)}{" "}
                        kcal
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlanId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <DayChart
                  plan={selectedPlan}
                  expanded={expandedMeal}
                  onToggleRecipe={(mealKey) =>
                    setExpandedMeal((s) => (s === mealKey ? null : mealKey))
                  }
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-emerald-900">
                    Today's Plan
                  </div>
                  <div className="text-lg text-emerald-800/90 mt-1">
                    Which plan is set for today
                  </div>
                </div>

                <div className="text-lg">
                  {todayPlanId ? (
                    <div className="text-xl font-semibold text-emerald-900">
                      {PLANS.find((x) => x.id === todayPlanId)?.name}
                    </div>
                  ) : (
                    <div className="text-lg text-gray-600">
                      No plan selected for today
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {PLANS.map((p) => (
                    <motion.div
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg ${
                        todayPlanId === p.id
                          ? "bg-emerald-50 ring-2 ring-emerald-200"
                          : "bg-white"
                      } shadow`}
                    >
                      <div className="font-medium text-lg text-emerald-900">
                        {p.name}
                      </div>
                      <div className="text-lg text-gray-700 mt-1">
                        {p.description}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setToday(p.id)}
                          className={`px-3 py-2 rounded text-lg ${
                            todayPlanId === p.id
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-emerald-600 border"
                          }`}
                        >
                          {todayPlanId === p.id
                            ? "Selected"
                            : "Select for Today"}
                        </button>
                        <button
                          onClick={() => alert("Share placeholder")}
                          className="px-3 py-2 rounded bg-white border text-emerald-600 text-lg"
                        >
                          Share
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg text-gray-600"
        >
          Note: This page is fully hard-coded for demo. For clinical precision,
          connect to a nutrient database or upload recipe macros.
        </motion.footer>
      </div>
    </div>
  );
}
