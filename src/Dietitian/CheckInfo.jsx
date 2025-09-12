import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CheckInfo() {
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [licenseData, setLicenseData] = useState(null);
  const [pancardData, setPancardData] = useState(null);
  const [idPhotoData, setIdPhotoData] = useState(null);
  const [error, setError] = useState("");

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e, setter) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setter(null);
      return;
    }
    const data = await readFile(f);
    setter(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!hospitalName.trim() || !location.trim()) {
      setError("Hospital name and location are required.");
      return;
    }
    if (!licenseData || !pancardData || !idPhotoData) {
      setError("Please upload license, PAN card and ID-size photo.");
      return;
    }

    const doctorInfo = {
      hospitalName: hospitalName.trim(),
      location: location.trim(),
      license: licenseData,
      pancard: pancardData,
      idPhoto: idPhotoData,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("doctorInfo", JSON.stringify(doctorInfo));
    } catch (err) {
      // fallback - ignore storage error for UI-only flow
    }

    // navigate to doctor home
    navigate("/dhome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white mt-10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-[#3e2a1f] mb-2">
            Dietitian Verification
          </h2>
          <p className="text-xl text-[#6b4d3b] mb-6">
            Provide hospital details and upload required documents. Background
            leaves are handled globally.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg text-[#5a3f2e] mb-1">
                Hospital name
              </label>
              <input
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-black text-[#3e2a1f] focus:outline-none"
                placeholder="e.g., Ayur Clinic"
                required
              />
            </div>

            <div>
              <label className="block text-lg text-[#5a3f2e] mb-1">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-black  text-[#3e2a1f] focus:outline-none"
                placeholder="City, State or full address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg text-[#5a3f2e] mb-1">
                  License photo
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, setLicenseData)}
                  className="text-xl w-full border-black  border p-2 rounded-xl"
                />
                {licenseData && (
                  <img
                    src={licenseData}
                    alt="license preview"
                    className="mt-2 w-full h-28 object-contain rounded-md border border-white/10"
                  />
                )}
              </div>

              <div>
                <label className="block text-lg text-[#5a3f2e] mb-1">
                  PAN card photo
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, setPancardData)}
                  className="text-xl w-full border-black  border p-2 rounded-xl"
                />
                {pancardData && (
                  <img
                    src={pancardData}
                    alt="pancard preview"
                    className="mt-2 w-full h-28 object-contain rounded-md border border-white/10"
                  />
                )}
              </div>

              <div>
                <label className="block text-lg text-[#5a3f2e] mb-1">
                  ID-size photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setIdPhotoData)}
                  className="text-xl w-full border-black  border p-2 rounded-xl"
                />
                {idPhotoData && (
                  <img
                    src={idPhotoData}
                    alt="id preview"
                    className="mt-2 w-full h-28 object-cover rounded-md border border-white/10"
                  />
                )}
              </div>
            </div>

            {error && <div className="text-xl text-red-600">{error}</div>}

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-full bg-transparent text-[#5a3f2e] border border-white/10 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <Link to ="/dhome">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  Submit & Continue
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
