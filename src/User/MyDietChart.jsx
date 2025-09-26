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
  FaChartLine,
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
        name: "cyan",
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

  // Mock patient data for ML model filtering
  const patientData = {
    name: "Ananya Desai",
    basic: {
      age: 31,
      gender: "female",
      date: "2025-01-15",
    },
    anthro: {
      height: 165,
      weight: 62,
      bmi: 22.8,
      waist: 75,
    },
    vitals: {
      pulseRate: 74,
      bloodPressure: "118/76",
      waterIntake: "2-3 L",
      mealFrequency: "3",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Lacto-vegetarian",
      physicalActivities: "moderate",
      addictionHabits: ["Tea"],
      dosha: "Pitta",
      rasa: "sweet",
    },
    medical: {
      medicalHistory: "No chronic conditions. Mild seasonal allergies.",
      bowelMovements: "regular",
      allergies: "None",
    },
    notes: "Prefers warm breakfasts. Wants to increase iron intake.",
  };

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
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="text-center flex flex-row items-center justify-start gap-3">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 shadow-md mb-1">
              <currentPlan.icon
                className="text-lg"
                style={{ color: currentPlan.color }}
              />
            </div>
            <h3 className="text-lg sm:text-base md:text-lg font-bold text-teal-900">
              {currentPlan.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {Object.entries(currentPlan.meals).map(([mealType, items]) => (
              <div
                key={mealType}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-white to-teal-50/30 p-2 sm:p-3 rounded-md border-t-2 border-teal-200/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-teal-900 capitalize">
                    {mealType}
                  </h4>
                  <div className="flex items-center gap-1 text-teal-700">
                    <FaFire className="text-sm sm:text-lg" />
                    <span className="font-medium text-sm sm:text-base md:text-lg">
                      {items.reduce((s, i) => s + (i.calories || 0), 0)} cal
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white/90 via-teal-50/60 to-cyan-50/40 rounded-md p-2 border border-teal-200/50 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-800 font-medium text-sm sm:text-base md:text-lg">
                          {item.name}
                        </span>
                        <span className="text-teal-700 font-medium text-sm sm:text-base md:text-lg">
                          {item.calories} cal
                        </span>
                      </div>
                      {item.recipe && (
                        <div className="text-xs sm:text-sm md:text-lg text-gray-700 p-2 rounded-md border-l-2 border-teal-400">
                          <strong>Recipe:</strong> {item.recipe}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      weekly: (
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* Day Tabs */}
          <div className="flex gap-1 justify-start sm:justify-center overflow-x-auto sm:overflow-x-visible scrollbar-hide pb-2 px-1">
            {weeklyChart.map((day, index) => (
              <button
                key={day.day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day.day)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-lg font-medium transition-all duration-150 flex items-center gap-1 whitespace-nowrap min-h-[40px] sm:min-h-[44px] flex-shrink-0 ${
                  selectedDay === day.day
                    ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 text-white shadow-md"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                <FaCalendarAlt className="text-xs sm:text-sm md:text-lg" />
                <span className="hidden sm:inline">{day.day}</span>
                <span className="sm:hidden">{day.day.substring(0, 3)}</span>
              </button>
            ))}
          </div>

          {/* Selected Day Content */}
          <div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 rounded-md border border-teal-200/50 shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-teal-900">
                {selectedDay} Meal Plan
              </h3>
              <div className="flex items-center gap-1 text-teal-700">
                <FaFire className="text-lg" />
                <span className="text-lg font-medium">
                  {
                    weeklyChart.find((day) => day.day === selectedDay)
                      ?.totalCalories
                  }{" "}
                  cal
                </span>
              </div>
            </div>

            <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(
                weeklyChart.find((day) => day.day === selectedDay)?.meals || {}
              ).map(([mealType, items]) => (
                <div
                  key={mealType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gradient-to-r from-white/80 via-teal-50/60 to-cyan-50/40 rounded-md p-2 border-l-4 border-teal-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm md:text-lg">
                        {mealType.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 capitalize">
                      {mealType}
                    </h4>
                    <div className="flex items-center gap-1 text-teal-700 ml-auto">
                      <FaFire className="text-xs sm:text-sm md:text-lg" />
                      <span className="font-medium text-xs sm:text-sm md:text-lg">
                        {items.reduce((sum, item) => sum + item.calories, 0)}{" "}
                        cal
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                        className="bg-white/60 rounded-md p-2 border-b-2 border-teal-200"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs sm:text-sm md:text-lg font-medium text-gray-700 truncate">
                            {item.name}
                          </h5>
                          <span className="text-teal-700 font-medium text-xs sm:text-sm md:text-lg">
                            {item.calories} cal
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      selected: (
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-teal-900 mb-1">
              Selected Foods
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-700">
              Your preferred food items
            </p>
          </div>

          {selectedFoods.length === 0 ? (
            <div className="text-center py-4 sm:py-6">
              <FaUtensils className="text-2xl sm:text-3xl text-gray-400 mx-auto mb-3" />
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                No foods selected yet
              </p>
              <p className="text-xs sm:text-sm md:text-lg text-gray-500">
                Go back to step 1 to select your preferred foods
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {FOOD_CATEGORIES.map((category) => {
                const categoryFoods = selectedFoods.filter((food) =>
                  food.startsWith(`${category.id}-`)
                );
                if (categoryFoods.length === 0) return null;

                return (
                  <div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-2 sm:p-3 rounded-md border-l-2 border-teal-200/50"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
                      <category.icon
                        className="text-sm sm:text-lg"
                        style={{ color: category.color }}
                      />
                      <h4 className="text-sm sm:text-base md:text-lg font-medium text-teal-900">
                        {category.name}
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {categoryFoods.map((foodKey) => {
                        const itemName = foodKey.split("-").slice(1).join("-");
                        const item = category.items.find(
                          (item) => item.name === itemName
                        );
                        return (
                          <div
                            key={foodKey}
                            className="flex items-center justify-between py-1.5 sm:py-2 px-2 rounded-md border-b-2 border-teal-200/40"
                          >
                            <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-lg truncate">
                              {itemName}
                            </span>
                            <span className="text-teal-700 font-medium text-xs sm:text-sm md:text-lg">
                              {item?.calories} cal
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ),
    };
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Enhanced Ayurvedic Particle System */}
      <AyurvedicParticleSystem count={0} />

      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {BG_LAYERS.map((b, i) => (
          <div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === step ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: b.gradient }}
            className="absolute inset-0"
          />
        ))}

        {/* Enhanced Floating Blobs */}
        <div
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
        <div
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
      <div className="h-screen w-screen flex items-center justify-center pt-12 sm:pt-16 pb-2 sm:pb-4">
        <div className="w-full max-w-7xl h-full flex flex-col">
          <AnimatePresence mode="">
            <section
              key={step}
              className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-2 sm:pb-2 md:pb-4 lg:pb-4 shadow-2xl border border-teal-200/20 flex flex-col overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8"
            >
              {/* Header */}
              <div className="text-center flex-row flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-0">
                <div className="flex-row flex items-center justify-start gap-2 sm:gap-3">
                  <div className="items-center flex-row flex justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 shadow-md">
                    {React.createElement(STEPS[step].icon, {
                      className: "text-sm sm:text-lg",
                      style: { color: STEPS[step].color },
                    })}
                  </div>

                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-teal-900">
                    {STEPS[step].title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div
                initial={step === 0 ? { opacity: 0, y: 30 } : false}
                animate={step === 0 ? { opacity: 1, y: 0 } : {}}
                transition={step === 0 ? { duration: 0.5, delay: 0.2 } : {}}
                className="flex-1 overflow-y-auto min-h-0"
              >
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    {/* Welcome Header */}
                    <div className="mb-4 sm:mb-6">
                      <p className="text-sm sm:text-md md:text-lg text-gray-600 max-w-6xl leading-relaxed">
                        <span className="font-bold text-teal-600 ml-2 sm:ml-4 mr-1">
                          Note :
                        </span>
                        Based on your health profile, our we will recommend the
                        best food items for your personalized diet plan.
                      </p>
                    </div>

                    {/* Patient Profile Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-md border border-teal-200/60 shadow-md mb-4 sm:mb-6"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center shadow-md">
                          <span className="text-white text-sm sm:text-lg font-bold">
                            {patientData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 truncate">
                            {patientData.name}
                          </h3>
                          <p className="text-sm sm:text-lg text-gray-600">
                            {patientData.basic.age} years •{" "}
                            {patientData.basic.gender} • BMI:{" "}
                            {patientData.anthro.bmi}
                          </p>
                        </div>
                        <div className="text-right self-end sm:self-auto">
                          <div className="text-xs sm:text-md text-gray-500">
                            Last Updated
                          </div>
                          <div className="text-sm sm:text-lg font-medium text-teal-600">
                            {patientData.basic.date}
                          </div>
                        </div>
                      </div>

                      {patientData.notes && (
                        <div className="bg-teal-50/80 p-2 sm:p-3 rounded-md border-l-2 border-teal-400">
                          <p className="text-sm sm:text-lg text-gray-700">
                            <strong>Notes:</strong> {patientData.notes}
                          </p>
                        </div>
                      )}
                    </motion.div>

                    {/* Health Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md border border-gray-200/60 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                            <FaUser className="text-white text-xs sm:text-lg" />
                          </div>
                          <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                            Basic Info
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-medium text-blue-600">
                              {patientData.basic.age}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Gender:</span>
                            <span className="font-medium text-blue-600">
                              {patientData.basic.gender}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md border border-gray-200/60 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                            <FaWeight className="text-white text-xs sm:text-lg" />
                          </div>
                          <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                            Anthropometrics
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Height:</span>
                            <span className="font-medium text-green-600">
                              {patientData.anthro.height} cm
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Weight:</span>
                            <span className="font-medium text-green-600">
                              {patientData.anthro.weight} kg
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">BMI:</span>
                            <span className="font-medium text-green-600">
                              {patientData.anthro.bmi}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md border border-gray-200/60 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center">
                            <FaHeartbeat className="text-white text-xs sm:text-lg" />
                          </div>
                          <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                            Vitals
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Pulse:</span>
                            <span className="font-medium text-red-600">
                              {patientData.vitals.pulseRate} BPM
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">BP:</span>
                            <span className="font-medium text-red-600">
                              {patientData.vitals.bloodPressure}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Water:</span>
                            <span className="font-medium text-red-600">
                              {patientData.vitals.waterIntake}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md border border-gray-200/60 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <FaUtensils className="text-white text-xs sm:text-lg" />
                          </div>
                          <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                            Lifestyle
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Diet:</span>
                            <span className="font-medium text-purple-600">
                              {patientData.lifestyle.dietaryHabits}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Activity:</span>
                            <span className="font-medium text-purple-600">
                              {patientData.lifestyle.physicalActivities}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-md">
                            <span className="text-gray-600">Dosha:</span>
                            <span className="font-medium text-purple-600">
                              {patientData.lifestyle.dosha}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* ML Model Input Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="bg-gradient-to-r from-teal-50/80 to-cyan-50/80 p-3 sm:p-4 rounded-md border border-teal-200/60 shadow-sm mb-4 sm:mb-6"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                          <FaChartLine className="text-white text-sm sm:text-lg" />
                        </div>
                        <h4 className="text-sm sm:text-lg font-bold text-teal-900">
                          Model Input Summary
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <div className="text-sm sm:text-lg font-medium text-gray-700">
                            Key Health Factors:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {[
                              `Female, ${patientData.basic.age} years`,
                              `BMI: ${patientData.anthro.bmi}`,
                              patientData.lifestyle.dietaryHabits,
                              patientData.lifestyle.dosha,
                              patientData.lifestyle.physicalActivities,
                            ].map((factor, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 sm:px-2 py-1 bg-white/80 rounded-md text-xs sm:text-md text-teal-700 border border-teal-200"
                              >
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm sm:text-lg font-medium text-gray-700">
                            Dietary Preferences:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {[
                              patientData.lifestyle.cuisinePreference,
                              patientData.lifestyle.rasa,
                              patientData.vitals.mealFrequency + " meals/day",
                              patientData.vitals.waterIntake,
                            ].map((pref, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 sm:px-2 py-1 bg-white/80 rounded-md text-xs sm:text-md text-cyan-700 border border-cyan-200"
                              >
                                {pref}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Button */}
                    <div className="text-center">
                      <button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={next}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm sm:text-lg shadow-md hover:shadow-lg flex items-center gap-2 justify-center transition-all duration-150 mx-auto w-full sm:w-auto"
                      >
                        <FaPlay className="text-sm sm:text-lg" />
                        <span className="truncate">
                          Generate Personalized Diet Chart
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <div className="max-w-6xl mx-auto">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-2">
                        {FOOD_CATEGORIES.map((category, index) => (
                          <div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 px-2 sm:px-3 py-2 rounded-md border border-teal-200/50 shadow-md"
                          >
                            <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
                              <category.icon
                                className="text-sm sm:text-lg"
                                style={{ color: category.color }}
                              />
                              <h3 className="text-xs sm:text-sm md:text-lg font-medium text-teal-900 truncate">
                                {category.name}
                              </h3>
                            </div>
                            <div className="space-y-1 sm:space-y-1.5">
                              {category.items.map((item) => (
                                <div
                                  key={item.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`rounded-md border-t-2 transition-all duration-150 ${
                                    isFoodSelected(category.id, item.name)
                                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-500"
                                      : "bg-white/60 hover:bg-teal-50 text-gray-800 border-teal-200"
                                  }`}
                                >
                                  <button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() =>
                                      toggleFoodSelection(
                                        category.id,
                                        item.name
                                      )
                                    }
                                    className="w-full p-1.5 sm:p-2 text-left flex items-center justify-between min-h-[44px] sm:min-h-[48px]"
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-xs sm:text-sm md:text-lg truncate">
                                        {item.name}
                                      </div>
                                      <div className="text-xs sm:text-sm md:text-lg opacity-75">
                                        {item.calories} cal
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 ml-2">
                                      {isFoodSelected(
                                        category.id,
                                        item.name
                                      ) ? (
                                        <FaMinus className="text-xs sm:text-sm md:text-lg" />
                                      ) : (
                                        <FaPlus className="text-xs sm:text-sm md:text-lg" />
                                      )}
                                    </div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col h-full">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 justify-center">
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
                        <button
                          key={tab.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-2 sm:px-3 py-1.5 sm:py-1.5 rounded-md text-xs sm:text-sm md:text-lg font-medium transition-all duration-150 flex items-center gap-1 sm:gap-1.5 min-h-[40px] sm:min-h-[44px] ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
                              : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                          }`}
                        >
                          <tab.icon className="text-xs sm:text-sm md:text-lg" />
                          <span className="hidden sm:inline">{tab.name}</span>
                          <span className="sm:hidden">
                            {tab.name.split(" ")[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                    {/* Tab Content */}
                    <div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 bg-white/90 backdrop-blur-sm rounded-md p-2 sm:p-3 border border-teal-200/20 overflow-y-auto min-h-0"
                    >
                      {getTabContent()[activeTab]}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between flex-shrink-0 gap-2 sm:gap-4">
                <button
                  whileHover={{
                    scale: step === 0 ? 1 : 1.05,
                    y: step === 0 ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  disabled={step === 0}
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md bg-gradient-to-r from-white/95 via-teal-50/80 to-cyan-50/60 backdrop-blur-sm border border-teal-200/60 text-teal-700 text-xs sm:text-sm md:text-lg disabled:opacity-50 transition-all duration-100 flex items-center gap-1 sm:gap-1.5 shadow-sm min-h-[40px] sm:min-h-[44px]"
                >
                  <FaChevronLeft className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setStep(i)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-150 flex items-center justify-center border ${
                        i === step
                          ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 border-teal-400 shadow-md shadow-teal-200 scale-125"
                          : "bg-white/60 border-teal-200/60"
                      }`}
                    >
                      {i === step && (
                        <div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {step < STEPS.length - 1 ? (
                  <button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white text-xs sm:text-sm md:text-lg shadow-md transition-all duration-100 flex items-center gap-1 sm:gap-1.5 border border-teal-400 min-h-[40px] sm:min-h-[44px]"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <FaChevronRight className="text-xs sm:text-sm" />
                  </button>
                ) : (
                  <button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Export or share functionality
                      alert("Diet chart exported successfully!");
                    }}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-xs sm:text-sm md:text-lg shadow-md transition-all duration-100 flex items-center gap-1 sm:gap-1.5 border border-green-400 min-h-[40px] sm:min-h-[44px]"
                  >
                    <FaDownload className="text-xs sm:text-sm" />
                    <span className="hidden sm:inline">Download Report</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                )}
              </div>
            </section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
