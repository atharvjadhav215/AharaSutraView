import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
/*
  Dietitian Dashboard — updated
  - more patients with richer info
  - animated patient list (stagger) + animated detail panels
  - progress / adherence bars animate on select
  - all text sizes >= text-lg / text-xl where appropriate
*/

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
    name: "Arjun Sharma",
    age: 30,
    gender: "male",
    contact: "95555XXXX",
    bmi: 24.0,
    adherence: 50,
    lastVisit: "2025-08-22",
    goal: "Muscle gain",
    notes: "Gym 4x/wk, needs higher protein evenings.",
    flags: ["active"],
    history: [
      { date: "2025-08-22", planId: "balanced", note: "Muscle-gain variant" },
    ],
  },
  {
    id: "p7",
    name: "Latha Nair",
    age: 60,
    gender: "female",
    contact: "94444XXXX",
    bmi: 27.5,
    adherence: 66,
    lastVisit: "2025-07-15",
    goal: "Manage diabetes",
    notes: "Type 2 diabetes – monitor carbs and glycemic load.",
    flags: ["diabetes"],
    history: [
      {
        date: "2025-07-15",
        planId: "light-kapha",
        note: "Glycemic control plan",
      },
      { date: "2025-05-30", planId: "balanced", note: "General plan" },
    ],
  },
  {
    id: "p8",
    name: "Devika Rao",
    age: 26,
    gender: "female",
    contact: "93333XXXX",
    bmi: 22.0,
    adherence: 98,
    lastVisit: "2025-09-11",
    goal: "Skin health",
    notes: "Acne-prone, prefers plant-based recipes.",
    flags: ["skin"],
    history: [
      { date: "2025-09-11", planId: "balanced", note: "Skin-support plan" },
    ],
  },
];

const findPlan = (id) =>
  SAMPLE_PLANS.find((p) => p.id === id) || SAMPLE_PLANS[0];

