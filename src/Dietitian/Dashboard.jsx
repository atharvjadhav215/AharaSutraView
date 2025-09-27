import React, { useMemo, useState } from "react";
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
  FaTimes,
  FaClipboard,
} from "react-icons/fa";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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

// Enhanced patient dataset with detailed information
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
    nextVisit: new Date().toISOString().split("T")[0], // Today
    goal: "Increase iron & maintain weight",
    notes:
      "Mild iron deficiency. Prefers vegetarian meals. Allergic to shellfish.",
    flags: ["iron-deficiency"],
    // Detailed patient information based on AddPatient.jsx structure
    basic: {
      patientName: "Asha Rao",
      age: 34,
      gender: "female",
      contactNumber: "98450XXXX",
      date: "2025-09-05",
    },
    anthro: {
      height: "165",
      weight: "59",
      bmi: "21.8",
      waist: "78",
    },
    vitals: {
      pulseRate: "72",
      bloodPressure: "110/70",
      waterIntake: "2-3",
      mealFrequency: "3",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Vegetarian",
      physicalActivities: "moderate",
      addictionHabits: ["Tea"],
      smokingFrequency: "",
      rasa: "sweet",
      dosha: "Vata",
      vikruti: "",
      sleepHours: "7",
      exerciseFrequency: "3-4 times/week",
      stressLevel: "moderate",
    },
    medical: {
      medicalHistory: "Mild iron deficiency anemia",
      bowelMovements: "regular",
      allergies: "Shellfish allergy",
    },
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
    nextVisit: new Date().toISOString().split("T")[0], // Today
    goal: "Weight loss 6 kg",
    notes: "Active runner. Wants lower carbs evening.",
    flags: ["overweight"],
    basic: {
      patientName: "Rahul Mehta",
      age: 42,
      gender: "male",
      contactNumber: "99000XXXX",
      date: "2025-08-30",
    },
    anthro: {
      height: "175",
      weight: "89",
      bmi: "29.2",
      waist: "95",
    },
    vitals: {
      pulseRate: "68",
      bloodPressure: "130/85",
      waterIntake: "3-4",
      mealFrequency: "3",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Non-vegetarian",
      physicalActivities: "active",
      addictionHabits: ["Coffee"],
      smokingFrequency: "",
      rasa: "salty",
      dosha: "Kapha",
      vikruti: "",
      sleepHours: "6",
      exerciseFrequency: "daily",
      stressLevel: "high",
    },
    medical: {
      medicalHistory: "Pre-diabetes, family history of diabetes",
      bowelMovements: "regular",
      allergies: "None",
    },
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
    nextVisit: new Date().toISOString().split("T")[0], // Today
    goal: "Prenatal nutrition, increase calories",
    notes: "Pregnancy — needs calorie increase and iron-rich foods.",
    flags: ["pregnancy"],
    basic: {
      patientName: "Sana Khan",
      age: 28,
      gender: "female",
      contactNumber: "98111XXXX",
      date: "2025-09-10",
    },
    anthro: {
      height: "160",
      weight: "60",
      bmi: "23.4",
      waist: "82",
    },
    vitals: {
      pulseRate: "75",
      bloodPressure: "105/65",
      waterIntake: "2-3",
      mealFrequency: "4+",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Vegetarian",
      physicalActivities: "light",
      addictionHabits: [],
      smokingFrequency: "",
      rasa: "sweet",
      dosha: "Pitta",
      vikruti: "",
      sleepHours: "8",
      exerciseFrequency: "1-2 times/week",
      stressLevel: "low",
    },
    medical: {
      medicalHistory: "Pregnancy - 24 weeks",
      bowelMovements: "regular",
      allergies: "None",
    },
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
    nextVisit: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Tomorrow
    goal: "Lower BP and reduce sodium",
    notes: "Hypertension controlled with meds. Monitor salt intake.",
    flags: ["hypertension"],
    basic: {
      patientName: "Vikram Patel",
      age: 51,
      gender: "male",
      contactNumber: "97777XXXX",
      date: "2025-09-01",
    },
    anthro: {
      height: "170",
      weight: "75",
      bmi: "26.1",
      waist: "88",
    },
    vitals: {
      pulseRate: "70",
      bloodPressure: "140/90",
      waterIntake: "1-2",
      mealFrequency: "3",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Non-vegetarian",
      physicalActivities: "moderate",
      addictionHabits: ["Tea", "Alcohol"],
      smokingFrequency: "",
      rasa: "salty",
      dosha: "Kapha",
      vikruti: "",
      sleepHours: "6",
      exerciseFrequency: "3-4 times/week",
      stressLevel: "high",
    },
    medical: {
      medicalHistory: "Hypertension, on medication",
      bowelMovements: "regular",
      allergies: "None",
    },
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
    nextVisit: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Day after tomorrow
    goal: "Improve energy, address fatigue",
    notes: "Low energy mornings; prefers warm breakfasts.",
    flags: ["fatigue"],
    basic: {
      patientName: "Meera Iyer",
      age: 46,
      gender: "female",
      contactNumber: "96666XXXX",
      date: "2025-09-02",
    },
    anthro: {
      height: "158",
      weight: "48",
      bmi: "19.2",
      waist: "72",
    },
    vitals: {
      pulseRate: "65",
      bloodPressure: "100/60",
      waterIntake: "2-3",
      mealFrequency: "3",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Vegetarian",
      physicalActivities: "light",
      addictionHabits: ["Tea"],
      smokingFrequency: "",
      rasa: "sweet",
      dosha: "Vata",
      vikruti: "",
      sleepHours: "7",
      exerciseFrequency: "1-2 times/week",
      stressLevel: "moderate",
    },
    medical: {
      medicalHistory: "Low energy, fatigue, iron deficiency",
      bowelMovements: "irregular",
      allergies: "None",
    },
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
    nextVisit: new Date().toISOString().split("T")[0], // Today
    goal: "Muscle gain, protein focus",
    notes: "Gym regular. Wants high-protein meals.",
    flags: ["muscle-gain"],
    basic: {
      patientName: "Arjun Singh",
      age: 38,
      gender: "male",
      contactNumber: "95555XXXX",
      date: "2025-08-25",
    },
    anthro: {
      height: "180",
      weight: "80",
      bmi: "24.8",
      waist: "85",
    },
    vitals: {
      pulseRate: "62",
      bloodPressure: "115/75",
      waterIntake: "3-4",
      mealFrequency: "4+",
    },
    lifestyle: {
      cuisinePreference: "Indian",
      dietaryHabits: "Non-vegetarian",
      physicalActivities: "active",
      addictionHabits: ["Protein supplements"],
      smokingFrequency: "",
      rasa: "salty",
      dosha: "Pitta",
      vikruti: "",
      sleepHours: "7",
      exerciseFrequency: "daily",
      stressLevel: "low",
    },
    medical: {
      medicalHistory: "No significant medical history",
      bowelMovements: "regular",
      allergies: "None",
    },
    history: [
      { date: "2025-08-25", planId: "balanced", note: "Protein-focused plan" },
    ],
  },
];

