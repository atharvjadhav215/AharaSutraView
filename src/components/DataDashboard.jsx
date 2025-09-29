import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SAMPLE_FOOD_DATA } from "./Food";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaUtensils,
  FaAppleAlt,
  FaSeedling,
  FaFlag,
  FaGlobe,
  FaFire,
  FaCarrot,
  FaHeart,
  FaSearch,
  FaFilter,
  FaSort,
  FaEye,
  FaDownload,
  FaLeaf,
  FaBalanceScale,
  FaThermometer,
  FaCog,
  FaRandom,
  FaClock,
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaTimes,
  FaPrint,
  FaShareAlt,
} from "react-icons/fa";

// Recipe Detail Popup Component
const RecipeDetailPopup = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaUtensils className="text-xl text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {recipe.name}
                  </h2>
                  <p className="text-teal-100 text-sm sm:text-base">
                    {recipe.cuisine} • {recipe.region}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Recipe Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <FaFire className="text-blue-600 mx-auto mb-1 text-sm sm:text-lg" />
                <div className="text-xs sm:text-sm text-blue-800 font-medium">
                  Calories
                </div>
                <div className="text-lg sm:text-xl font-bold text-blue-900">
                  {recipe.calories}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <FaCarrot className="text-green-600 mx-auto mb-1 text-sm sm:text-lg" />
                <div className="text-xs sm:text-sm text-green-800 font-medium">
                  Protein
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-900">
                  {recipe.protein}g
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <FaSeedling className="text-yellow-600 mx-auto mb-1 text-sm sm:text-lg" />
                <div className="text-xs sm:text-sm text-yellow-800 font-medium">
                  Carbs
                </div>
                <div className="text-lg sm:text-xl font-bold text-yellow-900">
                  {recipe.carbs}g
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <FaBalanceScale className="text-purple-600 mx-auto mb-1 text-sm sm:text-lg" />
                <div className="text-xs sm:text-sm text-purple-800 font-medium">
                  Fat
                </div>
                <div className="text-lg sm:text-xl font-bold text-purple-900">
                  {recipe.fat}g
                </div>
              </div>
            </div>

            {/* Description */}
            {recipe.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaHeart className="text-teal-600" />
                  Description
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>
            )}

            {/* Ingredients */}
            {recipe.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCarrot className="text-orange-600" />
                  Ingredients ({recipe.ingredients.length})
                </h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-700"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>{ingredient.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Keywords & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Meal Category */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaClock className="text-teal-600" />
                  Meal Category
                </h4>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                    {recipe.mealCategory}
                  </span>
                </div>
              </div>

              {/* Dosha */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaSeedling className="text-green-600" />
                  Dosha Type
                </h4>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {recipe.dosha}
                  </span>
                </div>
              </div>
            </div>

            {/* Keywords */}
            {recipe.keywords.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaStar className="text-yellow-600" />
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
            <button className="px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaShareAlt className="text-xs sm:text-sm" />
              Share Recipe
            </button>
            <button className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaPrint className="text-xs sm:text-sm" />
              Print Recipe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DataDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [_selectedFilters, _setSelectedFilters] = useState({});
  const [_selectedRecipe, _setSelectedRecipe] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform SAMPLE_FOOD_DATA into dashboard format
  const allRecipes = [
    ...SAMPLE_FOOD_DATA.Breakfast,
    ...SAMPLE_FOOD_DATA.Lunch,
    ...SAMPLE_FOOD_DATA.Dinner,
  ].map((recipe, index) => ({
    id: recipe.Recipe_ID || index,
    name: recipe.Recipe_Name,
    cuisine: recipe.Cuisine,
    calories: parseFloat(recipe.Calories) || 0,
    fat: parseFloat(recipe.Fat_g) || 0,
    protein: parseFloat(recipe.Protein_g) || 0,
    carbs: parseFloat(recipe.Carbohydrates_g) || 0,
    sodium: parseFloat(recipe.Sodium_mg) || 0,
    dosha: recipe.Dosha || "Unknown",
    rasa: recipe.Rasas || "Unknown",
    region: recipe.Region || "Unknown",
    mealCategory: recipe.Meal_Category,
    ingredients: recipe.Ingredient_Names
      ? recipe.Ingredient_Names.replace(/[[\]']/g, "")
          .split(",")
          .slice(0, 5)
      : [],
    keywords: recipe.Keywords
      ? recipe.Keywords.replace(/[[\]']/g, "")
          .split(",")
          .slice(0, 3)
      : [],
    description: recipe.Description,
  }));

  const sampleData = {
    recipes: allRecipes.slice(0, 9), // Show first 9 recipes
    stats: {
      totalRecipes: 23205,
      totalCuisines: 11,
      avgCalories: 112.8,
      avgFat: 4.6,
      avgProtein: 4.0,
      avgCarbs: 8.2,
      mostCommonDosha: "Vata",
      mostCommonRasa: "Lavana",
      topCuisine: "Italian",
    },
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: FaChartPie, color: "#A0D9D9" },
    { id: "nutrition", name: "Nutrition", icon: FaAppleAlt, color: "#7BC4C4" },
    { id: "cuisine", name: "Cuisines", icon: FaGlobe, color: "#5B9B9B" },
    { id: "ayurveda", name: "Ayurveda", icon: FaSeedling, color: "#4A9B9B" },
    { id: "recipes", name: "Recipes", icon: FaUtensils, color: "#A0D9D9" },
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br pb-8 from-teal-50 via-cyan-50 to-blue-50 text-gray-800 overflow-hidden relative">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {tabs.map((tab, i) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i === tabs.findIndex((t) => t.id === activeTab) ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient( circle at ${(i + 1) * 20}% ${
                20 + i * 15
              }%, rgba(74,155,155,0.${
                10 + i * 2
              }), transparent 18% ), linear-gradient(${
                (i + 1) * 45
              }deg,#E8F5F5,#E0F2F2)`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 m-2 sm:m-4 md:mt-16 mt-12 shadow-xl border border-teal-200/20"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <FaChartBar className="text-white text-lg sm:text-2xl" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-900">
                Recipe Dataset Dashboard
              </h1>
              <p className="text-sm sm:text-base text-teal-700">
                {sampleData.stats.totalRecipes.toLocaleString()} recipes
                analyzed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white/80 min-w-[200px] sm:min-w-[250px] text-sm sm:text-base"
            />
            <FaSearch className="text-teal-600 text-base sm:text-lg flex-shrink-0" />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      {/* Desktop Navigation Tabs - Hidden on mobile */}
      {!isMobile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl mx-2 sm:mx-4 mb-4 shadow-lg border border-teal-200/20"
        >
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-teal-50"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white/20"
                      : "bg-gradient-to-r from-teal-200 to-cyan-100"
                  }`}
                  style={
                    activeTab !== tab.id ? { backgroundColor: tab.color } : {}
                  }
                >
                  <tab.icon
                    className={`text-white ${
                      activeTab === tab.id
                        ? "text-lg sm:text-lg"
                        : "text-sm sm:text-lg"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-xs sm:text-sm lg:text-base truncate ${
                    activeTab === tab.id ? "text-white" : "text-gray-800"
                  }`}
                >
                  {tab.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-t from-teal-50/95 to-cyan-50/95 backdrop-blur-md border-t border-teal-200/60 shadow-lg"
          >
            <div className="flex justify-around px-2 py-3">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-0 flex-1 mx-1 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeTab === tab.id ? "bg-white/20" : ""
                    }`}
                    style={
                      activeTab !== tab.id ? { backgroundColor: tab.color } : {}
                    }
                  >
                    <tab.icon
                      className={`text-lg ${
                        activeTab === tab.id ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium mt-1 truncate ${
                      activeTab === tab.id ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {tab.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className={`px-2 sm:px-4 ${isMobile ? "pb-20" : "pb-6"}`}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-teal-200/20 p-3 sm:p-4 md:p-6"
        >
          {getTabContent()[activeTab]}
        </motion.div>
      </div>

      {/* Recipe Detail Popup */}
      <RecipeDetailPopup
        recipe={_selectedRecipe}
        isOpen={!!_selectedRecipe}
        onClose={() => _setSelectedRecipe(null)}
      />
    </div>
  );

  // Tab content functions
  function getTabContent() {
    return {
      overview: (
        <div className="space-y-6">
          {/* Key Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 md:p-6 rounded-xl border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <FaUtensils className="text-white text-sm sm:text-lg lg:text-xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-medium text-teal-900">
                    Recipes
                  </h3>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-teal-800">
                    {sampleData.stats.totalRecipes.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 md:p-6 rounded-xl border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="text-white text-sm sm:text-lg lg:text-xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-medium text-teal-900">
                    Cuisines
                  </h3>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-800">
                    {sampleData.stats.totalCuisines}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 md:p-6 rounded-xl border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <FaFire className="text-white text-sm sm:text-lg lg:text-xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-medium text-teal-900">
                    Avg Calories
                  </h3>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-800">
                    {sampleData.stats.avgCalories}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-3 sm:p-4 md:p-6 rounded-xl border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                  <FaSeedling className="text-white text-sm sm:text-lg lg:text-xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-medium text-teal-900">
                    Top Dosha
                  </h3>
                  <p className="text-sm sm:text-lg lg:text-xl font-bold text-purple-800">
                    {sampleData.stats.mostCommonDosha}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dataset Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-gradient-to-br from-teal-50 via-cyan-50/40 to-teal-50/30 p-6 rounded-xl border border-cyan-200/50 shadow-lg"
          >
            <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-cyan-600" />
              Dataset Overview
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Column Summary
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Total Columns:</span>
                    <span className="font-medium">22</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Duplicates:</span>
                    <span className="font-medium text-green-600">0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Missing Values:</span>
                    <span className="font-medium text-green-600">None</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Unique Ingredients:</span>
                    <span className="font-medium">22,820</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Nutritional Ranges
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Calories:</span>
                    <span className="font-medium">0 - 19,577 kcal</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fat:</span>
                    <span className="font-medium">0 - 902g</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-medium">0 - 127g</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sodium:</span>
                    <span className="font-medium text-red-600">
                      0 - 113,403mg
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Top Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 p-6 rounded-xl border border-blue-200/50 shadow-lg"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <FaTrophy className="text-blue-600" />
              Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaFlag className="text-red-500" />
                  <span className="font-semibold text-gray-800">
                    Most Popular
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Italian cuisine dominates with ~5,196 recipes
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaThermometer className="text-orange-500" />
                  <span className="font-semibold text-gray-800">
                    Nutrition Alert
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Some recipes have extreme sodium levels (113k+ mg)
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="font-semibold text-gray-800">Quality</span>
                </div>
                <p className="text-sm text-gray-600">
                  Perfect dataset - no duplicates or missing values!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ),

      nutrition: (
        <div className="space-y-6">
          {/* Nutrition Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-xl border border-teal-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                <FaChartPie className="text-teal-600" />
                Macronutrient Distribution
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Average Calories",
                    value: sampleData.stats.avgCalories,
                    unit: "kcal",
                    color: "from-red-400 to-red-600",
                  },
                  {
                    label: "Average Fat",
                    value: sampleData.stats.avgFat,
                    unit: "g",
                    color: "from-yellow-400 to-orange-600",
                  },
                  {
                    label: "Average Protein",
                    value: sampleData.stats.avgProtein,
                    unit: "g",
                    color: "from-green-400 to-emerald-600",
                  },
                  {
                    label: "Average Carbs",
                    value: sampleData.stats.avgCarbs,
                    unit: "g",
                    color: "from-blue-400 to-cyan-600",
                  },
                ].map((nutrient, index) => (
                  <motion.div
                    key={nutrient.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700">
                      {nutrient.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-20 h-3 bg-gradient-to-r ${nutrient.color} rounded-full overflow-hidden`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(
                              (nutrient.value / 50) * 100,
                              100
                            )}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3 + index * 0.1,
                          }}
                          className="h-full bg-white/20"
                        />
                      </div>
                      <span className="font-bold text-gray-800 w-16 text-right">
                        {nutrient.value} {nutrient.unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-xl border border-teal-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                <FaChartBar className="text-teal-600" />
                Health Categories
              </h3>
              <div className="space-y-3">
                {[
                  {
                    category: "Low Calorie Recipes",
                    count: "15,000+",
                    color: "green",
                    icon: FaLeaf,
                  },
                  {
                    category: "High Protein",
                    count: "8,500+",
                    color: "blue",
                    icon: FaCarrot,
                  },
                  {
                    category: "Low Sodium",
                    count: "12,000+",
                    color: "teal",
                    icon: FaHeart,
                  },
                  {
                    category: "Gluten-Free",
                    count: "6,800+",
                    color: "purple",
                    icon: FaCheckCircle,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className={`flex items-center justify-between p-3 bg-white/60 rounded-lg border border-${item.color}-200`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`text-${item.color}-600 text-lg`} />
                      <span className="font-medium text-gray-700">
                        {item.category}
                      </span>
                    </div>
                    <span className={`font-bold text-${item.color}-800`}>
                      {item.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sample Nutritional Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 via-yellow-50/40 to-red-50/30 p-6 rounded-xl border border-orange-200/50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
              <FaThermometer className="text-orange-600" />
              Nutritional Extremes & Outliers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">
                  High-Sodium Alert
                </h4>
                <div className="bg-white/60 p-3 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    Top Sodium Recipe: 113,403 mg
                  </p>
                  <p className="text-xs text-gray-600">
                    ⚠️ This exceeds daily recommended intake (2,300mg) by 49x!
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">
                  Low-Calorie Gems
                </h4>
                <div className="bg-white/60 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    25% of recipes: &lt; 1 calorie
                  </p>
                  <p className="text-xs text-gray-600">
                    ✨ Perfect for healthy snacking options
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),

      cuisine: (
        <div className="space-y-6">
          {/* Regional Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 p-6 rounded-xl border border-blue-200/40 shadow-lg"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FaFlag className="text-blue-600" />
                Regional Diversity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Total Regions
                  </span>
                  <span className="text-xl font-bold text-blue-800">34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Most Featured
                  </span>
                  <span className="font-bold text-blue-800">
                    Italian Region
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Recipe Spread
                  </span>
                  <span className="font-bold text-blue-800">
                    Global Coverage
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-green-50 via-emerald-50/40 to-teal-50/30 p-6 rounded-xl border border-green-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <FaCarrot className="text-green-600" />
                Popular Ingredients by Cuisine
              </h3>
              <div className="space-y-2">
                {[
                  { cuisine: "Italian", ingredient: "Tomatoes, Olive Oil" },
                  { cuisine: "Indian", ingredient: "Spices, Yogurt" },
                  { cuisine: "Mexican", ingredient: "Beans, Corn" },
                  { cuisine: "Thai", ingredient: "Coconut, Lemongrass" },
                ].map((item, index) => (
                  <motion.div
                    key={item.cuisine}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="bg-white/60 p-3 rounded-lg border border-green-100"
                  >
                    <span className="font-medium text-gray-800">
                      {item.cuisine}:
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.ingredient}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ),

      ayurveda: (
        <div className="space-y-6">
          {/* Dosha Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-xl border border-teal-200/50 shadow-lg"
          >
            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <FaSeedling className="text-teal-600" />
              Ayurvedic Dosha Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Vata",
                  description: "Air & Space",
                  color: "from-blue-400 to-cyan-600",
                  foods: "Warm, moist, grounding",
                  count: "8,500+",
                },
                {
                  name: "Kapha",
                  description: "Earth & Water",
                  color: "from-green-400 to-emerald-600",
                  foods: "Light, warm, stimulating",
                  count: "7,200+",
                },
                {
                  name: "Pitta",
                  description: "Fire & Water",
                  color: "from-red-400 to-orange-600",
                  foods: "Cool, sweet, bitter",
                  count: "7,500+",
                },
              ].map((dosha, index) => (
                <motion.div
                  key={dosha.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${dosha.color} p-6 rounded-xl text-white shadow-lg`}
                >
                  <h4 className="text-xl font-bold mb-2">{dosha.name}</h4>
                  <p className="text-sm mb-3 opacity-90">{dosha.description}</p>
                  <p className="text-sm mb-3 font-medium">{dosha.foods}</p>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <span className="text-lg font-bold">
                      {dosha.count} recipes
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Rasas (Tastes) Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 via-pink-50/40 to-red-50/30 p-6 rounded-xl border border-purple-200/50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
              <FaBalanceScale className="text-purple-600" />
              Rasas (Ayurvedic Tastes) Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { rasa: "Madhura", count: "8,500+", color: "yellow" },
                { rasa: "Amla", count: "4,200+", color: "green" },
                { rasa: "Lavana", count: "6,800+", color: "red" },
                { rasa: "Katu", count: "3,500+", color: "orange" },
                { rasa: "Tikta", count: "2,800+", color: "purple" },
                { rasa: "Kashaya", count: "3,200+", color: "teal" },
              ].map((item, index) => (
                <motion.div
                  key={item.rasa}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-yellow-100 p-3 rounded-lg text-center border border-yellow-200`}
                  style={{
                    backgroundColor: `var(--${item.color}-100)`,
                    borderColor: `var(--${item.color}-200)`,
                  }}
                >
                  <h5 className="font-semibold text-gray-800">{item.rasa}</h5>
                  <p
                    className={`text-sm font-bold`}
                    style={{ color: `var(--${item.color}-800)` }}
                  >
                    {item.count}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Balanced Menu Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gradient-to-br from-teal-50 via-cyan-50/40 to-blue-50/30 p-6 rounded-xl border border-teal-200/50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
              <FaHeart className="text-teal-600" />
              Dosha-Balancing Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  dosha: "Vata Balance",
                  meals: "Warm rice porridge, Stewed fruits",
                  time: "Breakfast preference",
                },
                {
                  dosha: "Kapha Balance",
                  meals: "Light quinoa, Grilled vegetables",
                  time: "Evening meals",
                },
                {
                  dosha: "Pitta Balance",
                  meals: "Cool cucumber salad, Sweet fruits",
                  time: "Midday meals",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.dosha}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="bg-white/60 p-4 rounded-lg border border-teal-100"
                >
                  <h5 className="font-semibold text-gray-800 mb-2">
                    {item.dosha}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">{item.meals}</p>
                  <p className="text-xs text-teal-600 font-medium">
                    {item.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),

      recipes: (
        <div className="space-y-6">
          {/* Recipe Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 p-6 rounded-xl border border-teal-200/50 shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full px-3 sm:px-4 py-2 border border-teal-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm sm:text-base"
                />
              </div>
              <div className="flex gap-2 sm:gap-3">
                <select className="flex-1 px-3 sm:px-4 py-2 border border-teal-300 rounded-lg focus:border-teal-500 text-sm sm:text-base">
                  <option className="text-sm">All Cuisines</option>
                  <option className="text-sm">Italian</option>
                  <option className="text-sm">Indian</option>
                  <option className="text-sm">Mediterranean</option>
                  <option className="text-sm">Mexican</option>
                </select>
                <select className="flex-1 px-3 sm:px-4 py-2 border border-teal-300 rounded-lg focus:border-teal-500 text-sm sm:text-base">
                  <option className="text-sm">All Doshas</option>
                  <option className="text-sm">Vata</option>
                  <option className="text-sm">Kapha</option>
                  <option className="text-sm">Pitta</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Under 200 Cal",
                "High Protein",
                "Low Sodium",
                "Gluten-Free",
                "Vegan",
              ].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm bg-teal-100 text-teal-800 rounded-full hover:bg-teal-200 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sample Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {sampleData.recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-3 sm:p-4 rounded-t-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <FaUtensils className="text-white text-sm sm:text-lg" />
                    </div>
                    <div>
                      <div className="font-semibold text-teal-800 text-xs sm:text-sm">
                        {recipe.calories} cal
                      </div>
                      <div className="text-teal-600 text-xs">
                        {recipe.mealCategory}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-700">
                      {recipe.dosha}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-2 line-clamp-2">
                    {recipe.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {recipe.cuisine} • {recipe.region}
                  </p>
                  {recipe.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {recipe.description.substring(0, isMobile ? 80 : 100)}...
                    </p>
                  )}

                  <div className="flex justify-between text-xs mb-3 gap-1">
                    <span className="bg-blue-100 text-blue-800 px-1 sm:px-2 py-1 rounded text-xs truncate">
                      🍳 Fat: {recipe.fat}g
                    </span>
                    <span className="bg-green-100 text-green-800 px-1 sm:px-2 py-1 rounded text-xs truncate">
                      💪 Protein: {recipe.protein}g
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-1 sm:px-2 py-1 rounded text-xs truncate">
                      🍞 Carbs: {recipe.carbs}g
                    </span>
                  </div>

                  {recipe.ingredients.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Ingredients:
                      </p>
                      <p className="text-xs text-gray-500">
                        {recipe.ingredients.slice(0, 3).join(", ")}
                        {recipe.ingredients.length > 3 && "..."}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.keywords.slice(0, 2).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => _setSelectedRecipe(recipe)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <FaEye className="text-xs sm:text-sm" /> View Recipe
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              Load More Recipes
            </button>
          </motion.div>
        </div>
      ),
    };
  }
};

export default DataDashboard;
