import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaUser,
  FaUserMd,
  FaUtensils,
  FaChartPie,
  FaCalendarAlt,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock data
  const patientData = {
    name: "Rajesh Kumar",
    age: 32,
    weight: "54 kg",
    gender: "Male",
    constitution: "Vata-Pitta",
    lifestyle: "Sedentary office work, irregular meal times",
    primaryGoal: "Healthy weight gain",
  };

  const dietitianData = {
    name: "Dr. Priya Sharma",
    qualification: "M.Sc. Nutrition, Certified Ayurvedic Practitioner",
    contact: "+91 98765 43210",
    speciality: "Ayurvedic Nutrition & Weight Management",
  };

  const nutritionData = [
    { nutrient: "Calories", value: "2,200 kcal" },
    { nutrient: "Protein", value: "88 g" },
    { nutrient: "Carbohydrates", value: "275 g" },
    { nutrient: "Fat", value: "73 g" },
    { nutrient: "Fiber", value: "28 g" },
    { nutrient: "Calcium", value: "1,000 mg" },
    { nutrient: "Iron", value: "18 mg" },
    { nutrient: "Vitamin C", value: "90 mg" },
  ];

  const nutritionDistribution = [
    { name: "Carbs", percentage: 50, color: "#fbbf24" },
    { name: "Protein", percentage: 20, color: "#60a5fa" },
    { name: "Fat", percentage: 30, color: "#34d399" },
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mealTypes = [
    { key: "breakfast", name: "BREAKFAST" },
    { key: "lunch", name: "LUNCH" },
    { key: "dinner", name: "DINNER" },
  ];

  const weeklyMealPlan = {
    breakfast: [
      "Oats with milk and almonds",
      "Poha with peanuts",
      "Upma with vegetables",
      "Paratha with curd",
      "Idli with sambar",
      "Dosa with chutney",
      "Pancakes with honey",
    ],
    lunch: [
      "Dal rice with ghee",
      "Rajma with roti",
      "Chole with bhature",
      "Palak paneer with rice",
      "Fish curry with rice",
      "Chicken with roti",
      "Vegetable biryani",
    ],
    dinner: [
      "Khichdi with ghee",
      "Roti with dal",
      "Rice with sambar",
      "Quinoa salad",
      "Soup with bread",
      "Light curry with rice",
      "Vegetable soup",
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      console.log("Starting PDF generation...");

      const pdf = new jsPDF("p", "mm", "a4"); // Portrait for first page

      // Create a temporary container for PDF generation
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.width = "800px";
      tempContainer.style.backgroundColor = "#ffffff";
      document.body.appendChild(tempContainer);

      // Page 1: Portrait page content
      const page1Element = document.getElementById("page1-content");
      console.log("Page 1 element:", page1Element);

      if (page1Element) {
        console.log("Capturing page 1...");

        // Clone the element and modify it for PDF
        const clonedElement = page1Element.cloneNode(true);
        tempContainer.appendChild(clonedElement);

        // Remove all colors and gradients for PDF compatibility
        const allElements = clonedElement.querySelectorAll("*");
        allElements.forEach((el) => {
          // Only process elements that have className property
          if (el.className && typeof el.className.replace === "function") {
            // Remove all background-related classes
            el.className = el.className.replace(/bg-[^\\s]*/g, "");
            el.className = el.className.replace(/text-[^\\s]*/g, "");
            el.className = el.className.replace(/border-[^\\s]*/g, "");
          }

          // Set neutral colors
          el.style.background = "#ffffff";
          el.style.color = "#000000";
          el.style.borderColor = "#cccccc";
          el.style.fill = "#000000";
          el.style.stroke = "#000000";
        });

        const canvas1 = await html2canvas(clonedElement, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
          allowTaint: true,
          logging: false,
          width: 800,
          height: 1200,
        });

        const imgData1 = canvas1.toDataURL("image/png");
        const imgWidth1 = 210; // A4 portrait width in mm
        const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;

        pdf.addImage(imgData1, "PNG", 0, 0, imgWidth1, imgHeight1);
        console.log("Page 1 added to PDF");

        // Clean up
        tempContainer.removeChild(clonedElement);
      }

      // Page 2: Landscape page for weekly diet chart
      const page2Element = document.getElementById("page2-content");
      console.log("Page 2 element:", page2Element);

      if (page2Element) {
        console.log("Capturing page 2...");

        // Add new page in landscape orientation
        pdf.addPage("a4", "landscape");

        // Clone the element and modify it for PDF
        const clonedElement2 = page2Element.cloneNode(true);
        tempContainer.appendChild(clonedElement2);

        // Remove all colors and gradients for PDF compatibility
        const allElements2 = clonedElement2.querySelectorAll("*");
        allElements2.forEach((el) => {
          // Only process elements that have className property
          if (el.className && typeof el.className.replace === "function") {
            // Remove all background-related classes
            el.className = el.className.replace(/bg-[^\\s]*/g, "");
            el.className = el.className.replace(/text-[^\\s]*/g, "");
            el.className = el.className.replace(/border-[^\\s]*/g, "");
          }

          // Set neutral colors
          el.style.background = "#ffffff";
          el.style.color = "#000000";
          el.style.borderColor = "#cccccc";
          el.style.fill = "#000000";
          el.style.stroke = "#000000";
        });

        const canvas2 = await html2canvas(clonedElement2, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
          allowTaint: true,
          logging: false,
          width: 1200,
          height: 800,
        });

        const imgData2 = canvas2.toDataURL("image/png");
        const imgWidth2 = 297; // A4 landscape width in mm
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;

        // Center the content on the landscape page
        const yOffset = Math.max(0, (210 - imgHeight2) / 2);
        pdf.addImage(imgData2, "PNG", 0, yOffset, imgWidth2, imgHeight2);
        console.log("Page 2 added to PDF");

        // Clean up
        tempContainer.removeChild(clonedElement2);
      }

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Save the PDF
      console.log("Saving PDF...");
      pdf.save("aharasutra-diet-plan.pdf");
      console.log("PDF saved successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please check the console for details.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Controls */}
      <div className="print:hidden bg-white shadow-lg p-4 mb-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Diet Plan Report</h2>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg flex items-center gap-2"
            >
              <FaPrint className="text-sm" />
              Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              } text-white`}
            >
              <FaDownload className="text-sm" />
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Page 1: A4 Portrait Report */}
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none"
          style={{ minHeight: "297mm", width: "210mm" }}
        >
          <div
            id="page1-content"
            className="p-4 print:p-3"
            style={{ height: "297mm", width: "210mm" }}
          >
            {/* Header */}
            <div className="text-center border-b border-teal-600 pb-2 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaLeaf className="text-2xl text-teal-600" />
                <h1 className="text-xl font-bold text-gray-800">AHARASUTRA</h1>
              </div>
              <h2 className="text-sm text-gray-600 mb-1">
                Personalized Ayurvedic Diet Plan
              </h2>
              <p className="text-xs text-gray-500">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Patient & Dietitian Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Patient Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-blue-600 text-lg" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Patient Information
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-800">{patientData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Age:</span>
                    <span className="text-gray-800">
                      {patientData.age} years
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Weight:</span>
                    <span className="text-gray-800">{patientData.weight}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Gender:</span>
                    <span className="text-gray-800">{patientData.gender}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">
                      Constitution:
                    </span>
                    <span className="text-gray-800">
                      {patientData.constitution}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium text-gray-600 mb-1 text-xs">
                      Lifestyle:
                    </div>
                    <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      {patientData.lifestyle}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium text-gray-600 mb-1 text-xs">
                      Primary Goal:
                    </div>
                    <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      {patientData.primaryGoal}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dietitian Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FaUserMd className="text-green-600 text-lg" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Dietitian Information
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-800">{dietitianData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">
                      Qualification:
                    </span>
                    <span className="text-gray-800">
                      {dietitianData.qualification}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-600">Contact:</span>
                    <span className="text-gray-800">
                      {dietitianData.contact}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="font-medium text-gray-600 mb-1 text-xs">
                      Speciality:
                    </div>
                    <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      {dietitianData.speciality}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factors Considered */}
            <div className="border border-gray-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FaUtensils className="text-purple-600 text-lg" />
                <h3 className="text-lg font-bold text-gray-800">
                  Factors Considered in Diet Planning
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-gray-600 mb-1 text-xs">
                    Primary Goal:
                  </div>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                    Healthy weight gain for a 32-year-old, 54 kg individual.
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-600 mb-1 text-xs">
                    Meal Frequency:
                  </div>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                    5 meals/day
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-600 mb-1 text-xs">
                    Regional Food Preference:
                  </div>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                    Maharashtrian and Gujarati foods
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-600 mb-1 text-xs">
                    Lifestyle Fit:
                  </div>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                    Recipes and meal options kept simple and practical for an
                    urban routine.
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Distribution & Daily Nutrients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Nutrition Distribution */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FaChartPie className="text-yellow-600 text-lg" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Nutrition Distribution
                  </h3>
                </div>
                <div className="space-y-2">
                  {nutritionDistribution.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrient Table */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="text-gray-600 text-lg" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Daily Nutrient Targets
                  </h3>
                </div>
                <div className="space-y-1">
                  {nutritionData.map((nutrient, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-1 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {nutrient.nutrient}:
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {nutrient.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2: Landscape Weekly Diet Chart */}
      <div className="print:page-break-before-always print:landscape">
        <div className="max-w-7xl mx-auto p-8 print:p-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
            <div id="page2-content" className="p-8 print:p-6">
              {/* Header */}
              <div className="text-center border-b-2 border-green-600 pb-4 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FaCalendarAlt className="text-3xl text-green-600" />
                  <h1 className="text-2xl font-bold text-gray-800">
                    Weekly Diet Plan
                  </h1>
                </div>
                <p className="text-gray-600">7-Day Meal Schedule</p>
              </div>

              {/* Weekly Meal Plan Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border-2 border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-2 border-gray-300 p-3 text-left font-bold text-gray-800">
                        MEAL
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="border-2 border-gray-300 p-3 text-center font-bold text-gray-800"
                        >
                          {day.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mealTypes.map((mealType) => (
                      <tr key={mealType.key}>
                        <td className="border-2 border-gray-300 p-3 font-bold bg-gray-50 text-gray-800">
                          {mealType.name}
                        </td>
                        {weeklyMealPlan[mealType.key].map((meal, index) => (
                          <td
                            key={index}
                            className="border-2 border-gray-300 p-3 text-sm text-gray-700"
                          >
                            {meal}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Notes Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Important Notes:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Always eat food warm & freshly cooked.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>
                        Use cow ghee, sesame oil, or groundnut oil for cooking.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>
                        Avoid dry, bitter, pungent, or astringent foods.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Keep dinner lighter than lunch.</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Additional Guidelines:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Drink warm water throughout the day.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>
                        Eat at regular intervals to maintain metabolism.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Include seasonal fruits and vegetables.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>
                        Practice mindful eating and chew food properly.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .page-break-before-always {
            page-break-before: always;
          }

          .landscape {
            page-break-before: always;
          }

          @page {
            size: A4 portrait;
            margin: 0.5in;
          }

          @page :nth(2) {
            size: A4 landscape;
            margin: 0.5in;
          }

          /* Ensure first page is exactly A4 size */
          #page1-content {
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            overflow: hidden;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Report;
