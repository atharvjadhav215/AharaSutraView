import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  AnimatePresence,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTranslation } from "./dietChartTranslations";
import LanguageSelector from "./LanguageSelector";
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
  FaIdCard,
  FaCalendarAlt,
  FaVenus,
  FaRuler,
  FaFire,
  FaHamburger,
  FaRunning,
  FaFlag,
  FaExclamationCircle,
  FaBan,
  FaChartBar,
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

// Enhanced Parallax Component
const ParallaxLayer = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${(speed - 1) * 100}%`]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// 3D Card Component
const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

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
    icon: FaLeaf,
    color: "#10B981",
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
    icon: FaFire,
    color: "#F59E0B",
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
    icon: FaDumbbell,
    color: "#6366F1",
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
    icon: FaSeedling,
    color: "#06B6D4",
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
    title: "Hello",
    subtitle: "Let's create a diet chart — quick & friendly",
    kind: "intro",
    icon: FaRocket,
    color: "#A0D9D9",
  },
  {
    id: 1,
    title: "Tell us about you",
    subtitle: "Name, age and gender",
    kind: "basic",
    icon: FaUser,
    color: "#7BC4C4",
  },
  {
    id: 2,
    title: "Your body",
    subtitle: "Height & weight (used for BMI)",
    kind: "anthro",
    icon: FaRulerVertical,
    color: "#5BAFAF",
  },
  {
    id: 3,
    title: "Goal",
    subtitle: "",
    kind: "goals",
    icon: FaBullseye,
    color: "#4A9B9B",
  },
  {
    id: 4,
    title: "Habits",
    subtitle: "Dietary preference & activity",
    kind: "lifestyle",
    icon: FaHamburger,
    color: "#3A8787",
  },
  {
    id: 5,
    title: "Food likes / dislikes",
    subtitle: "Allergies and aversions",
    kind: "prefs",
    icon: FaExclamationCircle,
    color: "#2A7373",
  },
  {
    id: 6,
    title: "Review",
    subtitle: "Pick or tweak your plan",
    kind: "review",
    icon: FaChartBar,
    color: "#1A5F5F",
  },
];

const BG_LAYERS = [
  {
    id: 0,
    gradient:
      "radial-gradient( circle at 10% 20%, rgba(160,217,217,0.14), transparent 20% ), linear-gradient(45deg,#F0F9F9,#E8F5F5)",
  },
  {
    id: 1,
    gradient:
      "radial-gradient( circle at 80% 10%, rgba(123,196,196,0.12), transparent 18% ), linear-gradient(135deg,#E8F5F5,#E0F2F2)",
  },
  {
    id: 2,
    gradient:
      "radial-gradient( circle at 30% 80%, rgba(91,175,175,0.10), transparent 18% ), linear-gradient(90deg,#E0F2F2,#D8EFEF)",
  },
  {
    id: 3,
    gradient:
      "radial-gradient( circle at 60% 40%, rgba(74,155,155,0.10), transparent 18% ), linear-gradient(120deg,#E8F5F5,#E0F2F2)",
  },
  {
    id: 4,
    gradient:
      "radial-gradient( circle at 40% 30%, rgba(58,135,135,0.08), transparent 18% ), linear-gradient(60deg,#F0F9F9,#E8F5F5)",
  },
  {
    id: 5,
    gradient:
      "radial-gradient( circle at 20% 80%, rgba(42,115,115,0.08), transparent 18% ), linear-gradient(45deg,#E8F5F5,#E0F2F2)",
  },
  {
    id: 6,
    gradient:
      "radial-gradient( circle at 50% 50%, rgba(26,95,95,0.10), transparent 18% ), linear-gradient(90deg,#E8F5F5,#F0F9F9)",
  },
];

export default function CreateOwnChart() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [language] = useState("en");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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

  // Get translated STEPS based on current language
  const getTranslatedSteps = () =>
    STEPS.map((step) => ({
      ...step,
      title: getTranslation(
        step.id === 0
          ? "helloTitle"
          : step.id === 1
          ? "tellUsTitle"
          : step.id === 2
          ? "yourBodyTitle"
          : step.id === 3
          ? "goalTitle"
          : step.id === 4
          ? "habitsTitle"
          : step.id === 5
          ? "foodLikesTitle"
          : "reviewTitle",
        language
      ),
      subtitle: getTranslation(
        step.id === 0
          ? "helloSubtitle"
          : step.id === 1
          ? "tellUsSubtitle"
          : step.id === 2
          ? "yourBodySubtitle"
          : step.id === 3
          ? "goalSubtitle"
          : step.id === 4
          ? "habitsSubtitle"
          : step.id === 5
          ? "foodLikesSubtitle"
          : "reviewSubtitle",
        language
      ),
    }));

  // Get translated PLANS based on current language
  const getTranslatedPlans = () =>
    PLANS.map((plan) => ({
      ...plan,
      name: getTranslation(
        plan.id === "cooling-pitta"
          ? "coolingPittaPlan"
          : plan.id === "iron-rich"
          ? "ironFocusedPlan"
          : plan.id === "balanced-active"
          ? "balancedActivePlan"
          : plan.id === "light-digestive"
          ? "lightDigestivePlan"
          : "weightLossPlan",
        language
      ),
      description: getTranslation(
        plan.id === "cooling-pitta"
          ? "coolingPittaDesc"
          : plan.id === "iron-rich"
          ? "ironFocusedDesc"
          : plan.id === "balanced-active"
          ? "balancedActiveDesc"
          : plan.id === "light-digestive"
          ? "lightDigestiveDesc"
          : "weightLossDesc",
        language
      ),
      meals: Object.fromEntries(
        Object.entries(plan.meals).map(([mealKey, meals]) => [
          mealKey,
          meals.map((meal) => ({
            ...meal,
            name:
              getTranslation(
                meal.name.toLowerCase().replace(/\s+/g, ""),
                language
              ) || meal.name,
          })),
        ])
      ),
    }));

  const translatedSteps = getTranslatedSteps();
  const translatedPlans = getTranslatedPlans();

  // Form validation (disabled for prototype)
  const validateStep = useCallback(() => {
    // Always return true for prototype - no validation required
    setErrors({});
    return true;
  }, []);

  // Define functions before useEffect to avoid hoisting issues
  const next = useCallback(() => {
    if (validateStep()) {
      setStep((s) => Math.min(translatedSteps.length - 1, s + 1));
      setErrors({});
    }
  }, [validateStep, translatedSteps.length]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
  }, []);

  // generator heuristic (prototype - simplified logic)
  const generatedPlan = useMemo(() => {
    const { goals, lifestyle, anthro } = answers;
    const goal = (goals.goal || "").toLowerCase();
    const diet = (lifestyle.dietaryHabits || "").toLowerCase();
    const act = (lifestyle.activity || "").toLowerCase();

    // Check for specific goals first
    if (goal.includes("iron") || goal.includes("anemia"))
      return translatedPlans.find((p) => p.id === "iron-rich");
    if (diet.includes("vegan") || diet.includes("vegetarian"))
      return translatedPlans.find((p) => p.id === "light-digestive");
    if (
      act.includes("active") ||
      goal.includes("muscle") ||
      goal.includes("gain")
    )
      return translatedPlans.find((p) => p.id === "balanced-active");

    // BMI-based logic only if both height and weight are provided and valid
    const h = parseFloat(String(anthro.height || "").replace(/[^\d.]/g, ""));
    const w = parseFloat(String(anthro.weight || "").replace(/[^\d.]/g, ""));
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
      const bmi = w / ((h / 100) * (h / 100));
      if (bmi < 20)
        return translatedPlans.find((p) => p.id === "balanced-active");
      if (bmi > 27)
        return translatedPlans.find((p) => p.id === "light-digestive");
    }

    // Default to first plan if no specific criteria match
    return translatedPlans[0];
  }, [answers, translatedPlans]);

  const finish = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage(
        "Added in your Daily Chart! You can see in Your Profile"
      );
      setShowSuccessModal(true);

      // Auto navigate after showing success message
      setTimeout(() => {
        const plan =
          translatedPlans.find((p) => p.id === selectedPlanId) || generatedPlan;
        navigate("/uProfile", {
          state: { plan, answers },
        });
      }, 2000);
    } catch (error) {
      console.error("Error saving plan:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPlanId, generatedPlan, navigate, answers, translatedPlans]);

  // keyboard navigation and accessibility
  useEffect(() => {
    const onKey = (e) => {
      // Don't interfere with input fields, textareas, or select elements
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "SELECT" ||
        e.target.isContentEditable ||
        e.target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      if (e.key === "ArrowRight" && !loading) {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" && !loading) {
        e.preventDefault();
        prev();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (step < translatedSteps.length - 1) next();
        else finish();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        // Close any modals or go back
        if (step > 0) prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, loading, next, prev, finish, translatedSteps.length]);

  // Focus management for accessibility
  useEffect(() => {
    // Only focus on main content if no input is currently focused
    const activeElement = document.activeElement;
    const isInputFocused =
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.tagName === "SELECT");

    // Only focus main content if no input is currently focused
    if (!isInputFocused) {
      const mainContent = document.querySelector('[role="main"]');
      if (mainContent) {
        mainContent.focus();
      }
    }

    // Announce step change to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = `Step ${step + 1} of ${
      translatedSteps.length
    }: ${translatedSteps[step].title}`;
    document.body.appendChild(announcement);

    // Remove announcement after a short delay
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, [step, translatedSteps]);

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

  // Initialize selectedPlanId only once when component mounts
  useEffect(() => {
    if (!selectedPlanId && generatedPlan?.id) {
      setSelectedPlanId(generatedPlan.id);
    }
  }, [generatedPlan?.id, selectedPlanId]);

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
    <div className="h-screen w-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* dynamic background layers */}
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

        {/* enhanced floating blobs with better animations */}
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
          className="absolute -right-32 bottom-[-60px] w-[360px] h-[360px] rounded-full bg-gradient-to-bl from-cyan-200 to-blue-100 blur-3xl pointer-events-none"
        />
      </div>

      {/* Full Screen Quiz Container */}
      {/* Main container with consistent spacing */}
      <div className="min-h-screen w-screen flex items-center justify-center pt-16 sm:pt-20 pb-20 sm:pb-4">
        <div className="w-full max-w-8xl  h-full flex flex-col px-3 sm:px-4 lg:px-6">
          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              id="main-content"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl   flex flex-col justify-between overflow-y-auto md:mt-0 max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-7rem)] pb-20 md:pb-6"
              role="main"
              aria-labelledby={`step-${step}-title`}
              aria-describedby={`step-${step}-subtitle`}
              tabIndex="-1"
            >
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Quiz Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center mb-4 sm:mb-6 md:mb-8"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 mb-3 sm:mb-4 md:mb-6 shadow-lg"
                  >
                    {React.createElement(translatedSteps[step].icon, {
                      className: "text-xl sm:text-2xl md:text-3xl",
                      style: { color: translatedSteps[step].color },
                    })}
                  </motion.div>

                  <motion.h2
                    id={`step-${step}-title`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-900 mb-2 sm:mb-3"
                  >
                    {translatedSteps[step].title}
                  </motion.h2>

                  <motion.p
                    id={`step-${step}-subtitle`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-2"
                  >
                    {translatedSteps[step].subtitle}
                  </motion.p>
                </motion.div>

                {/* Quiz Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 flex flex-col justify-center min-h-[300px] md:min-h-[400px]"
                >
                  {step === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="text-center max-w-md mx-auto"
                    >
                      <div className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
                        Welcome! Let's create your personalized diet chart in
                        just a few simple steps.
                      </div>
                      <div className="flex flex-col gap-3 sm:gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setStep((s) => Math.min(STEPS.length - 1, s + 1))
                          }
                          className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 sm:gap-3 justify-center transition-all duration-200"
                        >
                          <FaPlay className="text-base sm:text-xl" />
                          Start Creating My Chart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
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
                          className="px-6 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm border-2 border-teal-200 text-teal-700 text-xs sm:text-base font-medium hover:bg-teal-50 hover:border-teal-300 flex items-center gap-2 sm:gap-3 justify-center transition-all duration-200"
                        >
                          <FaRocket className="text-sm sm:text-lg" />
                          Quick Start (Skip Setup)
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="max-w-2xl mx-auto"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="flex text-sm sm:text-lg text-gray-700 items-center gap-2 mb-2">
                            <FaIdCard className="text-teal-600 text-sm sm:text-xl" />
                            {getTranslation("name", language)}
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            value={answers.basic.name}
                            onChange={(e) => {
                              update("basic", "name", e.target.value);
                              if (errors.name)
                                setErrors((prev) => ({ ...prev, name: null }));
                            }}
                            onFocus={(e) => e.target.select()}
                            className={`w-full p-3 sm:p-4 border-2 rounded-lg text-sm sm:text-lg focus:ring-2 transition-all duration-200 ${
                              errors.name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
                            }`}
                            placeholder={getTranslation("name", language)}
                            aria-invalid={!!errors.name}
                            aria-describedby={
                              errors.name ? "name-error" : undefined
                            }
                            autoComplete="off"
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="name-error"
                              className="text-red-500 text-sm"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="flex text-sm sm:text-lg text-gray-700 items-center gap-2 mb-2">
                            <FaCalendarAlt className="text-teal-600 text-sm sm:text-xl" />
                            {getTranslation("age", language)}
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            value={answers.basic.age}
                            onChange={(e) => {
                              update("basic", "age", e.target.value);
                              if (errors.age)
                                setErrors((prev) => ({ ...prev, age: null }));
                            }}
                            onFocus={(e) => e.target.select()}
                            type="number"
                            className={`w-full p-3 sm:p-4 border-2 rounded-lg text-sm sm:text-lg focus:ring-2 transition-all duration-200 ${
                              errors.age
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
                            }`}
                            placeholder={getTranslation("age", language)}
                            aria-invalid={!!errors.age}
                            aria-describedby={
                              errors.age ? "age-error" : undefined
                            }
                            autoComplete="off"
                          />
                          {errors.age && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="age-error"
                              className="text-red-500 text-sm"
                            >
                              {errors.age}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="flex text-sm sm:text-lg text-gray-700 items-center gap-2 mb-2">
                            <FaVenus className="text-teal-600 text-sm sm:text-xl" />
                            {getTranslation("gender", language)}
                          </label>
                          <motion.select
                            whileFocus={{ scale: 1.01 }}
                            value={answers.basic.gender}
                            onChange={(e) => {
                              update("basic", "gender", e.target.value);
                              if (errors.gender)
                                setErrors((prev) => ({
                                  ...prev,
                                  gender: null,
                                }));
                            }}
                            onFocus={(e) => e.target.focus()}
                            className={`w-full p-3 sm:p-4 border-2 rounded-lg text-sm sm:text-lg focus:ring-2 transition-all duration-200 ${
                              errors.gender
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:border-teal-500 focus:ring-teal-200"
                            }`}
                            aria-invalid={!!errors.gender}
                            aria-describedby={
                              errors.gender ? "gender-error" : undefined
                            }
                            autoComplete="off"
                          >
                            <option value="">
                              {getTranslation("select", language)}
                            </option>
                            <option value="female">
                              {getTranslation("female", language)}
                            </option>
                            <option value="male">
                              {getTranslation("male", language)}
                            </option>
                            <option value="other">
                              {getTranslation("other", language)}
                            </option>
                          </motion.select>
                          {errors.gender && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="gender-error"
                              className="text-red-500 text-sm"
                            >
                              {errors.gender}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="max-w-2xl mx-auto"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="flex text-base sm:text-lg md:text-xl text-gray-700 items-center gap-2">
                            <FaRuler className="text-teal-600" />
                            Height (cm)
                          </label>
                          <input
                            value={answers.anthro.height}
                            onChange={(e) => {
                              update("anthro", "height", e.target.value);
                              if (errors.height)
                                setErrors((prev) => ({
                                  ...prev,
                                  height: null,
                                }));
                            }}
                            onFocus={(e) => e.target.select()}
                            type="number"
                            className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg md:text-xl focus:ring-2 transition-all duration-100 ${
                              errors.height
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-teal-500 focus:ring-teal-200"
                            }`}
                            placeholder="e.g. 165"
                            aria-invalid={!!errors.height}
                            aria-describedby={
                              errors.height ? "height-error" : undefined
                            }
                            autoComplete="off"
                          />
                          {errors.height && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="height-error"
                              className="text-red-500 text-sm"
                            >
                              {errors.height}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="flex text-base sm:text-lg md:text-xl text-gray-700 items-center gap-2">
                            <FaWeight className="text-teal-600" />
                            Weight (kg)
                          </label>
                          <input
                            value={answers.anthro.weight}
                            onChange={(e) => {
                              update("anthro", "weight", e.target.value);
                              if (errors.weight)
                                setErrors((prev) => ({
                                  ...prev,
                                  weight: null,
                                }));
                            }}
                            onFocus={(e) => e.target.select()}
                            type="number"
                            step="0.1"
                            className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg md:text-xl focus:ring-2 transition-all duration-100 ${
                              errors.weight
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-teal-500 focus:ring-teal-200"
                            }`}
                            placeholder="e.g. 60"
                            aria-invalid={!!errors.weight}
                            aria-describedby={
                              errors.weight ? "weight-error" : undefined
                            }
                            autoComplete="off"
                          />
                          {errors.weight && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              id="weight-error"
                              className="text-red-500 text-sm"
                            >
                              {errors.weight}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200/50">
                        <div className="flex items-center gap-2 text-base sm:text-lg text-gray-700">
                          <FaAppleAlt className="text-teal-600" />
                          <span className="font-medium">Tip:</span>
                          <span>
                            BMI will be used to tailor calorie suggestions in
                            your personalized plan.
                          </span>
                        </div>
                        {answers.anthro.height &&
                          answers.anthro.weight &&
                          !isNaN(parseFloat(answers.anthro.height)) &&
                          !isNaN(parseFloat(answers.anthro.weight)) &&
                          parseFloat(answers.anthro.height) > 0 &&
                          parseFloat(answers.anthro.weight) > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 text-sm text-teal-700 font-medium"
                            >
                              Your BMI:{" "}
                              {(
                                parseFloat(answers.anthro.weight) /
                                (parseFloat(answers.anthro.height) / 100) ** 2
                              ).toFixed(1)}
                            </motion.div>
                          )}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="max-w-5xl mx-auto"
                    >
                      <div className="space-y-6">
                        <div className="text-center">
                          <label className="flex text-xl md:text-2xl text-gray-700 items-center justify-center gap-2 mb-6"></label>
                          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              { text: "Maintain weight", icon: FaBullseye },
                              { text: "Lose weight", icon: FaFire },
                              { text: "Gain muscle", icon: FaDumbbell },
                              { text: "Improve digestion", icon: FaLeaf },
                            ].map((goal, index) => (
                              <motion.button
                                key={goal.text}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  update("goals", "goal", goal.text);
                                  if (errors.goal)
                                    setErrors((prev) => ({
                                      ...prev,
                                      goal: null,
                                    }));
                                }}
                                className={`p-2 rounded-lg text-xs md:text-xl transition-all duration-100 flex flex-col items-center gap-3 min-h-[80px] ${
                                  answers.goals.goal === goal.text
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                                }`}
                              >
                                <goal.icon className="text-2xl" />
                                <span className="text-center">{goal.text}</span>
                              </motion.button>
                            ))}
                          </div>
                          {errors.goal && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm text-center mt-4"
                            >
                              {errors.goal}
                            </motion.p>
                          )}
                        </div>

                        <div className="max-w-2xl mx-auto">
                          <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2 mb-3">
                            <FaAppleAlt className="text-teal-600 text-xl" />
                            Note (optional)
                          </label>
                          <input
                            value={answers.goals.note}
                            onChange={(e) =>
                              update("goals", "note", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg md:text-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100"
                            placeholder="e.g., vegetarian, prefer warm breakfasts"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                    >
                      <div>
                        <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2">
                          <FaHamburger className="text-teal-600" />
                          Dietary Habit
                        </label>
                        <select
                          value={answers.lifestyle.dietaryHabits}
                          onChange={(e) =>
                            update("lifestyle", "dietaryHabits", e.target.value)
                          }
                          className="mt-1 p-3 sm:p-4 border border-gray-300 rounded-lg text-sm md:text-xl w-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100"
                        >
                          <option value="omnivore">Omnivore</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="pescatarian">Pescatarian</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2">
                          <FaRunning className="text-teal-600" />
                          Activity Level
                        </label>
                        <select
                          value={answers.lifestyle.activity}
                          onChange={(e) =>
                            update("lifestyle", "activity", e.target.value)
                          }
                          className="mt-1 p-3 sm:p-4 border border-gray-300 rounded-lg text-sm md:text-xl w-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="light">Light</option>
                          <option value="moderate">Moderate</option>
                          <option value="active">Active</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2">
                          <FaFlag className="text-teal-600" />
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
                          className="mt-1 p-3 sm:p-4 border border-gray-300 rounded-lg text-sm md:text-xl w-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100"
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
                      className="space-y-3 sm:space-y-4"
                    >
                      <div>
                        <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2">
                          <FaExclamationCircle className="text-teal-600" />
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
                          className="mt-1 p-3 sm:p-4 border border-gray-300 rounded-lg text-sm md:text-xl w-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100"
                          placeholder="e.g., nuts, shellfish"
                        />
                      </div>

                      <div>
                        <label className="flex text-sm md:text-xl text-gray-700 items-center gap-2">
                          <FaBan className="text-teal-600" />
                          Foods you dislike
                        </label>
                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                          {quickFoods.map((f, index) => (
                            <motion.button
                              key={f}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleDislike(f)}
                              className={`px-3 sm:px-4 py-2 rounded-lg text-sm md:text-xl transition-all duration-100 flex items-center gap-2 ${
                                answers.intolerances.dislikes.includes(f)
                                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                                  : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                              }`}
                            >
                              {f}
                            </motion.button>
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
                      className="flex flex-col h-full"
                    >
                      {/* Tab Navigation */}
                      <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {translatedPlans.map((plan, index) => (
                          <motion.button
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`px-4 py-3 rounded-lg text-lg font-medium transition-all duration-150 flex items-center gap-2 ${
                              selectedPlanId === plan.id
                                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                                : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                            }`}
                          >
                            <plan.icon
                              className="text-xl"
                              style={{
                                color:
                                  plan.id === selectedPlanId
                                    ? "white"
                                    : plan.color,
                              }}
                            />
                            {plan.name}
                          </motion.button>
                        ))}
                      </div>

                      {/* Selected Plan Content */}
                      <motion.div
                        key={selectedPlanId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-teal-200/20"
                      >
                        {(() => {
                          const currentPlan =
                            translatedPlans.find(
                              (p) => p.id === selectedPlanId
                            ) || generatedPlan;
                          const totalCalories = Object.values(currentPlan.meals)
                            .flat()
                            .reduce((s, m) => s + (m.calories || 0), 0);

                          return (
                            <div className="h-full flex flex-col">
                              {/* Plan Header */}
                              <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 mb-4 shadow-lg">
                                  <currentPlan.icon
                                    className="text-2xl"
                                    style={{ color: currentPlan.color }}
                                  />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-teal-900 mb-2">
                                  {currentPlan.name}
                                </h3>
                                <p className="text-lg text-gray-700 mb-4">
                                  {currentPlan.description}
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full">
                                  <FaAppleAlt className="text-teal-600" />
                                  <span className="text-lg font-semibold text-teal-800">
                                    Total: {totalCalories} calories
                                  </span>
                                </div>
                              </div>

                              {/* Meals Grid */}
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {Object.entries(currentPlan.meals).map(
                                  ([mealType, items]) => (
                                    <motion.div
                                      key={mealType}
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.3, delay: 0.1 }}
                                      className="bg-gradient-to-br from-white to-teal-50/30 p-4 rounded-lg border border-teal-200/30 shadow-sm"
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-md font-semibold text-teal-900 capitalize">
                                          {mealType}
                                        </h4>
                                        <div className="flex items-center gap-1 text-teal-700">
                                          <FaAppleAlt className="text-xs" />
                                          <span className="font-medium">
                                            {items.reduce(
                                              (s, i) => s + (i.calories || 0),
                                              0
                                            )}{" "}
                                            cal
                                          </span>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        {items.map((item, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-center justify-between py-2 px-3 bg-white/60 rounded-lg"
                                          >
                                            <span className="text-gray-800 font-medium">
                                              {item.name}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={finish}
                                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-100 flex items-center gap-2 justify-center"
                                >
                                  <FaCheck />
                                  Add to your diet chart
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    // Create a download link for the PDF report
                                    const link = document.createElement("a");
                                    link.href = "/Report.pdf";
                                    link.download = "Diet_Chart_Report.pdf";
                                    link.target = "_blank";

                                    // Append to body, click, and remove
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);

                                    setSuccessMessage(
                                      "Your Report Downloaded Successfully!"
                                    );
                                    setShowSuccessModal(true);

                                    // Auto close modal after 2 seconds
                                    setTimeout(() => {
                                      setShowSuccessModal(false);
                                    }, 2000);
                                  }}
                                  className="px-6 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-teal-200 text-teal-700 text-lg font-semibold hover:bg-teal-50 transition-all duration-100 flex items-center gap-2 justify-center"
                                >
                                  <FaDownload />
                                  Download Report
                                </motion.button>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Quiz Navigation - Desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hidden md:flex items-center justify-between mt-6"
              >
                <motion.button
                  whileHover={{
                    scale: step === 0 ? 1 : 1.05,
                    y: step === 0 ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prev}
                  disabled={step === 0}
                  className="px-6 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-700 text-lg disabled:opacity-50 hover:border-teal-300 hover:bg-teal-50 transition-all duration-100 flex items-center gap-2"
                >
                  <FaChevronLeft />
                  {getTranslation("previous", language)}
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
                      className={`w-3 h-3 rounded-full transition-all duration-150 flex items-center justify-center ${
                        i === step
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg shadow-teal-200"
                          : "bg-white/50 hover:bg-white/70"
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

                {step < translatedSteps.length - 1 ? (
                  <motion.button
                    whileHover={{
                      scale: loading ? 1 : 1.05,
                      y: loading ? 0 : -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg text-white text-lg shadow-lg transition-all duration-100 flex items-center gap-2 ${
                      loading
                        ? "opacity-50 cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Loading...
                      </>
                    ) : (
                      <>
                        {getTranslation("next", language)}
                        <FaChevronRight />
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{
                      scale: loading ? 1 : 1.05,
                      y: loading ? 0 : -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={finish}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg text-white text-lg shadow-lg transition-all duration-100 flex items-center gap-2 ${
                      loading
                        ? "opacity-50 cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        {getTranslation("finish", language)}
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Quiz Navigation - Fixed Bottom */}
      {/* safe-area aware bottom nav for mobile */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              disabled={step === 0 || loading}
              className={`px-3 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-150 ${
                step === 0 || loading
                  ? "opacity-30 cursor-not-allowed text-gray-400"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaChevronLeft className="text-xs" />
              <span>Back</span>
            </motion.button>

            <div className="flex items-center gap-1 px-2">
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`w-2 h-2 rounded-full transition-all duration-150 ${
                    i === step
                      ? "bg-teal-500 scale-125"
                      : i < step
                      ? "bg-teal-300"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {step < translatedSteps.length - 1 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={next}
                disabled={loading}
                className={`px-4 py-3 rounded-lg text-white text-sm font-semibold flex items-center gap-2 ${
                  loading
                    ? "opacity-50 cursor-not-allowed bg-gray-400"
                    : "bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <FaChevronRight className="text-xs" />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={finish}
                disabled={loading}
                className={`px-4 py-3 rounded-lg text-white text-sm font-semibold flex items-center gap-2 ${
                  loading
                    ? "opacity-50 cursor-not-allowed bg-gray-400"
                    : "bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="text-xs" />
                    <span>Finish</span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
              onClick={() => setShowSuccessModal(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl border border-teal-200/20"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <FaCheck className="text-white text-2xl" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Success!
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {successMessage}
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
