import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.png";

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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-4xl mt-12 md:mt-12 sm:mt-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-8 sm:mb-6">
          <h1 className="text-3xl md:text-4xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Welcome to AharaSutra
          </h1>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 sm:p-4">
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 sm:gap-3">
            <button
              type="button"
              onClick={() => choose("doctor")}
              className={`flex flex-col items-center justify-center gap-4 p-6 md:p-8 sm:p-4 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
                role === "doctor"
                  ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg"
                  : "border-teal-200 bg-white/50 hover:border-teal-400 hover:bg-teal-50/30"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl md:text-3xl sm:text-lg text-white shadow-lg">
                🩺
              </div>
              <h3 className="text-lg md:text-xl sm:text-base font-semibold text-gray-800">
                Dietitian
              </h3>
              <p className="text-sm md:text-base sm:text-xs text-gray-600 text-center leading-relaxed">
                Ayurvedic practitioner dashboard — patient management, notes and
                recommendations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => choose("user")}
              className={`flex flex-col items-center justify-center gap-4 p-6 md:p-8 sm:p-4 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
                role === "user"
                  ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg"
                  : "border-teal-200 bg-white/50 hover:border-teal-400 hover:bg-teal-50/30"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl md:text-3xl sm:text-lg text-white shadow-lg">
                🧑‍⚕️
              </div>
              <h3 className="text-lg md:text-xl sm:text-base font-semibold text-gray-800">
                User
              </h3>
              <p className="text-sm md:text-base sm:text-xs text-gray-600 text-center leading-relaxed">
                Personalised Ayurvedic guidance, diet plans and tracking for
                your wellbeing.
              </p>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 md:mt-8 sm:mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-6 py-2 md:px-6 md:py-2 sm:px-4 sm:py-2 rounded-lg bg-transparent text-gray-600 border border-teal-200 hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 text-sm md:text-sm sm:text-xs"
            >
              ← Back to Login
            </button>

            {/* Prototype Admin Button */}
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 text-xs font-medium opacity-70"
              title="Prototype Admin Access"
            >
              Admin (Prototype)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
