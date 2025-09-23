import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaLanguage } from "react-icons/fa";

const LanguageSelector = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="relative">
      {/* Clickable Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-teal-200 text-teal-800 text-lg font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        whileHover={{ scale: 1.05, rotateY: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaLanguage className="text-xl" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-sm" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-teal-200/20 overflow-hidden z-50 min-w-[200px]"
          >
            <div className="px-3 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-200/20">
              <p className="text-sm font-semibold text-teal-800 flex items-center gap-2">
                <FaLanguage className="text-teal-600" />
                Select Language
              </p>
            </div>
            <div className="py-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-lg hover:bg-teal-50 transition-all duration-200 flex items-center gap-3 ${
                    language === lang.code
                      ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 font-semibold"
                      : "text-gray-700 hover:text-teal-800"
                  }`}
                  whileHover={{
                    backgroundColor:
                      language === lang.code
                        ? "rgba(245, 158, 11, 0.1)"
                        : "rgba(245, 158, 11, 0.05)",
                    x: 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="flex-1">{lang.name}</span>
                  {language === lang.code && (
                    <motion.span
                      className="text-teal-600 text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
