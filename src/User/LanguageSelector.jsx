import React from "react";
import { motion } from "framer-motion";

const LanguageSelector = ({ language, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-600">Language</p>
        </div>
        <div className="py-1">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                language === lang.code
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700"
              }`}
              whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <motion.span
                  className="ml-auto text-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
