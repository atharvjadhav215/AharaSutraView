import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import SelectFood from "../components/SelectFood";
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

// Meal-based Food Categories
const MEAL_CATEGORIES = {
  breakfast: [
    {
      name: "Charishma'S Addictive Methi Theplas",
      calories: 445,
      recipe:
        "Heat a non-stick griddle (tawa) on medium flame. Knead all ingredients thoroughly well in a big bowl. Roll out each round ball to form a 'thepla'. Cook on both sides with oil until golden brown.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Lavana, Katu, Tikta",
    },
    {
      name: "Indians Cookie",
      calories: 314,
      recipe:
        "Melt chocolate, cream butter and sugar, add vanilla and eggs. Stir in melted chocolate, add dry ingredients and nuts. Bake at 350°F for 25 minutes.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Madhura, Lavana",
    },
    {
      name: "Baklava - An Milk Sweet In Sugar Syrup",
      calories: 553,
      recipe:
        "Heat butter, add vermicelli and fry until golden. Layer in tray with milk-semolina mixture and nuts. Bake and pour sugar syrup over it.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Madhura",
    },
    {
      name: "Americanized Daal Baati",
      calories: 247,
      recipe:
        "Mix flour, sooji, baking powder with milk to make dough. Cook dal with spices. Drop dumplings into dal and simmer for 15 minutes.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Amla, Lavana, Katu",
    },
    {
      name: "Scrambled Eggs",
      calories: 368,
      recipe:
        "Beat eggs with chili flakes and pepper. Fry onion until translucent, add turmeric and salt. Add egg mixture and scramble until cooked.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Lavana, Katu",
    },
    {
      name: "Indian Coffee",
      calories: 65,
      recipe:
        "Boil water with cardamom, cinnamon, nutmeg, and clove. Add brewed coffee. Heat milk separately, strain coffee into milk, add sugar.",
      dosha: "Kapha, Vata",
      region: "West",
      rasas: "Madhura, Amla, Katu",
    },
    {
      name: "Chai Latte Muffins",
      calories: 312,
      recipe:
        "Mix dry ingredients, add milk, butter, egg, and vanilla. Stir in white chocolate chips. Top with cream cheese mixture and bake at 375°F.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Lavana",
    },
  ],
  lunch: [
    {
      name: "Boka Dushi",
      calories: 189,
      recipe:
        "Marinate chicken with ketjap manis, lime juice, cumin, ginger, sambal oelek, and turmeric. Thread onto skewers and grill 2 minutes each side.",
      dosha: "Vata, Kapha",
      region: "West Indian",
      rasas: "Madhura, Amla, Katu",
    },
    {
      name: "West Rice And Beans",
      calories: 461,
      recipe:
        "Combine broth, beans, coconut milk, jalapeño, thyme, and allspice. Bring to boil, add rice. Simmer until liquid absorbed and rice is tender.",
      dosha: "Vata, Kapha",
      region: "West Indian",
      rasas: "Sweet, Sour",
    },
    {
      name: "Creamy North Fish Curry",
      calories: 379,
      recipe:
        "Heat oil, add mustard seeds. Add onion, garlic, ginger paste with spices. Add water, vinegar, coconut cream. Add fish and cook 5-6 minutes.",
      dosha: "Vata, Kapha",
      region: "West Bengal",
      rasas: "Katu",
    },
    {
      name: "South Fish Curry",
      calories: 50,
      recipe:
        "Mix chili, turmeric, coriander powder with water. Heat oil, add mustard and fenugreek seeds. Add shallots, spice paste, water, and tamarind. Add fish and cook 20-25 minutes.",
      dosha: "Vata, Kapha",
      region: "West Bengal",
      rasas: "Amla, Katu",
    },
    {
      name: "Fish Curry/Chettinad Fish Curry",
      calories: 1126,
      recipe:
        "Apply salt and turmeric to fish. Sauté fennel, fenugreek, onions, garlic. Add tomatoes, spices, water, tamarind. Add coconut milk and fish, cook 5 minutes.",
      dosha: "Vata, Kapha",
      region: "West Bengal",
      rasas: "Amla, Lavana, Katu",
    },
    {
      name: "West Pumpkin Soup",
      calories: 186,
      recipe:
        "Brown onions in butter, add garlic, pumpkin, and broth. Add herbs and simmer 45 minutes. Puree pumpkin, strain liquid, combine with cream and cinnamon.",
      dosha: "Kapha, Vata",
      region: "West",
      rasas: "Sweet, Sour",
    },
    {
      name: "Broccoli With - Yogurt",
      calories: 105,
      recipe:
        "Cook broccoli in salted water 4-5 minutes. Heat oil, add broccoli. Toast cumin, fennel, cardamom, grind. Mix with yogurt and lemon, drizzle over broccoli.",
      dosha: "Kapha, Pitta",
      region: "West",
      rasas: "Amla",
    },
    {
      name: "West Rum Stew Recipe",
      calories: 370,
      recipe:
        "Layer all ingredients in casserole. Combine sauce ingredients, pour over. Heat in 325°F oven for 1-1.5 hours. Add olives and rum before serving.",
      dosha: "Kapha, Vata",
      region: "West",
      rasas: "Sweet, Sour",
    },
  ],
  dinner: [
    {
      name: "Rasgulla And/Or Rasmalai",
      calories: 131,
      recipe:
        "Boil milk, add lemon juice to curdle. Strain, knead chenna 7 minutes. Make balls, cook in sugar syrup. For rasmalai, flatten and cook in thickened milk.",
      dosha: "Vata, Kapha",
      region: "West Bengal",
      rasas: "Madhura, Amla",
    },
    {
      name: "West - Channa Wrap",
      calories: 201,
      recipe:
        "Heat oil, cook onions until soft. Add garlic, chili, ginger, spices. Add chickpeas with water, simmer 50-60 minutes until thick. Serve in tortillas.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Lavana, Katu",
    },
    {
      name: "American Sunflower Seed Cakes",
      calories: 222,
      recipe:
        "Simmer sunflower seeds in water for 1 hour. Drain and grind. Mix with cornmeal and maple syrup to form dough. Shape into cakes and fry in hot oil.",
      dosha: "Kapha, Pitta",
      region: "West",
      rasas: "Sweet, Sour",
    },
    {
      name: "Tuna Pita Pockets With An Twist",
      calories: 162,
      recipe:
        "Heat oil, stir fry cumin seeds. Add ground spices, onions, pepper. Add tuna, green chilies, ginger. Cook 5 minutes, add fresh coriander and garam masala.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Lavana, Katu",
    },
    {
      name: "Cornmeal & Berry Dessert",
      calories: 224,
      recipe:
        "Soak cornmeal in water. Melt butter, add cornmeal mixture. Heat 15 minutes until thick. Add juice, berries, nutmeg. Add cream, maple syrup, and eggs.",
      dosha: "Kapha, Vata",
      region: "West",
      rasas: "Madhura",
    },
    {
      name: "Ocean Gazpacho",
      calories: 104,
      recipe:
        "Blend chili powder, ginger, garlic, green chili, sugar, yogurt, lemon juice, mint until smooth. Blend yogurt soup ingredients, chill. Serve garnished with mint chutney.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Madhura, Amla, Lavana, Katu",
    },
    {
      name: "Indian Macaroni And Cheese",
      calories: 1022,
      recipe:
        "Cook macaroni according to package directions. Heat milk to simmer, add cubed cheese. Melt cheese, add macaroni. Let stand 5 minutes to thicken.",
      dosha: "Kapha",
      region: "West",
      rasas: "Sweet",
    },
    {
      name: "West Crispy Pork Bits",
      calories: 539,
      recipe:
        "Cube pork, toss with spices, onion, olive oil, lime juice. Marinate up to 2 days. Roast at 375°F for 1 hour, stirring occasionally until crisp.",
      dosha: "Vata, Kapha",
      region: "West",
      rasas: "Amla, Lavana",
    },
  ],
};

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
  const toggleFoodSelection = (mealType, itemName) => {
    setSelectedFoods((prev) => {
      const key = `${mealType}-${itemName}`;
      if (prev.includes(key)) {
        return prev.filter((food) => food !== key);
      } else {
        return [...prev, key];
      }
    });
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
              {Object.entries(MEAL_CATEGORIES).map(([mealType, items]) => {
                const mealFoods = selectedFoods.filter((food) =>
                  food.startsWith(`${mealType}-`)
                );
                if (mealFoods.length === 0) return null;

                const mealIcons = {
                  breakfast: FaCoffee,
                  lunch: FaUtensils,
                  dinner: FaAppleAlt,
                };
                const mealColors = {
                  breakfast: "#F59E0B",
                  lunch: "#10B981",
                  dinner: "#6366F1",
                };

                const MealIcon = mealIcons[mealType];

                return (
                  <div
                    key={mealType}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-2 sm:p-3 rounded-md border-l-2 border-teal-200/50"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-2">
                      <MealIcon
                        className="text-sm sm:text-lg"
                        style={{ color: mealColors[mealType] }}
                      />
                      <h4 className="text-sm sm:text-base md:text-lg font-medium text-teal-900 capitalize">
                        {mealType}
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {mealFoods.map((foodKey) => {
                        const itemName = foodKey.split("-").slice(1).join("-");
                        const item = items.find(
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
        <div className="w-full max-w-8xl h-full flex flex-col">
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
              <motion.div
                initial={step === 0 ? { opacity: 0, y: 30 } : undefined}
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
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={next}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm sm:text-lg shadow-md hover:shadow-lg flex items-center gap-2 justify-center transition-all duration-150 mx-auto w-full sm:w-auto"
                      >
                        <FaPlay className="text-sm sm:text-lg" />
                        <span className="truncate">
                          Generate Personalized Diet Chart
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <div className="max-w-7xl mx-auto">
                    {/* Enhanced Food Selection Component */}
                    <SelectFood
                      selectedFoods={selectedFoods}
                      onToggleFoodSelection={toggleFoodSelection}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col h-full">
                    {/* Tab Navigation - Desktop Only */}
                    <div className="hidden md:flex flex-wrap gap-1 sm:gap-1.5 mb-2 justify-center">
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
                      className="flex-1 bg-white/90 backdrop-blur-sm rounded-md p-2 sm:p-3 border border-teal-200/20 overflow-y-auto min-h-0 md:mb-0 mb-2"
                    >
                      {getTabContent()[activeTab]}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between flex-shrink-0 gap-2 sm:gap-4 relative z-10">
                <motion.button
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
                </motion.button>

                <div className=" hidden md:flex items-center gap-1 sm:gap-1.5">
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
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white text-xs sm:text-sm md:text-lg shadow-md transition-all duration-100 flex items-center gap-1 sm:gap-1.5 border border-teal-400 min-h-[40px] sm:min-h-[44px]"
                  >
                    <span className="hidden sm:inline">Next</span>

                    <FaChevronRight className="text-xs sm:text-sm" />
                  </motion.button>
                ) : (
                  <motion.button
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
                  </motion.button>
                )}
              </div>
            </section>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed Bottom Tab Navigation - Mobile Only, visible on step 2 */}
      {step === 2 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-t from-teal-50/95 to-cyan-50/95 backdrop-blur-md border-t border-teal-200/60 shadow-lg"
          >
            {/* Tab Navigation */}
            <div className="flex justify-around px-2 py-2">
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
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeTab === tab.id ? "bg-white/20" : ""
                    }`}
                  >
                    <tab.icon
                      className={`text-lg ${
                        activeTab === tab.id ? "text-white" : "text-teal-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium mt-1 truncate ${
                      activeTab === tab.id ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {tab.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
