import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine user role based on current route
  const isUserRole =
    location.pathname === "/uhome" ||
    location.pathname === "/create-own-chart" ||
    location.pathname === "/diet-chart" ||
    location.pathname === "/uprofile";

  const isDietitianRole =
    location.pathname === "/dhome" ||
    location.pathname === "/add-patient" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/my-diet-chart";

  // Handle logo click → navigate to role-based home
  const handleLogoClick = () => {
    if (isUserRole) {
      navigate("/uhome");
    } else if (isDietitianRole) {
      navigate("/dhome");
    } else {
      navigate("/"); // fallback (like landing page or login)
    }
  };

  return (
    <nav className="fixed top-0 md:w-[800px] w-[300px] left-0 mx-auto mt-2 rounded-2xl right-0 z-50 bg-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center md:h-12 h-8 md:mt-0 mt-1">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <img
              src={image1}
              alt="Logo"
              className="h-10 w-auto object-cover cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Role-based Navigation Buttons */}
          <div className="flex gap-2 md:gap-4">
            {isUserRole && (
              <>
                <button
                  onClick={() => navigate("/create-own-chart")}
                  className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-100 font-medium"
                >
                  Create Your Own Chart
                </button>
                <button
                  onClick={() => navigate("/uprofile")}
                  className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-100 font-medium"
                >
                  Profile
                </button>
              </>
            )}

            {isDietitianRole && (
              <>
                <button
                  onClick={() => navigate("/add-patient")}
                  className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-100 font-medium"
                >
                  Add Patient
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-100 font-medium"
                >
                  Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
