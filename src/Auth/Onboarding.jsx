import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // choose navigates immediately to the appropriate home,
  // Continue button also works if you prefer confirmation.
  const choose = (r) => {
    setRole(r);
    if (r === "user") navigate("/uhome");
    else if (r === "doctor") navigate("/check-info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3e2a1f]">
              Welcome to AharaSutra
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#5a3f2e]">
              Choose your role to get a tailored experience — Ayurvedic themed
              care for users and practitioners.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => choose("doctor")}
              aria-pressed={role === "doctor"}
              className={`flex flex-col border-2 border-[#8b5e3c] items-center justify-center gap-4 p-6 rounded-2xl transition-transform transform hover:-translate-y-2 focus:outline-none
                ${
                  role === "doctor"
                    ? "ring-4 ring-[#7a5a3f]/30 bg-gradient-to-tr from-[#f7eee3]/50 to-[#efe0d0]/30"
                    : "bg-white/6"
                }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#dbead6] flex items-center justify-center text-3xl">
                🩺
              </div>
              <h3 className="text-xl font-semibold text-[#3e2a1f]">Dietitian</h3>
              <p className="text-sm text-[#6b4d3b] text-center max-w-xs">
                Ayurvedic practitioner dashboard — patient management, notes and
                recommendations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => choose("user")}
              aria-pressed={role === "user"}
              className={`flex flex-col items-center border-2 border-[#8b5e3c]  justify-center gap-4 p-6 rounded-2xl transition-transform transform hover:-translate-y-2 focus:outline-none
                ${
                  role === "user"
                    ? "ring-4 ring-[#7a5a3f]/30 bg-gradient-to-tr from-[#f7eee3]/50 to-[#efe0d0]/30"
                    : "bg-white/6"
                }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#dbead6] flex items-center justify-center text-3xl">
                🧑‍⚕️
              </div>
              <h3 className="text-xl font-semibold text-[#3e2a1f]">User</h3>
              <p className="text-sm text-[#6b4d3b] text-center max-w-xs">
                Personalised Ayurvedic guidance, diet plans and tracking for
                your wellbeing.
              </p>
            </button>
          </section>

          <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-full bg-transparent text-[#5a3f2e] border border-white/10 hover:bg-white/5 transition"
              >
                Back
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
