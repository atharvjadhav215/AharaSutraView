import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../EnhancedEffects.css";
export default function CheckInfo() {
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [licenseData, setLicenseData] = useState(null);
  const [pancardData, setPancardData] = useState(null);
  const [idPhotoData, setIdPhotoData] = useState(null);
  const [error, setError] = useState("");

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e, setter) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setter(null);
      return;
    }
    const data = await readFile(f);
    setter(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!hospitalName.trim() || !location.trim()) {
      setError("Hospital name and location are required.");
      return;
    }
    if (!licenseData || !pancardData || !idPhotoData) {
      setError("Please upload license, PAN card and ID-size photo.");
      return;
    }

    const doctorInfo = {
      hospitalName: hospitalName.trim(),
      location: location.trim(),
      license: licenseData,
      pancard: pancardData,
      idPhoto: idPhotoData,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("doctorInfo", JSON.stringify(doctorInfo));
    } catch (err) {
      // fallback - ignore storage error for UI-only flow
    }

    // navigate to doctor home
    navigate("/dhome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 pt-5 via-cyan-50 to-teal-50 text-gray-800 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 md:mt-16 mt-8 flex items-center justify-center px-4 ">
        <motion.div
          className="w-full max-w-4xl bg-white/80 backdrop-blur-sm md:-mt-0.5 mt-5 rounded-3xl shadow-xl border border-teal-200 overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="p-8 md:p-8 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center "
            >
              <h2 className="text-4xl md:text-5xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent">
                Dietitian Verification
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-lg md:text-lg sm:text-base font-semibold text-teal-800 mb-2">
                  Hospital Name
                </label>
                <input
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-4 py-3 md:py-3 sm:py-2 rounded-xl bg-white/60 border border-teal-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-sm md:text-base sm:text-sm"
                  placeholder="e.g., Ayurvedic Wellness Center"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-lg md:text-lg sm:text-base font-semibold text-teal-800 mb-2">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 md:py-3 sm:py-2 rounded-xl bg-white/60 border border-teal-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-sm md:text-base sm:text-sm"
                  placeholder="City, State or full address"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-6 sm:gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/60 rounded-xl p-4 md:p-4 sm:p-3 border border-teal-200 hover:border-teal-300 transition-all duration-300"
                >
                  <label className="block text-lg md:text-lg sm:text-base font-semibold text-teal-800 mb-3">
                    License Document
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, setLicenseData)}
                    className="w-full px-3 py-2 md:py-2 sm:py-1.5 rounded-lg border border-teal-200 bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-sm md:text-sm sm:text-xs"
                  />
                  {licenseData && (
                    <motion.img
                      src={licenseData}
                      alt="license preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full h-32 md:h-32 sm:h-24 object-contain rounded-lg border border-teal-200"
                    />
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/60 rounded-xl p-4 md:p-4 sm:p-3 border border-teal-200 hover:border-teal-300 transition-all duration-300"
                >
                  <label className="block text-lg md:text-lg sm:text-base font-semibold text-teal-800 mb-3">
                    PAN Card Document
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, setPancardData)}
                    className="w-full px-3 py-2 md:py-2 sm:py-1.5 rounded-lg border border-teal-200 bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-sm md:text-sm sm:text-xs"
                  />
                  {pancardData && (
                    <motion.img
                      src={pancardData}
                      alt="pancard preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full h-32 md:h-32 sm:h-24 object-contain rounded-lg border border-teal-200"
                    />
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/60 rounded-xl p-4 md:p-4 sm:p-3 border border-teal-200 hover:border-teal-300 transition-all duration-300"
                >
                  <label className="block text-lg md:text-lg sm:text-base font-semibold text-teal-800 mb-3">
                    ID Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setIdPhotoData)}
                    className="w-full px-3 py-2 md:py-2 sm:py-1.5 rounded-lg border border-teal-200 bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-sm md:text-sm sm:text-xs"
                  />
                  {idPhotoData && (
                    <motion.img
                      src={idPhotoData}
                      alt="id preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full h-32 md:h-32 sm:h-24 object-cover rounded-lg border border-teal-200"
                    />
                  )}
                </motion.div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-lg md:text-lg sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-between mt-8 md:mt-8 sm:mt-6 gap-4"
              >
                <motion.button
                  type="button"
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 md:px-6 md:py-3 sm:px-4 sm:py-2 rounded-xl bg-white/60 border border-teal-200 text-teal-800 font-semibold hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 text-sm md:text-base sm:text-sm"
                >
                  Cancel
                </motion.button>
                <Link to="/dhome">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 md:px-8 md:py-3 sm:px-6 sm:py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 text-sm md:text-base sm:text-sm"
                  >
                    Submit & Continue
                  </motion.button>
                </Link>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
