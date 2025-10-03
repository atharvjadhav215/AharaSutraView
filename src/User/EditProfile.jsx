import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  FaSave,
  FaTimes,
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
const AyurvedicParticleSystem = ({ count = 60 }) => {
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current;
    const container = containerRef.current;

    if (!container) return;

    // Create enhanced Ayurvedic particles
    particles.forEach((particle, index) => {
      if (particle) {
        const isSymbol = index % 4 === 0;

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

// Form Sections Configuration
const FORM_SECTIONS = [
  {
    id: "basic",
    name: "Basic Information",
    icon: FaUser,
    color: "#A0D9D9",
  },
  {
    id: "anthropometric",
    name: "Anthropometric Data",
    icon: FaRulerVertical,
    color: "#7BC4C4",
  },
  {
    id: "vitals",
    name: "Vitals & Intake",
    icon: FaHeartbeat,
    color: "#5BAFAF",
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Preferences",
    icon: FaUtensils,
    color: "#4A9B9B",
  },
  {
    id: "medical",
    name: "Medical Information",
    icon: FaFileMedical,
    color: "#3A8787",
  },
];

export default function EditProfile() {
  const navigate = useNavigate();

  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hard-coded profile data (same as ProfileU for consistency)
  const initialProfile = {
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

  // Form state management
  const [profile, setProfile] = useState(initialProfile);
  const [activeSection, setActiveSection] = useState("basic");
  const [hasChanges, setHasChanges] = useState(false);

  // Handle form input changes
  const handleInputChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  // Handle nested field changes (like addictionHabits)
  const handleNestedChange = (section, field, value) => {
    if (field === "addictionHabits") {
      // Handle array field
      const habits = value
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h);
      setProfile((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: habits,
        },
      }));
    } else {
      handleInputChange(section, field, value);
    }
    setHasChanges(true);
  };

  // Save changes
  const handleSave = () => {
    // Here you would typically save to backend or localStorage
    console.log("Saving profile:", profile);
    setHasChanges(false);
    // Show success message
    alert("Profile updated successfully!");
  };

  // Cancel changes
  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        )
      ) {
        setProfile(initialProfile);
        setHasChanges(false);
        navigate("/profile");
      }
    } else {
      navigate("/profile");
    }
  };

  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (profile.anthro.height && profile.anthro.weight) {
      const heightInM = profile.anthro.height / 100;
      const bmi = (profile.anthro.weight / (heightInM * heightInM)).toFixed(1);
      setProfile((prev) => ({
        ...prev,
        anthro: {
          ...prev.anthro,
          bmi: parseFloat(bmi),
        },
      }));
    }
  }, [profile.anthro.height, profile.anthro.weight]);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Form section content
  const getFormContent = () => {
    return {
      basic: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    handleInputChange("name", "name", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email/Username
                </label>
                <input
                  type="email"
                  value={profile.username}
                  onChange={(e) =>
                    handleInputChange("username", "username", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.basic.age}
                  onChange={(e) =>
                    handleInputChange("basic", "age", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={profile.basic.gender}
                  onChange={(e) =>
                    handleInputChange("basic", "gender", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={profile.notes}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Any additional notes about preferences, goals, etc."
                />
              </div>
            </div>
          </div>
        </motion.div>
      ),

      anthropometric: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                <FaRulerVertical className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Anthropometric Data
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profile.anthro.height}
                  onChange={(e) =>
                    handleInputChange(
                      "anthro",
                      "height",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.anthro.weight}
                  onChange={(e) =>
                    handleInputChange(
                      "anthro",
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BMI (auto-calculated)
                </label>
                <input
                  type="number"
                  value={profile.anthro.bmi}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <FaChartLine className="text-blue-600 text-lg mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">
                    BMI Information
                  </h4>
                  <p className="text-blue-700 text-sm">
                    BMI is automatically calculated based on your height and
                    weight.
                    {profile.anthro.bmi && (
                      <span className="ml-2 font-medium">
                        Current BMI: {profile.anthro.bmi} (
                        {profile.anthro.bmi < 18.5
                          ? "Underweight"
                          : profile.anthro.bmi < 25
                          ? "Normal"
                          : profile.anthro.bmi < 30
                          ? "Overweight"
                          : "Obese"}
                        )
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),

      vitals: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center shadow-lg">
                <FaHeartbeat className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Vitals & Intake
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulse Rate (bpm)
                </label>
                <input
                  type="number"
                  value={profile.vitals.pulseRate}
                  onChange={(e) =>
                    handleInputChange(
                      "vitals",
                      "pulseRate",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  value={profile.vitals.bloodPressure}
                  onChange={(e) =>
                    handleInputChange("vitals", "bloodPressure", e.target.value)
                  }
                  placeholder="e.g., 120/80"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Water Intake
                </label>
                <select
                  value={profile.vitals.waterIntake}
                  onChange={(e) =>
                    handleInputChange("vitals", "waterIntake", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="1-2 L">1-2 L</option>
                  <option value="2-3 L">2-3 L</option>
                  <option value="3-4 L">3-4 L</option>
                  <option value="4+ L">4+ L</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meals per Day
                </label>
                <select
                  value={profile.vitals.mealFrequency}
                  onChange={(e) =>
                    handleInputChange("vitals", "mealFrequency", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="2">2 meals</option>
                  <option value="3">3 meals</option>
                  <option value="4">4 meals</option>
                  <option value="5+">5+ meals</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      ),

      lifestyle: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                <FaUtensils className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Lifestyle & Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Preference
                </label>
                <select
                  value={profile.lifestyle.cuisinePreference}
                  onChange={(e) =>
                    handleInputChange(
                      "lifestyle",
                      "cuisinePreference",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Indian">Indian</option>
                  <option value="Continental">Continental</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Habits
                </label>
                <select
                  value={profile.lifestyle.dietaryHabits}
                  onChange={(e) =>
                    handleInputChange(
                      "lifestyle",
                      "dietaryHabits",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Lacto-vegetarian">Lacto-vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-vegetarian">Non-vegetarian</option>
                  <option value="Flexitarian">Flexitarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physical Activity Level
                </label>
                <select
                  value={profile.lifestyle.physicalActivities}
                  onChange={(e) =>
                    handleInputChange(
                      "lifestyle",
                      "physicalActivities",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very-active">Very Active</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Addiction Habits
                </label>
                <input
                  type="text"
                  value={profile.lifestyle.addictionHabits.join(", ")}
                  onChange={(e) =>
                    handleNestedChange(
                      "lifestyle",
                      "addictionHabits",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Tea, Coffee, Smoking"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple habits with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ayurvedic Dosha
                </label>
                <select
                  value={profile.lifestyle.dosha}
                  onChange={(e) =>
                    handleInputChange("lifestyle", "dosha", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Vata">Vata</option>
                  <option value="Pitta">Pitta</option>
                  <option value="Kapha">Kapha</option>
                  <option value="Vata-Pitta">Vata-Pitta</option>
                  <option value="Pitta-Kapha">Pitta-Kapha</option>
                  <option value="Vata-Kapha">Vata-Kapha</option>
                  <option value="Tridoshic">Tridoshic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rasa (Taste Preference)
                </label>
                <select
                  value={profile.lifestyle.rasa}
                  onChange={(e) =>
                    handleInputChange("lifestyle", "rasa", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="salty">Salty</option>
                  <option value="pungent">Pungent</option>
                  <option value="bitter">Bitter</option>
                  <option value="astringent">Astringent</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      ),

      medical: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-gray-200/60 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
                <FaFileMedical className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Medical Information
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History
                </label>
                <textarea
                  value={profile.medical.medicalHistory}
                  onChange={(e) =>
                    handleInputChange(
                      "medical",
                      "medicalHistory",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe any medical conditions, surgeries, or ongoing treatments..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bowel Movements
                  </label>
                  <select
                    value={profile.medical.bowelMovements}
                    onChange={(e) =>
                      handleInputChange(
                        "medical",
                        "bowelMovements",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="regular">Regular</option>
                    <option value="irregular">Irregular</option>
                    <option value="constipated">Constipated</option>
                    <option value="frequent">Frequent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <input
                    type="text"
                    value={profile.medical.allergies}
                    onChange={(e) =>
                      handleInputChange("medical", "allergies", e.target.value)
                    }
                    placeholder="e.g., None, Nuts, Dairy"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),
    };
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {BG_LAYERS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                i === FORM_SECTIONS.findIndex((s) => s.id === activeSection)
                  ? 1
                  : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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
            rotate: { repeat: Infinity, duration: 40, ease: "linear" },
            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="absolute -left-40 -top-30 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 50, ease: "linear" },
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
          }}
          className="absolute -right-32 bottom-[-60px] w-[360px] h-[360px] rounded-full bg-gradient-to-bl from-cyan-200 to-blue-100 blur-3xl pointer-events-none"
        />
      </div>

      {/* Desktop Sidebar Navigation - Hidden on mobile */}
      <div className="hidden lg:block w-64 mt-16 flex-shrink-0 fixed">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-teal-50/80 to-cyan-50/80 rounded-xl p-4 h-fit border border-teal-200/60 shadow-lg sticky overflow-hidden"
        >
          {/* Sidebar Header */}
          <div className="text-center mb-6">
            <div className="w-full h-9 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
              <FaUser className="text-white text-2xl" />
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">{initials}</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  Edit Profile
                </h1>
                <p className="text-xs text-gray-600">{profile.name}</p>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-2">
            {FORM_SECTIONS.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(section.id)}
                className={`w-full p-4 rounded-xl transition-all duration-300 flex items-start gap-3 group ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "bg-white/70 hover:bg-white/90 text-gray-700 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeSection === section.id ? "bg-white/20" : ""
                  }`}
                  style={
                    activeSection !== section.id
                      ? { backgroundColor: section.color }
                      : {}
                  }
                >
                  <section.icon
                    className={`text-lg ${
                      activeSection === section.id ? "text-white" : "text-white"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <div
                    className={`font-semibold text-sm mb-1 ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {section.name}
                  </div>
                  <div
                    className={`text-xs ${
                      activeSection === section.id
                        ? "text-white/80"
                        : "text-gray-500"
                    }`}
                  >
                    {section.id === "basic" && "Personal information"}
                    {section.id === "anthropometric" && "Physical measurements"}
                    {section.id === "vitals" && "Health metrics"}
                    {section.id === "lifestyle" && "Diet & preferences"}
                    {section.id === "medical" && "Medical history"}
                  </div>
                </div>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full self-center"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
  

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-200 flex items-center justify-center gap-1 text-xs"
              >
                <FaTimes />
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-1 text-xs ${
                  hasChanges
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaSave />
                Save
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-t from-teal-50/95 to-cyan-50/95 backdrop-blur-md border-t border-teal-200/60 shadow-lg"
        >
          {/* Mobile Navigation Sections */}
          <div className="flex justify-around px-2 py-3">
            {FORM_SECTIONS.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeSection === section.id ? "bg-white/20" : ""
                  }`}
                  style={
                    activeSection !== section.id
                      ? { backgroundColor: section.color }
                      : {}
                  }
                >
                  <section.icon
                    className={`text-lg ${
                      activeSection === section.id ? "text-white" : "text-white"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium mt-1 truncate ${
                    activeSection === section.id
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {section.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="pt-16 sm:pt-16 lg:pt-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 pb-20 lg:pb-4">
        <div className="w-full mx-auto">
          <div className="flex gap-4 h-full">
            {/* Main Content Area */}
            <div className="flex-1 lg:ml-56">
              {/* Mobile Header */}
              <div className="lg:hidden mb-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-md rounded-lg p-4 border border-gray-200/60 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        onClick={handleCancel}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                      >
                        <FaArrowLeft className="text-gray-600" />
                      </motion.button>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm font-bold">
                            {initials}
                          </span>
                        </div>
                        <div>
                          <h1 className="text-lg font-bold text-gray-800">
                            Edit Profile
                          </h1>
                          <p className="text-xs text-gray-600">
                            {profile.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasChanges && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-medium"
                        >
                          <FaEdit className="text-xs" />
                          Unsaved
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 text-xs ${
                          hasChanges
                            ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <FaSave />
                        Save
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 shadow-xl border border-teal-200/20 min-h-[400px] sm:min-h-[500px]"
              >
                {getFormContent()[activeSection]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
