import React, { useMemo } from "react";
import { SAMPLE_FOOD_DATA } from "./Food.jsx";
import {
  FaFire,
  FaWeight,
  FaCarrot,
  FaHeart,
  FaChartBar,
  FaLeaf,
  FaAppleAlt,
  FaUtensils,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const NutritionAnalysis = ({ selectedFoods }) => {
  // Calculate total nutrition from selected foods
  const nutritionData = useMemo(() => {
    if (!selectedFoods || selectedFoods.length === 0) {
      return {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalFiber: 0,
        totalSugar: 0,
        totalSodium: 0,
        totalCholesterol: 0,
        totalSaturatedFat: 0,
        foodCount: 0,
        mealBreakdown: { Breakfast: 0, Lunch: 0, Dinner: 0 },
        doshaBreakdown: { Vata: 0, Pitta: 0, Kapha: 0 },
        regionBreakdown: {},
        cuisineBreakdown: {},
      };
    }

    let totals = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      totalSugar: 0,
      totalSodium: 0,
      totalCholesterol: 0,
      totalSaturatedFat: 0,
      foodCount: selectedFoods.length,
      mealBreakdown: { Breakfast: 0, Lunch: 0, Dinner: 0 },
      doshaBreakdown: { Vata: 0, Pitta: 0, Kapha: 0 },
      regionBreakdown: {},
      cuisineBreakdown: {},
    };

    selectedFoods.forEach((foodKey) => {
      const [mealType, foodName] = foodKey.split("-");
      const mealData = SAMPLE_FOOD_DATA[mealType];
      if (mealData) {
        const food = mealData.find((item) => item.Recipe_Name === foodName);
        if (food) {
          // Add to totals
          totals.totalCalories += parseFloat(food.Calories) || 0;
          totals.totalProtein += parseFloat(food.Protein_g) || 0;
          totals.totalCarbs += parseFloat(food.Carbohydrates_g) || 0;
          totals.totalFat += parseFloat(food.Fat_g) || 0;
          totals.totalFiber += parseFloat(food.Fiber_g) || 0;
          totals.totalSugar += parseFloat(food.Sugar_g) || 0;
          totals.totalSodium += parseFloat(food.Sodium_mg) || 0;
          totals.totalCholesterol += parseFloat(food.Cholesterol_mg) || 0;
          totals.totalSaturatedFat += parseFloat(food.Saturated_Fat_g) || 0;

          // Meal breakdown
          totals.mealBreakdown[mealType]++;

          // Dosha breakdown
          if (food.Dosha) {
            food.Dosha.split(",").forEach((dosha) => {
              const trimmedDosha = dosha.trim();
              if (totals.doshaBreakdown.hasOwnProperty(trimmedDosha)) {
                totals.doshaBreakdown[trimmedDosha]++;
              }
            });
          }

          // Region breakdown
          if (food.Region) {
            totals.regionBreakdown[food.Region] =
              (totals.regionBreakdown[food.Region] || 0) + 1;
          }

          // Cuisine breakdown
          if (food.Cuisine) {
            totals.cuisineBreakdown[food.Cuisine] =
              (totals.cuisineBreakdown[food.Cuisine] || 0) + 1;
          }
        }
      }
    });

    return totals;
  }, [selectedFoods]);

  // Calculate daily recommendations (based on 2000 calorie diet)
  const dailyRecommendations = {
    calories: 2000,
    protein: 50, // 10% of calories
    carbs: 250, // 50% of calories
    fat: 67, // 30% of calories
    fiber: 25,
    sugar: 50,
    sodium: 2300,
    cholesterol: 300,
    saturatedFat: 20,
  };

  // Calculate percentages
  const percentages = {
    calories:
      (nutritionData.totalCalories / dailyRecommendations.calories) * 100,
    protein: (nutritionData.totalProtein / dailyRecommendations.protein) * 100,
    carbs: (nutritionData.totalCarbs / dailyRecommendations.carbs) * 100,
    fat: (nutritionData.totalFat / dailyRecommendations.fat) * 100,
    fiber: (nutritionData.totalFiber / dailyRecommendations.fiber) * 100,
    sugar: (nutritionData.totalSugar / dailyRecommendations.sugar) * 100,
    sodium: (nutritionData.totalSodium / dailyRecommendations.sodium) * 100,
    cholesterol:
      (nutritionData.totalCholesterol / dailyRecommendations.cholesterol) * 100,
    saturatedFat:
      (nutritionData.totalSaturatedFat / dailyRecommendations.saturatedFat) *
      100,
  };

  // Get status color and icon
  const getStatusInfo = (percentage) => {
    if (percentage >= 80 && percentage <= 120) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-100",
        icon: FaCheckCircle,
        text: "Optimal",
      };
    } else if (percentage < 80) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icon: FaExclamationTriangle,
        text: "Low",
      };
    } else {
      return {
        color: "text-red-600",
        bgColor: "bg-red-100",
        icon: FaExclamationTriangle,
        text: "High",
      };
    }
  };

  const NutritionCard = ({
    title,
    value,
    unit,
    percentage,
    icon: Icon,
    recommendation,
  }) => {
    const status = getStatusInfo(percentage);
    const StatusIcon = status.icon;

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="text-teal-600 text-lg" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bgColor}`}
          >
            <StatusIcon className={`text-sm ${status.color}`} />
            <span className={`text-xs font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              {value.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">
                {unit}
              </span>
            </span>
            <span className="text-sm text-gray-600">
              {percentage.toFixed(0)}% of daily
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                percentage >= 80 && percentage <= 120
                  ? "bg-green-500"
                  : percentage < 80
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500">
            Daily recommendation: {recommendation} {unit}
          </p>
        </div>
      </div>
    );
  };

  const BreakdownCard = ({ title, data, icon: Icon }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-teal-600 text-lg" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{key}</span>
            <span className="text-sm font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (nutritionData.foodCount === 0) {
    return (
      <div className="text-center py-12">
        <FaInfoCircle className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Foods Selected
        </h3>
        <p className="text-gray-500">
          Please select some foods to see the nutrition analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nutrition Analysis
        </h2>
        <p className="text-gray-600">
          Comprehensive breakdown of {nutritionData.foodCount} selected food
          items
        </p>
      </div>

      {/* Main Nutrition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NutritionCard
          title="Calories"
          value={nutritionData.totalCalories}
          unit="kcal"
          percentage={percentages.calories}
          icon={FaFire}
          recommendation={dailyRecommendations.calories}
        />
        <NutritionCard
          title="Protein"
          value={nutritionData.totalProtein}
          unit="g"
          percentage={percentages.protein}
          icon={FaWeight}
          recommendation={dailyRecommendations.protein}
        />
        <NutritionCard
          title="Carbohydrates"
          value={nutritionData.totalCarbs}
          unit="g"
          percentage={percentages.carbs}
          icon={FaCarrot}
          recommendation={dailyRecommendations.carbs}
        />
        <NutritionCard
          title="Fat"
          value={nutritionData.totalFat}
          unit="g"
          percentage={percentages.fat}
          icon={FaHeart}
          recommendation={dailyRecommendations.fat}
        />
        <NutritionCard
          title="Fiber"
          value={nutritionData.totalFiber}
          unit="g"
          percentage={percentages.fiber}
          icon={FaLeaf}
          recommendation={dailyRecommendations.fiber}
        />
        <NutritionCard
          title="Sugar"
          value={nutritionData.totalSugar}
          unit="g"
          percentage={percentages.sugar}
          icon={FaAppleAlt}
          recommendation={dailyRecommendations.sugar}
        />
      </div>

      {/* Additional Nutrients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NutritionCard
          title="Sodium"
          value={nutritionData.totalSodium}
          unit="mg"
          percentage={percentages.sodium}
          icon={FaUtensils}
          recommendation={dailyRecommendations.sodium}
        />
        <NutritionCard
          title="Cholesterol"
          value={nutritionData.totalCholesterol}
          unit="mg"
          percentage={percentages.cholesterol}
          icon={FaHeart}
          recommendation={dailyRecommendations.cholesterol}
        />
        <NutritionCard
          title="Saturated Fat"
          value={nutritionData.totalSaturatedFat}
          unit="g"
          percentage={percentages.saturatedFat}
          icon={FaHeart}
          recommendation={dailyRecommendations.saturatedFat}
        />
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BreakdownCard
          title="Meal Distribution"
          data={nutritionData.mealBreakdown}
          icon={FaUtensils}
        />
        <BreakdownCard
          title="Dosha Balance"
          data={nutritionData.doshaBreakdown}
          icon={FaLeaf}
        />
        <BreakdownCard
          title="Regional Cuisine"
          data={nutritionData.regionBreakdown}
          icon={FaChartBar}
        />
        <BreakdownCard
          title="Cuisine Types"
          data={nutritionData.cuisineBreakdown}
          icon={FaUtensils}
        />
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Nutrition Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Total Foods:</strong> {nutritionData.foodCount} items
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Total Calories:</strong>{" "}
              {nutritionData.totalCalories.toFixed(0)} kcal
            </p>
            <p className="text-gray-600">
              <strong>Protein Content:</strong>{" "}
              {nutritionData.totalProtein.toFixed(1)}g
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Fiber Content:</strong>{" "}
              {nutritionData.totalFiber.toFixed(1)}g
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Fat Content:</strong> {nutritionData.totalFat.toFixed(1)}g
            </p>
            <p className="text-gray-600">
              <strong>Carbohydrates:</strong>{" "}
              {nutritionData.totalCarbs.toFixed(1)}g
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionAnalysis;
