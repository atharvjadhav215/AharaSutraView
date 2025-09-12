import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SECTIONS = [
  { id: 1, key: "basic", title: "Patient Information" },
  { id: 2, key: "anthro", title: "Anthropometrics" },
  { id: 3, key: "vitals", title: "Vitals & Intake" },
  { id: 4, key: "lifestyle", title: "Habits & Lifestyle" },
  { id: 5, key: "medical", title: "Medical History" },
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
    <div className="min-h-screen bg-gradient-to-l from-white to-emerald-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 mt-16 sm:mt-20 md:mt-24">
        <Link to="/dhome">
          <button className="px-4 py-3 mb-4 sm:mb-5 rounded-full bg-white border text-emerald-700 text-xl disabled:opacity-50 hover:shadow-md transition-shadow">
            ← Back to Home
          </button>
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Add Patient
          </h1>
          <div className="w-full sm:w-64">
            <div className="bg-gray-200 h-2 rounded overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded transition-all"
                style={{ width: `${progress}%` }}
                aria-hidden
              />
            </div>
            <div className="text-xl text-gray-900 mt-1 text-left sm:text-right">
              {progress}% complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Step navigation (left) */}
          <nav className="lg:col-span-1 sticky top-20 sm:top-24 self-start space-y-2 sm:space-y-3">
            {SECTIONS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => go(i)}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm flex items-center gap-2 sm:gap-3 transition transform ${
                  i === step
                    ? "bg-emerald-600 text-white -translate-x-1"
                    : "bg-white text-gray-700 hover:-translate-y-0.5"
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-emerald-600 font-semibold text-sm sm:text-base">
                  {s.id}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-xl">{s.title}</div>
                  <div className="text-xl text-gray-400">
                    Step {s.id} of {SECTIONS.length}
                  </div>
                </div>
                <div className="text-xl">{i === step ? "Current" : ""}</div>
              </button>
            ))}
          </nav>

          {/* Full page step panels (right) */}
          <main
            className="lg:col-span-4 relative bg-white rounded-lg shadow overflow-hidden"
            style={{ minHeight: "400px" }}
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
                    <div className="p-4 sm:p-6 md:p-8 h-full overflow-auto">
                      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            {s.title}
                          </h2>
                          <div className="text-xl text-gray-500">
                            Fill the {s.title.toLowerCase()} details
                          </div>
                        </div>
                        <div className="text-xl text-gray-600">
                          Step {i + 1} / {SECTIONS.length}
                        </div>
                      </header>

                      {/* Section content */}
                      <div className="space-y-4 sm:space-y-6">
                        {s.key === "basic" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <label className="block text-xl text-gray-600">
                                Patient Name
                              </label>
                              <input
                                value={patient.basic.patientName}
                                onChange={(e) =>
                                  update("basic", "patientName", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="Full name"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-gray-600">
                                Age
                              </label>
                              <input
                                type="number"
                                value={patient.basic.age}
                                onChange={(e) =>
                                  update("basic", "age", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                                placeholder="Age in years"
                              />
                            </div>
                            <div className="sm:col-span-2 md:col-span-1">
                              <label className="block text-xl text-gray-600">
                                Gender
                              </label>
                              <select
                                value={patient.basic.gender}
                                onChange={(e) =>
                                  update("basic", "gender", e.target.value)
                                }
                                className="mt-1 w-full p-2 sm:p-3 border rounded-lg text-xl"
                              >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
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

                      {/* footer controls inside panel */}
                      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="text-xl text-gray-500">
                          Section:{" "}
                          <span className="font-medium text-gray-700">
                            {s.title}
                          </span>
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => go(step - 1)}
                            disabled={step === 0}
                            className="px-3 sm:px-4 py-2 rounded border bg-white disabled:opacity-50 text-xl flex-1 sm:flex-none"
                          >
                            Previous
                          </button>
                          {i < SECTIONS.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => go(step + 1)}
                              className="px-3 sm:px-4 py-2 rounded bg-emerald-600 text-white text-xl flex-1 sm:flex-none"
                            >
                              Next
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate("/diet-chart")}
                              type="submit"
                              className="px-3 sm:px-4 py-2 rounded bg-emerald-700 text-white text-xl flex-1 sm:flex-none"
                            >
                              Save / Submit
                            </button>
                          )}
                        </div>
                      </div>
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
