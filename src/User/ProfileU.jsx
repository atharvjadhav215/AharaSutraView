import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  const profile = {
    name: user.name,
    username: user.username,
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

  return (
    <div className="min-h-screen bg-gradient-to-l from-white to-[#f6f3e8] p-2 sm:p-4 md:p-6">
      <Link to="/uhome">
        <button className="px-3 sm:px-4 py-2 sm:py-3 mt-20 sm:mt-4 md:mt-5 ml-2 sm:ml-3 md:ml-5 rounded-full bg-white border text-emerald-700 text-xl disabled:opacity-50 hover:shadow-md transition-shadow">
          ← Back to Home
        </button>
      </Link>
      <div className="max-w-7xl mt-4 sm:mt-16 md:mt-20 mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-100 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700">
              {initials}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-semibold text-emerald-900">
                {profile.name}
              </div>
              <div className="text-xl text-gray-700 mt-1">
                {profile.username}
              </div>
              <div className="text-xl text-gray-600 mt-1">{profile.notes}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/edit-profile")}
              className="px-3 sm:px-4 py-2 bg-white text-emerald-600 rounded-lg border text-xl flex-1 sm:flex-none"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/my-diet-chart")}
              className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg text-xl flex-1 sm:flex-none"
            >
              View My Diet Chart
            </button>
          </div>
        </motion.header>

        <motion.main
          initial="hidden"
          animate="show"
          variants={container}
          className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <motion.section
            variants={item}
            className="lg:col-span-1 bg-white rounded-xl p-3 sm:p-4 shadow"
          >
            <div className="text-xl font-semibold text-emerald-900 mb-3">
              Quick Summary
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xl">
                <div className="text-gray-700">Age / Gender</div>
                <div className="font-medium text-emerald-900">
                  {profile.basic.age || "—"} / {profile.basic.gender || "—"}
                </div>
              </div>

              <div className="flex justify-between text-xl">
                <div className="text-gray-700">Height / Weight</div>
                <div className="font-medium text-emerald-900">
                  {profile.anthro.height || "—"} cm /{" "}
                  {profile.anthro.weight || "—"} kg
                </div>
              </div>

              <div className="flex justify-between text-xl">
                <div className="text-gray-700">BMI</div>
                <div className="font-medium text-emerald-900">
                  {profile.anthro.bmi || "—"}
                </div>
              </div>

              <div className="flex justify-between text-xl">
                <div className="text-gray-700">Last update</div>
                <div className="font-medium text-emerald-900">
                  {profile.basic.date || "—"}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={item}
            className="lg:col-span-2 bg-white rounded-xl p-3 sm:p-4 shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xl font-semibold text-emerald-900">
                Detailed Information
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                variants={item}
                className="bg-[#fffaf3] rounded-lg p-3 sm:p-4"
              >
                <div className="text-xl font-medium text-emerald-900 mb-2">
                  Vitals & Intake
                </div>
                <div className="text-xl text-gray-700">
                  Pulse: {profile.vitals.pulseRate || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  BP: {profile.vitals.bloodPressure || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Water: {profile.vitals.waterIntake || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Meals/day: {profile.vitals.mealFrequency || "—"}
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-[#fffaf3] rounded-lg p-3 sm:p-4"
              >
                <div className="text-xl font-medium text-emerald-900 mb-2">
                  Lifestyle
                </div>
                <div className="text-xl text-gray-700">
                  Cuisine: {profile.lifestyle.cuisinePreference || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Diet: {profile.lifestyle.dietaryHabits || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Activity: {profile.lifestyle.physicalActivities || "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Addictions:{" "}
                  {(profile.lifestyle.addictionHabits &&
                    profile.lifestyle.addictionHabits.join(", ")) ||
                    "—"}
                </div>
                <div className="text-xl text-gray-700">
                  Dosha / Rasa: {profile.lifestyle.dosha || "—"} /{" "}
                  {profile.lifestyle.rasa || "—"}
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white rounded-lg p-3 sm:p-4 col-span-2"
              >
                <div className="text-xl font-medium text-emerald-900 mb-2">
                  Medical
                </div>
                <div className="text-xl text-gray-700">
                  {profile.medical.medicalHistory ||
                    "No medical history provided."}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="text-xl text-gray-700">
                    Bowel: {profile.medical.bowelMovements || "—"}
                  </div>
                  <div className="text-xl text-gray-700">
                    Allergies: {profile.medical.allergies || "—"}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </motion.main>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 bg-white rounded-xl p-3 sm:p-4 shadow"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
            <div className="text-xl font-semibold text-emerald-900">
              My Diet Charts
            </div>
            <div className="text-xl text-gray-600">Manage & review</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence>
              {charts && charts.length ? (
                charts.map((c, idx) => (
                  <motion.div
                    key={c.id || `${idx}-${c.date || "chart"}`}
                    initial={{ opacity: 0, y: 8, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      delay: idx * 0.04,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    className="bg-[#f6f3e8] rounded-lg p-3 sm:p-4 shadow cursor-pointer"
                    onClick={() =>
                      setExpandedChart(expandedChart === c.id ? null : c.id)
                    }
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1">
                        <div className="text-xl font-medium text-emerald-900">
                          {c.title}
                        </div>
                        <div className="text-xl text-gray-700 mt-1">
                          {c.summary}
                        </div>
                        <div className="text-xl text-gray-600 mt-2">
                          {c.date}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-1 sm:gap-2 w-full sm:w-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/my-diet-chart");
                          }}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-lg text-xl flex-1 sm:flex-none"
                        >
                          Open
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard?.writeText(
                              JSON.stringify(c, null, 2)
                            );
                            alert("Chart copied to clipboard");
                          }}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white border text-emerald-600 rounded-lg text-xl flex-1 sm:flex-none"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedChart === c.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100">
                            <div className="text-xl font-medium text-emerald-900 mb-2">
                              Meals
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xl text-gray-700">
                              {Object.entries(c.meals).map(([k, items]) => (
                                <div
                                  key={k}
                                  className="p-2 bg-[#fffaf3] rounded"
                                >
                                  <div className="font-medium text-emerald-900 capitalize">
                                    {k} •{" "}
                                    {items.reduce(
                                      (s, i) => s + (i.calories || 0),
                                      0
                                    )}{" "}
                                    cal
                                  </div>
                                  <ul className="list-disc pl-4 sm:pl-5 mt-1">
                                    {items.map((it, i) => (
                                      <li key={i}>
                                        {it.name} ({it.calories} cal)
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-2 lg:col-span-3 text-xl text-gray-600">
                  No saved diet charts found. Click "View My Diet Chart" to
                  create or view charts.
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