// Diet Plan Popup Component
const DietPlanPopup = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  const currentPlan =
    SAMPLE_PLANS.find(
      (plan) =>
        patient.history &&
        patient.history.length > 0 &&
        patient.history[patient.history.length - 1].planId === plan.id
    ) || SAMPLE_PLANS[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaClipboard className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {patient.name}'s Diet Plan
                  </h2>
                  <p className="text-teal-100">
                    Current Plan: {currentPlan.name}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Patient Details */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-teal-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Basic Info
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Age:</span>{" "}
                      {patient.basic?.age} years
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {patient.basic?.gender}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span>{" "}
                      {patient.basic?.contactNumber}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Anthropometrics
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Height:</span>{" "}
                      {patient.anthro?.height} cm
                    </p>
                    <p>
                      <span className="font-medium">Weight:</span>{" "}
                      {patient.anthro?.weight} kg
                    </p>
                    <p>
                      <span className="font-medium">BMI:</span>{" "}
                      {patient.anthro?.bmi}
                    </p>
                    <p>
                      <span className="font-medium">Waist:</span>{" "}
                      {patient.anthro?.waist} cm
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Vitals</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">BP:</span>{" "}
                      {patient.vitals?.bloodPressure}
                    </p>
                    <p>
                      <span className="font-medium">Pulse:</span>{" "}
                      {patient.vitals?.pulseRate} bpm
                    </p>
                    <p>
                      <span className="font-medium">Water:</span>{" "}
                      {patient.vitals?.waterIntake} L/day
                    </p>
                    <p>
                      <span className="font-medium">Meals:</span>{" "}
                      {patient.vitals?.mealFrequency}/day
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Lifestyle
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Diet:</span>{" "}
                      {patient.lifestyle?.dietaryHabits}
                    </p>
                    <p>
                      <span className="font-medium">Activity:</span>{" "}
                      {patient.lifestyle?.physicalActivities}
                    </p>
                    <p>
                      <span className="font-medium">Dosha:</span>{" "}
                      {patient.lifestyle?.dosha}
                    </p>
                    <p>
                      <span className="font-medium">Sleep:</span>{" "}
                      {patient.lifestyle?.sleepHours} hrs
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Medical</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">History:</span>{" "}
                      {patient.medical?.medicalHistory}
                    </p>
                    <p>
                      <span className="font-medium">Bowel:</span>{" "}
                      {patient.medical?.bowelMovements}
                    </p>
                    <p>
                      <span className="font-medium">Allergies:</span>{" "}
                      {patient.medical?.allergies}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Goals & Notes
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Goal:</span> {patient.goal}
                    </p>
                    <p>
                      <span className="font-medium">Adherence:</span>{" "}
                      {patient.adherence}%
                    </p>
                    <p>
                      <span className="font-medium">Last Visit:</span>{" "}
                      {patient.lastVisit}
                    </p>
                    <p>
                      <span className="font-medium">Next Visit:</span>{" "}
                      {new Date(patient.nextVisit).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Plan Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaClipboardList className="text-teal-600" />
                Current Diet Plan: {currentPlan.name}
              </h3>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-teal-900">
                      {currentPlan.name}
                    </h4>
                    <p className="text-teal-700">{currentPlan.summary}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-800">
                      {currentPlan.calories}
                    </div>
                    <div className="text-sm text-teal-600">calories/day</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentPlan.meals).map(
                    ([mealType, items]) => (
                      <div
                        key={mealType}
                        className="bg-white/80 p-4 rounded-lg"
                      >
                        <h5 className="font-semibold text-gray-800 capitalize mb-2 flex items-center gap-2">
                          <FaUtensils className="text-teal-600" />
                          {mealType}
                        </h5>
                        <div className="space-y-2">
                          {items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded"
                            >
                              <span className="text-gray-700">{item.name}</span>
                              <span className="text-sm font-medium text-teal-600">
                                {item.calories} cal
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {currentPlan.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan History */}
            {patient.history && patient.history.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaHistory className="text-teal-600" />
                  Plan History
                </h3>
                <div className="space-y-3">
                  {patient.history.map((entry, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">
                            {entry.note}
                          </p>
                          <p className="text-sm text-gray-600">
                            Plan: {entry.planId}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
              <FaDownload />
              Export Plan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients] = useState(FAKE_PATIENTS);
  const [query, setQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(
    patients[0]?.id || null
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [showDietPlan, setShowDietPlan] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  // Get today's appointments
  const todaysPatients = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    return patients.filter((patient) => patient.nextVisit === today);
  }, [patients]);

  // Get upcoming appointments (next 7 days)
  const upcomingPatients = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return patients
      .filter((patient) => {
        const visitDate = new Date(patient.nextVisit);
        return visitDate >= today && visitDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.nextVisit) - new Date(b.nextVisit));
  }, [patients]);

  // Tab content functions
  const getTabContent = () => {
    return {
      overview: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
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

          {/* Today's Appointments */}
          {todaysPatients.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.25 }}
              className="bg-gradient-to-br from-teal-50 via-cyan-50/40 to-teal-50/30 p-3 sm:p-4 rounded-xl border border-cyan-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-cyan-900 mb-3 flex items-center gap-2">
                <FaCalendarAlt className="text-cyan-600" />
                Today's Appointments ({todaysPatients.length})
              </h3>
              <div className="space-y-2">
                {todaysPatients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: 0.3 + index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg border border-cyan-100/50 gap-1 sm:gap-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-cyan-200 to-teal-100 flex items-center justify-center">
                        <FaUser className="text-cyan-800 text-md sm:text-lg" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-md sm:text-lg">
                          {patient.name}
                        </h4>
                        <p className="text-md text-gray-600">
                          {patient.age} years, {patient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-cyan-800 text-md sm:text-lg">
                        {patient.goal}
                      </p>
                      <p className="text-md text-gray-600">
                        {patient.adherence}% adherence
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.25 }}
              className="bg-gradient-to-br from-gray-50 via-gray-50/40 to-gray-50/30 p-3 sm:p-4 rounded-xl border border-gray-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                Today's Appointments (0)
              </h3>
              <p className="text-gray-600 text-center py-4">
                No appointments scheduled for today. Enjoy your day! 😊
              </p>
            </motion.div>
          )}

          {/* Upcoming Appointments */}
          {upcomingPatients.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 p-3 sm:p-4 rounded-xl border border-blue-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-blue-900 mb-3 flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Upcoming Appointments (Next 7 Days)
              </h3>
              <div className="space-y-2">
                {upcomingPatients.slice(0, 5).map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: 0.35 + index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg border border-blue-100/50 gap-1 sm:gap-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-blue-200 to-indigo-100 flex items-center justify-center">
                        <FaUser className="text-blue-800 text-md sm:text-lg" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-md sm:text-lg">
                          {patient.name}
                        </h4>
                        <p className="text-md text-gray-600">
                          {patient.age} years, {patient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-blue-800 text-md sm:text-lg">
                        {new Date(patient.nextVisit).toLocaleDateString()}
                      </p>
                      <p className="text-md text-gray-600">{patient.goal}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-50 via-gray-50/40 to-gray-50/30 p-3 sm:p-4 rounded-xl border border-gray-200/50 shadow-md"
            >
              <h3 className="text-lg sm:text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                <FaClock className="text-gray-500" />
                Upcoming Appointments (Next 7 Days)
              </h3>
              <p className="text-gray-600 text-center py-4">
                No upcoming appointments in the next 7 days.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.4 }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {filtered.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => {
                  setSelectedPatientId(patient.id);
                  setSelectedPatient(patient);
                  setShowDietPlan(true);
                }}
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
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-md ${
                        selectedPatientId === patient.id
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      Next Visit:
                    </span>
                    <span
                      className={`font-medium text-md sm:text-lg ${
                        selectedPatientId === patient.id
                          ? "text-white"
                          : "text-purple-800"
                      }`}
                    >
                      {new Date(patient.nextVisit).toLocaleDateString()}
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
      analytics: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
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

      {/* Desktop Sidebar Navigation - Hidden on mobile */}
      <div className="hidden lg:block w-64 mt-20 flex-shrink-0 fixed">
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
                    activeTab !== tab.id ? { backgroundColor: tab.color } : {}
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
                      activeTab === tab.id ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {tab.name}
                  </div>
                  <div
                    className={`text-xs ${
                      activeTab === tab.id ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.id === "overview" && "Quick summary"}
                    {tab.id === "patients" && "Patient management"}
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

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-t from-teal-50/95 to-cyan-50/95 backdrop-blur-md border-t border-teal-200/60 shadow-lg"
        >
          {/* Mobile Navigation Tabs */}
          <div className="flex justify-around px-2 py-3">
            {TABS.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id ? "bg-white/20" : ""
                  }`}
                  style={
                    activeTab !== tab.id ? { backgroundColor: tab.color } : {}
                  }
                >
                  <tab.icon
                    className={`text-lg ${
                      activeTab === tab.id ? "text-white" : "text-white"
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

      {/* Main Content */}
      <div className="pt-16 sm:pt-16 lg:pt-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 pb-20 lg:pb-4">
        <div className="w-full mx-auto">
          <div className="flex gap-4 h-full">
            {/* Main Content Area */}
            <div className="flex-1 lg:ml-56">
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

      {/* Diet Plan Popup */}
      <DietPlanPopup
        patient={selectedPatient}
        isOpen={showDietPlan}
        onClose={() => {
          setShowDietPlan(false);
          setSelectedPatient(null);
        }}
      />
    </div>
  );
}
