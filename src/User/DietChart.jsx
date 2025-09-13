import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { getTranslation } from "./dietChartTranslations";
import LanguageSelector from "./LanguageSelector";
const DOSHAS = [
  {
    type: "Vata",
    color: "#06B6D4",
    gradientFrom: "from-sky-100",
    gradientTo: "to-[#f6f3e8]",
    description:
      "Grounding, moist and warming foods. Prefer cooked, nourishing and easy-to-digest meals.",
    plate: [
      { name: "Carbs", value: 50, color: "#4F46E5" },
      { name: "Veggies", value: 20, color: "#10B981" },
      { name: "Protein", value: 20, color: "#F59E0B" },
      { name: "Fruits", value: 10, color: "#EF4444" },
    ],

    taste: [
      { name: "Sweet", value: 30, color: "#22C55E" },
      { name: "Sour", value: 20, color: "#F97316" },
      { name: "Salty", value: 20, color: "#3B82F6" },
      { name: "Astringent", value: 15, color: "#8B5CF6" },
      { name: "Bitter", value: 15, color: "#64748B" },
    ],
    rule: "Avoid cold, raw, light or hard-to-digest foods. Favor warm, moist and grounding preparations.",
    foods: [
      "Warm milk, ghee, butter",
      "Cooked grains: rice, oats, wheat",
      "Soups, stews, root vegetables (carrots, beets, sweet potato)",
      "Mung dal, lentils (well-cooked)",
      "Ripe bananas, mangoes, cooked apples",
      "Spices: ginger, cinnamon, cardamom",
    ],
  },
  {
    type: "Pitta",
    color: "#F97316",
    gradientFrom: "from-orange-50",
    gradientTo: "to-rose-50",
    description:
      "Cooling, calming and moderate foods. Avoid excessive heat, spice and sour stimulants.",
    plate: [
      { name: "Carbs", value: 30, color: "#F97316" },
      { name: "Veggies", value: 30, color: "#10B981" },
      { name: "Protein", value: 30, color: "#EAB308" },
      { name: "Fruits", value: 10, color: "#EF4444" },
    ],
    taste: [
      { name: "Sweet", value: 30, color: "#22C55E" },
      { name: "Bitter", value: 30, color: "#64748B" },
      { name: "Astringent", value: 20, color: "#8B5CF6" },
      { name: "Sour", value: 10, color: "#F97316" },
      { name: "Salty", value: 10, color: "#3B82F6" },
    ],
    rule: "Avoid hot spices, fried foods, alcohol, excessive sour or salty items. Favor cooling herbs & foods.",
    foods: [
      "Basmati rice, barley, oats",
      "Leafy greens, cucumbers, zucchini",
      "Sweet fruits: melons, cherries, pears, grapes",
      "Milk, ghee, cottage cheese",
      "Coriander, fennel, mint, turmeric",
      "Coconut water, aloe vera juice",
    ],
  },
  {
    type: "Kapha",
    color: "#10B981",
    gradientFrom: "from-green-50",
    gradientTo: "to-[#f6f3e8]",
    description:
      "Light, warm and well-spiced foods. Reduce heavy, oily, cold and sweet items for balance.",
    plate: [
      { name: "Carbs", value: 30, color: "#22C55E" },
      { name: "Veggies", value: 40, color: "#10B981" },
      { name: "Protein", value: 20, color: "#F59E0B" },
      { name: "Fruits", value: 10, color: "#EF4444" },
    ],
    taste: [
      { name: "Pungent", value: 25, color: "#F43F5E" },
      { name: "Bitter", value: 25, color: "#64748B" },
      { name: "Astringent", value: 25, color: "#8B5CF6" },
      { name: "Sweet", value: 15, color: "#22C55E" },
      { name: "Sour", value: 10, color: "#F97316" },
    ],
    rule: "Reduce sweet, oily and heavy foods. Favor light, warm and spiced preparations; exercise regularly.",
    foods: [
      "Millets, barley, buckwheat",
      "Light legumes: mung beans, red lentils",
      "Spiced teas (ginger, clove, cinnamon)",
      "Leafy greens, broccoli, cabbage, peppers",
      "Apples, pears, cranberries, pomegranates",
      "Spices: black pepper, mustard seed, turmeric",
    ],
  },
];

