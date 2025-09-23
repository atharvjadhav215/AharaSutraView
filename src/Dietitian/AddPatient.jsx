import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const SECTIONS = [
  {
    id: 1,
    key: "basic",
    title: "Patient Information",
    icon: FaUser,
    color: "#8B4513",
  },
  {
    id: 2,
    key: "anthro",
    title: "Anthropometrics",
    icon: FaWeight,
    color: "#A0522D",
  },
  {
    id: 3,
    key: "vitals",
    title: "Vitals & Intake",
    icon: FaHeartbeat,
    color: "#CD853F",
  },
  {
    id: 4,
    key: "lifestyle",
    title: "Habits & Lifestyle",
    icon: FaUtensils,
    color: "#D2691E",
  },
  {
    id: 5,
    key: "medical",
    title: "Medical History",
    icon: FaFileMedical,
    color: "#F4A460",
  },
];

// Background Layers
const BG_LAYERS = [
  {
    id: 0,
    gradient:
      "radial-gradient( circle at 10% 20%, rgba(139,69,19,0.14), transparent 20% ), linear-gradient(45deg,#FEF3C7,#FFEDD5)",
  },
  {
    id: 1,
    gradient:
      "radial-gradient( circle at 80% 10%, rgba(160,82,45,0.12), transparent 18% ), linear-gradient(135deg,#F5DEB3,#FFE4B5)",
  },
  {
    id: 2,
    gradient:
      "radial-gradient( circle at 30% 80%, rgba(205,133,63,0.10), transparent 18% ), linear-gradient(90deg,#DEB887,#F4A460)",
  },
  {
    id: 3,
    gradient:
      "radial-gradient( circle at 60% 40%, rgba(210,105,30,0.10), transparent 18% ), linear-gradient(120deg,#FFE4B5,#F5DEB3)",
  },
  {
    id: 4,
    gradient:
      "radial-gradient( circle at 40% 30%, rgba(244,164,96,0.08), transparent 18% ), linear-gradient(60deg,#FEF3C7,#FFEDD5)",
  },
];

const initialPatient = {
  basic: {
    patientName: "",
    age: "",
    gender: "",
    date: new Date().toLocaleDateString("en-IN"),
  },
  anthro: { height: "", weight: "", bmi: "", waist: "" },
  vitals: {
    pulseRate: "",
    bloodPressure: "",
    waterIntake: "",
    mealFrequency: "",
  },
  lifestyle: {
    cuisinePreference: "",
    dietaryHabits: "",
    physicalActivities: "",
    addictionHabits: [],
    smokingFrequency: "",
    rasa: "",
    dosha: "",
    vikruti: "",
  },
  medical: { medicalHistory: "", bowelMovements: "", allergies: "" },
};

