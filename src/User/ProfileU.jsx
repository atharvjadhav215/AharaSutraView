import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import {
  FaArrowLeft,
  FaUser,
  FaWeight,
  FaRulerVertical,
  FaHeartbeat,
  FaUtensils,
  FaHeart,
  FaCheckCircle,
  FaPlay,
  FaRocket,
  FaLeaf,
  FaAppleAlt,
  FaDumbbell,
  FaSeedling,
  FaChevronRight,
  FaChevronLeft,
  FaHome,
  FaLanguage,
  FaRedo,
  FaEye,
  FaCheck,
  FaUserMd,
  FaChartLine,
  FaStethoscope,
  FaRunning,
  FaFileMedical,
  FaUsers,
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
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFlag,
  FaHistory,
  FaClipboardList,
  FaUserCircle,
  FaCog,
  FaBell,
  FaSignOutAlt,
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

// Tab Configuration
const TABS = [
  {
    id: "overview",
    name: "Overview",
    icon: FaUserCircle,
    color: "#A0D9D9",
  },
  {
    id: "details",
    name: "Details",
    icon: FaChartPie,
    color: "#7BC4C4",
  },
  {
    id: "charts",
    name: "Diet Charts",
    icon: FaClipboardList,
    color: "#5BAFAF",
  },
  {
    id: "settings",
    name: "Settings",
    icon: FaCog,
    color: "#4A9B9B",
  },
];

// Background Layers
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
];

