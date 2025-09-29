import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaProjectDiagram,
  FaFileImage,
  FaFilePdf,
  FaFilter,
  FaSearch,
  FaDownload,
  FaExpand,
  FaLayerGroup,
  FaSitemap,
  FaClipboardList,
  FaFileAlt,
  FaCogs,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaChartLine,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Navbar from "../components/Navbar";

// Import all documentation assets
import architectureImg from "../assets/Document/Architecture_Diagram.png";
import ayurImg from "../assets/Document/Ayur.png";
import flowDiagramImg from "../assets/Document/Flow_diagram.png";
import useCaseImg from "../assets/Document/UseCase.png";
import AdminImg from "../assets/Document/Admin_Sequence_Diagram.png";
import DietitianImg from "../assets/Document/Dietitian_Sequence_Diagram.png";
import PatientImg from "../assets/Document/Patient_Sequence_Diagram.png";

// Individual diagrams - each as separate section
const DOCUMENTATION_SECTIONS = [
  {
    id: "architecture",
    title: "System Architecture",
    icon: FaProjectDiagram,
    description: "System architecture overview and component relationships",
    color: "#3B82F6",
    src: architectureImg,
    type: "image",
  },
  {
    id: "flow-diagram",
    title: "Application Flow Diagram",
    icon: FaLayerGroup,
    description: "Complete application flow and user navigation paths",
    color: "#10B981",
    src: flowDiagramImg,
    type: "image",
  },
  {
    id: "use-case",
    title: "Use Case Diagram",
    icon: FaProjectDiagram,
    description: "User interactions and system use cases",
    color: "#10B981",
    src: useCaseImg,
    type: "image",
  },

  {
    id: "admin-sequence",
    title: "Admin Sequence Diagram",
    icon: FaSitemap,
    description: "Admin panel interactions and workflows",
    color: "#8B5CF6",
    src: AdminImg,
    type: "image",
  },
  {
    id: "dietitian-sequence",
    title: "Dietitian Sequence Diagram",
    icon: FaSitemap,
    description: "Dietitian dashboard and patient management flows",
    color: "#8B5CF6",
    src: DietitianImg,
    type: "image",
  },
  {
    id: "patient-sequence",
    title: "Patient Sequence Diagram",
    icon: FaSitemap,
    description: "Patient portal interactions and diet chart access",
    color: "#8B5CF6",
    src: PatientImg,
    type: "image",
  },
  {
    id: "sample-report",
    title: "Nutrition Report",
    icon: FaClipboardList,
    description: "Analysis and personalized recommendations",
    color: "#F59E0B",
    src: "/src/assets/Document/Sample_Report.pdf",
    type: "pdf",
  },
  {
    id: "tech-report",
    title: "Technology Report",
    icon: FaClipboardList,
    description: "Technical justification and technology stack documentation",
    color: "#F59E0B",
    src: "/src/assets/Document/Technology Justification Report.pdf",
    type: "pdf",
  },
];

// Background Layers similar to Dashboard
const BG_LAYERS = [
  {
    id: 0,
    gradient:
      "radial-gradient( circle at 10% 20%, rgba(59,130,246,0.14), transparent 20% ), linear-gradient(45deg,#EBF8FF,#E0F2FF)",
  },
  {
    id: 1,
    gradient:
      "radial-gradient( circle at 80% 10%, rgba(16,185,129,0.12), transparent 18% ), linear-gradient(135deg,#ECFDF5,#D1FAE5)",
  },
  {
    id: 2,
    gradient:
      "radial-gradient( circle at 30% 80%, rgba(139,92,246,0.10), transparent 18% ), linear-gradient(90deg,#F3E8FF,#EDE9FE)",
  },
  {
    id: 3,
    gradient:
      "radial-gradient( circle at 60% 40%, rgba(245,158,11,0.10), transparent 18% ), linear-gradient(120deg,#FFFBEB,#FEF3C7)",
  },
];

