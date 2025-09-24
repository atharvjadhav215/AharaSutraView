import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { getTranslation } from "./dietChartTranslations";
import LanguageSelector from "./LanguageSelector";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import {
  FaHome,
  FaLanguage,
  FaEye,
  FaCalendarAlt,
  FaList,
  FaFire,
  FaDownload,
  FaShare,
  FaChevronRight,
  FaChevronLeft,
  FaUtensils,
  FaChartPie,
  FaLeaf,
  FaAppleAlt,
  FaDumbbell,
  FaHeartbeat,
  FaSeedling,
} from "react-icons/fa";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ayurvedicColors = [
  "#A0D9D9",
  "#7BC4C4",
  "#5BAFAF",
  "#4A9B9B",
  "#3A8787",
  "#2A7373",
  "#1A5F5F",
  "#0A4B4B",
];

// Enhanced Ayurvedic Particle System
const AyurvedicParticleSystem = ({ count = 80 }) => {
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current;
    const container = containerRef.current;

    if (!container) return;

    // Create enhanced Ayurvedic particles
    particles.forEach((particle, index) => {
      if (particle) {
        const isSymbol = index % 4 === 0; // Every 4th particle is a symbol

        const color =
          ayurvedicColors[Math.floor(Math.random() * ayurvedicColors.length)];

        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: isSymbol
            ? Math.random() * 1.2 + 1.0
            : Math.random() * 0.8 + 0.6,
          opacity: Math.random() * 0.9 + 0.4,
          rotation: Math.random() * 360,
        });

        // Enhanced floating animation
        gsap.to(particle, {
          x: `+=${(Math.random() - 0.5) * 200}`,
          y: `+=${(Math.random() - 0.5) * 200}`,
          duration: Math.random() * 4 + 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Rotation animation
        gsap.to(particle, {
          rotation: "+=360",
          duration: Math.random() * 6 + 5,
          ease: "none",
          repeat: -1,
        });

        // Scale pulsing for symbols
        if (isSymbol) {
          gsap.to(particle, {
            scale: "+=0.3",
            duration: Math.random() * 0.8 + 0.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        particle.className = "absolute w-2 h-2 rounded-full ayurvedic-dot";
        particle.style.backgroundColor = color;
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute"
          style={{
            filter: "blur(0.3px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

// Background Layers
const BG_LAYERS = [
  {
    id: 0,
    gradient:
      "radial-gradient( circle at 10% 20%, rgba(107,142,35,0.14), transparent 20% ), linear-gradient(45deg,#F0F9F0,#E8F5E8)",
  },
  {
    id: 1,
    gradient:
      "radial-gradient( circle at 80% 10%, rgba(139,69,19,0.12), transparent 18% ), linear-gradient(135deg,#E8F5E8,#E0F2E0)",
  },
  {
    id: 2,
    gradient:
      "radial-gradient( circle at 30% 80%, rgba(156,175,136,0.10), transparent 18% ), linear-gradient(90deg,#E0F2E0,#D8EFD8)",
  },
];

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
    gradientFrom: "from-cyan-50",
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
      transition={{ duration: 0.225 }}
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
              transition={{ delay: 0.03 }}
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
                          transition={{ duration: 0.14 }}
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
        transition={{ delay: 0.04, duration: 0.225 }}
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
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [analysisTab, setAnalysisTab] = useState("nutrients");

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

  // Generate 7-day diet chart
  const generate7DayChart = (selectedPlan) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return days.map((day) => ({
      day,
      plan: selectedPlan,
      meals: selectedPlan.meals,
      totalCalories: Object.values(selectedPlan.meals)
        .flat()
        .reduce((sum, meal) => sum + meal.calories, 0),
    }));
  };

  // Generate detailed nutrient analysis
  const generateNutrientAnalysis = (plan) => {
    const meals = Object.values(plan.meals).flat();
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    // Calculate macronutrients (estimated based on typical food composition)
    const carbs = Math.round((totalCalories * 0.5) / 4); // 50% carbs, 4 cal/g
    const protein = Math.round((totalCalories * 0.2) / 4); // 20% protein, 4 cal/g
    const fat = Math.round((totalCalories * 0.3) / 9); // 30% fat, 9 cal/g

    // Calculate micronutrients (estimated)
    const fiber = Math.round((totalCalories * 0.03) / 4); // 3% fiber
    const sugar = Math.round((totalCalories * 0.08) / 4); // 8% sugar
    const sodium = Math.round(totalCalories * 0.02); // 2% sodium (mg)
    const potassium = Math.round(totalCalories * 0.15); // 15% potassium (mg)
    const calcium = Math.round(totalCalories * 0.12); // 12% calcium (mg)
    const iron = Math.round(totalCalories * 0.08); // 8% iron (mg)
    const vitaminC = Math.round(totalCalories * 0.1); // 10% vitamin C (mg)

    return {
      totalCalories,
      macronutrients: { carbs, protein, fat },
      micronutrients: {
        fiber,
        sugar,
        sodium,
        potassium,
        calcium,
        iron,
        vitaminC,
      },
    };
  };

  // Generate daily timeline
  const generateDailyTimeline = () => {
    return [
      {
        time: "6:00 AM",
        activity: "Wake up & Hydration",
        type: "water",
        icon: "💧",
      },
      {
        time: "6:30 AM",
        activity: "Morning Yoga/Exercise",
        type: "exercise",
        icon: "🧘‍♀️",
      },
      { time: "7:30 AM", activity: "Breakfast", type: "meal", icon: "🍳" },
      { time: "9:00 AM", activity: "Water Intake", type: "water", icon: "💧" },
      { time: "11:00 AM", activity: "Light Snack", type: "snack", icon: "🥜" },
      { time: "12:00 PM", activity: "Water Intake", type: "water", icon: "💧" },
      { time: "1:00 PM", activity: "Lunch", type: "meal", icon: "🍽️" },
      {
        time: "3:00 PM",
        activity: "Afternoon Walk",
        type: "exercise",
        icon: "🚶‍♀️",
      },
      { time: "4:00 PM", activity: "Water Intake", type: "water", icon: "💧" },
      { time: "5:00 PM", activity: "Evening Snack", type: "snack", icon: "🍎" },
      { time: "7:00 PM", activity: "Dinner", type: "meal", icon: "🍲" },
      { time: "8:00 PM", activity: "Water Intake", type: "water", icon: "💧" },
      {
        time: "9:00 PM",
        activity: "Meditation/Relaxation",
        type: "wellness",
        icon: "🧘‍♂️",
      },
      { time: "10:00 PM", activity: "Bedtime", type: "sleep", icon: "😴" },
    ];
  };

  // Tab content components
  const getTabContent = () => {
    const currentPlan = selectedPlan;
    const weeklyChart = generate7DayChart(currentPlan);
    const nutrientAnalysis = generateNutrientAnalysis(currentPlan);
    const dailyTimeline = generateDailyTimeline();

    return {
      overview: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="text-center flex flex-row items-center justify-start gap-5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 shadow-lg mb-1">
              <FaChartPie className="text-xl" style={{ color: "#10B981" }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-teal-900">
              {currentPlan.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(currentPlan.meals).map(([mealType, items]) => (
              <motion.div
                key={mealType}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-white to-teal-50/30 p-3 rounded-xl border border-teal-200/30 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-2xl font-semibold text-teal-900 capitalize">
                    {mealType}
                  </h4>
                  <div className="flex items-center gap-1 text-teal-700">
                    <FaFire className="text-sm" />
                    <span className="font-medium">
                      {items.reduce((s, i) => s + (i.calories || 0), 0)} cal
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white/90 via-cyan-50/60 to-sky-50/40 rounded-2xl p-4 border-2 border-teal-200/50 shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-800 font-medium text-lg">
                          {item.name}
                        </span>
                        <span className="text-teal-700 font-semibold text-lg">
                          {item.calories} cal
                        </span>
                      </div>
                      {item.recept && (
                        <div className="text-sm text-gray-700 bg-gradient-to-r from-cyan-50/80 to-sky-50/60 p-3 rounded-xl border-l-4 border-cyan-400 shadow-sm">
                          <strong>Recipe:</strong> {item.recept}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
      weekly: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Day Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {weeklyChart.map((day, index) => (
              <motion.button
                key={day.day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day.day)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedDay === day.day
                    ? "bg-gradient-to-r from-cyan-500  to-teal-500 text-white shadow-lg"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-amber-300 hover:bg-teal-50"
                }`}
              >
                <FaCalendarAlt className="text-sm" />
                {day.day}
              </motion.button>
            ))}
          </div>

          {/* Selected Day Content */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-2 px-6 rounded-2xl border-2 border-teal-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-teal-900">
                {selectedDay} Meal Plan
              </h3>
              <div className="flex items-center gap-2 text-teal-700">
                <FaFire className="text-lg" />
                <span className="text-lg font-semibold">
                  {
                    weeklyChart.find((day) => day.day === selectedDay)
                      ?.totalCalories
                  }{" "}
                  cal
                </span>
              </div>
            </div>

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(
                weeklyChart.find((day) => day.day === selectedDay)?.meals || {}
              ).map(([mealType, items]) => (
                <motion.div
                  key={mealType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gradient-to-r from-white/80 via-teal-50/60 to-cyan-50/40 rounded-xl p-4 border-2 border-teal-200/40 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {mealType.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 capitalize">
                      {mealType}
                    </h4>
                    <div className="flex items-center gap-1 text-teal-700 ml-auto">
                      <FaFire className="text-sm" />
                      <span className="font-medium">
                        {items.reduce((sum, item) => sum + item.calories, 0)}{" "}
                        cal
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                        className="bg-white/60 rounded-lg p-3 border border-teal-100/50 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-lg font-medium text-gray-700">
                            {item.name}
                          </h5>
                          <span className="text-teal-700 font-semibold">
                            {item.calories} cal
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ),
      analysis: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Analysis Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {[
              { id: "nutrients", name: "Nutrients", icon: FaChartPie },
              { id: "timeline", name: "Daily Timeline", icon: FaCalendarAlt },
              { id: "recommendations", name: "Recommendations", icon: FaLeaf },
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnalysisTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  analysisTab === tab.id
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-amber-300 hover:bg-teal-50"
                }`}
              >
                <tab.icon className="text-sm" />
                {tab.name}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={analysisTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/20 shadow-lg"
          >
            {analysisTab === "nutrients" && (
              <div className="space-y-6">
                {/* Total Calories Summary */}
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl px-6 py-2 text-center">
                  <div className="text-4xl font-bold tracking-widest text-teal-800 mb-2">
                    {nutrientAnalysis.totalCalories} cal
                  </div>
                  <div className="text-lg text-teal-700">
                    Total Daily Calories
                  </div>
                </div>

                {/* Macronutrient Pie Chart */}
                <div className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-2xl border-2 border-teal-200/50 shadow-lg">
                  <h4 className="text-xl font-semibold text-teal-900 mb-4 text-center">
                    Macronutrient Distribution
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Pie Chart */}
                    <div className="flex justify-center">
                      <div className="w-64 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Carbohydrates",
                                  value: 50,
                                  color: "#0D9488",
                                  fill: "#0D9488",
                                },
                                {
                                  name: "Protein",
                                  value: 20,
                                  color: "#0891B2",
                                  fill: "#0891B2",
                                },
                                {
                                  name: "Fats",
                                  value: 30,
                                  color: "#059669",
                                  fill: "#059669",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              innerRadius={40}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                              labelLine={false}
                            >
                              {[
                                {
                                  name: "Carbohydrates",
                                  value: 50,
                                  color: "#0D9488",
                                  fill: "#0D9488",
                                },
                                {
                                  name: "Protein",
                                  value: 20,
                                  color: "#0891B2",
                                  fill: "#0891B2",
                                },
                                {
                                  name: "Fats",
                                  value: 30,
                                  color: "#059669",
                                  fill: "#059669",
                                },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-teal-900 mb-3">
                        Recommendations
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-3 border border-teal-200">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                            <span className="font-medium text-teal-800">
                              Carbohydrates (50%)
                            </span>
                          </div>
                          <p className="text-sm text-teal-700">
                            Good balance! Focus on complex carbs like whole
                            grains, vegetables, and fruits.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-lg p-3 border border-cyan-200">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            <span className="font-medium text-cyan-800">
                              Protein (20%)
                            </span>
                          </div>
                          <p className="text-sm text-cyan-700">
                            Consider increasing protein intake with lentils,
                            paneer, and lean meats for better muscle health.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="font-medium text-emerald-800">
                              Fats (30%)
                            </span>
                          </div>
                          <p className="text-sm text-emerald-700">
                            Excellent! Include healthy fats like ghee, nuts, and
                            olive oil for optimal nutrition.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macronutrients Dropdown */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-teal-900 mb-4">
                    Macronutrients
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-4 border border-teal-200 hover:shadow-md transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-800 mb-2">
                          {nutrientAnalysis.macronutrients.carbs}g
                        </div>
                        <div className="text-lg text-teal-700 font-medium">
                          Carbohydrates
                        </div>
                        <div className="text-sm text-teal-600 mt-1">
                          50% of calories
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-cyan-100 to-sky-100 rounded-xl p-4 border border-cyan-200 hover:shadow-md transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-800 mb-2">
                          {nutrientAnalysis.macronutrients.protein}g
                        </div>
                        <div className="text-lg text-cyan-700 font-medium">
                          Protein
                        </div>
                        <div className="text-sm text-cyan-600 mt-1">
                          20% of calories
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-4 border border-emerald-200 hover:shadow-md transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-800 mb-2">
                          {nutrientAnalysis.macronutrients.fat}g
                        </div>
                        <div className="text-lg text-emerald-700 font-medium">
                          Fats
                        </div>
                        <div className="text-sm text-emerald-600 mt-1">
                          30% of calories
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Micronutrients Dropdown */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-teal-900 mb-4">
                    Micronutrients
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(nutrientAnalysis.micronutrients).map(
                      ([nutrient, value], index) => (
                        <motion.div
                          key={nutrient}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="bg-white/80 rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-800 mb-1">
                              {value}
                              {nutrient === "sodium" ||
                              nutrient === "potassium" ||
                              nutrient === "calcium" ||
                              nutrient === "iron" ||
                              nutrient === "vitaminC"
                                ? "mg"
                                : "g"}
                            </div>
                            <div className="text-sm text-gray-600 capitalize">
                              {nutrient.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {analysisTab === "timeline" && (
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-teal-900 mb-4">
                  Daily Activity Timeline
                </h4>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 to-cyan-300"></div>

                  {dailyTimeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-center mb-4 last:mb-0"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-4 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                          item.type === "meal"
                            ? "bg-orange-400"
                            : item.type === "water"
                            ? "bg-blue-400"
                            : item.type === "exercise"
                            ? "bg-green-400"
                            : item.type === "snack"
                            ? "bg-yellow-400"
                            : item.type === "wellness"
                            ? "bg-purple-400"
                            : "bg-gray-400"
                        }`}
                      ></div>

                      {/* Content */}
                      <div className="ml-12 bg-white/80 rounded-xl p-4 border border-gray-200 shadow-sm flex-1 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-800">
                                {item.activity}
                              </div>
                              <div className="text-sm text-gray-600 capitalize">
                                {item.type}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                            {item.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {analysisTab === "recommendations" && (
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-teal-900 mb-4">
                  Health Recommendations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">
                      💧 Hydration
                    </h5>
                    <p className="text-sm text-green-700">
                      Drink 8-10 glasses of water daily. Include herbal teas and
                      coconut water.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">
                      🏃‍♀️ Exercise
                    </h5>
                    <p className="text-sm text-blue-700">
                      30 minutes of moderate exercise daily. Include yoga,
                      walking, or light cardio.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-red-50 rounded-xl p-4 border border-cyan-200">
                    <h5 className="font-semibold text-cyan-800 mb-2">
                      🍎 Balanced Meals
                    </h5>
                    <p className="text-sm text-cyan-700">
                      Eat 3 main meals and 2 snacks. Include variety of colors
                      and textures.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">
                      🧘‍♀️ Wellness
                    </h5>
                    <p className="text-sm text-purple-700">
                      Practice meditation, deep breathing, and get 7-8 hours of
                      sleep.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ),
    };
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Enhanced Ayurvedic Particle System */}
      <AyurvedicParticleSystem count={1} />

      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {BG_LAYERS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: b.gradient }}
            className="absolute inset-0"
          />
        ))}

        {/* Enhanced Floating Blobs */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 80, ease: "linear" },
            scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          className="absolute -left-40 -top-40 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 100, ease: "linear" },
            scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          }}
          className="absolute -right-32 bottom-[-60px] w-[360px] h-[360px] rounded-full bg-gradient-to-bl from-cyan-200 to-teal-100 blur-3xl pointer-events-none"
        />
      </div>

      {/* Full Screen Container */}
      <div className="h-screen w-screen flex items-center justify-center pt-20 pb-4">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-teal-200/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center flex-row flex gap-20  mb-6"
            >
              <div className="flex-row flex items-center justify-center mx-auto gap-5">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {[
                    { id: "overview", name: "Overview", icon: FaEye },
                    {
                      id: "weekly",
                      name: "7-Day Chart",
                      icon: FaCalendarAlt,
                    },
                    {
                      id: "analysis",
                      name: "Analysis",
                      icon: FaChartPie,
                    },
                  ].map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1 rounded-xl text-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                          : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-amber-300 hover:bg-teal-50"
                      }`}
                    >
                      <tab.icon className="text-xl" />
                      {tab.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 overflow-y-auto min-h-0"
            >
              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/20 overflow-y-auto min-h-0"
              >
                {getTabContent()[activeTab]}
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center justify-center mt-6 flex-shrink-0 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigator.clipboard?.writeText(itineraryCopy(selectedPlan))
                }
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm shadow-lg transition-all duration-200 flex items-center gap-2 border-2 border-teal-400"
              >
                <FaShare />
                Copy Plan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  alert("Diet chart exported successfully!");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-sm shadow-lg transition-all duration-200 flex items-center gap-2 border-2 border-green-400"
              >
                <FaDownload />
                Download Report
              </motion.button>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