const listVariants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  hidden: {},
};
const itemVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients] = useState(FAKE_PATIENTS);
  const [query, setQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(
    patients[0]?.id || null
  );
  const [selectedRecordIdx, setSelectedRecordIdx] = useState(0);
  const [highlighted, setHighlighted] = useState(null); // hover highlight

  // small animated counters
  const totalPatients = patients.length;
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => {
    let r = 0;
    const t = setInterval(() => {
      r += 5;
      setActiveCount((s) => {
        const next = Math.min(totalPatients, s + 1);
        if (next === totalPatients) clearInterval(t);
        return next;
      });
    }, 60);
    return () => clearInterval(t);
  }, [totalPatients]);

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

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || filtered[0] || null;
  const selectedRecord = selectedPatient?.history?.[selectedRecordIdx] || null;
  const selectedPlan = selectedRecord ? findPlan(selectedRecord.planId) : null;

  const totals = useMemo(() => {
    if (!selectedPlan) return null;
    const meals = Object.values(selectedPlan.meals).flat();
    const calories = meals.reduce((s, m) => s + (m.calories || 0), 0);
    const carbs_g = Math.round((calories * 0.5) / 4);
    const protein_g = Math.round((calories * 0.2) / 4);
    const fat_g = Math.round((calories * 0.3) / 9);
    return { calories, carbs_g, protein_g, fat_g };
  }, [selectedPlan]);

  return (
    <div className="min-h-screen bg-gradient-to-l from-white to-[#f6f3e8] p-6">
      <Link to="/dhome">
        <button className="px-4 py-3 mt-5 ml-5 mb-5 rounded-full bg-white border text-emerald-700 text-lg disabled:opacity-50">
          ← Back to Home
        </button>
      </Link>
      <div className="max-w-8xl mx-auto ">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-900">
              Dietitian Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/add-patient")}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-lg shadow"
            >
              Add Patient
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-xl bg-white text-emerald-600 font-semibold text-lg shadow"
            >
              View Your Dashboard
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: patient list */}
          <aside className="lg:col-span-1 bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-3 mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patients or goals..."
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={listVariants}
              className="space-y-3 overflow-y-auto max-h-[90vh]"
            >
              {filtered.length === 0 && (
                <div className="text-lg text-gray-600">No patients found.</div>
              )}

              {filtered.map((p) => (
                <motion.button
                  key={p.id}
                  variants={itemVariants}
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setSelectedRecordIdx(0);
                  }}
                  onMouseEnter={() => setHighlighted(p.id)}
                  onMouseLeave={() => setHighlighted(null)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors flex flex-col gap-2 ${
                    selectedPatientId === p.id
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full w-14 h-14 bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-emerald-900">
                          {p.name}
                        </div>
                        <div className="text-lg text-gray-700">
                          {p.age} • {p.gender}
                        </div>
                        <div className="text-lg text-gray-600 mt-1">
                          {p.goal}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg text-gray-600 text-right">
                      <div>Last: {p.lastVisit}</div>
                      <div className="mt-2">
                        <div className="text-sm text-emerald-700 font-medium">
                          Adherence
                        </div>
                        <div className="w-28 bg-gray-200 h-3 rounded overflow-hidden mt-1">
                          <div
                            style={{
                              width: `${p.adherence}%`,
                              transition: "width 600ms ease",
                            }}
                            className={`h-3 ${
                              p.adherence > 75
                                ? "bg-emerald-600"
                                : p.adherence > 45
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="text-lg text-gray-600 mt-1">
                          {p.adherence}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-lg text-gray-600 line-clamp-2">
                    {p.notes}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </aside>

          {/* Right: patient detail and history (span 3 columns) */}
          <main className="lg:col-span-3 space-y-6">
            {!selectedPatient ? (
              <div className="bg-white rounded-xl p-6 shadow text-lg text-gray-700">
                Select a patient to view details.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPatient.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="bg-white rounded-2xl p-6 shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full w-20 h-20 bg-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700">
                          {selectedPatient.name
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-emerald-900">
                            {selectedPatient.name}
                          </h2>
                          <div className="text-lg text-gray-700">
                            {selectedPatient.age} • {selectedPatient.gender} •
                            BMI:{" "}
                            <span className="font-medium">
                              {selectedPatient.bmi}
                            </span>
                          </div>
                          <div className="text-lg text-gray-600 mt-1">
                            Contact: {selectedPatient.contact}
                          </div>
                          <div className="text-lg text-gray-600 mt-1">
                            Last visit: {selectedPatient.lastVisit}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-lg text-gray-700">
                        <div className="font-medium text-lg text-emerald-900">
                          Notes
                        </div>
                        <div className="mt-1">{selectedPatient.notes}</div>
                        <div className="mt-3 flex gap-3">
                          {selectedPatient.flags.map((f) => (
                            <span
                              key={f}
                              className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-lg border"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() =>
                          navigate(`/add-patient?edit=${selectedPatient.id}`)
                        }
                        className="px-4 py-2 rounded-lg bg-white text-emerald-600 border font-medium text-lg"
                      >
                        Edit Patient
                      </button>
                      <button
                        onClick={() =>
                          alert("Export patient summary (placeholder)")
                        }
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-lg"
                      >
                        Export Summary
                      </button>
                    </div>
                  </div>

                  {/* History + preview */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 bg-[#f6f3e8] rounded-lg p-4">
                      <div className="font-semibold text-lg text-emerald-900 mb-2">
                        Chart History
                      </div>
                      <div className="space-y-2">
                        <AnimatePresence>
                          {selectedPatient.history.map((rec, idx) => {
                            const plan = findPlan(rec.planId);
                            return (
                              <motion.button
                                key={rec.date + idx}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{
                                  duration: 0.28,
                                  delay: idx * 0.03,
                                }}
                                onClick={() => setSelectedRecordIdx(idx)}
                                className={`w-full text-left p-3 rounded-lg ${
                                  selectedRecordIdx === idx
                                    ? "bg-white border ring-2 ring-emerald-200"
                                    : "bg-white/90"
                                } shadow`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-lg text-emerald-900">
                                      {plan.name}
                                    </div>
                                    <div className="text-lg text-gray-700">
                                      {rec.note}
                                    </div>
                                  </div>
                                  <div className="text-lg text-gray-600">
                                    {rec.date}
                                  </div>
                                </div>
                                <div className="text-lg text-gray-600 mt-2">
                                  {plan.summary}
                                </div>
                              </motion.button>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-2xl font-semibold text-emerald-900">
                            {selectedRecord
                              ? findPlan(selectedRecord.planId).name
                              : "No plan selected"}
                          </div>
                          <div className="text-lg text-gray-700 mt-1">
                            {selectedRecord
                              ? selectedRecord.date +
                                " — " +
                                selectedRecord.note
                              : ""}
                          </div>
                        </div>

                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(
                                selectedRecord
                                  ? `${selectedPatient.name} — ${
                                      selectedRecord.date
                                    } — ${
                                      findPlan(selectedRecord.planId).summary
                                    }`
                                  : ""
                              );
                              alert("Copied summary to clipboard");
                            }}
                            className="px-3 py-2 bg-white text-emerald-600 rounded-lg text-lg border"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => alert("Share placeholder")}
                            className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-lg"
                          >
                            Share
                          </button>
                        </div>
                      </div>

                      {!selectedPlan ? (
                        <div className="text-lg text-gray-600">
                          Select a record to preview the diet chart.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#f6f3e8] rounded-lg p-4">
                              <div className="text-lg font-medium text-emerald-900">
                                Estimated Calories
                              </div>
                              <motion.div
                                initial={{ scale: 0.98, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.35 }}
                                className="text-2xl font-extrabold text-emerald-900 mt-2"
                              >
                                {totals.calories} kcal
                              </motion.div>
                              <div className="text-lg text-gray-700 mt-1">
                                From selected plan
                              </div>
                            </div>

                            <div className="bg-[#f6f3e8] rounded-lg p-4">
                              <div className="text-lg font-medium text-emerald-900">
                                Macros (est.)
                              </div>
                              <motion.div
                                initial={{ x: -6 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.35 }}
                                className="mt-2 space-y-2 text-lg text-gray-800"
                              >
                                <div>Carbs: {totals.carbs_g} g</div>
                                <div>Protein: {totals.protein_g} g</div>
                                <div>Fat: {totals.fat_g} g</div>
                              </motion.div>
                            </div>

                            <div className="bg-[#f6f3e8] rounded-lg p-4">
                              <div className="text-lg font-medium text-emerald-900">
                                Quick Actions
                              </div>
                              <div className="mt-2 flex flex-col gap-2">
                                <button
                                  className="px-3 py-2 bg-white rounded-lg text-emerald-600 text-lg border"
                                  onClick={() =>
                                    alert("Assign to patient (placeholder)")
                                  }
                                >
                                  Assign plan
                                </button>
                                <button
                                  className="px-3 py-2 bg-white rounded-lg text-emerald-600 text-lg border"
                                  onClick={() =>
                                    alert("Edit plan (placeholder)")
                                  }
                                >
                                  Edit plan
                                </button>
                                <button
                                  className="px-3 py-2 bg-emerald-600 rounded-lg text-white text-lg"
                                  onClick={() =>
                                    alert("Export plan PDF (placeholder)")
                                  }
                                >
                                  Export PDF
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="text-lg font-semibold text-emerald-900 mb-2">
                              Meals
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(selectedPlan.meals).map(
                                ([mealKey, items]) => (
                                  <motion.div
                                    key={mealKey}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-[#fffaf3] p-3 rounded-lg"
                                  >
                                    <div className="font-medium text-lg text-emerald-900 capitalize">
                                      {mealKey} •{" "}
                                      {items.reduce(
                                        (s, i) => s + (i.calories || 0),
                                        0
                                      )}{" "}
                                      kcal
                                    </div>
                                    <ul className="mt-2 list-disc pl-5 text-lg text-gray-700">
                                      {items.map((it, idx) => (
                                        <li key={idx}>
                                          {it.name} ({it.calories || "—"} kcal)
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )
                              )}
                            </div>

                            <div className="mt-3 text-lg text-gray-600">
                              Note: these estimates use default macro splits.
                              For clinical tracking, attach exact recipe macros.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
