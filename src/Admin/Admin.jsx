import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../EnhancedEffects.css";

const Admin = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      hospitalName: "Apollo Hospital",
      location: "Mumbai, Maharashtra",
      licensePhoto:
        "https://plus.unsplash.com/premium_photo-1661777193045-49f1bbaafd95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGljZW5zZXxlbnwwfHwwfHx8MA%3D%3D",
      panCard:
        "https://plus.unsplash.com/premium_photo-1755994149244-d7887690b774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuQ2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      idPhoto:
        "https://images.unsplash.com/photo-1649660289281-b6da5dacc12c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aWQlMjBzaXhlJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
      status: "pending",
      submittedDate: "2024-01-15",
      email: "priya.sharma@apollo.com",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      hospitalName: "Fortis Healthcare",
      location: "Delhi, NCR",
      licensePhoto:
        "https://plus.unsplash.com/premium_photo-1661777193045-49f1bbaafd95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGljZW5zZXxlbnwwfHwwfHx8MA%3D%3D",
      panCard:
        "https://plus.unsplash.com/premium_photo-1755994149244-d7887690b774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuQ2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      idPhoto:
        "https://images.unsplash.com/photo-1649660289281-b6da5dacc12c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aWQlMjBzaXhlJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
      status: "pending",
      submittedDate: "2024-01-14",
      email: "rajesh.kumar@fortis.com",
      phone: "+91 87654 32109",
    },
    {
      id: 3,
      name: "Dr. Anjali Patel",
      hospitalName: "Max Hospital",
      location: "Bangalore, Karnataka",
      licensePhoto:
        "https://plus.unsplash.com/premium_photo-1661777193045-49f1bbaafd95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGljZW5zZXxlbnwwfHwwfHx8MA%3D%3D",
      panCard:
        "https://plus.unsplash.com/premium_photo-1755994149244-d7887690b774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuQ2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      idPhoto:
        "https://images.unsplash.com/photo-1649660289281-b6da5dacc12c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aWQlMjBzaXhlJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
      status: "approved",
      submittedDate: "2024-01-10",
      email: "anjali.patel@max.com",
      phone: "+91 76543 21098",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true;
    return request.status === filter;
  });

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  const openDocument = (request, docType) => {
    setSelectedRequest(request);
    setSelectedDocument(docType);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedDocument(null);
    setSelectedRequest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "✓";
      case "rejected":
        return "✗";
      default:
        return "⏳";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-50 to-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-16"
      >
        <h1 className="text-4xl font-bold gradient-text-enhanced epunda-slab-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 epunda-slab-regular">
          Review and manage dietitian registration requests
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {[
          {
            label: "Total Requests",
            value: requests.length,
            color: "bg-blue-500",
          },
          {
            label: "Pending",
            value: requests.filter((r) => r.status === "pending").length,
            color: "bg-yellow-500",
          },
          {
            label: "Approved",
            value: requests.filter((r) => r.status === "approved").length,
            color: "bg-green-500",
          },
          {
            label: "Rejected",
            value: requests.filter((r) => r.status === "rejected").length,
            color: "bg-red-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-xl shadow-floating p-6 card-enhanced"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 epunda-slab-regular text-sm">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold counter epunda-slab-bold">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}
              >
                <span className="text-white text-xl font-bold">
                  {stat.value}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex space-x-4 bg-white rounded-xl p-2 shadow-floating">
          {[
            { key: "all", label: "All Requests" },
            { key: "pending", label: "Pending" },
            { key: "approved", label: "Approved" },
            { key: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 rounded-lg epunda-slab-medium transition-all duration-200 ${
                filter === tab.key
                  ? "bg-olive-green text-gray-600 shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Requests List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <AnimatePresence>
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-floating p-6 card-enhanced"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 epunda-slab-semibold mb-1">
                        {request.name}
                      </h3>
                      <p className="text-gray-600 epunda-slab-regular mb-1">
                        {request.hospitalName}
                      </p>
                      <p className="text-gray-500 epunda-slab-regular text-sm">
                        📍 {request.location}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium epunda-slab-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {getStatusIcon(request.status)}{" "}
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 epunda-slab-regular">
                        Email
                      </p>
                      <p className="text-gray-800 epunda-slab-medium text-sm">
                        {request.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 epunda-slab-regular">
                        Phone
                      </p>
                      <p className="text-gray-800 epunda-slab-medium text-sm">
                        {request.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 epunda-slab-regular">
                        Submitted
                      </p>
                      <p className="text-gray-800 epunda-slab-medium text-sm">
                        {request.submittedDate}
                      </p>
                    </div>
                  </div>

                  {/* Document View Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDocument(request, "licensePhoto")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200 text-sm"
                    >
                      📄 View License
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDocument(request, "panCard")}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200 text-sm"
                    >
                      🆔 View PAN Card
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDocument(request, "idPhoto")}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200 text-sm"
                    >
                      🖼️ View ID Photo
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                {request.status === "pending" && (
                  <div className="flex flex-col space-y-3 lg:min-w-[200px]">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApprove(request.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200"
                    >
                      ✓ Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReject(request.id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200"
                    >
                      ✗ Reject
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Document Viewer */}
      <AnimatePresence>
        {isFullscreen && selectedRequest && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden shadow-3d"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 epunda-slab-semibold">
                    {selectedRequest.name} -{" "}
                    {selectedDocument
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </h3>
                  <p className="text-gray-600 epunda-slab-regular">
                    {selectedRequest.hospitalName} • {selectedRequest.location}
                  </p>
                </div>
                <button
                  onClick={closeFullscreen}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                >
                  ×
                </button>
              </div>

              {/* Document */}
              <div className="p-6">
                <img
                  src={selectedRequest[selectedDocument]}
                  alt={selectedDocument}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Footer Actions */}
              {selectedRequest.status === "pending" && (
                <div className="flex justify-center space-x-4 p-6 border-t bg-gray-50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      closeFullscreen();
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200"
                  >
                    ✓ Approve Request
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      closeFullscreen();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg epunda-slab-medium btn-enhanced-state transition-all duration-200"
                  >
                    ✗ Reject Request
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
