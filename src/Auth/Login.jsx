import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import {
  FaLeaf,
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaStar,
  FaMagic,
} from "react-icons/fa";
import Background from "../assets/background.png";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const initialSignUp = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

const initialSignIn = {
  email: "",
  mobile: "",
  password: "",
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUp, setSignUp] = useState(initialSignUp);
  const [signIn, setSignIn] = useState(initialSignIn);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "mobile"
  const [signupMethod, setSignupMethod] = useState("email"); // "email" or "mobile"
  const containerRef = useRef(null);

  // Handle input changes
  const handleSignUpChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  // Helper: simple token generator
  const makeToken = () =>
    `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;

  // Sign Up (frontend-only, no backend)
  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!signUp.name.trim()) {
      setError("Name is required.");
      return;
    }

    // Check if email or mobile is provided based on signup method
    if (signupMethod === "email") {
      if (!signUp.email.trim()) {
        setError("Email is required.");
        return;
      }
    } else {
      if (!signUp.mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }
    }

    if (!signUp.password) {
      setError("Password is required.");
      return;
    }
    if (signUp.password !== signUp.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (signUp.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email or mobile already exists
    if (signupMethod === "email") {
      if (users.some((u) => u.email === signUp.email)) {
        setError("Email already registered.");
        return;
      }
    } else {
      if (users.some((u) => u.mobile === signUp.mobile)) {
        setError("Mobile number already registered.");
        return;
      }
    }

    const newUser = {
      name: signUp.name,
      email: signUp.email,
      mobile: signUp.mobile,
      password: signUp.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const token = makeToken();
    localStorage.setItem("token", token);

    setSuccess("Registration successful! Redirecting...");
    setSignUp(initialSignUp);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  // Sign In (frontend-only, no backend)
  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if email or mobile is provided based on login method
    if (loginMethod === "email") {
      if (!signIn.email.trim()) {
        setError("Email is required.");
        return;
      }
    } else {
      if (!signIn.mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }
    }

    if (!signIn.password) {
      setError("Password is required.");
      return;
    }

    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user by email or mobile
    const user =
      loginMethod === "email"
        ? users.find((u) => u.email === signIn.email)
        : users.find((u) => u.mobile === signIn.mobile);

    if (!user || user.password !== signIn.password) {
      setError(`Invalid ${loginMethod} or password.`);
      return;
    }

    const token = makeToken();
    localStorage.setItem("token", token);

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-teal-500/30 to-cyan-500/30 blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 blur-3xl"
        />

        {/* Floating Icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-32 text-teal-500/20"
        >
          <FaHeart className="text-2xl" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-32 text-cyan-500/20"
        >
          <FaStar className="text-3xl" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 text-blue-500/20"
        >
          <FaMagic className="text-xl" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center my-4 mt-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-600 font-bold tracking-widest text-sm md:text-2xl"
            >
              {isSignUp ? "Create your account" : "Welcome back"}
            </motion.p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8"
          >
            {/* Main Toggle - Sign In/Sign Up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="relative "
            >
              {/* Background Slider */}
              <motion.div
                animate={{
                  x: isSignUp ? "100%" : "0%",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg"
              />

              <div className="relative flex bg-teal-50 rounded-xl p-1">
                <motion.button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    !isSignUp
                      ? "text-white bg-gradient-to-br from-teal-500 to-cyan-500"
                      : "text-teal-700 hover:text-teal-600"
                  }`}
                >
                  <FaUser className="text-sm" />
                  Sign In
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    isSignUp
                      ? "text-white bg-gradient-to-br from-teal-500 to-cyan-500"
                      : "text-teal-700 hover:text-teal-600"
                  }`}
                >
                  <FaUser className="text-sm" />
                  Sign Up
                </motion.button>
              </div>
            </motion.div>

            {/* Method Selection - Toggle Switch Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="my-4"
            >
              <div className="relative">
                {/* Toggle Background */}
                <motion.div
                  animate={{
                    backgroundColor:
                      (isSignUp ? signupMethod : loginMethod) === "email"
                        ? "rgb(20 184 166)"
                        : "rgb(6 182 212)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-32 h-12 bg-teal-500 rounded-full mx-auto shadow-lg border-2 border-teal-600"
                >
                  {/* Toggle Slider */}
                  <motion.div
                    animate={{
                      x:
                        (isSignUp ? signupMethod : loginMethod) === "email"
                          ? 0
                          : 64,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="absolute top-1 left-[143px] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-teal-400"
                  >
                    <motion.div
                      animate={{
                        rotate:
                          (isSignUp ? signupMethod : loginMethod) === "email"
                            ? 0
                            : 180,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {(isSignUp ? signupMethod : loginMethod) === "email" ? (
                        <FaEnvelope className="text-teal-800 text-sm" />
                      ) : (
                        <FaUser className="text-cyan-800 text-sm" />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Clickable Areas */}
                <div className="absolute inset-0 flex">
                  {/* Email Area */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      isSignUp
                        ? setSignupMethod("email")
                        : setLoginMethod("email")
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-1/2 h-12 cursor-pointer relative"
                  >
                    <motion.div
                      animate={{
                        opacity:
                          (isSignUp ? signupMethod : loginMethod) === "email"
                            ? 1
                            : 0.7,
                        scale:
                          (isSignUp ? signupMethod : loginMethod) === "email"
                            ? 1.3
                            : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center h-full"
                    >
                      <span className="text-cyan-500 font-bold text-sm drop-shadow-md">
                        Email
                      </span>
                    </motion.div>
                    {/* Click Indicator */}
                    <motion.div
                      animate={{
                        opacity:
                          (isSignUp ? signupMethod : loginMethod) === "email"
                            ? 0
                            : 0.3,
                        scale:
                          (isSignUp ? signupMethod : loginMethod) === "email"
                            ? 0.8
                            : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full border border-teal-300"
                    />
                  </motion.button>

                  {/* Mobile Area */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      isSignUp
                        ? setSignupMethod("mobile")
                        : setLoginMethod("mobile")
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-1/2 h-12 cursor-pointer relative"
                  >
                    <motion.div
                      animate={{
                        opacity:
                          (isSignUp ? signupMethod : loginMethod) === "mobile"
                            ? 1
                            : 0.7,
                        scale:
                          (isSignUp ? signupMethod : loginMethod) === "mobile"
                            ? 1.3
                            : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center h-full"
                    >
                      <span className="text-cyan-500 font-bold text-sm drop-shadow-md">
                        Mobile
                      </span>
                    </motion.div>
                    {/* Click Indicator */}
                    <motion.div
                      animate={{
                        opacity:
                          (isSignUp ? signupMethod : loginMethod) === "mobile"
                            ? 0
                            : 0.3,
                        scale:
                          (isSignUp ? signupMethod : loginMethod) === "mobile"
                            ? 0.8
                            : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full border border-cyan-300"
                    />
                  </motion.button>
                </div>

                {/* Active Indicator */}
                <motion.div
                  animate={{
                    x:
                      (isSignUp ? signupMethod : loginMethod) === "email"
                        ? 0
                        : 64,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 500, damping: 30 },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -bottom-2 w-2 h-2 bg-white rounded-full shadow-lg border border-teal-400"
                />
              </div>

           
            </motion.div>

            {/* Sign Up Form */}
            {isSignUp ? (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                onSubmit={handleSignUp}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                    <input
                      type="text"
                      name="name"
                      value={signUp.name}
                      onChange={handleSignUpChange}
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <div className="relative">
                    {signupMethod === "email" ? (
                      <>
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                        <input
                          type="email"
                          name="email"
                          value={signUp.email}
                          onChange={handleSignUpChange}
                          placeholder="Email Address"
                          className="w-full pl-10 pr-4 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          required
                        />
                      </>
                    ) : (
                      <>
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                        <input
                          type="tel"
                          name="mobile"
                          value={signUp.mobile}
                          onChange={handleSignUpChange}
                          placeholder="Mobile Number"
                          className="w-full pl-10 pr-4 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          required
                        />
                      </>
                    )}
                  </div>
                </motion.div>
                <div className="flex flex-row gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signUp.password}
                        onChange={handleSignUpChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-12 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                  >
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={signUp.confirmPassword}
                        onChange={handleSignUpChange}
                        placeholder="Confirm "
                        className="w-full pl-10 pr-12 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200"
                  >
                    {success}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Create Account
                </motion.button>
              </motion.form>
            ) : (
              /* Sign In Form */
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                onSubmit={handleSignIn}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div className="relative">
                    {loginMethod === "email" ? (
                      <>
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                        <input
                          type="email"
                          name="email"
                          value={signIn.email}
                          onChange={handleSignInChange}
                          placeholder="Email Address"
                          className="w-full pl-10 pr-4 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          required
                        />
                      </>
                    ) : (
                      <>
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                        <input
                          type="tel"
                          name="mobile"
                          value={signIn.mobile}
                          onChange={handleSignInChange}
                          placeholder="Mobile Number"
                          className="w-full pl-10 pr-4 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          required
                        />
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signIn.password}
                      onChange={handleSignInChange}
                      placeholder="Password"
                      className="w-full pl-10 pr-12 py-3 bg-white/60 border border-teal-200 rounded-xl text-teal-900 placeholder-teal-500/40  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="flex justify-end"
                >
                  <a
                    href="/forgot-password"
                    className="text-teal-600 text-sm hover:text-teal-700 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </a>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200"
                  >
                    {success}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Sign In
                </motion.button>
              </motion.form>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600 text-sm">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <motion.button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-teal-600 font-medium hover:underline transition-colors"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </motion.button>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