// Document Modal Component
const DocumentModal = ({ document, isOpen, onClose }) => {
  if (!isOpen || !document) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-screen h-screen flex items-center justify-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          {document.type === "image" ? (
            <img
              src={document.src}
              alt={document.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <FaFilePdf className="text-8xl text-red-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {document.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {document.description}
                </p>
                <a
                  href={document.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-3 mx-auto text-lg"
                >
                  <FaDownload />
                  Open PDF Document
                </a>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
          >
            <IoClose className="text-2xl" />
          </button>

          {/* Document Info */}
          <div className="absolute bottom-6 left-6 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors z-10">
            <h3 className="font-bold text-lg">{document.title}</h3>
            <p className="text-white/80 text-sm">{document.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("architecture");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter documents based on search and type
  const filteredDocuments = useMemo(() => {
    let docs = DOCUMENTATION_SECTIONS;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      docs = docs.filter((doc) => doc.type === filterType);
    }

    return docs;
  }, [searchQuery, filterType]);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const currentDocument = DOCUMENTATION_SECTIONS.find(
    (s) => s.id === activeSection
  );

  return (
    <div className="w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 text-gray-800 overflow-hidden relative">
      {/* Navbar */}
      <Navbar />
      <div className="mt-12 md:mt-16 px-3 sm:px-4 md:px-6 py-3 sm:py-4 h-[calc(100vh-4rem)]">
        <div className="w-full mx-auto max-w-7xl h-full">
          <div className="flex flex-col lg:flex-row md:gap-6 gap-1 h-full">
            {/* Sidebar - Individual Sections */}
            <div className="lg:w-80 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-2  lg:h-full flex lg:flex-col"
              >
                <div className="flex flex-col gap-2">
                  {/* Data Dashboard Button */}
                  <motion.a
                    href="https://aharasutra-view-rgt3.vercel.app/data-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.0, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full p-2 mb-0 md:mb-2 rounded-xl  bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <FaChartLine className="text-lg text-white" />
                    </div>
                    <div className="flex-1 lg:flex-1">
                      <div className="font-bold text-sm lg:text-sm">
                        Data Dashboard
                      </div>
                      <div className="text-emerald-100 text-xs">
                        Analytics & Insights
                      </div>
                    </div>
                    <FaExternalLinkAlt className="text-sm opacity-80" />
                  </motion.a>

                  {/* Mobile: Simple Dropdown Selector */}
                  <div className="lg:hidden ">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Document Type
                    </label>
                    <select
                      value={activeSection}
                      onChange={(e) => setActiveSection(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none"
                    >
                      {filteredDocuments.map((section) => (
                        <option key={section.id} value={section.id}>
                          📄 {section.title} ({section.type.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Desktop: Vertical list for documents */}
                <div className="hidden lg:flex flex-col space-y-2 flex-1 overflow-y-auto">
                  {filteredDocuments.map((section) => (
                    <motion.button
                      key={section.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full p-2 rounded-xl transition-all duration-300 flex items-center gap-3 text-left group ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-white/60 hover:bg-white/80 text-gray-700 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          activeSection === section.id
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-blue-400 to-purple-400"
                        }`}
                        style={
                          activeSection !== section.id
                            ? { backgroundColor: section.color }
                            : {}
                        }
                      >
                        <section.icon className="text-lg text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">
                          {section.title}
                        </div>
                        <div
                          className={`text-xs opacity-80 ${
                            activeSection === section.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {section.type.toUpperCase()}
                        </div>
                      </div>
                      {activeSection === section.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Content - Single Document View */}
            <div className="flex-1 min-h-0">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 h-full flex flex-col"
              >
                {/* Section Header */}
                <div className="p-4 sm:p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: currentDocument?.color }}
                    >
                      {currentDocument &&
                        React.createElement(currentDocument.icon, {
                          className: "text-white text-lg",
                        })}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {currentDocument?.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    {currentDocument?.description}
                  </p>
                </div>

                {/* Document Content */}
                {currentDocument ? (
                  <div className="flex-1 flex items-center justify-center h-[calc(100vh-300px)] lg:h-[calc(100vh-300px)]">
                    {currentDocument.type === "image" ? (
                      <div className="w-full h-full flex items-center justify-center relative overflow-hidden lg:overflow-visible">
                        <img
                          src={currentDocument.src}
                          alt={currentDocument.title}
                          className="w-full h-full max-h-[38vh] lg:max-h-full lg:max-w-full  object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                          onClick={() => handleDocumentClick(currentDocument)}
                        />
                        <button
                          onClick={() => handleDocumentClick(currentDocument)}
                          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 backdrop-blur-sm  sm:flex lg:flex"
                        >
                          <FaExpand />
                          Full Size
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 lg:p-0">
                        <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 lg:p-8 text-center max-w-md w-full">
                          <FaFilePdf className="text-4xl lg:text-6xl text-red-600 mx-auto mb-3 lg:mb-4" />
                          <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                            {currentDocument.title}
                          </h3>
                          <p className="text-sm lg:text-base text-gray-600 mb-4">
                            {currentDocument.description}
                          </p>
                          <a
                            href={currentDocument.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 lg:px-6 py-2 lg:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2 text-sm lg:text-base"
                          >
                            <FaDownload />
                            <span className="hidden sm:inline">
                              Open PDF Document
                            </span>
                            <span className="sm:hidden">Open PDF</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                      No Document Selected
                    </h3>
                    <p className="text-gray-500">
                      Select a document from the sidebar to view it here.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      <DocumentModal
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDocument(null);
        }}
      />
    </div>
  );
}
