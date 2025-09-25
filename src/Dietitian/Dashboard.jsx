import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
const AyurvedicParticleSystem = ({ count = 1 }) => {
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

// Tab Configuration
const TABS = [
  {
    id: "overview",
    name: "Overview",
    icon: FaChartPie,
    color: "#A0D9D9",
  },
  {
    id: "patients",
    name: "Patients",
    icon: FaUsers,
    color: "#7BC4C4",
  },
  {
    id: "plans",
    name: "Diet Plans",
    icon: FaClipboardList,
    color: "#5BAFAF",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: FaChartLine,
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

const SAMPLE_PLANS = [
  {
    id: "balanced",
    name: "Balanced Day",
    calories: 1450,
    summary:
      "Warm oat porridge, millet khichdi, steamed fish & veg — balanced macros.",
    meals: {
      breakfast: [{ name: "Warm Oat Porridge", calories: 320 }],
      lunch: [{ name: "Millet Khichdi", calories: 520 }],
      snack: [{ name: "Fruit & Nuts", calories: 180 }],
      dinner: [{ name: "Steamed Fish & Veg", calories: 430 }],
    },
    tags: ["balanced"],
  },
  {
    id: "vata-friendly",
    name: "Vata-Nourish Day",
    calories: 1430,
    summary: "Grounding, warm kitchari and porridge; easy to digest.",
    meals: {
      breakfast: [{ name: "Rice Porridge with Ghee", calories: 340 }],
      lunch: [{ name: "Lentil Stew", calories: 480 }],
      snack: [{ name: "Warm Spiced Nuts", calories: 210 }],
      dinner: [{ name: "Vegetable Kitchari", calories: 400 }],
    },
    tags: ["vata"],
  },
  {
    id: "light-kapha",
    name: "Light Kapha Day",
    calories: 1250,
    summary:
      "Light, spiced and warm — quinoa upma, grilled tandoori chicken salad.",
    meals: {
      breakfast: [{ name: "Quinoa Upma", calories: 300 }],
      lunch: [{ name: "Grilled Tandoori Chicken Salad", calories: 450 }],
      snack: [{ name: "Spiced Apple", calories: 120 }],
      dinner: [{ name: "Steamed Veg & Lentils", calories: 380 }],
    },
    tags: ["kapha"],
  },
];

// richer patient dataset
const FAKE_PATIENTS = [
  {
    id: "p1",
    name: "Asha Rao",
    age: 34,
    gender: "female",
    contact: "98450XXXX",
    bmi: 21.8,
    adherence: 78,
    lastVisit: "2025-09-05",
    goal: "Increase iron & maintain weight",
    notes:
      "Mild iron deficiency. Prefers vegetarian meals. Allergic to shellfish.",
    flags: ["iron-deficiency"],
    history: [
      { date: "2025-09-05", planId: "vata-friendly", note: "Initial plan" },
      { date: "2025-08-20", planId: "balanced", note: "2-week review" },
    ],
  },
  {
    id: "p2",
    name: "Rahul Mehta",
    age: 42,
    gender: "male",
    contact: "99000XXXX",
    bmi: 29.2,
    adherence: 45,
    lastVisit: "2025-08-30",
    goal: "Weight loss 6 kg",
    notes: "Active runner. Wants lower carbs evening.",
    flags: ["overweight"],
    history: [
      { date: "2025-08-30", planId: "light-kapha", note: "Weight-loss plan" },
      { date: "2025-08-10", planId: "balanced", note: "Baseline" },
    ],
  },
  {
    id: "p3",
    name: "Sana Khan",
    age: 28,
    gender: "female",
    contact: "98111XXXX",
    bmi: 23.4,
    adherence: 92,
    lastVisit: "2025-09-10",
    goal: "Prenatal nutrition, increase calories",
    notes: "Pregnancy — needs calorie increase and iron-rich foods.",
    flags: ["pregnancy"],
    history: [
      { date: "2025-09-10", planId: "balanced", note: "Prenatal adjustments" },
    ],
  },
  {
    id: "p4",
    name: "Vikram Patel",
    age: 51,
    gender: "male",
    contact: "97777XXXX",
    bmi: 26.1,
    adherence: 60,
    lastVisit: "2025-09-01",
    goal: "Lower BP and reduce sodium",
    notes: "Hypertension controlled with meds. Monitor salt intake.",
    flags: ["hypertension"],
    history: [
      { date: "2025-09-01", planId: "balanced", note: "Salt-reduction plan" },
      { date: "2025-07-10", planId: "light-kapha", note: "Initial" },
    ],
  },
  {
    id: "p5",
    name: "Meera Iyer",
    age: 46,
    gender: "female",
    contact: "96666XXXX",
    bmi: 19.2,
    adherence: 85,
    lastVisit: "2025-09-02",
    goal: "Improve energy, address fatigue",
    notes: "Low energy mornings; prefers warm breakfasts.",
    flags: ["fatigue"],
    history: [
      {
        date: "2025-09-02",
        planId: "vata-friendly",
        note: "Energy-boosting plan",
      },
      { date: "2025-08-05", planId: "balanced", note: "Review" },
    ],
  },
  {
    id: "p6",
    name: "Arjun Singh",
    age: 38,
    gender: "male",
    contact: "95555XXXX",
    bmi: 24.8,
    adherence: 70,
    lastVisit: "2025-08-25",
    goal: "Muscle gain, protein focus",
    notes: "Gym regular. Wants high-protein meals.",
    flags: ["muscle-gain"],
    history: [
      { date: "2025-08-25", planId: "balanced", note: "Protein-focused plan" },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients] = useState(FAKE_PATIENTS);
  const [query, setQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(
    patients[0]?.id || null
  );
  const [activeTab, setActiveTab] = useState("overview");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q) ||
        (p.goal && p.goal.toLowerCase().includes(q))
    );
  }, [patients, query]);

  // Tab content functions
  const getTabContent = () => {
    return {
      overview: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                  <FaUsers className="text-white text-lg sm:text-base" />
                </div>
                <div>
                  <h3 className="text-md sm:text-lg font-medium text-teal-900">
                    Total Patients
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-teal-800">
                    {patients.length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                  <FaCheckCircle className="text-white text-lg sm:text-base" />
                </div>
                <div>
                  <h3 className="text-md sm:text-lg font-medium text-teal-900">
                    Active Plans
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-green-800">
                    {SAMPLE_PLANS.length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.15 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                  <FaChartLine className="text-white text-lg sm:text-base" />
                </div>
                <div>
                  <h3 className="text-md sm:text-lg font-medium text-teal-900">
                    Avg Adherence
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-800">
                    {Math.round(
                      patients.reduce((sum, p) => sum + p.adherence, 0) /
                        patients.length
                    )}
                    %
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.2 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <FaCalendarAlt className="text-white text-lg sm:text-base" />
                </div>
                <div>
                  <h3 className="text-md sm:text-lg font-medium text-teal-900">
                    This Month
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-purple-800">
                    {
                      patients.filter(
                        (p) =>
                          new Date(p.lastVisit) >=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          )
                      ).length
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.25 }}
            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
          >
            <h3 className="text-lg sm:text-base font-bold text-teal-900 mb-3">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {patients.slice(0, 5).map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: 0.3 + index * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg border border-teal-100/50 gap-1 sm:gap-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-teal-200 to-cyan-100 flex items-center justify-center">
                      <FaUser className="text-teal-800 text-md sm:text-lg" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-md sm:text-lg">
                        {patient.name}
                      </h4>
                      <p className="text-md text-gray-600">
                        Last visit: {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-medium text-teal-800 text-md sm:text-lg">
                      {patient.adherence}% adherence
                    </p>
                    <p className="text-md text-gray-600">{patient.goal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ),
      patients: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search patients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg text-md sm:text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-100 bg-white/80"
            />
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => navigate("/add-patient")}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-teal-800 to-cyan-600 text-white text-md sm:text-lg shadow-md hover:shadow-lg transition-all duration-100 flex items-center justify-center gap-1 sm:gap-2"
            >
              <FaPlus />
              <span className="hidden sm:inline">Add Patient</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedPatientId(patient.id)}
                className={`p-3 sm:p-4 rounded-xl border shadow-md cursor-pointer transition-all duration-150 ${
                  selectedPatientId === patient.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-400"
                    : "bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 border-teal-200/50 hover:border-teal-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center ${
                      selectedPatientId === patient.id
                        ? "bg-white/20"
                        : "bg-gradient-to-r from-teal-200 to-cyan-100"
                    }`}
                  >
                    <FaUser
                      className={`text-lg sm:text-base ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-teal-800"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-lg sm:text-base font-medium ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-teal-900"
                      }`}
                    >
                      {patient.name}
                    </h3>
                    <p
                      className={`text-md ${
                        selectedPatientId === patient.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      {patient.age} years, {patient.gender}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-md ${
                        selectedPatientId === patient.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      BMI:
                    </span>
                    <span
                      className={`font-medium text-md sm:text-lg ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-teal-800"
                      }`}
                    >
                      {patient.bmi}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-md ${
                        selectedPatientId === patient.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      Adherence:
                    </span>
                    <span
                      className={`font-medium text-md sm:text-lg ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-green-800"
                      }`}
                    >
                      {patient.adherence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-md ${
                        selectedPatientId === patient.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      Last Visit:
                    </span>
                    <span
                      className={`font-medium text-md sm:text-lg ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-blue-800"
                      }`}
                    >
                      {patient.lastVisit}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-md ${
                    selectedPatientId === patient.id
                      ? "text-white/90"
                      : "text-gray-700"
                  }`}
                >
                  <p className="font-medium mb-1">Goal: {patient.goal}</p>
                  <p className="line-clamp-2">{patient.notes}</p>
                </div>

                {patient.flags && patient.flags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {patient.flags.map((flag, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded-full text-md font-medium ${
                          selectedPatientId === patient.id
                            ? "bg-white/20 text-white"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
      plans: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SAMPLE_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md hover:shadow-lg transition-all duration-150"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                    <FaClipboardList className="text-white text-lg sm:text-base" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-base font-medium text-teal-900">
                      {plan.name}
                    </h3>
                    <p className="text-md text-gray-600">
                      {plan.calories} calories
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-2 text-md sm:text-lg">
                  {plan.summary}
                </p>

                <div className="space-y-1 mb-2">
                  {Object.entries(plan.meals).map(([mealType, items]) => (
                    <div
                      key={mealType}
                      className="bg-white/60 rounded-md p-1.5"
                    >
                      <div className="font-medium text-gray-800 capitalize text-md mb-0.5">
                        {mealType}
                      </div>
                      {items.map((item, idx) => (
                        <div key={idx} className="text-md text-gray-600">
                          {item.name} ({item.calories} cal)
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {plan.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded-full text-md font-medium bg-teal-100 text-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
      analytics: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-teal-900 mb-3">
                Patient Adherence
              </h3>
              <div className="space-y-2">
                {patients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: 0.1 + index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0"
                  >
                    <span className="text-gray-700 font-medium text-md sm:text-lg">
                      {patient.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${patient.adherence}%` }}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + index * 0.1,
                          }}
                          className="bg-gradient-to-r from-teal-800 to-cyan-600 h-1.5 rounded-full"
                        />
                      </div>
                      <span className="text-teal-800 font-medium w-8 sm:w-10 text-right text-md sm:text-lg">
                        {patient.adherence}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 rounded-xl border border-teal-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-teal-900 mb-3">
                BMI Distribution
              </h3>
              <div className="space-y-2">
                {patients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: 0.15 + index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0"
                  >
                    <span className="text-gray-700 font-medium text-md sm:text-lg">
                      {patient.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-md font-medium ${
                          patient.bmi < 18.5
                            ? "bg-blue-100 text-blue-800"
                            : patient.bmi < 25
                            ? "bg-green-100 text-green-800"
                            : patient.bmi < 30
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {patient.bmi < 18.5
                          ? "Underweight"
                          : patient.bmi < 25
                          ? "Normal"
                          : patient.bmi < 30
                          ? "Overweight"
                          : "Obese"}
                      </span>
                      <span className="text-teal-800 font-medium text-md sm:text-lg">
                        {patient.bmi}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ),
    };
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Enhanced Ayurvedic Particle System */}
      <AyurvedicParticleSystem count={0} />

      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {BG_LAYERS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i === TABS.findIndex((t) => t.id === activeTab) ? 1 : 0,
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
          className="absolute -left-40 -top-40 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-teal-200 to-cyan-100 blur-3xl pointer-events-none"
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

      {/* Main Content */}
      <div className="pt-20 sm:pt-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4">
        <div className="w-full mx-auto">
          <div className="flex gap-4 h-full">
            {/* Creative Sidebar Navigation */}
            <div className="w-64 flex-shrink-0 fixed">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-teal-50/80 to-cyan-50/80 rounded-xl p-4 h-fit border border-teal-200/60 shadow-lg sticky  overflow-hidden"
              >
                {/* Sidebar Header */}
                <div className="text-center mb-6">
                  <div className="w-full h-9 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <FaChartPie className="text-white text-2xl" />
                  </div>
                
                </div>

                {/* Navigation Tabs */}
                <div className="space-y-2">
                  {TABS.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 flex items-start gap-3 group ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg transform scale-105"
                          : "bg-white/70 hover:bg-white/90 text-gray-700 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-white/20"
                            : `bg-gradient-to-r ${
                                tab.color.includes("#")
                                  ? ""
                                  : "from-teal-400 to-cyan-400"
                              }`
                        }`}
                        style={
                          activeTab !== tab.id
                            ? { backgroundColor: tab.color }
                            : {}
                        }
                      >
                        <tab.icon
                          className={`text-lg ${
                            activeTab === tab.id ? "text-white" : "text-white"
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div
                          className={`font-semibold text-sm mb-1 ${
                            activeTab === tab.id
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {tab.name}
                        </div>
                        <div
                          className={`text-xs ${
                            activeTab === tab.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {tab.id === "overview" && "Quick summary"}
                          {tab.id === "patients" && "Patient management"}
                          {tab.id === "plans" && "Diet planning"}
                          {tab.id === "analytics" && "Performance metrics"}
                        </div>
                      </div>
                      {activeTab === tab.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full self-center"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 p-4 bg-white/60 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 mb-3">
                    Quick Stats
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/60 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-teal-600">
                        {patients.length}
                      </div>
                      <div className="text-xs text-gray-600">Patients</div>
                    </div>
                    <div className="bg-white/60 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-cyan-600">4</div>
                      <div className="text-xs text-gray-600">Plans</div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-72">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 shadow-xl border border-teal-200/20 min-h-[400px] sm:min-h-[500px]"
              >
                {getTabContent()[activeTab]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