// New: predefined daily meal plans with items, cuisines and short recipes
const PLANS = [
  {
    id: "balanced",
    name: "Balanced Day",
    description: "All-round balanced meals for steady energy.",
    tags: ["easy", "balanced"],
    meals: {
      breakfast: [
        {
          name: "Warm Oat Porridge",
          cuisine: "Indian",
          calories: 320,
          items: ["oats", "milk", "ghee", "dates", "cardamom"],
          recept:
            "Simmer oats in milk with a pinch of salt and cardamom. Stir in ghee and chopped dates.",
        },
        {
          name: "Herbal Tea",
          cuisine: "Ayurvedic",
          calories: 5,
          items: ["ginger", "tulsi"],
          recept:
            "Boil water with ginger and tulsi leaves for 5 minutes. Strain.",
        },
      ],
      lunch: [
        {
          name: "Millet Khichdi",
          cuisine: "Indian",
          calories: 520,
          items: ["millet", "moong dal", "ghee", "cumin", "veg"],
          recept:
            "Cook millet and moong dal with diced veggies, ghee and cumin until soft.",
        },
      ],
      snack: [
        {
          name: "Fruit & Nuts",
          cuisine: "Global",
          calories: 180,
          items: ["banana", "almonds"],
          recept: "Serve sliced banana with a handful of roasted almonds.",
        },
      ],
      dinner: [
        {
          name: "Steamed Fish & Veg",
          cuisine: "Mediterranean",
          calories: 430,
          items: ["fish", "lemon", "steamed veg"],
          recept:
            "Season fish with lemon and herbs. Steam with mixed vegetables until flaky.",
        },
      ],
    },
  },
  {
    id: "vata-friendly",
    name: "Vata-Nourish Day",
    description: "Warm, grounding meals for Vata balance.",
    tags: ["vata", "grounding"],
    meals: {
      breakfast: [
        {
          name: "Rice Porridge with Ghee",
          cuisine: "Indian",
          calories: 340,
          items: ["white rice", "milk", "ghee", "honey"],
          recept:
            "Cook rice in milk until porridge-like. Stir in ghee and a little honey.",
        },
      ],
      lunch: [
        {
          name: "Lentil Stew",
          cuisine: "Indian",
          calories: 480,
          items: ["toor dal", "turmeric", "ghee", "spinach"],
          recept:
            "Cook dal with turmeric, temper with ghee, cumin and add spinach near end.",
        },
      ],
      snack: [
        {
          name: "Warm Spiced Nuts",
          cuisine: "Global",
          calories: 210,
          items: ["walnuts", "cinnamon", "honey"],
          recept:
            "Toast nuts with cinnamon and a drizzle of honey for warmth and healthy fats.",
        },
      ],
      dinner: [
        {
          name: "Vegetable Kitchari",
          cuisine: "Indian",
          calories: 400,
          items: ["mung dal", "rice", "ghee", "root veg"],
          recept:
            "Combine mung dal and rice with root vegetables; simmer until soft and nourishing.",
        },
      ],
    },
  },
  {
    id: "light-kapha",
    name: "Light Kapha Day",
    description: "Warm, light and spiced — reduces heaviness.",
    tags: ["kapha", "light"],
    meals: {
      breakfast: [
        {
          name: "Quinoa Upma",
          cuisine: "Indian",
          calories: 300,
          items: ["quinoa", "mustard seed", "turmeric", "veg"],
          recept:
            "Toast quinoa, then cook with mustard seed, turmeric and mixed vegetables.",
        },
      ],
      lunch: [
        {
          name: "Grilled Tandoori Chicken Salad",
          cuisine: "Indian",
          calories: 450,
          items: ["chicken", "salad", "tandoori spices"],
          recept:
            "Marinate chicken in spices, grill and serve over crisp salad greens.",
        },
      ],
      snack: [
        {
          name: "Spiced Apple",
          cuisine: "Global",
          calories: 120,
          items: ["apple", "cinnamon"],
          recept: "Warm sliced apple with a sprinkle of cinnamon.",
        },
      ],
      dinner: [
        {
          name: "Steamed Veg & Lentils",
          cuisine: "Simple",
          calories: 380,
          items: ["lentils", "mixed veg", "pepper"],
          recept:
            "Lightly steam vegetables and serve with well-spiced lentils for digestion.",
        },
      ],
    },
  },
];

