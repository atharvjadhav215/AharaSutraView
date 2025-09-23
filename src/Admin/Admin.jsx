import React, { useState } from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaUserMd,
  FaIdCard,
  FaFileAlt,
} from "react-icons/fa";

const Admin = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for dietitian requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      specialization: "Clinical Nutrition",
      experience: "5 years",
      status: "pending",
      submittedDate: "2024-01-15",
      documents: {
        license:
          "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Medical+License",
        panCard:
          "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=PAN+Card",
        idPhoto:
          "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=ID+Photo",
      },
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 87654 32109",
      specialization: "Sports Nutrition",
      experience: "8 years",
      status: "pending",
      submittedDate: "2024-01-14",
      documents: {
        license:
          "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Medical+License",
        panCard:
          "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=PAN+Card",
        idPhoto:
          "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=ID+Photo",
      },
    },
    {
      id: 3,
      name: "Dr. Anjali Patel",
      email: "anjali.patel@email.com",
      phone: "+91 76543 21098",
      specialization: "Pediatric Nutrition",
      experience: "3 years",
      status: "approved",
      submittedDate: "2024-01-13",
      documents: {
        license:
          "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Medical+License",
        panCard:
          "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=PAN+Card",
        idPhoto:
          "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=ID+Photo",
      },
    },
  ]);

  const handleApprove = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const openImageModal = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || request.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dietitian Verification
          </h1>
          <p className="text-gray-600">
            Review and approve dietitian registration requests
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaUserMd className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter((r) => r.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FaCheck className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter((r) => r.status === "approved").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <FaTimes className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter((r) => r.status === "rejected").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Email:</strong> {request.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {request.phone}
                  </p>
                  <p>
                    <strong>Specialization:</strong> {request.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {request.experience}
                  </p>
                  <p>
                    <strong>Submitted:</strong> {request.submittedDate}
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div className="p-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Verification Documents
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {/* License */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FaFileAlt className="text-blue-600 mr-2" />
                        <span className="font-medium text-gray-900">
                          Medical License
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          openImageModal(
                            request.documents.license,
                            "Medical License"
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                    </div>
                    <img
                      src={request.documents.license}
                      alt="Medical License"
                      className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() =>
                        openImageModal(
                          request.documents.license,
                          "Medical License"
                        )
                      }
                    />
                  </div>

                  {/* PAN Card */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FaIdCard className="text-green-600 mr-2" />
                        <span className="font-medium text-gray-900">
                          PAN Card
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          openImageModal(request.documents.panCard, "PAN Card")
                        }
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                    </div>
                    <img
                      src={request.documents.panCard}
                      alt="PAN Card"
                      className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() =>
                        openImageModal(request.documents.panCard, "PAN Card")
                      }
                    />
                  </div>

                  {/* ID Photo */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FaUserMd className="text-purple-600 mr-2" />
                        <span className="font-medium text-gray-900">
                          ID Photo
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          openImageModal(request.documents.idPhoto, "ID Photo")
                        }
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                    </div>
                    <img
                      src={request.documents.idPhoto}
                      alt="ID Photo"
                      className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() =>
                        openImageModal(request.documents.idPhoto, "ID Photo")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              {request.status === "pending" && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <FaCheck className="mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <FaTimes className="mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FaUserMd className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedImage.title}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
