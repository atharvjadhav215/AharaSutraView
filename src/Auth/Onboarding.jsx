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
    <div className="min-h-screen bg-gradient-to-br from-[#f9f4ec] to-[#f5e6da] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] bg-clip-text text-transparent mb-2">
            Welcome to AharaSutra
          </h1>
          <p className="text-[#6f4e37] text-sm md:text-base max-w-2xl mx-auto">
            Choose your role to get a tailored experience — Ayurvedic themed
            care for users and practitioners.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => choose("doctor")}
              className={`flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 ${
                role === "doctor"
                  ? "border-[#4d3b2f] bg-gradient-to-br from-[#f9f4ec] to-[#f5e6da] shadow-lg"
                  : "border-[#d4c4a8] bg-white/50 hover:border-[#4d3b2f]/50 hover:bg-[#f9f4ec]/30"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#4d3b2f] to-[#8b5e3c] flex items-center justify-center text-2xl md:text-3xl text-white shadow-lg">
                🩺
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#3e2a1f]">
                Dietitian
              </h3>
              <p className="text-sm md:text-base text-[#6b4d3b] text-center leading-relaxed">
                Ayurvedic practitioner dashboard — patient management, notes and
                recommendations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => choose("user")}
              className={`flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 ${
                role === "user"
                  ? "border-[#4d3b2f] bg-gradient-to-br from-[#f9f4ec] to-[#f5e6da] shadow-lg"
                  : "border-[#d4c4a8] bg-white/50 hover:border-[#4d3b2f]/50 hover:bg-[#f9f4ec]/30"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#4d3b2f] to-[#8b5e3c] flex items-center justify-center text-2xl md:text-3xl text-white shadow-lg">
                🧑‍⚕️
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#3e2a1f]">
                User
              </h3>
              <p className="text-sm md:text-base text-[#6b4d3b] text-center leading-relaxed">
                Personalised Ayurvedic guidance, diet plans and tracking for
                your wellbeing.
              </p>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-lg bg-transparent text-[#6f4e37] border border-[#d4c4a8] hover:bg-[#f9f4ec] hover:border-[#4d3b2f] transition-all duration-200"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
