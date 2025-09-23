import React from "react";
import image1 from "../assets/image1.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-[800px] left-0 mx-auto mt-2 rounded-2xl right-0 z-50 bg-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12">
          <img src={image1} alt="Logo" className="h-40 mb-5 w-auto object-contain" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
