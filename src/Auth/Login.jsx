import React, { useState } from "react";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import images from the project's assets folder

const initialSignUp = {
  name: "",
  username: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "",
  password: "",
  interests: [],
};

const initialSignIn = {
  username: "",
  password: "",
};

const Page = () => {
  const [isActive, setIsActive] = useState(false);
  const [signUp, setSignUp] = useState(initialSignUp);
  const [signUpMethod, setSignUpMethod] = useState("email"); // "email" | "mobile"
  const [signIn, setSignIn] = useState(initialSignIn);
  const [signInMethod, setSignInMethod] = useState("email"); // "email" | "mobile"
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

    // validation depends on selected method
    if (!signUp.username && signUpMethod === "email") {
      setError("Username is required for email sign up.");
      return;
    }
    if (signUpMethod === "email" && !signUp.email) {
      setError("Email is required for email sign up.");
      return;
    }
    if (signUpMethod === "mobile" && !signUp.phone) {
      setError("Mobile number is required for mobile sign up.");
      return;
    }
    if (!signUp.password) {
      setError("Password is required.");
      return;
    }

    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // check duplicates according to chosen primary identifier
    if (signUpMethod === "email") {
      if (users.some((u) => u.email === signUp.email)) {
        setError("Email already registered.");
        return;
      }
    } else {
      if (users.some((u) => u.phone === signUp.phone)) {
        setError("Mobile number already registered.");
        return;
      }
    }
    if (signUp.username && users.some((u) => u.username === signUp.username)) {
      setError("Username already exists.");
      return;
    }

    const newUser = { ...signUp };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const token = makeToken();
    localStorage.setItem("token", token);

    setSuccess("Registration successful! Redirecting...");
    setSignUp(initialSignUp);

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  // Sign In (frontend-only, no backend)
  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // find user based on chosen method
    let user;
    if (signInMethod === "email") {
      // allow username or email for convenience
      user = users.find(
        (u) =>
          (u.username && u.username === signIn.username) ||
          (u.email && u.email === signIn.username)
      );
    } else {
      user = users.find((u) => u.phone && u.phone === signIn.username);
    }

    if (!user || user.password !== signIn.password) {
      setError("Invalid credentials. (Frontend-only auth)");
      return;
    }

    const token = makeToken();
    localStorage.setItem("token", token);

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div className="relative flex items-center justify-center  h-screen overflow-hidden">
      <div className="">
        {/* 🔹 Main Container */}
        <div
          className={`relative bg-transperent bg-white backdrop-blur-md rounded-[100px] shadow-2xl shadow-[#2a180c] overflow-hidden w-[1068px] max-w-full min-h-[580px] transition-all duration-700 z-20`}
          id="container"
        >
          {/* Sign Up */}
          <div
            className={`absolute top-0 right-0 h-full w-1/2 transition-all duration-700 flex items-start justify-center flex-col px-10 py-12 ${
              isActive
                ? "opacity-100 z-20 translate-x-0"
                : "opacity-0 z-0 translate-x-full"
            }`}
          >
            <form
              className="flex flex-col items-center justify-center w-full"
              onSubmit={handleSignUp}
            >
              <h1 className="text-4xl bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] bg-clip-text text-transparent font-bold">
                CREATE ACCOUNT
              </h1>
              {/* method toggle (Sign Up) */}
              <div className="w-3/4   mt-5 mb-4">
                <div
                  role="tablist"
                  aria-label="Sign up method"
                  className="inline-flex gap-2 w-full justify-between items-center bg-white/5 p-1 rounded-full shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setSignUpMethod("email")}
                    className={`px-4 py-1 w-1/2 rounded-full text-xl font-semibold transition
                      ${
                        signUpMethod === "email"
                          ? "bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] text-white shadow-lg"
                          : "text-[#4d3b2f] bg-transparent hover:bg-white/10"
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/40`}
                  >
                    Email
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignUpMethod("mobile")}
                    className={`px-4 py-1 w-1/2 rounded-full text-xl font-semibold transition
                      ${
                        signUpMethod === "mobile"
                          ? "bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] text-white shadow-lg"
                          : "text-[#4d3b2f] bg-transparent hover:bg-white/10"
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/40`}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <input
                  type="text"
                  name="name"
                  value={signUp.name}
                  onChange={handleSignUpChange}
                  placeholder="Name"
                  className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                />

                {signUpMethod === "email" ? (
                  <input
                    type="email"
                    name="email"
                    value={signUp.email}
                    onChange={handleSignUpChange}
                    placeholder="Email"
                    className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  />
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={signUp.phone}
                    onChange={handleSignUpChange}
                    placeholder="Mobile number"
                    className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  />
                )}

                <input
                  type="password"
                  name="password"
                  value={signUp.password}
                  onChange={handleSignUpChange}
                  placeholder="Password"
                  className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={signUp.password}
                  onChange={handleSignUpChange}
                  placeholder="Confirm Password"
                  className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-xs mt-2">{error}</div>
              )}
              {success && (
                <div className="text-green-700 text-xs mt-2">{success}</div>
              )}
              <Link to="/onboarding">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#4d3b2f] via-[#6f4e37] to-[#8b5e3c] text-white text-xs px-12 py-2 rounded-md uppercase mt-3 font-semibold tracking-wide shadow-md hover:shadow-lg transition"
                >
                  Sign Up
                </button>
              </Link>
            </form>
          </div>

          {/* Sign In */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 flex items-start justify-center flex-col px-10 py-12 ${
              isActive
                ? "opacity-0 z-0 -translate-x-full"
                : "opacity-100 z-20 translate-x-0"
            }`}
          >
            <form
              className="flex flex-col items-center justify-center w-full"
              onSubmit={handleSignIn}
            >
              <h1 className="text-4xl bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] bg-clip-text text-transparent font-bold">
                SIGN IN
              </h1>

              {/* method toggle (Sign In) */}
              <div className="w-3/4 flex justify-between  mt-5 mb-4">
                <div
                  role="tablist"
                  aria-label="Sign in method"
                  className="inline-flex justify-between gap-2  w-full bg-white/5 p-1 rounded-full shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setSignInMethod("email")}
                    className={`px-4 py-1 w-1/2 rounded-full text-xl font-semibold transition
                      ${
                        signInMethod === "email"
                          ? "bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] text-white shadow-lg"
                          : "text-[#4d3b2f] bg-transparent hover:bg-white/10"
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/40`}
                  >
                    Email
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignInMethod("mobile")}
                    className={`px-4 py-1 w-1/2 rounded-full text-xl font-semibold transition
                      ${
                        signInMethod === "mobile"
                          ? "bg-gradient-to-r from-[#4d3b2f] to-[#8b5e3c] text-white shadow-lg"
                          : "text-[#4d3b2f] bg-transparent hover:bg-white/10"
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#4d3b2f]/40`}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              {signInMethod === "email" ? (
                <input
                  type="text"
                  name="username"
                  value={signIn.username}
                  onChange={handleSignInChange}
                  placeholder="Email"
                  className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  required
                />
              ) : (
                <input
                  type="tel"
                  name="username"
                  value={signIn.username}
                  onChange={handleSignInChange}
                  placeholder="Mobile number"
                  className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                  required
                />
              )}

              <input
                type="password"
                name="password"
                value={signIn.password}
                onChange={handleSignInChange}
                placeholder="Password"
                className="bg-gradient-to-r from-[#f9f4ec] to-[#f5e6da] text-[#3e2a1f] border border-[#6f4e37] w-full my-2 p-2 rounded-md outline-none text-xl"
                required
              />
              <a
                href="/forgot-password"
                className="text-[#6f4e37] text-xs mt-2 hover:underline"
              >
                Forgot Your Password?
              </a>

              {error && (
                <div className="text-red-600 text-xs mt-2">{error}</div>
              )}
              {success && (
                <div className="text-green-700 text-xs mt-2">{success}</div>
              )}
              <Link to="/onboarding">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#4d3b2f] via-[#6f4e37]  to-[#8b5e3c] text-white text-xs px-12 py-2 rounded-md uppercase mt-3 font-semibold tracking-wide shadow-md hover:shadow-lg transition"
                >
                  Sign In
                </button>
              </Link>
            </form>
          </div>

          {/* Toggle Panel */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 rounded-[100px] z-30 ${
              isActive ? "-translate-x-full rounded-[0_150px_100px_0]" : ""
            }`}
          >
            <div
              className={`bg-gradient-to-r from-[#c6a46e] via-[#74521d] to-[#c6a46e] text-white relative left-[-100%] w-[200%] h-full transition-all duration-700 ${
                isActive ? "translate-x-1/2" : ""
              }`}
            >
              {/* Left Panel */}
              <div
                className={`absolute flex flex-col items-center justify-center text-center px-6 w-1/2 h-full top-0 transition-all duration-700 ${
                  isActive ? "translate-x-0" : "-translate-x-[200%]"
                }`}
              >
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="text-xl my-4 text-[#fdf6f0]">
                  Register with your personal details to use all site features
                </p>
                <button
                  onClick={() => setIsActive(false)}
                  className="bg-transparent border border-white px-10 py-2 rounded-md uppercase text-xs font-semibold hover:bg-white hover:text-[#2f4f2f] transition"
                >
                  Sign In
                </button>
              </div>

              {/* Right Panel */}
              <div
                className={`absolute right-0 flex flex-col items-center justify-center text-center px-6 w-1/2 h-full top-0 transition-all duration-700 ${
                  isActive ? "translate-x-[200%]" : "translate-x-0"
                }`}
              >
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-xl my-4 text-[#fdf6f0]">
                  Enter your personal details to use all site features
                </p>
                <button
                  onClick={() => setIsActive(true)}
                  className="bg-transparent border border-white px-10 py-2 rounded-md uppercase text-xs font-semibold hover:bg-white hover:text-[#2f4f2f] transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
