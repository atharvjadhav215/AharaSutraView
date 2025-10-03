import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartBar,
  FaUser,
  FaUserPlus,
  FaTachometerAlt,
  FaHome,
  FaExchangeAlt,
  FaFlask,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import image1 from "../assets/image1.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Routes where navbar should show only logo with no functionality
  const restrictedRoutes = [
    "/login",
    "/onboarding",
    "/documentation",
    "/data-dashboard",
    "/check-info",
    "/admin",
  ];

  // Check if current route is restricted
  const isRestrictedRoute = restrictedRoutes.includes(location.pathname);

  // Determine user role based on current route
  const isUserRole =
    location.pathname === "/uhome" ||
    location.pathname === "/create-own-chart" ||
    location.pathname === "/diet-chart" ||
    location.pathname === "/uprofile" ||
    location.pathname === "/edit-profile";

  const isDietitianRole =
    location.pathname === "/dhome" ||
    location.pathname === "/add-patient" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/my-diet-chart";

  // Handle logo click → navigate to role-based home (disabled on restricted routes)
  const handleLogoClick = () => {
    if (isRestrictedRoute) {
      return; // Do nothing on restricted routes
    }
    if (isUserRole) {
      navigate("/uhome");
    } else if (isDietitianRole) {
      navigate("/dhome");
    } else {
      navigate("/"); // fallback (like landing page or login)
    }
  };

  // Handle prototype role switching
  const handleRoleSwitch = () => {
    if (isUserRole) {
      navigate("/dhome"); // Switch to Dietitian interface
    } else if (isDietitianRole) {
      navigate("/uhome"); // Switch to User interface
    }
  };

  // Get navigation buttons based on role
  const getNavButtons = () => {
    if (isUserRole) {
      return [
        {
          label: "Create Your Own Chart",
          path: "/create-own-chart",
          icon: FaChartBar,
        },
        { label: "Profile", path: "/uprofile", icon: FaUser },
      ];
    } else if (isDietitianRole) {
      return [
        { label: "Add Patient", path: "/add-patient", icon: FaUserPlus },
        { label: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
      ];
    }
    return [];
  };

  const navButtons = getNavButtons();

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 md:w-[800px] w-[300px] left-0 mx-auto mt-2 rounded-2xl right-0 z-50 bg-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:pl-8 ">
          <div className="flex justify-between items-center md:h-12 h-8 md:mt-0 mt-1">
            {/* Logo with Home Text Animation */}
            <motion.div
              className={`flex-1 flex justify-start items-center relative ${
                isRestrictedRoute ? "" : "cursor-pointer"
              }`}
              onClick={handleLogoClick}
              whileHover={isRestrictedRoute ? {} : "hover"}
              initial="initial"
            >
              {/* Logo */}
              <motion.img
                src={image1}
                alt="Logo"
                className="h-10 w-auto object-cover"
                variants={{
                  initial: { opacity: 1 },
                  hover: { opacity: isRestrictedRoute ? 1 : 0 },
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Home Text */}
              <motion.div
                className="absolute flex items-center gap-2 left-0"
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: isRestrictedRoute ? 0 : 1 },
                }}
                transition={{ duration: 0.3 }}
              >
                <FaHome className="w-4 h-4 text-teal-500" />
                <span className="text-sm font-medium text-teal-600">
                  {isUserRole
                    ? "Go to User Home"
                    : isDietitianRole
                    ? "Go to Dietitian Home"
                    : "Go to Home"}
                </span>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation Buttons */}
            {!isRestrictedRoute && (
              <div className="hidden md:flex gap-4">
                {navButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(button.path)}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    {button.label}
                  </button>
                ))}

                {/* Prototype Role Switch Button */}
                <motion.button
                  onClick={handleRoleSwitch}
                  className="px-1 py-2 text-xs bg-gradient-to-r from-gray-400 to-gray-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="🚀 PROTOTYPE ONLY - Switch between User & Dietitian roles for testing"
                >
                  <FaExchangeAlt className="w-3 h-3" />
                  <span className="relative group">
                    <span className="group-hover:hidden">
                      {isUserRole ? "Switch to Dietitian" : "Switch to User"}
                    </span>
                    <span className="hidden group-hover:inline text-xs  text-white tracking-tighter rounded ">
                      PROTOTYPE ONLY
                    </span>
                  </span>
                </motion.button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isRestrictedRoute && (
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 mb-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                  whileTap={{ scale: 0.95 }}
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Card */}
      <AnimatePresence>
        {!isRestrictedRoute && isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-200/50 p-4 min-w-[280px]">
                {/* Menu Header with Home Hint */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-teal-800">
                    {isUserRole ? "User Menu" : "Dietitian Menu"}
                  </h3>
                  <motion.div
                    className="mt-2 flex items-center justify-center gap-2 text-sm text-teal-600 cursor-pointer hover:text-teal-800 transition-colors duration-200"
                    onClick={() => {
                      handleLogoClick();
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHome className="w-3 h-3" />
                    <span>Tap logo to go home</span>
                  </motion.div>
                </div>

                {/* Menu Buttons */}
                <div className="space-y-3">
                  {navButtons.map((button, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        navigate(button.path);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 hover:from-teal-100 hover:to-cyan-100 transition-all duration-200 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200 text-teal-600">
                        <button.icon />
                      </span>
                      <span className="text-teal-800 font-medium text-left flex-1">
                        {button.label}
                      </span>
                      <svg
                        className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  ))}

                  {/* Prototype Role Switch Button */}
                  <motion.button
                    onClick={() => {
                      handleRoleSwitch();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 hover:from-cyan-100 hover:to-teal-100 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navButtons.length * 0.1 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200 text-cyan-600">
                      <FaExchangeAlt />
                    </span>
                    <div className="text-left flex-1">
                      <span className="text-cyan-800 font-medium block">
                        {isUserRole ? "Switch to Dietitian" : "Switch to User"}
                      </span>
                      <span className="text-xs text-cyan-600 font-medium block mt-1">
                        PROTOTYPE ONLY
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5 text-cyan-600 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu Footer */}
                <div className="mt-4 pt-3 border-t border-teal-200/50">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center text-sm text-teal-600 hover:text-teal-800 transition-colors duration-200"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