// utility: unique ingredient list
const ALL_INGREDIENTS = Array.from(
  new Set(
    PLANS.flatMap((p) =>
      Object.values(p.meals).flatMap((mealArr) =>
        mealArr.flatMap((m) => m.items)
      )
    )
  )
).sort();

// existing Chart and Stat components
const Chart = ({ data, innerRadius = 45, outerRadius = 80 }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          dataKey="value"
          isAnimationActive={true}
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value, name) => [`${value}%`, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl font-extrabold text-emerald-900">{value}</div>
    <div className="text-xl text-emerald-800/90">{label}</div>
  </div>
);

// DayChart: renders a single plan's daily meals with animations and recipe toggle
const DayChart = ({ plan, language = "en" }) => {
  const [openMeal, setOpenMeal] = useState(null); // 'breakfast'|'lunch'|'snack'|'dinner'

  // compute totals (calories + estimated macros) from plan
  const totals = useMemo(() => {
    const meals = Object.values(plan.meals).flat();
    const calories = meals.reduce((s, m) => s + (m.calories || 0), 0);

    // Use a reasonable default macro split per meal if not provided:
    // carbs 50%, protein 20%, fat 30% of calories
    const carbscal = meals.reduce((s, m) => s + (m.calories || 0) * 0.5, 0);
    const proteincal = meals.reduce((s, m) => s + (m.calories || 0) * 0.2, 0);
    const fatcal = meals.reduce((s, m) => s + (m.calories || 0) * 0.3, 0);

    const carbs_g = Math.round(carbscal / 4);
    const protein_g = Math.round(proteincal / 4);
    const fat_g = Math.round(fatcal / 9);

    // crude sugar / fiber estimates (placeholders: sugar 8% cal, fiber 3% cal)
    const sugarcal = meals.reduce((s, m) => s + (m.calories || 0) * 0.08, 0);
    const fibercal = meals.reduce((s, m) => s + (m.calories || 0) * 0.03, 0);
    const sugar_g = Math.round(sugarcal / 4);
    const fiber_g = Math.round(fibercal / 4);

    // simple micronutrient hints based on items (presence checks)
    const itemSet = new Set(meals.flatMap((m) => m.items || []));
    const micron = {
      iron:
        itemSet.has("lentils") ||
        itemSet.has("toor dal") ||
        itemSet.has("mung dal")
          ? getTranslation("good", language)
          : getTranslation("moderate", language),
      calcium:
        itemSet.has("milk") ||
        itemSet.has("ghee") ||
        itemSet.has("cottage cheese")
          ? getTranslation("good", language)
          : getTranslation("low", language),
      vitaminC: Array.from(itemSet).some((it) =>
        ["lemon", "orange", "apple", "tomato", "pepper"].includes(it)
      )
        ? getTranslation("good", language)
        : getTranslation("moderate", language),
    };

    return {
      calories,
      carbs_g,
      protein_g,
      fat_g,
      sugar_g,
      fiber_g,
      micron,
    };
  }, [plan]);

  // helper to render a nutrient bar (percent relative to a simple target)
  const NutrientBar = ({ label, value, unit, target }) => {
    const pct = target ? Math.min(100, Math.round((value / target) * 100)) : 0;
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xl text-emerald-900 font-medium">
          <div>{label}</div>
          <div>
            {value}
            {unit}
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="h-2 bg-emerald-600" style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <div>
          <div className="text-xl font-semibold text-emerald-900">
            {plan.name}
          </div>
          <div className="text-xl text-emerald-800/90">{plan.description}</div>
        </div>
        <div className="text-xl text-gray-600">
          Tags: {plan.tags.join(", ")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {Object.entries(plan.meals).map(([mealKey, items]) => {
          const calories = items.reduce((s, it) => s + (it.calories || 0), 0);
          return (
            <motion.div
              key={mealKey}
              initial={{ scale: 0.995, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.06 }}
              className="bg-[#f6f3e8]/60 rounded-lg p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <div className="font-semibold text-emerald-900 capitalize text-xl">
                    {getTranslation(mealKey, language)} • {calories} cal
                  </div>
                  <div className="text-xl text-emerald-800/90">
                    {items
                      .map((i) => i.cuisine)
                      .filter((v, idx, arr) => arr.indexOf(v) === idx)
                      .join(" • ")}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setOpenMeal(openMeal === mealKey ? null : mealKey)
                  }
                  className="text-xl text-emerald-700 font-medium"
                >
                  {openMeal === mealKey
                    ? getTranslation("hide", language)
                    : getTranslation("view", language)}
                </button>
              </div>

              <div className="mt-3 space-y-3">
                {items.map((it, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ background: "#10B981" }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-emerald-900">
                        {it.name}{" "}
                        <span className="text-xs text-gray-500">
                          ({it.cuisine})
                        </span>
                      </div>
                      <div className="text-xl text-emerald-800/90">
                        {it.items.join(", ")}
                      </div>
                      {openMeal === mealKey && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.28 }}
                          className="mt-2 p-3 bg-white rounded shadow-inner text-xl"
                        >
                          <div className="font-semibold mb-1">Recipe</div>
                          <div className="text-xl text-gray-700">
                            {it.recept}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
                <button className="px-3 py-1 bg-white rounded shadow text-xl flex-1 sm:flex-none">
                  Swap
                </button>
                <button
                  className="px-3 py-1 bg-emerald-600 text-white rounded shadow text-xl flex-1 sm:flex-none"
                  onClick={() =>
                    navigator.clipboard?.writeText(itineraryCopy(plan))
                  }
                >
                  Copy Plan
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- Daily summary (new) --- */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
        className="mt-4 sm:mt-6 bg-white rounded-xl p-3 sm:p-4 shadow"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
          <div>
            <div className="text-xl sm:text-2xl font-semibold text-emerald-900">
              Full-day Nutrition Summary
            </div>
            <div className="text-xl text-emerald-800/90">
              Estimated totals and quick insights for the selected day
            </div>
          </div>
          <div className="text-xl text-gray-600">Estimated values</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="bg-[#f6f3e8] rounded-lg p-3">
            <div className="text-xl text-emerald-900 font-semibold">
              Calories
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-900">
              {totals.calories} cal
            </div>
            <div className="text-xl text-gray-600 mt-1">
              Daily energy from all meals
            </div>
          </div>

          <div className="bg-[#f6f3e8] rounded-lg p-3">
            <div className="text-xl text-emerald-900 font-semibold">
              Macronutrients
            </div>
            <div className="mt-2 space-y-2">
              <NutrientBar
                label={getTranslation("carbs", language)}
                value={totals.carbs_g}
                unit=" g"
                target={300}
              />
              <NutrientBar
                label={getTranslation("protein", language)}
                value={totals.protein_g}
                unit=" g"
                target={70}
              />
              <NutrientBar
                label={getTranslation("fat", language)}
                value={totals.fat_g}
                unit=" g"
                target={80}
              />
            </div>
          </div>

          <div className="bg-[#f6f3e8] rounded-lg p-3">
            <div className="text-xl text-emerald-900 font-semibold">
              Sugars / Fiber
            </div>
            <div className="mt-2 space-y-2">
              <NutrientBar
                label={getTranslation("sugar", language)}
                value={totals.sugar_g}
                unit=" g"
                target={40}
              />
              <NutrientBar
                label={getTranslation("fiber", language)}
                value={totals.fiber_g}
                unit=" g"
                target={30}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
            <div className="text-xl font-semibold text-emerald-900">
              Micronutrient hints
            </div>
            <div className="text-xl text-gray-600">
              Based on included ingredients
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-xl">
              <div className="text-emerald-900 font-medium">Iron</div>
              <div className="text-gray-700 text-xl">{totals.micron.iron}</div>
            </div>

            <div className="text-xl">
              <div className="text-emerald-900 font-medium">Calcium</div>
              <div className="text-gray-700 text-xl">
                {totals.micron.calcium}
              </div>
            </div>

            <div className="text-xl">
              <div className="text-emerald-900 font-medium">Vitamin C</div>
              <div className="text-gray-700 text-xl">
                {totals.micron.vitaminC}
              </div>
            </div>
          </div>

          <div className="mt-3 text-xl text-gray-600">
            Note: These are estimated values (macro split defaults). For
            clinical precision, use a nutrient database or upload exact recipe
            macros.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// helper to format plan as text
const itineraryCopy = (plan) =>
  Object.entries(plan.meals)
    .map(
      ([meal, arr]) =>
        `${meal.toUpperCase()}:\n${arr
          .map((a) => `- ${a.name} (${a.items.join(", ")})`)
          .join("\n")}`
    )
    .join("\n\n");

export default function DietChart() {
  const [selected, setSelected] = useState(0);
  const [language, setLanguage] = useState("en");

  // Get translated DOSHAS based on current language
  const getTranslatedDoshas = () =>
    DOSHAS.map((dosha) => ({
      ...dosha,
      type: getTranslation(dosha.type.toLowerCase(), language),
      description: getTranslation(dosha.type.toLowerCase() + "Desc", language),
      rule: getTranslation(dosha.type.toLowerCase() + "Rule", language),
      plate: dosha.plate.map((item) => ({
        ...item,
        name: getTranslation(item.name.toLowerCase(), language),
      })),
      taste: dosha.taste.map((item) => ({
        ...item,
        name: getTranslation(item.name.toLowerCase(), language),
      })),
      foods: dosha.foods.map((food, index) => {
        const foodKey = dosha.type.toLowerCase() + "food" + (index + 1);
        return getTranslation(foodKey, language) || food;
      }),
    }));

  const translatedDoshas = getTranslatedDoshas();
  const active = translatedDoshas[selected];

  useEffect(() => {
    // no-op: placeholder in case animation hook needed later
  }, [selected]);

  // new UI state for daily plans
  const [selectedPlanId, setSelectedPlanId] = useState(PLANS[0].id);
  const [ingredientFilter, setIngredientFilter] = useState([]); // ingredients the user selects to filter plans
  const [showOnlyMatching, setShowOnlyMatching] = useState(false);

  const toggleIngredient = (name) => {
    setIngredientFilter((s) =>
      s.includes(name) ? s.filter((i) => i !== name) : [...s, name]
    );
  };

  const filteredPlans = useMemo(() => {
    if (!showOnlyMatching || ingredientFilter.length === 0) return PLANS;
    return PLANS.filter((p) => {
      // check whether plan contains all selected ingredients
      const items = new Set(
        Object.values(p.meals).flatMap((arr) => arr.flatMap((m) => m.items))
      );
      return ingredientFilter.every((ing) => items.has(ing));
    });
  }, [ingredientFilter, showOnlyMatching, language]);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];

  return (
    <div className="min-h-screen bg-gradient-to-l from-white to-[#f6f3e8] p-2 sm:p-4 md:p-6">
      <LanguageSelector language={language} onLanguageChange={setLanguage} />
      <Link to="/dhome">
        <button className="px-3 sm:px-4 py-2 mt-20 sm:py-3 mb-3 sm:mt-4 md:mt-5 ml-2 sm:ml-3 md:ml-5 rounded-full bg-white border text-emerald-700 text-xl disabled:opacity-50 hover:shadow-md transition-shadow">
          ← {getTranslation("backToHome", language)}
        </button>
      </Link>
      <div className="max-w-8xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-900">
            {getTranslation("selectDosha", language)}
          </h1>
          <p className="mt-2 text-xl text-emerald-800/90">
            {getTranslation("mealPlan", language)}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Dosha selector (existing) */}
          <div className="lg:col-span-1 text-xl space-y-3 sm:space-y-4">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 sm:gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                {translatedDoshas.map((d, i) => (
                  <motion.button
                    key={d.type}
                    onClick={() => setSelected(i)}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left rounded-xl p-3 sm:p-4 transition-shadow flex flex-col justify-center items-start gap-2 sm:gap-3 ${
                      i === selected
                        ? "ring-2 ring-emerald-300 bg-white shadow-lg"
                        : "bg-white/90 hover:shadow-md"
                    }`}
                    aria-pressed={i === selected}
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ml-4 sm:ml-6 md:ml-8 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                      style={{ background: d.color }}
                    >
                      {d.type.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-900 text-xl">
                        {d.type}
                      </div>
                      <div className="text-xl mt-2 sm:mt-3 text-emerald-800/80">
                        {d.description.slice(0, 90)}…
                      </div>
                    </div>

                    <div
                      className="text-xl mt-3 sm:mt-4 p-2 sm:p-3 rounded-2xl h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 text-emerald-100"
                      style={{ background: d.color }}
                    >
                      <p className="font-bold">Note:</p> {d.rule}…
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Foods panel for selected dosha (appears below buttons) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={DOSHAS[selected].type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.36 }}
                  className="bg-white rounded-lg p-3 sm:p-4 py-8 sm:py-12 shadow mt-2"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-emerald-900">
                        {getTranslation("recommendedFoods", language)} —{" "}
                        {active.type}
                      </h3>
                      <div className="text-xl text-emerald-800/90 mt-1">
                        {active.description}
                      </div>
                    </div>
                    <div className="text-xl text-gray-600">
                      {active.foods.length} {getTranslation("items", language)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {active.foods.map((food, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.28 }}
                        className="flex items-start gap-3 bg-[#f6f3e8] rounded-md p-2 sm:p-3"
                      >
                        <div
                          className="w-3 h-3 rounded-full mt-1"
                          style={{ background: "#10B981" }}
                        />
                        <div className="text-xl text-emerald-900">{food}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="bg-white rounded-xl p-3 sm:p-4 shadow"
            >
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow">
                  <div className="text-xl font-semibold text-emerald-900 mb-2">
                    Plans
                  </div>
                  <div className="space-y-2">
                    {filteredPlans.map((p) => (
                      <motion.button
                        key={p.id}
                        onClick={() => setSelectedPlanId(p.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full text-left p-2 sm:p-3 rounded-lg ${
                          p.id === selectedPlanId
                            ? "bg-[#f6f3e8] ring-2 ring-emerald-200"
                            : "bg-white/90"
                        } shadow`}
                      >
                        <div className="font-medium text-emerald-900 text-xl">
                          {p.name}
                        </div>
                        <div className="text-xl text-emerald-800/80">
                          {p.description}
                        </div>
                      </motion.button>
                    ))}
                    {filteredPlans.length === 0 && (
                      <div className="text-xl text-gray-600">
                        No plans match selected ingredients.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-4 shadow">
                  <div className="text-xl font-semibold text-emerald-900 mb-2">
                    Quick actions
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="px-3 py-1 bg-white rounded shadow text-xl flex-1 sm:flex-none">
                      Shuffle
                    </button>
                    <button
                      className="px-3 py-1 bg-emerald-600 text-white rounded shadow text-xl flex-1 sm:flex-none"
                      onClick={() =>
                        navigator.clipboard?.writeText(
                          itineraryCopy(selectedPlan)
                        )
                      }
                    >
                      {getTranslation("copyDay", language)}
                    </button>
                    <button
                      className="px-3 py-1 bg-white rounded shadow text-xl flex-1 sm:flex-none"
                      onClick={() =>
                        alert(getTranslation("exportPlaceholder", language))
                      }
                    >
                      {getTranslation("exportPdf", language)}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle: Daily plan selector and display */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                  <div className="font-semibold text-xl sm:text-2xl text-emerald-900">
                    {getTranslation("mealPlan", language)}
                  </div>
                  <div className="text-xl text-emerald-800/90">
                    {getTranslation("mealPlan", language)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xl">
                    <input
                      type="checkbox"
                      checked={showOnlyMatching}
                      onChange={() => setShowOnlyMatching((s) => !s)}
                    />
                    Show only plans that include my selected ingredients
                  </label>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {ALL_INGREDIENTS.map((ing) => (
                    <button
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className={`text-xl px-2 py-1 rounded ${
                        ingredientFilter.includes(ing)
                          ? "bg-emerald-600 text-white"
                          : "bg-white/90 text-emerald-900"
                      } shadow`}
                    >
                      {ing}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPlanId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                  >
                    <DayChart plan={selectedPlan} language={language} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* existing charts and lists (kept as before) */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
              <div className="w-full lg:w-1/2">
                <div className="text-xl text-emerald-900 font-semibold mb-2">
                  The {active.type} Plate
                </div>
                <div className="bg-[#f6f3e8] rounded-xl p-3 sm:p-4">
                  <Chart
                    data={active.plate}
                    innerRadius={40}
                    outerRadius={90}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="text-xl text-emerald-900 font-semibold mb-2">
                  Taste Palette
                </div>
                <div className="bg-[#f6f3e8] rounded-xl p-3 sm:p-4">
                  <Chart
                    data={active.taste}
                    innerRadius={30}
                    outerRadius={70}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {active.plate.map((p, idx) => (
                <motion.div
                  key={p.name}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + idx * 0.06 }}
                  className="bg-white/80 rounded-lg p-3 shadow inner-shadow flex items-center gap-3"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: p.color }}
                  />
                  <div>
                    <div className="font-semibold text-emerald-900 text-xl">
                      {p.name}
                    </div>
                    <div className="text-xl text-emerald-800/90">
                      {p.value}% of plate
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
