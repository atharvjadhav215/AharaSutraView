import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../EnhancedEffects.css";
import imagePng from "../assets/image7.png";
import imagePng1 from "../assets/image5.png";
import imagePng2 from "../assets/image6.png";
import tulsi from "../assets/tulsi.png";
import Ashwagandha from "../assets/Ashwagandha.png";
import Brahmi from "../assets/Brahmi.png";
import Ginger from "../assets/ginger.png";
import Turmeric from "../assets/Turmeric.png";
import Triphala from "../assets/Triphala.png";
import Pitta from "../assets/Pitta.png";
import Kapha from "../assets/Kapha.png";
import Vata from "../assets/vata.png";
import backgroundImage from "../assets/background1.png";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced Parallax Component
const ParallaxLayer = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${(speed - 1) * 100}%`]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// 3D Card Component
const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
const STORY_CARDS = [
  {
    id: "chart",
    title: "What is a Diet Chart?",
    subtitle: "A simple, daily plan tailored to you",
    bullets: [
      "Structured meals for breakfast, lunch, snacks, dinner",
      "Portion guidance and timing to strengthen digestion (Agni)",
      "Includes foods, herbs and small lifestyle notes",
    ],
    img: imagePng,

    accent: "#6B8E23",
  },
  {
    id: "importance",
    title: "Why it matters",
    subtitle: "Good diet + routine = sustainable health",
    bullets: [
      "Improves digestion, sleep and energy",
      "Prevents overeating and imbalanced cravings",
      "Supports weight, immunity and mood",
    ],
    img: imagePng1,
    accent: "#8B4513",
  },
  {
    id: "benefits",
    title: "Benefits you’ll notice",
    subtitle: "Small changes, big results",
    bullets: [
      "More consistent energy through the day",
      "Better digestion and clearer skin",
      "Calmer mind and improved sleep",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/dog-with-girl.png",
    accent: "#9CAF88",
  },
  {
    id: "howto",
    title: "How to use the Diet Chart",
    subtitle: "Step-by-step for first-time users",
    bullets: [
      "Answer a few questions about you (dosha, preferences)",
      "Receive a daily plan with portions and swap options",
      "Follow for 2–4 weeks and adjust based on energy & digestion",
    ],
    img: "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/pngwing.com.png",
    accent: "#556B2F",
  },
  {
    id: "next",
    title: "Ready to start?",
    subtitle: "Create your personalised chart",
    bullets: [
      "Click 'Create Chart' to begin the short onboarding",
      "Share with your practitioner or export as PDF",
      "Revisit the story anytime for quick reminders",
    ],
    img: imagePng2,
    accent: "#A0522D",
  },
];
const FEATURES = [
  {
    id: "ayurvedic-nutrition",
    title: "Ancient Wisdom Meets Modern Nutrition",
    subtitle:
      "Harness the power of Ayurvedic principles for personalized diet plans",
    description:
      "Create holistic nutrition plans based on dosha balance, seasonal eating, and traditional Ayurvedic wisdom. Our platform integrates ancient knowledge with modern nutritional science.",
    image:
      "https://preview.templatebundle.net/templates/ayurveda-website-template/assets/images/blog6.jpg",
    accent: "#8B4513",
    features: [
      "Dosha-based meal planning",
      "Seasonal nutrition guidance",
      "Herbal supplement integration",
    ],
    layout: "left",
  },
  {
    id: "holistic-wellness",
    title: "Complete Wellness Journey",
    subtitle: "Track mind, body, and spirit alignment through nutrition",
    description:
      "Monitor not just physical health metrics, but also energy levels, mood, sleep quality, and overall well-being. Our holistic approach considers the complete picture of health.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    accent: "#A0522D",
    features: [
      "Holistic health tracking",
      "Mind-body connection monitoring",
      "Wellness trend analysis",
    ],
    layout: "right",
  },
  {
    id: "traditional-healing",
    title: "Traditional Healing Practices",
    subtitle: "Integrate time-tested healing methods with modern care",
    description:
      "Combine traditional Ayurvedic practices like meditation, yoga, and herbal medicine with contemporary nutritional therapy for comprehensive patient care.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    accent: "#CD853F",
    features: [
      "Traditional healing integration",
      "Lifestyle modification guidance",
      "Cultural dietary practices",
    ],
    layout: "left",
  },
];

const AYURVEDIC_HERBS = [
  {
    name: "Turmeric",
    image: Turmeric,
    benefits: "Anti-inflammatory",
    color: "#FF8C00",
  },
  {
    name: "Ginger",
    image: Ginger,
    benefits: "Digestive support",
    color: "#FF6347",
  },
  {
    name: "Ashwagandha",
    image: Ashwagandha,
    benefits: "Stress relief",
    color: "#8B4513",
  },
  {
    name: "Tulsi",
    image: tulsi,
    benefits: "Immune boost",
    color: "#228B22",
  },
  {
    name: "Triphala",
    image: Triphala,
    benefits: "Detoxification",
    color: "#8B0000",
  },
  {
    name: "Brahmi",
    image: Brahmi,
    benefits: "Brain health",
    color: "#4B0082",
  },
];

const DOSHA_TYPES = [
  {
    name: "Vata",
    description: "Air & Space",
    characteristics: ["Creative", "Energetic", "Quick-thinking"],
    image: Vata,
    color: "#6B8E23",
  },
  {
    name: "Pitta",
    description: "Fire & Water",
    characteristics: ["Intense", "Focused", "Determined"],
    image: Pitta,
    color: "#8B4513",
  },
  {
    name: "Kapha",
    description: "Earth & Water",
    characteristics: ["Stable", "Caring", "Strong"],
    image: Kapha,
    color: "#9CAF88",
  },
];

const INTEGRATIONS = [
  {
    name: "Google Fit",
    logo: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,1H7A2,2 0 0,0 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3A2,2 0 0,0 17,1M17,19H7V5H17V19Z" />
      </svg>
    ),
  },

  {
    name: "WhatsApp",
    logo: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472,14.382c-0.297-0.149-1.758-0.867-2.03-0.967c-0.273-0.099-0.471-0.148-0.67,0.15c-0.197,0.297-0.767,0.966-0.94,1.164c-0.173,0.199-0.347,0.223-0.644,0.075c-0.297-0.15-1.255-0.463-2.39-1.475c-0.883-0.788-1.48-1.761-1.653-2.059c-0.173-0.297-0.018-0.458,0.13-0.606c0.134-0.133,0.298-0.347,0.446-0.52c0.149-0.174,0.198-0.298,0.298-0.497c0.099-0.198,0.05-0.371-0.025-0.52C9.57,8.143,8.832,7.151,8.535,6.654C8.238,6.156,7.94,6.207,7.72,6.207C7.5,6.207,7.253,6.156,6.956,6.156C6.659,6.156,6.312,6.305,6.015,6.653C5.718,7,4.77,7.947,4.77,9.912c0,1.965,1.429,3.89,1.629,4.157c0.198,0.268,2.76,4.24,6.691,5.953c3.93,1.713,3.93,1.148,4.638,1.078c0.708-0.07,2.28-0.932,2.6-1.832c0.32-0.9,0.32-1.67,0.223-1.832C18.172,14.529,17.769,14.531,17.472,14.382z" />
      </svg>
    ),
  },

  {
    name: "Email",
    logo: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" />
      </svg>
    ),
  },
  {
    name: "Report Export",
    logo: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. Priya Sharma",
    role: "Ayurvedic Nutritionist",
    company: "Himalayan Wellness Center",
    text: "AharaSutra beautifully bridges ancient Ayurvedic wisdom with modern nutrition science. My patients experience profound healing through personalized dosha-based meal plans that honor their unique constitution.",
    avatar: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
      </svg>
    ),
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
  },
  {
    name: "Rajesh Kumar",
    role: "Holistic Health Practitioner",
    company: "Vedic Wellness Institute",
    text: "The platform's integration of seasonal eating, herbal medicine, and mind-body wellness tracking has transformed my practice. Patients achieve balance not just physically, but spiritually too.",
    avatar: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
    ),
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
  },
  {
    name: "Dr. Anjali Mehta",
    role: "Integrative Medicine Specialist",
    company: "Sacred Health Clinic",
    text: "Finally, a platform that respects both traditional healing and evidence-based nutrition! My patients love how their wellness journey feels authentic to their cultural roots while being scientifically sound.",
    avatar: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
      </svg>
    ),
    image:
      "https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXl1cnZlZGljJTIwZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const STATS = [
  {
    label: "Active Dietitians",
    value: "2,500+",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" />
      </svg>
    ),
  },
  {
    label: "Patient Charts",
    value: "50,000+",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z" />
      </svg>
    ),
  },
  {
    label: "Successful Plans",
    value: "95%",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
      </svg>
    ),
  },
  {
    label: "Patient Satisfaction",
    value: "4.8/5",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [currentHerbIndex, setCurrentHerbIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Slider state
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Start with auto-play enabled
  const [slideDirection, setSlideDirection] = useState("right"); // Track slide direction

  // Individual dosha hover state management
  const [hoveredDosha, setHoveredDosha] = useState(null);

  const onPrev = () => {
    setSlideDirection("left");
    setIndex((prev) => (prev === 0 ? STORY_CARDS.length - 1 : prev - 1));
  };

  const onNext = () => {
    setSlideDirection("right");
    setIndex((prev) => (prev === STORY_CARDS.length - 1 ? 0 : prev + 1));
  };

  // Auto-sliding functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection("right");
      setIndex((prev) => (prev === STORY_CARDS.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Enhanced counter animation with spring physics
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);

          // Use GSAP for smoother animation
          gsap.fromTo(
            counter,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate: function () {
                counter.textContent = Math.floor(
                  this.targets()[0].textContent
                ).toLocaleString();
              },
            }
          );
        }
      });
    });

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  // Enhanced scroll animations
  useEffect(() => {
    // Staggered animations for feature cards
    gsap.utils.toArray(".feature-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: 15,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax background elements
    gsap.utils.toArray(".parallax-bg").forEach((element, index) => {
      gsap.to(element, {
        yPercent: -50 * (index + 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const SlideCard = ({
    data,
    index,
    carouselItems,
    onPrev,
    onNext,
    isPlaying,
    setIsPlaying,
    slideDirection,
  }) => {
    // centralised durations for this sidecard only
    const D = {
      enter: 0.6, // main card enter/exit
      imgScale: 0.6, // image hover/scale
      imgIntro: 0.8, // image initial scale animation
      textDelay: 0.18, // title/subtitle stagger start
      textDur: 0.55, // title/subtitle duration
      bulletStagger: 0.14, // each bullet stagger
      controlTap: 0.08, // button tap scale
    };

    return (
      <div className="relative w-full flex items-center justify-center pointer-events-auto h-[780px]  overflow-hidden">
        {/* Card container */}
        <motion.div
          key={data.id}
          initial={{
            opacity: 0,
            x: slideDirection === "right" ? 100 : -100,
            scale: 0.9,
            rotateX: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            x: slideDirection === "right" ? -100 : 100,
            scale: 0.9,
            rotateX: 15,
          }}
          transition={{
            duration: D.enter,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className=" max-w-[1200px] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center h-[85vh] sm:h-[80vh] md:h-[78vh]  "
        >
          {/* Image */}
          <motion.div
            className="flex items-center justify-center relative"
            initial={{ scale: 0.8, rotateY: -30 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: D.imgIntro, ease: "easeOut" }}
          >
            {/* Ayurvedic Energy Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{
                scale: [1.1, 1.3, 1.1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [360, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={data.img}
              alt={data.title}
              className="rounded-xl  h-[40vh] w-[40vh] sm:h-[50vh] sm:w-[50vh] md:h-[60vh] md:w-[60vh] object-cover relative z-10"
              whileHover={{
                scale: 1.08,
                rotateY: 5,
              }}
              transition={{ duration: D.imgScale }}
            />
          </motion.div>

          {/* Text area */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
            {/* Ayurvedic Text Background */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-2 sm:mb-3 relative z-10 drop-shadow-lg"
              initial={{ x: -50, opacity: 0, rotateX: -20 }}
              animate={{ x: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: D.textDelay,
                duration: D.textDur,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {data.title}
            </motion.h2>
            <motion.p
              className="text-white/90 text-md sm:text-md md:text-xl lg:text-2xl mb-3 sm:mb-4 relative z-10 drop-shadow-md"
              initial={{ x: -40, opacity: 0, rotateX: -15 }}
              animate={{ x: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: D.textDelay + 0.12,
                duration: D.textDur,
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
            >
              {data.subtitle}
            </motion.p>

            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 relative z-10">
              {data.bullets.map((b, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 sm:gap-3"
                  initial={{ x: -30, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{
                    delay: D.textDelay + 0.25 + i * D.bulletStagger,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  whileHover={{
                    x: 5,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.span
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1 sm:mt-2 flex-shrink-0"
                    style={{ background: data.accent }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                  <p className="text-md sm:text-md md:text-xl lg:text-2xl text-white/95 drop-shadow-sm">
                    {b}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4 sm:mt-6 relative z-10">
              <div className="flex gap-1 sm:gap-2">
                {Array.isArray(carouselItems) &&
                  carouselItems.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        setIsPlaying && setIsPlaying(false);
                        setIndex(i);
                      }}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-150 ${
                        i === index
                          ? "bg-gradient-to-r from-white to-white/80 shadow-lg"
                          : "bg-white/40 opacity-60 hover:opacity-80 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                      whileHover={{
                        scale: 1.3,
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        scale: i === index ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Previous Button */}
                <motion.button
                  onClick={() => {
                    setIsPlaying && setIsPlaying(false);
                    onPrev();
                  }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </motion.button>

                {/* Play/Pause Button */}
                <motion.button
                  onClick={() => setIsPlaying && setIsPlaying(!isPlaying)}
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  <motion.div
                    animate={{ rotate: isPlaying ? 0 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </motion.div>
                </motion.button>

                {/* Next Button */}
                <motion.button
                  onClick={() => {
                    setIsPlaying && setIsPlaying(false);
                    onNext();
                  }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };


  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-teal-50 via-cyn-50 to-teal-50 text-gray-800 overflow-hidden relative"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-indicator"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Slider Card Section with Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10">
          <AnimatePresence initial={false} mode="wait">
            {STORY_CARDS.map((item, i) =>
              i === index ? (
                <SlideCard
                  key={item.id}
                  data={item}
                  index={index}
                  carouselItems={STORY_CARDS}
                  onPrev={onPrev}
                  onNext={onNext}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  slideDirection={slideDirection}
                />
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative z-10 px-6  text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Final CTA Section */}
          <section className="relative z-10 px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-12 border border-green-200 relative overflow-hidden"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-teal-800 to-cyan-600 bg-clip-text text-transparent relative z-10"
                >
                  Begin Your Holistic Wellness Journey
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-12 max-w-3xl mx-auto relative z-10"
                >
                  Join thousands of practitioners who are transforming lives
                  through the perfect harmony of ancient wisdom and modern
                  nutrition science.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-6 justify-center relative z-10"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/create-own-chart")}
                    className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-colors text-white btn-enhanced shadow-floating"
                  >
                    Create Diet Chart
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 border-2 border-cyan-300 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:bg-teal-50 transition-colors text-gray-700 hover-lift glass-morphism"
                    onClick={() => navigate("/uprofile")}
                  >
                    View Profile
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>

        {/* Dynamic Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="">
            <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 overflow-hidden">
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <motion.span className="ml-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-600">
                  AharaSutra Ayurvedic Dashboard
                </motion.span>
              </div>

              {/* Dosha Types Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {DOSHA_TYPES.map((dosha, index) => (
                  <motion.div
                    key={dosha.name}
                    className="relative bg-white rounded-xl p-4 border border-teal-200 overflow-hidden cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onMouseEnter={() => setHoveredDosha(dosha.name)}
                    onMouseLeave={() => setHoveredDosha(null)}
                  >
                    {/* Background Image that covers entire container on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-45 bg-black"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: hoveredDosha === dosha.name ? 1.1 : 0.8,
                        opacity: hoveredDosha === dosha.name ? 1.0 : 0,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <img
                        src={dosha.image}
                        alt={`${dosha.name} background`}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </motion.div>
                    <div className="relative z-10 text-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-teal-200"
                        whileHover={{
                          scale: 1.2,

                          transition: { duration: 0.6 },
                        }}
                      >
                        <img
                          src={dosha.image}
                          alt={dosha.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.h3
                        className="font-semibold mb-2 text-sm sm:text-base md:text-lg"
                        animate={{
                          color:
                            hoveredDosha === dosha.name ? "#ffffff" : "#374151",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {dosha.name}
                      </motion.h3>
                      <motion.p
                        className="text-sm sm:text-base md:text-lg mb-2"
                        animate={{
                          color:
                            hoveredDosha === dosha.name ? "#ffffff" : "#4b5563",
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {dosha.description}
                      </motion.p>
                      <motion.div
                        className="text-xs sm:text-sm md:text-base"
                        animate={{
                          color:
                            hoveredDosha === dosha.name ? "#ffffff" : "#6b7280",
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {dosha.characteristics.join(" • ")}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ayurvedic Herbs Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-b from-teal-800 to-cyan-600 bg-clip-text text-transparent"
          >
            Sacred Herbs & Healing Plants
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-16 max-w-3xl mx-auto"
          >
            Discover the powerful healing properties of traditional Ayurvedic
            herbs, each carefully selected for their unique therapeutic
            benefits.
          </motion.p>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{
                  left: -(AYURVEDIC_HERBS.length - 1) * 288,
                  right: 0,
                }}
                dragElastic={0.1}
                onDragEnd={(event, info) => {
                  const threshold = 50;
                  if (info.offset.x > threshold && currentHerbIndex > 0) {
                    setCurrentHerbIndex(currentHerbIndex - 1);
                  } else if (
                    info.offset.x < -threshold &&
                    currentHerbIndex < AYURVEDIC_HERBS.length - 1
                  ) {
                    setCurrentHerbIndex(currentHerbIndex + 1);
                  }
                }}
                animate={{ x: -currentHerbIndex * 288 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {AYURVEDIC_HERBS.map((herb, index) => (
                  <div key={herb.name} className="flex-shrink-0 w-72 px-4">
                    <div className="feature-card flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-teal-200 transform-gpu">
                      <motion.div
                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-200 shadow-lg"
                        style={{ backgroundColor: herb.color + "20" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <img
                          src={herb.image}
                          alt={herb.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-800 mb-2 text-base">
                          {herb.name}
                        </h3>
                        <p className="text-base text-gray-600">
                          {herb.benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {AYURVEDIC_HERBS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHerbIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHerbIndex
                      ? "bg-teal-600 scale-125"
                      : "bg-teal-300 hover:bg-teal-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {AYURVEDIC_HERBS.map((herb, index) => (
              <motion.div
                key={herb.name}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  z: 50,
                }}
                className="feature-card flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-200 transform-gpu bg-white/60 backdrop-blur-sm"
              >
                <motion.div
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-200 shadow-lg"
                  style={{ backgroundColor: herb.color + "20" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base md:text-lg">
                    {herb.name}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    {herb.benefits}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Dynamic Features Section */}
      <section className="relative z-10 px-6 pt-20">
        <div className="max-w-7xl mx-auto">
          {FEATURES.map((feature, index) => {
            const isEven = index % 2 === 0;
            const layoutClass = isEven ? "lg:grid-flow-col-dense" : "";
            const contentClass = isEven ? "lg:col-start-2" : "";
            const imageClass = isEven ? "lg:col-start-1" : "";

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${layoutClass}`}
              >
                {/* Content Section */}
                <ParallaxLayer speed={0.8} className={contentClass}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative mb-16"
                  >
                    {/* Background decorative element */}
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-xl"></div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 bg-gradient-to-b from-teal-900 to-cyan-600 bg-clip-text text-transparent relative z-10"
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 relative z-10"
                    >
                      {feature.subtitle}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 relative z-10"
                    >
                      {feature.description}
                    </motion.p>

                    <div className="space-y-6 relative z-10">
                      {feature.features.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-4 rounded-xl hover:bg-teal-50/50 transition-colors"
                        >
                          <motion.div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: feature.accent }}
                            whileHover={{ scale: 1.5, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                          <span className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </ParallaxLayer>

                {/* Image Section */}
                <ParallaxLayer speed={0.6} className={imageClass}>
                  <Card3D className="relative ">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-teal-200 relative overflow-hidden"
                    >
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>

                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-80 object-cover rounded-2xl"
                        />
                      </motion.div>

                      <div className="mt-6 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: feature.accent }}
                            animate={{
                              scale: [1, 0.5, 1],
                              opacity: [0.3, 0.4, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium">
                            Interactive Demo
                          </span>
                        </div>
                        <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 bg-teal-100 px-3 py-1 rounded-full">
                          Ayurvedic Focus
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                </ParallaxLayer>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative z-10 px-6 pb-20 bg-gradient-to-br from-cyan-50/50 to-teal-50/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent"
          >
            Seamless Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-16 max-w-3xl mx-auto"
          >
            Connect with your favorite health and fitness apps to create a
            comprehensive wellness ecosystem.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {INTEGRATIONS.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  z: 50,
                }}
                className="text-center transform-gpu bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-200 hover:border-teal-300 transition-colors"
              >
                <motion.div
                  className="text-teal-600 mb-4 flex justify-center"
                  whileHover={{
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {integration.logo}
                </motion.div>
                <div className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  {integration.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Ayurvedic Statistics Section */}
      <section className="relative z-10 px-6  bg-gradient-to-r from-teal-50/50 to-cyan-50/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent"
          >
            Trusted by Ayurvedic Practitioners Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-16 max-w-3xl mx-auto"
          >
            Join thousands of holistic health practitioners who are transforming
            lives through the integration of ancient wisdom and modern nutrition
            science.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                }}
                className="text-center transform-gpu bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-200"
              >
                <motion.div className="text-5xl mb-4">{stat.icon}</motion.div>
                <motion.div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 counter"
                  data-target={
                    stat.value.includes("+") ? parseInt(stat.value) : stat.value
                  }
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent"
            >
              Voices of Healing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Hear from practitioners who are transforming lives through the
              integration of ancient wisdom and modern nutrition science.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card3D key={testimonial.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-teal-200 hover:border-teal-300 transition-colors transform-gpu relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>

                  <div className="flex items-center gap-6 mb-6 relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-full overflow-hidden border-4 border-teal-200"
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl">
                        {testimonial.name}
                      </div>
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium">
                        {testimonial.role}
                      </div>
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <motion.p
                    className="text-gray-700 italic text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.text}"
                  </motion.p>

                  {/* Quote decoration */}
                  <div className="absolute top-4 left-4 text-4xl text-teal-200 opacity-50">
                    "
                  </div>
                </motion.div>
              </Card3D>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Ayurvedic Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-teal-200 bg-gradient-to-r from-teal-50/50 to-cyan-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent"
              >
                AharaSutra
              </motion.div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                Empowering holistic health practitioners with the perfect
                harmony of ancient Ayurvedic wisdom and modern nutritional
                science for transformative patient outcomes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-800 text-sm sm:text-base md:text-lg">
                Ayurvedic Practices
              </h3>
              <div className="space-y-2 text-gray-600 text-xs sm:text-sm md:text-base">
                <div>Dosha Assessment</div>
                <div>Herbal Medicine</div>
                <div>Seasonal Eating</div>
                <div>Mind-Body Wellness</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-800 text-sm sm:text-base md:text-lg">
                Platform
              </h3>
              <div className="space-y-2 text-gray-600 text-xs sm:text-sm md:text-base">
                <div>Features</div>
                <div>Pricing</div>
                <div>Documentation</div>
                <div>API Integration</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-800 text-sm sm:text-base md:text-lg">
                Community
              </h3>
              <div className="space-y-2 text-gray-600 text-xs sm:text-sm md:text-base">
                <div>Practitioner Network</div>
                <div>Knowledge Base</div>
                <div>Support Center</div>
                <div>Wellness Blog</div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-teal-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-xs sm:text-sm md:text-base">
              © 2024 AharaSutra. Honoring ancient wisdom, embracing modern
              science.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-2 text-xs sm:text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
                Ayurveda
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-2 text-xs sm:text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
                Wellness
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-2 text-xs sm:text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
                Nutrition
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
