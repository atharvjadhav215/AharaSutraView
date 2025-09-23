import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialSignUp = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialSignIn = {
  email: "",
  password: "",
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUp, setSignUp] = useState(initialSignUp);
  const [signIn, setSignIn] = useState(initialSignIn);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    if (!signUp.email.trim()) {
      setError("Email is required.");
      return;
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

    // Check if email already exists
    if (users.some((u) => u.email === signUp.email)) {
      setError("Email already registered.");
      return;
    }

    const newUser = {
      name: signUp.name,
      email: signUp.email,
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

    if (!signIn.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!signIn.password) {
      setError("Password is required.");
      return;
    }

    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user by email
    const user = users.find((u) => u.email === signIn.email);

    if (!user || user.password !== signIn.password) {
      setError("Invalid email or password.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#f9f4ec] to-[#f5e6da] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] bg-clip-text text-transparent mb-2">
            AharaSutra
          </h1>
          <p className="text-[#6f4e37] text-sm md:text-base">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-[#f5e6da] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isSignUp
                  ? "bg-white text-[#4d3b2f] shadow-sm"
                  : "text-[#6f4e37] hover:text-[#4d3b2f]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignUp
                  ? "bg-white text-[#4d3b2f] shadow-sm"
                  : "text-[#6f4e37] hover:text-[#4d3b2f]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Sign Up Form */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={signUp.name}
                  onChange={handleSignUpChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={signUp.email}
                  onChange={handleSignUpChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={signUp.password}
                  onChange={handleSignUpChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signUp.confirmPassword}
                  onChange={handleSignUpChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6B8E23] to-[#8B4513] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Create Account
              </button>
            </form>
          ) : (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={signIn.email}
                  onChange={handleSignInChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={signIn.password}
                  onChange={handleSignInChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#f9f4ec] border border-[#d4c4a8] rounded-lg text-[#3e2a1f] placeholder-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/20 focus:border-[#4d3b2f] transition-all"
                  required
                />
              </div>

              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-[#6B8E23] text-sm hover:text-[#556B2F] hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6B8E23] to-[#8B4513] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-[#8B4513] text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#6B8E23] font-medium hover:underline transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
