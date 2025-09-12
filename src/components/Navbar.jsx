import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaUserPlus, FaUsers, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // added
import Logo from "../assets/Logo.png";
import image1 from "../assets/image1.png";

/* changed code: Ayurvedic color palette for nav items (bg + foreground color) */
const navItems = [
  {
    key: "add-patient",
    label: "Add Patient",
    bgColor: "#F7EFE6", // warm beige paper
    color: "#2C5F2D", // deep herbal green (text/icon)
    icon: FaUserPlus,
  },
  {
    key: "patients",
    label: "Patients",
    bgColor: "#F0D9B5", // soft saffron tone
    color: "#7A4B1D", // warm brown accent
    icon: FaUsers,
  },
  {
    key: "database",
    label: "Database",
    bgColor: "#E6F3E9", // pale leaf green
    color: "#245233", // darker green for contrast
    icon: FaDatabase,
  },
];

const ArrowIcon = ({ className = "inline-block", ariaHidden = true }) => (
  <svg
    className={className}
    aria-hidden={ariaHidden}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Navbar = ({
  logoAlt = "Logo",
  items = navItems, // default to the three items above
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const navigate = useNavigate(); // added

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 220;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 220;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.35,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.06 },
      "-=0.15"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`fixed top-3 md:top-4 left-0 right-0   flex justify-center z-50 pointer-events-none ${className}`}
    >
      <div className="w-[100%] max-w-[1000px] pointer-events-auto">
        <nav
          ref={navRef}
          className="relative overflow-hidden rounded-xl shadow-lg h-10 p-0 border will-change-[height]"
          style={{ backgroundColor: baseColor }}
        >
          <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-end px-3 md:px-4 z-20">


            {/* centered logo */}
            <div className="absolute left-1/2  -translate-x-1/2   object-cover ">
              <img
                src={image1}
                alt={logoAlt}
                className=" object-cover h-52 mb-4"
              />
            </div>

              
          </div>

          {/* card content: only three buttons (no links) */}
          <div
            className={`card-nav-content absolute left-0 right-0 top-[85px] p-3 flex gap-3 z-10 transition-all duration-200 ${
              isExpanded
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            }`}
            aria-hidden={!isExpanded}
          >
            {(items || []).slice(0, 3).map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key || `${item.label}-${idx}`}
                  ref={setCardRef(idx)}
                  className="flex-1 min-w-0 rounded-lg flex items-center gap-3 p-3 py-8 text-left select-none hover:shadow-md transition"
                  style={{ backgroundColor: item.bgColor || "#fff" }}
                  type="button"
                  onClick={() => {
                    // navigate for specific item keys
                    if (item.key === "add-patient") {
                      navigate("/add-patient");
                      return;
                    }
                    // placeholder: handle other buttons
                    console.log("clicked", item.key || item.label);
                  }}
                >
                  {Icon ? (
                    <Icon
                      className="text-2xl"
                      aria-hidden="true"
                      style={{ color: item.color }}
                    />
                  ) : (
                    <ArrowIcon />
                  )}
                  <span className="font-medium" style={{ color: item.color }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
