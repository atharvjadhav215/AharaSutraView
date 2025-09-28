import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUtensils,
  FaFire,
  FaWeight,
  FaHeart,
  FaCarrot,
  FaBreadSlice,
  FaFish,
  FaCoffee,
  FaAppleAlt,
  FaTimes,
  FaPlus,
  FaMinus,
  FaCheck,
  FaLeaf,
  FaGlobe,
  FaTag,
  FaList,
  FaClock,
  FaStar,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { SAMPLE_FOOD_DATA } from "./Food.jsx";
// Sample food data with comprehensive nutritional information

// Food Detail Popup Component
const FoodDetailPopup = ({ food, isOpen, onClose, onSelect, isSelected }) => {
  if (!food) return null;

  const parseArray = (str) => {
    try {
      return JSON.parse(str.replace(/'/g, '"'));
    } catch {
      return str.split(",").map((s) => s.trim().replace(/['"]/g, ""));
    }
  };

  const ingredients = parseArray(food.Ingredient_Names);
  const quantities = parseArray(food.Ingredient_Quantities);
  const instructions = parseArray(food.Instructions);
  const keywords = parseArray(food.Keywords);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center md:p-10  bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-lg md:rounded-2xl shadow-2xl max-w-7xl w-full max-h-[81vh] md:max-h-[85vh] overflow-hidden md:mb-0 mb-10 mx-2 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 md:p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-2 md:top-4 right-2 md:right-4 p-1 md:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <FaTimes className="text-lg md:text-xl" />
              </button>

              <div className="flex items-start gap-2 md:gap-4">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <FaUtensils className="text-lg md:text-2xl" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
                    {food.Recipe_Name}
                  </h2>
                  <div className="flex flex-wrap gap-1 md:gap-2 text-xs md:text-sm">
                    <span className="bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {food.Cuisine}
                    </span>
                    <span className="bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {food.Meal_Category}
                    </span>
                    <span className="bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {food.Region}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 md:p-6 overflow-y-auto max-h-[calc(85vh-200px)] md:max-h-[calc(85vh-230px)]">
              {/* Description */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                  <FaList className="text-teal-500 text-sm md:text-base" />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {food.Description}
                </p>
              </div>

              {/* Nutritional Information */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaFire className="text-orange-500 text-sm md:text-base" />
                  Nutritional Information (per serving)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-orange-50 p-2 md:p-3 rounded-lg text-center">
                    <FaFire className="text-orange-500 mx-auto mb-1 text-sm md:text-base" />
                    <div className="text-lg md:text-2xl font-bold text-orange-600">
                      {food.Calories}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Calories
                    </div>
                  </div>
                  <div className="bg-blue-50 p-2 md:p-3 rounded-lg text-center">
                    <FaWeight className="text-blue-500 mx-auto mb-1 text-sm md:text-base" />
                    <div className="text-lg md:text-2xl font-bold text-blue-600">
                      {food.Protein_g}g
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Protein
                    </div>
                  </div>
                  <div className="bg-green-50 p-2 md:p-3 rounded-lg text-center">
                    <FaCarrot className="text-green-500 mx-auto mb-1 text-sm md:text-base" />
                    <div className="text-lg md:text-2xl font-bold text-green-600">
                      {food.Carbohydrates_g}g
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Carbs
                    </div>
                  </div>
                  <div className="bg-purple-50 p-2 md:p-3 rounded-lg text-center">
                    <FaHeart className="text-purple-500 mx-auto mb-1 text-sm md:text-base" />
                    <div className="text-lg md:text-2xl font-bold text-purple-600">
                      {food.Fat_g}g
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">Fat</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4">
                  <div className="bg-gray-50 p-2 md:p-3 rounded-lg text-center">
                    <div className="text-sm md:text-lg font-bold text-gray-700">
                      {food.Fiber_g}g
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Fiber
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 md:p-3 rounded-lg text-center">
                    <div className="text-sm md:text-lg font-bold text-gray-700">
                      {food.Sugar_g}g
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Sugar
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 md:p-3 rounded-lg text-center">
                    <div className="text-sm md:text-lg font-bold text-gray-700">
                      {food.Sodium_mg}mg
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Sodium
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 md:p-3 rounded-lg text-center">
                    <div className="text-sm md:text-lg font-bold text-gray-700">
                      {food.Cholesterol_mg}mg
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      Cholesterol
                    </div>
                  </div>
                </div>
              </div>

              {/* Ayurvedic Information */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaLeaf className="text-green-500 text-sm md:text-base" />
                  Ayurvedic Properties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2 text-sm md:text-base">
                      Dosha
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {food.Dosha.split(",").map((dosha, idx) => (
                        <span
                          key={idx}
                          className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm"
                        >
                          {dosha.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2 text-sm md:text-base">
                      Rasas (Tastes)
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {food.Rasas.split(",").map((rasa, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs md:text-sm"
                        >
                          {rasa.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2 text-sm md:text-base">
                      Region
                    </h4>
                    <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs md:text-sm">
                      {food.Region}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaBreadSlice className="text-amber-500 text-sm md:text-base" />
                  Ingredients
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ingredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700 text-sm md:text-base">
                        {ingredient}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-gray-500">
                        {quantities[idx] || "As needed"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaClock className="text-indigo-500 text-sm md:text-base" />
                  Cooking Instructions
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {instructions.map((instruction, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 md:gap-3 p-2 md:p-3 bg-indigo-50 rounded-lg"
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-500 text-white text-xs md:text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaTag className="text-pink-500 text-sm md:text-base" />
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-pink-100 text-pink-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-3 md:px-6 py-2 shadow-2xl shadow-black">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
              
                <button
                  onClick={onSelect}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-sm md:text-base ${
                    isSelected
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <FaMinus className="text-xs md:text-sm" />
                      <span className="hidden md:inline">
                        Remove from Selection
                      </span>
                      <span className="md:hidden">Remove</span>
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-xs md:text-sm" />
                      <span className="hidden md:inline">Add to Selection</span>
                      <span className="md:hidden">Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main SelectFood Component
const SelectFood = ({ selectedFoods, onToggleFoodSelection }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeMealTab, setActiveMealTab] = useState("Breakfast");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: [],
    dosha: [],
    region: [],
    mealCategory: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const allFoods = useMemo(() => Object.values(SAMPLE_FOOD_DATA).flat(), []);
  const foods = useMemo(
    () => SAMPLE_FOOD_DATA[activeMealTab] || [],
    [activeMealTab]
  );

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const cuisines = [
      ...new Set(allFoods.map((food) => food.Cuisine).filter(Boolean)),
    ];
    const doshas = [
      ...new Set(
        allFoods
          .map((food) => food.Dosha)
          .filter(Boolean)
          .flatMap((d) => d.split(",").map((s) => s.trim()))
      ),
    ];
    const regions = [
      ...new Set(allFoods.map((food) => food.Region).filter(Boolean)),
    ];
    const mealCategories = [
      ...new Set(allFoods.map((food) => food.Meal_Category).filter(Boolean)),
    ];

    return { cuisines, doshas, regions, mealCategories };
  }, [allFoods]);

  // Filter and search logic
  const filteredFoods = useMemo(() => {
    let filtered = foods;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (food) =>
          food.Recipe_Name.toLowerCase().includes(query) ||
          food.Description.toLowerCase().includes(query) ||
          food.Keywords.toLowerCase().includes(query) ||
          food.Ingredient_Names.toLowerCase().includes(query) ||
          food.Cuisine.toLowerCase().includes(query) ||
          food.Dosha.toLowerCase().includes(query) ||
          food.Region.toLowerCase().includes(query)
      );
    }

    // Filter by selected options
    if (selectedFilters.cuisine.length > 0) {
      filtered = filtered.filter((food) =>
        selectedFilters.cuisine.includes(food.Cuisine)
      );
    }

    if (selectedFilters.dosha.length > 0) {
      filtered = filtered.filter((food) =>
        selectedFilters.dosha.some((dosha) => food.Dosha.includes(dosha))
      );
    }

    if (selectedFilters.region.length > 0) {
      filtered = filtered.filter((food) =>
        selectedFilters.region.includes(food.Region)
      );
    }

    if (selectedFilters.mealCategory.length > 0) {
      filtered = filtered.filter((food) =>
        selectedFilters.mealCategory.includes(food.Meal_Category)
      );
    }

    return filtered;
  }, [foods, searchQuery, selectedFilters]);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedFood(null);
  };

  const handleSelectFood = () => {
    if (selectedFood) {
      onToggleFoodSelection(activeMealTab, selectedFood.Recipe_Name);
      handleClosePopup();
    }
  };

  const isFoodSelected = (foodName) => {
    return selectedFoods.includes(`${activeMealTab}-${foodName}`);
  };

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      cuisine: [],
      dosha: [],
      region: [],
      mealCategory: [],
    });
    setSearchQuery("");
  };

  const hasActiveFilters =
    searchQuery ||
    Object.values(selectedFilters).some((filters) => filters.length > 0);

  const getMealIcon = (mealType) => {
    const icons = {
      Breakfast: FaCoffee,
      Lunch: FaUtensils,
      Dinner: FaAppleAlt,
    };
    return icons[mealType] || FaUtensils;
  };

  const MealIcon = getMealIcon(activeMealTab);

  return (
    <div className="space-y-4 pb-28 md:pb-4">
      {/* Desktop Meal Tabs */}
      <div className="hidden md:block">
        <div className="flex gap-2 justify-center mb-6">
          {Object.keys(SAMPLE_FOOD_DATA).map((mealType) => {
            const mealIcons = {
              Breakfast: FaCoffee,
              Lunch: FaUtensils,
              Dinner: FaAppleAlt,
            };
            const MealIcon = mealIcons[mealType];

            return (
              <button
                key={mealType}
                onClick={() => setActiveMealTab(mealType)}
                className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-2 min-h-[48px] ${
                  activeMealTab === mealType
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
                    : "bg-white/90 backdrop-blur-sm border border-gray-200 text-teal-900 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                <MealIcon className="text-lg" />
                <span className="capitalize">{mealType}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Meal Header */}
      <div className="md:hidden text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 capitalize">
          {activeMealTab}
        </h2>
        <p className="text-sm text-gray-600">Select your preferred items</p>
      </div>

      {/* Search and Filter Section */}
      <div className=" mb-6">
        {/* Search and Filter in One Line */}
        <div className="flex flex-row sm:flex-row mb-2 md:gap-3 gap-1">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hidden md:block" />
            <input
              type="text"
              placeholder="Search by name, keywords, ingredients, cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-2 md:pl-10 pr-3 md:py-2 py-1 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filter and Clear Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 md:py-2 py-1.5 md:text-sm text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap"
            >
              <FaFilter className="md:h-4 md:w-4 h-3 w-3" />
              Filters
              {hasActiveFilters && (
                <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                  {Object.values(selectedFilters).flat().length +
                    (searchQuery ? 1 : 0)}
                </span>
              )}
              {showFilters ? (
                <FaChevronUp className="h-3 w-3" />
              ) : (
                <FaChevronDown className="h-3 w-3" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            {/* Cuisine Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Cuisine
              </h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleFilterChange("cuisine", cuisine)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedFilters.cuisine.includes(cuisine)
                        ? "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Dosha Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Dosha</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.doshas.map((dosha) => (
                  <button
                    key={dosha}
                    onClick={() => handleFilterChange("dosha", dosha)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedFilters.dosha.includes(dosha)
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
                    }`}
                  >
                    {dosha}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Region</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleFilterChange("region", region)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedFilters.region.includes(region)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Meal Category
              </h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.mealCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange("mealCategory", category)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedFilters.mealCategory.includes(category)
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredFoods.length} of {foods.length} items
        </div>
      </div>

      {/* No Results Message */}
      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FaSearch className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No items found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Food Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">
        {filteredFoods.map((food, index) => (
          <motion.div
            key={food.Recipe_ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-lg md:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              isFoodSelected(food.Recipe_Name)
                ? "border-teal-500 bg-teal-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
            }`}
            onClick={() => handleFoodClick(food)}
          >
            <div className="p-2 md:p-4">
              {/* Food Header */}
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-xs md:text-sm">
                    {food.Recipe_Name}
                  </h3>
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                    <span className="bg-gray-100 px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs">
                      {food.Cuisine}
                    </span>
                    <span className="bg-gray-100 px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs">
                      {food.Region}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isFoodSelected(food.Recipe_Name) ? (
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>

              {/* Nutritional Preview - Desktop Only */}
              <div className="hidden md:grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    {food.Calories}
                  </div>
                  <div className="text-xs text-gray-600">Calories</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {food.Protein_g}g
                  </div>
                  <div className="text-xs text-gray-600">Protein</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {food.Carbohydrates_g}g
                  </div>
                  <div className="text-xs text-gray-600">Carbs</div>
                </div>
              </div>

              {/* Ayurvedic Properties */}
              <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                {food.Dosha &&
                  food.Dosha.split(",").map((dosha, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs"
                    >
                      {dosha.trim()}
                    </span>
                  ))}
                {food.Rasas &&
                  food.Rasas.split(",").map((rasa, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs"
                    >
                      {rasa.trim()}
                    </span>
                  ))}
              </div>

              {/* Description Preview */}
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2 md:mb-3">
                {food.Description}
              </p>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 hidden md:block">
                  Click to view details
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-xs md:text-sm" />
                  <span className="text-xs text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Food Detail Popup */}
      <FoodDetailPopup
        food={selectedFood}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSelect={handleSelectFood}
        isSelected={
          selectedFood ? isFoodSelected(selectedFood.Recipe_Name) : false
        }
      />

      {/* Fixed Bottom Tab Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-56">
        <div className="bg-gradient-to-t from-teal-50/95 to-cyan-50/95 backdrop-blur-md rounded-t-xl border-t border-teal-200/60 shadow-lg">
          {/* Tab Navigation */}
          <div className="flex justify-around px-1 py-1">
            {Object.keys(SAMPLE_FOOD_DATA).map((mealType) => {
              const mealIcons = {
                Breakfast: FaCoffee,
                Lunch: FaUtensils,
                Dinner: FaAppleAlt,
              };
              const MealIcon = mealIcons[mealType];

              return (
                <button
                  key={mealType}
                  onClick={() => setActiveMealTab(mealType)}
                  className={`flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-300 min-w-0 flex-1 mx-0.5 ${
                    activeMealTab === mealType
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeMealTab === mealType ? "bg-white/20" : ""
                    }`}
                  >
                    <MealIcon
                      className={`text-sm ${
                        activeMealTab === mealType
                          ? "text-white"
                          : "text-teal-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold mt-1 truncate ${
                      activeMealTab === mealType
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {mealType}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFood;
