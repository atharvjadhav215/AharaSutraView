import React, { useEffect, useState } from "react";

const sections = [
  {
    id: "usecase",
    title: "Use Case Diagram",
    icon: "👥",
    src: "/assets/usecase.png",
    color: "from-white to-white",
    bgColor: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: "flow",
    title: "Flow Chart",
    icon: "🔄",
    src: "/assets/flowchart.png",
    color: "from-white to-white",
    bgColor: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: "er",
    title: "ER Diagram",
    icon: "🗄️",
    src: "/assets/er.png",
    color: "from-white to-white",
    bgColor: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: "prototype",
    title: "Prototype Video",
    icon: "🎬",
    src: "/assets/prototype.mp4",
    color: "from-white to-white",
    bgColor: "bg-white",
    textColor: "text-gray-800",
    isVideo: true,
  },
];

const Documentation = () => {
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add entrance animation delay
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  const openLightbox = (type, src, title) => {
    setLightbox({ type, src, title });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className={`h-[910px] bg-gradient-to-l from-white to-[#f1eacf]  transition-all duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main Content */}
      <main className="relative z-10 pt-24 px-8 ">
        <div className="w-full mx-auto">
          {/* Four Main Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`transform transition-all duration-700 delay-${
                  index * 200
                } ${
                  isAnimating
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={`relative group cursor-pointer h-96 rounded-3xl overflow-hidden shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 ${
                    hoveredSection === section.id
                      ? "scale-105 shadow-2xl border-blue-200"
                      : "scale-100"
                  }`}
                >
                  {/* Pure White Background */}
                  <div className="absolute inset-0 bg-white"></div>

                  {/* Creative Hover Effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {/* Floating Particles */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce delay-500"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-700"></div>

                    {/* Rotating Border */}
                    <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl animate-spin-slow opacity-30"></div>

                    {/* Pulsing Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl animate-pulse-glow"></div>
                  </div>

                  {/* Content */}
                  <div
                    className="relative z-10 h-full flex items-center justify-center p-8 text-gray-800 cursor-pointer"
                    onClick={() =>
                      openLightbox(
                        section.isVideo ? "video" : "img",
                        section.src,
                        section.title
                      )
                    }
                  >
                    {/* Only Title with Creative Animations */}
                    <h2 className="text-4xl md:text-4xl font-bold text-center leading-tight transform transition-all duration-700 group-hover:scale-110 group-hover:text-blue-600 group-hover:drop-shadow-lg group-hover:animate-wiggle text-teal-800">
                      {section.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Enhanced Full-Screen Modal */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-8xl w-full max-h-[120vh] bg-transparent rounded-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-black/30 cursor-pointer transition-all duration-200"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              {lightbox.type === "img" ? (
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
                  }}
                  className="w-full h-[80vh] p-6 object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-[70vh] bg-black rounded-xl shadow-2xl"
                  poster="/assets/video-poster.png"
                >
                  <source src={lightbox.src} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              )}

              {/* Title */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {lightbox.title}
                </h3>
                <p className="text-black/70">
                  {lightbox.type === "video"
                    ? "Click outside to close"
                    : "Click outside to close"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rainbow-border {
          0% { border-color: #3b82f6; }
          25% { border-color: #8b5cf6; }
          50% { border-color: #ec4899; }
          75% { border-color: #10b981; }
          100% { border-color: #3b82f6; }
        }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-in-up { animation: slideInUp 1s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-float-up { animation: float-up 3s ease-in-out infinite; }
        .animate-rainbow-border { animation: rainbow-border 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default Documentation;