export default function ProfileU() {
  const navigate = useNavigate();

  // Hard-coded profile (no backend / no localStorage)
  const hardUser = {
    name: "Ananya Desai",
    username: "ananya.desai@example.com",
    basic: {
      age: 31,
      gender: "female",
      date: "2025-09-12",
    },
    anthro: {
      height: 165,
      weight: 62,
      bmi: 22.8,
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

  // Hard-coded diet charts for this user
  const hardCharts = [
    {
      id: "chart-2025-09-12",
      title: "Balanced Energetic Day",
      summary:
        "Warm oats + lentils, millet khichdi, spiced nuts, steamed veg & paneer.",
      date: "2025-09-12",
      owner: "ananya.desai@example.com",
      meals: {
        breakfast: [{ name: "Oats Porridge", calories: 320 }],
        lunch: [{ name: "Millet Khichdi", calories: 520 }],
        snack: [{ name: "Spiced Nuts", calories: 180 }],
        dinner: [{ name: "Steamed Veg & Paneer", calories: 430 }],
      },
    },
    {
      id: "chart-2025-09-01",
      title: "Iron Rich Week Start",
      summary: "Moong dal khichdi, spinach sabzi, dates & nut smoothie.",
      date: "2025-09-01",
      owner: "ananya.desai@example.com",
      meals: {
        breakfast: [{ name: "Ragi Porridge", calories: 300 }],
        lunch: [{ name: "Moong Dal Khichdi", calories: 540 }],
        snack: [{ name: "Dates & Almonds", calories: 200 }],
        dinner: [{ name: "Spinach + Tofu Curry", calories: 410 }],
      },
    },
    {
      id: "chart-2025-08-20",
      title: "Light Digestive Plan",
      summary: "Rice porridge, vegetable stew, warm spiced fruit.",
      date: "2025-08-20",
      owner: "ananya.desai@example.com",
      meals: {
        breakfast: [{ name: "Rice Porridge with Ghee", calories: 340 }],
        lunch: [{ name: "Vegetable Stew", calories: 480 }],
        snack: [{ name: "Warm Apple", calories: 120 }],
        dinner: [{ name: "Light Kitchari", calories: 400 }],
      },
    },
  ];

  // useState only for UI interactions (still no backend)
  const [user] = useState(hardUser);
  const [charts] = useState(hardCharts);
  const [expandedChart, setExpandedChart] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Merge hard-coded data with any localStorage data
  const profile = {
    name: user.name || "User",
    username: user.username || "user@example.com",
    basic: user.basic || {},
    anthro: user.anthro || {},
    vitals: user.vitals || {},
    lifestyle: user.lifestyle || {},
    medical: user.medical || {},
    notes: user.notes || "",
  };

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Tab content functions
  const getTabContent = () => {
    return {
      overview: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Enhanced Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl mb-6"
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {initials}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <FaCheck className="text-white text-xs" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{profile.username}</p>
                <p className="text-sm text-gray-700 bg-gray-50/80 p-2 rounded-lg">
                  {profile.notes}
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  onClick={() => navigate("/edit-profile")}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  onClick={() => navigate("/diet-chart")}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <FaClipboardList />
                  View Diet Chart
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                  <FaUser className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Age / Gender
                  </h3>
                  <p className="text-lg font-bold text-blue-600">
                    {profile.basic.age || "—"} / {profile.basic.gender || "—"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                  <FaWeight className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Height / Weight
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    {profile.anthro.height || "—"} cm /{" "}
                    {profile.anthro.weight || "—"} kg
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <FaChartLine className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    BMI
                  </h3>
                  <p className="text-lg font-bold text-purple-600">
                    {profile.anthro.bmi || "—"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center shadow-lg">
                  <FaCalendarAlt className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Last Update
                  </h3>
                  <p className="text-lg font-bold text-cyan-600">
                    {profile.basic.date || "—"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ),
      details: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <FaHeartbeat className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Vitals & Intake
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Pulse Rate
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.vitals.pulseRate || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Blood Pressure
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.vitals.bloodPressure || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Water Intake
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.vitals.waterIntake || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Meals per Day
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.vitals.mealFrequency || "—"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                  <FaUtensils className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Lifestyle</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Cuisine Preference
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.lifestyle.cuisinePreference || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Dietary Habits
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.lifestyle.dietaryHabits || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Physical Activity
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.lifestyle.physicalActivities || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Dosha / Rasa
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    {profile.lifestyle.dosha || "—"} /{" "}
                    {profile.lifestyle.rasa || "—"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <FaFileMedical className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                Medical Information
              </h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50/80 rounded-lg border border-gray-200/60">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Medical History
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {profile.medical.medicalHistory ||
                    "No medical history provided."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-lg">
                    Bowel Movements
                  </span>
                  <span className="text-teal-600 font-bold text-xl">
                    {profile.medical.bowelMovements || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-lg">
                    Allergies
                  </span>
                  <span className="text-teal-600 font-bold text-xl">
                    {profile.medical.allergies || "—"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ),
      charts: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">My Diet Charts</h3>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              onClick={() => navigate("/diet-chart")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus />
              Create New Chart
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {charts && charts.length ? (
                charts.map((c, idx) => (
                  <motion.div
                    key={c.id || `${idx}-${c.date || "chart"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                    onClick={() =>
                      setExpandedChart(expandedChart === c.id ? null : c.id)
                    }
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center shadow-lg">
                        <FaClipboardList className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {c.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{c.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {c.summary}
                    </p>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/diet-chart");
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaEye />
                        Open
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard?.writeText(
                            JSON.stringify(c, null, 2)
                          );
                          alert("Chart copied to clipboard");
                        }}
                        className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center gap-2"
                      >
                        <FaShare />
                        Copy
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {expandedChart === c.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="bg-white/60 rounded-lg p-4 border border-amber-100/50">
                            <h5 className="text-lg font-semibold text-teal-900 mb-3">
                              Meals
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {Object.entries(c.meals).map(
                                ([mealType, items]) => (
                                  <div
                                    key={mealType}
                                    className="bg-white/80 rounded-lg p-3"
                                  >
                                    <div className="font-medium text-gray-800 capitalize text-sm mb-2">
                                      {mealType} •{" "}
                                      {items.reduce(
                                        (s, i) => s + (i.calories || 0),
                                        0
                                      )}{" "}
                                      cal
                                    </div>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                      {items.map((it, i) => (
                                        <li key={i}>
                                          {it.name} ({it.calories} cal)
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-200 to-orange-100 flex items-center justify-center mx-auto mb-4">
                    <FaClipboardList className="text-teal-800 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Diet Charts Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first diet chart to get started
                  </p>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => navigate("/diet-chart")}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-100 flex items-center gap-2 mx-auto"
                  >
                    <FaPlus />
                    Create Chart
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ),
      settings: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                  <FaBell className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Notifications
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Meal Reminders
                  </span>
                  <div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-lg"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Water Intake
                  </span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-lg"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Exercise Reminders
                  </span>
                  <div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                  <FaCog className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Preferences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Theme
                  </span>
                  <span className="text-teal-600 font-bold text-lg">Light</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Language
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    English
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border border-gray-200/60">
                  <span className="text-gray-700 font-medium text-sm">
                    Units
                  </span>
                  <span className="text-teal-600 font-bold text-lg">
                    Metric
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center shadow-lg">
                <FaSignOutAlt className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Account Actions
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaDownload />
                Export Data
              </motion.button>
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-white border-2 border-red-200 text-red-700 text-sm font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaTrash />
                Delete Account
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Ayurvedic Particle System */}
      <AyurvedicParticleSystem count={0} />

      {/* Dynamic Background Layers */}
      <AnimatePresence mode="wait">
        {BG_LAYERS.map((layer) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeTab === TABS[layer.id]?.id ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: layer.gradient,
              zIndex: 1,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col mt-16 h-[calc(100vh-80px)]">
        {/* Enhanced Tab Navigation */}
        <div className="flex-shrink-0 max-w-7xl mx-32 px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-lg p-1.5 border border-gray-200/60 shadow-xl"
          >
            <div className="flex gap-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/80"
                    }`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)`
                        : "transparent",
                    }}
                  >
                    <Icon
                      className={`text-lg ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    />
                    <span className="font-semibold tracking-wide">
                      {tab.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg"
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            <div className="max-w-7xl mx-auto">
              {getTabContent()[activeTab]}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
