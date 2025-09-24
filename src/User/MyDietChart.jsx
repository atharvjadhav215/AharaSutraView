import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import {
  FaArrowLeft,
  FaUser,
  FaWeight,
  FaRulerVertical,
  FaBullseye,
  FaUtensils,
  FaHeart,
  FaCheckCircle,
  FaPlay,
  FaRocket,
  FaLeaf,
  FaAppleAlt,
  FaDumbbell,
  FaHeartbeat,
  FaSeedling,
  FaChevronRight,
  FaChevronLeft,
  FaHome,
  FaLanguage,
  FaRedo,
  FaEye,
  FaCheck,
  FaCalendarAlt,
  FaChartPie,
  FaList,
  FaClock,
  FaFire,
  FaCarrot,
  FaFish,
  FaBreadSlice,
  FaCoffee,
  FaPlus,
  FaMinus,
  FaStar,
  FaShare,
  FaDownload,
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
          duration: Math.random() * 12 + 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Rotation animation
        gsap.to(particle, {
          rotation: "+=360",
          duration: Math.random() * 20 + 15,
          ease: "none",
          repeat: -1,
        });

        // Scale pulsing for symbols
        if (isSymbol) {
          gsap.to(particle, {
            scale: "+=0.3",
            duration: Math.random() * 2 + 1.5,
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

// Food Categories for Selection
const FOOD_CATEGORIES = [
  {
    id: "grains",
    name: "Grains & Cereals",
    icon: FaBreadSlice,
    color: "#F59E0B",
    items: [
      {
        name: "Basmati Rice",
        calories: 130,
        selected: false,
        recipe: "Cook 1 cup rice with 2 cups water, add ghee and salt",
      },
      {
        name: "Quinoa",
        calories: 120,
        selected: false,
        recipe: "Rinse quinoa, cook 1:2 ratio with water, fluff with fork",
      },
      {
        name: "Oats",
        calories: 150,
        selected: false,
        recipe: "Cook oats with milk, add honey and nuts for flavor",
      },
      {
        name: "Barley",
        calories: 110,
        selected: false,
        recipe: "Soak barley overnight, cook until tender with vegetables",
      },
      {
        name: "Brown Rice",
        calories: 125,
        selected: false,
        recipe:
          "Cook brown rice 1:2.5 ratio, longer cooking time than white rice",
      },
    ],
  },
  {
    id: "proteins",
    name: "Proteins",
    icon: FaFish,
    color: "#10B981",
    items: [
      {
        name: "Paneer",
        calories: 200,
        selected: false,
        recipe: "Cut paneer into cubes, marinate with spices, cook in ghee",
      },
      {
        name: "Lentils",
        calories: 180,
        selected: false,
        recipe: "Soak lentils, cook with turmeric, cumin, and salt",
      },
      {
        name: "Chicken",
        calories: 250,
        selected: false,
        recipe: "Marinate chicken with yogurt and spices, grill or bake",
      },
      {
        name: "Fish",
        calories: 220,
        selected: false,
        recipe: "Season fish with lemon and herbs, pan-fry or bake",
      },
      {
        name: "Eggs",
        calories: 150,
        selected: false,
        recipe: "Boil eggs 6-8 minutes, or scramble with minimal oil",
      },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    icon: FaCarrot,
    color: "#22C55E",
    items: [
      {
        name: "Spinach",
        calories: 20,
        selected: false,
        recipe: "Wash spinach, sauté with garlic and olive oil",
      },
      {
        name: "Broccoli",
        calories: 30,
        selected: false,
        recipe: "Steam broccoli 5-7 minutes, season with lemon and salt",
      },
      {
        name: "Carrots",
        calories: 25,
        selected: false,
        recipe: "Roast carrots with honey and herbs at 400°F for 20 minutes",
      },
      {
        name: "Cucumber",
        calories: 15,
        selected: false,
        recipe: "Slice cucumber, serve fresh with lemon and mint",
      },
      {
        name: "Bell Peppers",
        calories: 20,
        selected: false,
        recipe: "Roast peppers until charred, peel and slice",
      },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: FaAppleAlt,
    color: "#EF4444",
    items: [
      {
        name: "Banana",
        calories: 90,
        selected: false,
        recipe: "Peel and eat fresh, or blend into smoothies",
      },
      {
        name: "Apple",
        calories: 80,
        selected: false,
        recipe: "Wash and eat fresh, or bake with cinnamon",
      },
      {
        name: "Orange",
        calories: 60,
        selected: false,
        recipe: "Peel and eat segments, or juice fresh",
      },
      {
        name: "Dates",
        calories: 120,
        selected: false,
        recipe: "Soak dates in warm water, remove pits, eat or blend",
      },
      {
        name: "Pear",
        calories: 70,
        selected: false,
        recipe: "Wash and eat fresh, or poach in wine",
      },
    ],
  },
  {
    id: "dairy",
    name: "Dairy",
    icon: FaCoffee,
    color: "#3B82F6",
    items: [
      {
        name: "Milk",
        calories: 100,
        selected: false,
        recipe: "Heat milk gently, add turmeric and honey for golden milk",
      },
      {
        name: "Yogurt",
        calories: 80,
        selected: false,
        recipe: "Serve plain or with fruits and nuts, avoid added sugars",
      },
      {
        name: "Ghee",
        calories: 200,
        selected: false,
        recipe: "Use 1-2 tsp for cooking, adds flavor and healthy fats",
      },
      {
        name: "Cheese",
        calories: 150,
        selected: false,
        recipe: "Use in moderation, pair with fruits or vegetables",
      },
      {
        name: "Buttermilk",
        calories: 60,
        selected: false,
        recipe: "Drink plain or add cumin powder and salt",
      },
    ],
  },
];

// Diet Plans
const DIET_PLANS = [
  {
    id: "cooling-pitta",
    name: "Cooling Pitta Plan",
    description: "Cooling, light meals — basmati, coconut water, mild spices.",
    icon: FaLeaf,
    color: "#10B981",
    meals: {
      breakfast: [
        {
          name: "Rice Porridge",
          calories: 300,
          recipe: "Cook rice with milk, add cardamom and jaggery",
        },
      ],
      lunch: [
        {
          name: "Steamed Veg + Rice",
          calories: 520,
          recipe: "Steam vegetables, serve with basmati rice and ghee",
        },
      ],
      snack: [
        {
          name: "Coconut Water + Dates",
          calories: 140,
          recipe: "Fresh coconut water with 2-3 dates",
        },
      ],
      dinner: [
        {
          name: "Paneer & Greens",
          calories: 400,
          recipe: "Sauté paneer with spinach, add mild spices",
        },
      ],
    },
  },
  {
    id: "iron-rich",
    name: "Iron-Focused Plan",
    description:
      "Lentils, greens and energy-dense snacks to support iron needs.",
    icon: FaHeartbeat,
    color: "#F59E0B",
    meals: {
      breakfast: [
        {
          name: "Ragi Porridge with Dates",
          calories: 340,
          recipe: "Cook ragi flour with milk, add chopped dates and nuts",
        },
      ],
      lunch: [
        {
          name: "Spinach Dal + Rice",
          calories: 600,
          recipe: "Cook dal with spinach, serve with rice and ghee",
        },
      ],
      snack: [
        {
          name: "Almond-Date Smoothie",
          calories: 220,
          recipe: "Blend almonds, dates, and milk until smooth",
        },
      ],
      dinner: [
        {
          name: "Lentil Stew with Veg",
          calories: 420,
          recipe: "Cook lentils with vegetables and mild spices",
        },
      ],
    },
  },
  {
    id: "balanced-active",
    name: "Balanced Active Plan",
    description:
      "Higher protein and balanced carbs for active users / muscle goals.",
    icon: FaDumbbell,
    color: "#6366F1",
    meals: {
      breakfast: [
        {
          name: "Oats + Milk + Banana",
          calories: 360,
          recipe: "Cook oats with milk, add sliced banana and honey",
        },
      ],
      lunch: [
        {
          name: "Quinoa Salad + Chicken/Paneer",
          calories: 600,
          recipe: "Mix quinoa with vegetables, add grilled protein",
        },
      ],
      snack: [
        {
          name: "Greek Yogurt + Nuts",
          calories: 200,
          recipe: "Top Greek yogurt with mixed nuts and berries",
        },
      ],
      dinner: [
        {
          name: "Grilled Veg + Protein",
          calories: 420,
          recipe: "Grill vegetables and protein with herbs",
        },
      ],
    },
  },
  {
    id: "light-digestive",
    name: "Light Digestive Plan",
    description: "Easy-to-digest, warm meals for sensitive digestion.",
    icon: FaSeedling,
    color: "#06B6D4",
    meals: {
      breakfast: [
        {
          name: "Rice Porridge with Ghee",
          calories: 320,
          recipe: "Cook rice with water, add ghee and mild spices",
        },
      ],
      lunch: [
        {
          name: "Kitchari / Moong Dal Stew",
          calories: 480,
          recipe: "Cook rice and moong dal together with turmeric",
        },
      ],
      snack: [
        {
          name: "Warm Apple",
          calories: 110,
          recipe: "Bake apple with cinnamon until soft",
        },
      ],
      dinner: [
        {
          name: "Light Kitchari",
          calories: 380,
          recipe: "Simple rice and dal with minimal spices",
        },
      ],
    },
  },
];

// Steps Configuration
const STEPS = [
  {
    id: 0,
    title: "Welcome",
    subtitle: "Let's personalize your diet chart",
    kind: "intro",
    icon: FaRocket,
    color: "#A0D9D9",
  },
  {
    id: 1,
    title: "Select Foods",
    subtitle: "Choose your preferred food items",
    kind: "food-selection",
    icon: FaUtensils,
    color: "#7BC4C4",
  },
  {
    id: 2,
    title: "Diet Chart",
    subtitle: "View your personalized diet plan",
    kind: "diet-chart",
    icon: FaChartPie,
    color: "#6B8E23",
  },
];

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

  // Enhanced meals with recipes
  const enhancedMeals = {
    breakfast: [
      {
        name: "Oatmeal with fruits",
        calories: 300,
        recipe:
          "Cook 1/2 cup oats with 1 cup milk, add honey and fresh berries",
      },
      {
        name: "Green tea",
        calories: 5,
        recipe: "Steep green tea leaves in hot water for 3-4 minutes",
      },
    ],
    lunch: [
      {
        name: "Quinoa salad",
        calories: 400,
        recipe: "Cook quinoa, mix with cucumber, tomatoes, olive oil and lemon",
      },
      {
        name: "Vegetable soup",
        calories: 150,
        recipe: "Simmer mixed vegetables in vegetable broth with herbs",
      },
    ],
    dinner: [
      {
        name: "Grilled chicken",
        calories: 350,
        recipe: "Marinate chicken with herbs, grill for 6-8 minutes each side",
      },
      {
        name: "Steamed vegetables",
        calories: 100,
        recipe: "Steam broccoli, carrots, and bell peppers for 5-7 minutes",
      },
    ],
  };

  return days.map((day) => ({
    day,
    plan: selectedPlan,
    meals: enhancedMeals,
    totalCalories: Object.values(enhancedMeals)
      .flat()
      .reduce((sum, meal) => sum + meal.calories, 0),
  }));
};

export default function MyDietChart() {
  const [step, setStep] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedPlanId] = useState(DIET_PLANS[0].id);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Define functions
  const next = useCallback(
    () => setStep((s) => Math.min(STEPS.length - 1, s + 1)),
    []
  );
  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  // Toggle food selection
  const toggleFoodSelection = (categoryId, itemName) => {
    setSelectedFoods((prev) => {
      const key = `${categoryId}-${itemName}`;
      if (prev.includes(key)) {
        return prev.filter((food) => food !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // Check if food is selected
  const isFoodSelected = (categoryId, itemName) => {
    return selectedFoods.includes(`${categoryId}-${itemName}`);
  };

  // Tab content components
  const getTabContent = () => {
    const currentPlan =
      DIET_PLANS.find((p) => p.id === selectedPlanId) || DIET_PLANS[0];
    const weeklyChart = generate7DayChart(currentPlan);

    return {
      overview: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="text-center flex flex-row items-center justify-start gap-5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100  shadow-lg mb-1">
              <currentPlan.icon
                className="text-xl"
                style={{ color: currentPlan.color }}
              />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-900 ">
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
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-teal-900 capitalize">
                    {mealType}
                  </h4>
                  <div className="flex items-center gap-1 text-teal-700">
                    <FaFire className="text-sm" />
                    <span className="font-medium text-sm sm:text-base md:text-lg">
                      {items.reduce((s, i) => s + (i.calories || 0), 0)} cal
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white/90 via-amber-50/60 to-orange-50/40 rounded-2xl p-4 border-2 border-amber-200/50 shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-800 font-medium text-sm sm:text-base md:text-lg">
                          {item.name}
                        </span>
                        <span className="text-teal-700 font-semibold text-sm sm:text-base md:text-lg">
                          {item.calories} cal
                        </span>
                      </div>
                      {item.recipe && (
                        <div className="text-xs sm:text-sm md:text-base text-gray-700 bg-gradient-to-r from-amber-50/80 to-orange-50/60 p-3 rounded-xl border-l-4 border-amber-400 shadow-sm">
                          <strong>Recipe:</strong> {item.recipe}
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
          <div className="flex  sm:gap-2  justify-center overflow-x-auto sm:overflow-x-visible scrollbar-hide">
            {weeklyChart.map((day, index) => (
              <motion.button
                key={day.day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day.day)}
                className={`px-1 sm:px-4 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                  selectedDay === day.day
                    ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 text-white shadow-lg"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-amber-300 hover:bg-teal-50"
                }`}
              >
                <FaCalendarAlt className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">{day.day}</span>
                <span className="sm:hidden">{day.day.substring(0, 3)}</span>
              </motion.button>
            ))}
          </div>

          {/* Selected Day Content */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 p-2 px-6 rounded-2xl border-2 border-amber-200/50 shadow-lg"
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
                  className="bg-gradient-to-r from-white/80 via-amber-50/60 to-orange-50/40 rounded-xl p-4 border-2 border-amber-200/40 shadow-sm"
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
                        className="bg-white/60 rounded-lg p-3 border border-amber-100/50 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                            {item.name}
                          </h5>
                          <span className="text-teal-700 font-semibold text-sm sm:text-base md:text-lg">
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
      selected: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-900 mb-2">
              Selected Foods
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              Your preferred food items
            </p>
          </div>

          {selectedFoods.length === 0 ? (
            <div className="text-center py-8">
              <FaUtensils className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                No foods selected yet
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Go back to step 1 to select your preferred foods
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FOOD_CATEGORIES.map((category) => {
                const categoryFoods = selectedFoods.filter((food) =>
                  food.startsWith(`${category.id}-`)
                );
                if (categoryFoods.length === 0) return null;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-2xl border-2 border-amber-200/50 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon
                        className="text-xl"
                        style={{ color: category.color }}
                      />
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-teal-900">
                        {category.name}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {categoryFoods.map((foodKey) => {
                        const itemName = foodKey.split("-").slice(1).join("-");
                        const item = category.items.find(
                          (item) => item.name === itemName
                        );
                        return (
                          <div
                            key={foodKey}
                            className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-white/80 via-teal-50/60 to-cyan-50/40 rounded-xl border-2 border-amber-200/40 shadow-sm"
                          >
                            <span className="text-gray-800 font-medium text-sm sm:text-base md:text-lg">
                              {itemName}
                            </span>
                            <span className="text-teal-700 font-semibold text-sm sm:text-base md:text-lg">
                              {item?.calories} cal
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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
            animate={{ opacity: i === step ? 1 : 0 }}
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
          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-teal-200/20 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center  flex-row flex items-center justify-between gap-5"
              >
                <div className="flex-row flex items-center justify-start gap-5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className=" items-center flex-row flex justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 mb-3 shadow-lg"
                  >
                    {React.createElement(STEPS[step].icon, {
                      className: "text-lg",
                      style: { color: STEPS[step].color },
                    })}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-teal-900 mb-4"
                  >
                    {STEPS[step].title}
                  </motion.h2>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 overflow-y-auto min-h-0"
              >
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="text-center"
                  >
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-8 flex items-center justify-center gap-3">
                      <FaRocket className="text-teal-600 text-2xl" />
                      Welcome to Your Personalized Diet Chart
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={next}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm sm:text-base md:text-lg lg:text-xl shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transition-all duration-150"
                      >
                        <FaPlay className="text-2xl" />
                        Start Customizing
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32 }}
                    className="max-w-6xl mx-auto"
                  >
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-3 justify-center">
                        {FOOD_CATEGORIES.map((category, index) => (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 px-4 py-2 rounded-2xl border-2 border-amber-200/50 shadow-lg min-w-[200px] max-w-[250px]"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <category.icon
                                className="text-lg"
                                style={{ color: category.color }}
                              />
                              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-teal-900">
                                {category.name}
                              </h3>
                            </div>
                            <div className="space-y-2">
                              {category.items.map((item) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`rounded-2xl border-2 transition-all duration-150 ${
                                    isFoodSelected(category.id, item.name)
                                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-500"
                                      : "bg-white/60 hover:bg-teal-50 text-gray-800 border-gray-200"
                                  }`}
                                >
                                  <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() =>
                                      toggleFoodSelection(
                                        category.id,
                                        item.name
                                      )
                                    }
                                    className="w-full p-2 sm:p-3 text-left flex items-center justify-between"
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-xs sm:text-sm md:text-base">
                                        {item.name}
                                      </div>
                                      <div className="text-xs opacity-75">
                                        {item.calories} cal
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {isFoodSelected(
                                        category.id,
                                        item.name
                                      ) ? (
                                        <FaMinus className="text-sm" />
                                      ) : (
                                        <FaPlus className="text-sm" />
                                      )}
                                    </div>
                                  </motion.button>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col h-full"
                  >
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 mb-1 justify-center">
                      {[
                        { id: "overview", name: "Overview", icon: FaEye },
                        {
                          id: "weekly",
                          name: "7-Day Chart",
                          icon: FaCalendarAlt,
                        },
                        {
                          id: "selected",
                          name: "Selected Foods",
                          icon: FaList,
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
                          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-150 flex items-center gap-2 ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                              : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-amber-300 hover:bg-teal-50"
                          }`}
                        >
                          <tab.icon className="text-sm sm:text-base md:text-xl" />
                          {tab.name}
                        </motion.button>
                      ))}
                    </div>
                    {/* Tab Content */}
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-teal-200/20 overflow-y-auto min-h-0"
                    >
                      {getTabContent()[activeTab]}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center justify-between mt-3 flex-shrink-0"
              >
                <motion.button
                  whileHover={{
                    scale: step === 0 ? 1 : 1.05,
                    y: step === 0 ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  disabled={step === 0}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-white/95 via-teal-50/80 to-cyan-50/60 backdrop-blur-sm border-2 border-amber-200/60 text-teal-700 text-xs sm:text-sm md:text-lg disabled:opacity-50 transition-all duration-100 flex items-center gap-2 shadow-md"
                >
                  <FaChevronLeft />
                  Previous
                </motion.button>

                <div className="flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setStep(i)}
                      className={`w-4 h-4 rounded-full transition-all duration-150 flex items-center justify-center border-2 ${
                        i === step
                          ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 border-amber-400 shadow-lg shadow-amber-200 scale-125"
                          : "bg-white/60 border-amber-200/60"
                      }`}
                    >
                      {i === step && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1 h-1 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {step < STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white text-xs sm:text-sm md:text-lg shadow-lg transition-all duration-100 flex items-center gap-2 border-2 border-teal-400"
                  >
                    Next
                    <FaChevronRight />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Export or share functionality
                      alert("Diet chart exported successfully!");
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-xs sm:text-sm md:text-lg shadow-lg transition-all duration-100 flex items-center gap-2 border-2 border-green-400"
                  >
                    <FaDownload />
                    Download Report
                  </motion.button>
                )}
              </motion.div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