export default function AddPatient() {
  const [patient, setPatient] = useState(initialPatient);
  const [step, setStep] = useState(0); // 0..4 full-page steps
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const update = (sectionKey, field, value) => {
    setPatient((p) => ({
      ...p,
      [sectionKey]: { ...p[sectionKey], [field]: value },
    }));
  };

  const toggleArrayField = (sectionKey, field, value) => {
    setPatient((p) => {
      const arr = p[sectionKey][field] || [];
      const has = arr.includes(value);
      const next = has ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...p, [sectionKey]: { ...p[sectionKey], [field]: next } };
    });
  };

  // Auto-fill date on mount
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    update("basic", "date", today);
  }, []);

  // Auto-calc BMI
  useEffect(() => {
    const rawHeight = patient.anthro.height || "";
    const rawWeight = patient.anthro.weight || "";
    const h = parseFloat(String(rawHeight).replace(/[^\d.]/g, ""));
    const w = parseFloat(String(rawWeight).replace(/[^\d.]/g, ""));
    if (h > 0 && w > 0) {
      const bmi = w / ((h / 100) * (h / 100));
      const bmiStr = bmi ? bmi.toFixed(1) : "";
      if (bmiStr !== patient.anthro.bmi) {
        setPatient((p) => ({ ...p, anthro: { ...p.anthro, bmi: bmiStr } }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.anthro.height, patient.anthro.weight]);

  // compute overall fill progress
  useEffect(() => {
    const countFields = (obj) => {
      let total = 0;
      let filled = 0;
      Object.values(obj).forEach((val) => {
        if (val && typeof val === "object" && !Array.isArray(val)) {
          const sub = countFields(val);
          total += sub.total;
          filled += sub.filled;
        } else {
          total += 1;
          if (Array.isArray(val)) {
            if (val.length > 0) filled += 1;
          } else if (val !== "" && val !== null && val !== undefined) {
            filled += 1;
          }
        }
      });
      return { total, filled };
    };
    const { total, filled } = countFields(patient);
    setProgress(total ? Math.round((filled / total) * 100) : 0);
  }, [patient]);

  const go = (index) => {
    if (index < 0) index = 0;
    if (index >= SECTIONS.length) index = SECTIONS.length - 1;
    setStep(index);
    // focus top of container for accessibility
    if (containerRef.current)
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT PATIENT", patient);
    alert("Patient data logged to console. Implement API submit.");
  };

  // helper for rendering animated slide panels
  const renderPanelClass = (i) => {
    const offset = i - step;
    // using transform translateX with tailwind-friendly inline style for percent
    const base =
      "absolute inset-0 transition-transform duration-400 ease-in-out";
    if (offset === 0) return `${base} translate-x-0 opacity-100 z-20`;
    if (offset < 0) return `${base} -translate-x-full opacity-0 z-10`;
    return `${base} translate-x-full opacity-0 z-10`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Enhanced Ayurvedic Particle System */}
      <AyurvedicParticleSystem count={1} />

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b border-teal-200/20">
        {/* Back to Home Button */}
        <Link to="/dhome">
          <motion.button
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-teal-200 text-teal-800 text-lg font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FaHome className="text-xl" />
            Back to Home
          </motion.button>
        </Link>

        {/* Progress Bar */}
        <div className="flex-1 mx-8">
          <div className="flex items-center justify-center gap-4">
            <span className="text-lg font-semibold text-teal-800">
              Step {step + 1} of {SECTIONS.length}
            </span>
            <div className="w-64 bg-white/20 h-3 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3 rounded shadow-sm"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-lg font-semibold text-teal-800">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

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

        {/* Enhanced floating blobs with better animations */}
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

      <div className="max-w-8xl mx-auto px-4 sm:px-8 md:px-12 mt-20 lg:px-20 py-4 sm:py-6 md:py-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Step navigation (left) */}
          <nav className="lg:col-span-1 sticky top-20 sm:top-24 self-start space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => go(i)}
                className={`w-full text-left px-4 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 ${
                  i === step
                    ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white border-2 border-teal-400"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg ${
                    i === step
                      ? "bg-white/20 text-white"
                      : "bg-gradient-to-r from-teal-200 to-cyan-100 text-teal-800"
                  }`}
                >
                  <s.icon
                    className="text-lg"
                    style={{ color: i === step ? "white" : s.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{s.title}</div>
                  <div className="text-sm opacity-75">
                    Step {s.id} of {SECTIONS.length}
                  </div>
                </div>
                {i === step && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Full page step panels (right) */}
          <main
            className="lg:col-span-4 relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-teal-200/20 overflow-hidden"
            style={{ minHeight: "500px" }}
          >
            <form onSubmit={handleSubmit} className="h-full relative">
              <div ref={containerRef} className="h-full relative">
                {/* Panels positioned absolutamente; only active panel visible due to transform */}
                {SECTIONS.map((s, i) => (
                  <section
                    key={s.key}
                    className={renderPanelClass(i)}
                    aria-hidden={i !== step}
                    style={{ position: "absolute" }}
                  >
                    <div className="p-6 md:p-6 h-full overflow-auto">
                      <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-4"
                      >
                        <div className="flex flex-row items-center gap-4 justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 mb-4 shadow-lg"
                          >
                            <s.icon
                              className="text-xl"
                              style={{ color: s.color }}
                            />
                          </motion.div>
                          <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-teal-900 mb-4 "
                          >
                            {s.title}
                          </motion.h2>
                        </div>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className="text-lg text-gray-700"
                        >
                          Fill the {s.title.toLowerCase()} details
                        </motion.p>
                      </motion.header>

                      {/* Section content */}
                      <div className="space-y-4 sm:space-y-6">
                        {s.key === "basic" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <label className="flex text-lg text-gray-700 items-center gap-2 mb-2">
                                <FaUser className="text-amber-600 text-lg" />
                                Patient Name
                              </label>
                              <motion.input
                                whileFocus={{ scale: 1.02 }}
                                value={patient.basic.patientName}
                                onChange={(e) =>
                                  update("basic", "patientName", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
                                placeholder="Full name"
                                required
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <label className="flex text-lg text-gray-700 items-center gap-2 mb-2">
                                <FaHeartbeat className="text-amber-600 text-lg" />
                                Age
                              </label>
                              <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="number"
                                value={patient.basic.age}
                                onChange={(e) =>
                                  update("basic", "age", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
                                placeholder="Age in years"
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                              className="sm:col-span-2 md:col-span-1"
                            >
                              <label className="flex text-lg text-gray-700 items-center gap-2 mb-2">
                                <FaHeart className="text-amber-600 text-lg" />
                                Gender
                              </label>
                              <motion.select
                                whileFocus={{ scale: 1.02 }}
                                value={patient.basic.gender}
                                onChange={(e) =>
                                  update("basic", "gender", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white/80"
                              >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </motion.select>
                            </motion.div>
                          </div>
                        )}

                        {s.key === "anthro" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            <div>
                              <label className="block text-xl text-gray-600">
                                Height (cm)
                              </label>
                              <input
                                value={patient.anthro.height}
                                onChange={(e) =>
                                  update("anthro", "height", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="e.g., 173"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Weight (kg)
                              </label>
                              <input
                                type="number"
                                value={patient.anthro.weight}
                                onChange={(e) =>
                                  update("anthro", "weight", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="kg"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                BMI
                              </label>
                              <input
                                value={patient.anthro.bmi}
                                onChange={(e) =>
                                  update("anthro", "bmi", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg bg-gray-50 text-xl"
                                placeholder="Auto-calculated or override"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Waist (cm)
                              </label>
                              <input
                                value={patient.anthro.waist}
                                onChange={(e) =>
                                  update("anthro", "waist", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="cm"
                              />
                            </div>
                          </div>
                        )}

                        {s.key === "vitals" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <label className="block text-xl text-gray-600">
                                Pulse Rate (BPM)
                              </label>
                              <input
                                type="number"
                                value={patient.vitals.pulseRate}
                                onChange={(e) =>
                                  update("vitals", "pulseRate", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="e.g., 72"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Blood Pressure
                              </label>
                              <input
                                value={patient.vitals.bloodPressure}
                                onChange={(e) =>
                                  update(
                                    "vitals",
                                    "bloodPressure",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="e.g., 120/80"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Water Intake
                              </label>
                              <select
                                value={patient.vitals.waterIntake}
                                onChange={(e) =>
                                  update(
                                    "vitals",
                                    "waterIntake",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select</option>
                                <option value="<1">&lt; 1 L</option>
                                <option value="1-2">1-2 L</option>
                                <option value="2-3">2-3 L</option>
                                <option value="3-4">3-4 L</option>
                                <option value=">4">&gt; 4 L</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Meal Frequency
                              </label>
                              <select
                                value={patient.vitals.mealFrequency}
                                onChange={(e) =>
                                  update(
                                    "vitals",
                                    "mealFrequency",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select meals/day</option>
                                <option value="1">1 meal/day</option>
                                <option value="2">2 meals/day</option>
                                <option value="3">3 meals/day</option>
                                <option value="4+">4+ meals/day</option>
                                <option value="grazing">Grazing</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {s.key === "lifestyle" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <label className="block text-xl text-gray-600">
                                Cuisine Preference
                              </label>
                              <input
                                value={patient.lifestyle.cuisinePreference}
                                onChange={(e) =>
                                  update(
                                    "lifestyle",
                                    "cuisinePreference",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="e.g., Indian"
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Dietary Habits
                              </label>
                              <input
                                value={patient.lifestyle.dietaryHabits}
                                onChange={(e) =>
                                  update(
                                    "lifestyle",
                                    "dietaryHabits",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="Vegetarian, Vegan, etc."
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Physical Activities
                              </label>
                              <select
                                value={patient.lifestyle.physicalActivities}
                                onChange={(e) =>
                                  update(
                                    "lifestyle",
                                    "physicalActivities",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select</option>
                                <option value="none">None</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="active">Active</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Addiction Habits
                              </label>
                              <div className="mt-2 flex gap-2 flex-wrap">
                                {[
                                  "Tea",
                                  "Coffee",
                                  "Alcohol",
                                  "Smoking",
                                  "Tobacco",
                                ].map((a) => (
                                  <button
                                    key={a}
                                    type="button"
                                    onClick={() =>
                                      toggleArrayField(
                                        "lifestyle",
                                        "addictionHabits",
                                        a
                                      )
                                    }
                                    className={`px-3 py-2 rounded-lg border text-xl ${
                                      patient.lifestyle.addictionHabits.includes(
                                        a
                                      )
                                        ? "bg-emerald-100 border-emerald-300"
                                        : "bg-white"
                                    }`}
                                  >
                                    {a}
                                  </button>
                                ))}
                              </div>

                              {patient.lifestyle.addictionHabits.includes(
                                "Smoking"
                              ) && (
                                <div className="mt-3">
                                  <label className="block text-xl text-gray-600">
                                    Smoking frequency
                                  </label>
                                  <input
                                    value={patient.lifestyle.smokingFrequency}
                                    onChange={(e) =>
                                      update(
                                        "lifestyle",
                                        "smokingFrequency",
                                        e.target.value
                                      )
                                    }
                                    className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                    placeholder="e.g., 5/day"
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Dosha
                              </label>
                              <select
                                value={patient.lifestyle.dosha}
                                onChange={(e) =>
                                  update("lifestyle", "dosha", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select Dosha</option>
                                <option value="Vata">Vata</option>
                                <option value="Pitta">Pitta</option>
                                <option value="Kapha">Kapha</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Rasa (Taste)
                              </label>
                              <select
                                value={patient.lifestyle.rasa}
                                onChange={(e) =>
                                  update("lifestyle", "rasa", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select</option>
                                <option value="sweet">Sweet</option>
                                <option value="sour">Sour</option>
                                <option value="salty">Salty</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {s.key === "medical" && (
                          <div className="space-y-3 sm:space-y-4">
                            <div>
                              <label className="block text-xl text-gray-600">
                                Medical History
                              </label>
                              <textarea
                                value={patient.medical.medicalHistory}
                                onChange={(e) =>
                                  update(
                                    "medical",
                                    "medicalHistory",
                                    e.target.value
                                  )
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                rows="4"
                                placeholder="Past and present diseases"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div>
                                <label className="block text-xl text-gray-600">
                                  Bowel Movements
                                </label>
                                <select
                                  value={patient.medical.bowelMovements}
                                  onChange={(e) =>
                                    update(
                                      "medical",
                                      "bowelMovements",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                >
                                  <option value="">Select</option>
                                  <option value="regular">Regular</option>
                                  <option value="constipation">
                                    Constipation
                                  </option>
                                  <option value="loose">Loose stools</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xl text-gray-600">
                                  Allergies
                                </label>
                                <input
                                  value={patient.medical.allergies}
                                  onChange={(e) =>
                                    update(
                                      "medical",
                                      "allergies",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                  placeholder="Any known allergies"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Navigation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex items-center justify-between mt-8"
                      >
                        <motion.button
                          whileHover={{
                            scale: step === 0 ? 1 : 1.05,
                            y: step === 0 ? 0 : -2,
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => go(step - 1)}
                          disabled={step === 0}
                          className="px-6 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 text-amber-700 text-lg disabled:opacity-50 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 flex items-center gap-2"
                        >
                          <FaChevronLeft />
                          Previous
                        </motion.button>

                        <div className="flex items-center gap-2">
                          {SECTIONS.map((s, i) => (
                            <motion.button
                              key={s.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => go(i)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                                i === step
                                  ? "bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg shadow-amber-200"
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

                        {i < SECTIONS.length - 1 ? (
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => go(step + 1)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                          >
                            Next
                            <FaChevronRight />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/my-diet-chart")}
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                          >
                            <FaCheck />
                            Save & Submit
                          </motion.button>
                        )}
                      </motion.div>
                    </div>
                  </section>
                ))}
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
