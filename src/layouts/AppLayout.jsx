import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import image3 from "../assets/image3.png"; // import leaf image

export default function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    // For home page, use minimal layout without background styling
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="app-layout min-h-screen relative">
      <style>{`
        /* wrapper */
        .bg-visual-wrap { position:relative; width:100%; min-height:100vh; overflow:hidden; }

        /* background layer (absolute, behind content) */
        .bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* overlay: semi-opaque black tint (50%) above bg-layer, under content */
        .bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: rgba(0,0,0,0.5);
          pointer-events: none;
        }

        .bg-leaf {
          position: absolute;
          object-fit: cover;
          pointer-events: none;
          will-change: transform, opacity;
          opacity: .6;
          filter: drop-shadow(0 8px 20px rgba(0,0,0,.25));
        }

        /* subtle floating animation for leaves */
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: .9; }
          50% { transform: translateY(-24px) rotate(8deg) scale(1.02); opacity: .7; }
          100% { transform: translateY(0) rotate(0deg) scale(1); opacity: .9; }
        }

        @media (max-width:1100px) {
          .bg-leaf { opacity:0.18; }
        }

        /* content layer sits above background */
        .content-layer { position: relative; z-index: 10; min-height:100vh; display:flex; flex-direction:column; }
        main { flex: 1 1 auto; }
      `}</style>

      <div className="bg-visual-wrap">
        {/* background layer with animated leaves (aria-hidden) */}
        <div className="bg-layer" aria-hidden>
          {Array.from({ length: 15 }).map((_, i) => {
            const seed = (i * 37) % 100;
            const left = `${((seed * 1.7) % 120) - 10}%`;
            const top = `${((seed * 3 + i * 11) % 120) - 10}%`;
            const scale = 0.25 + (i % 6) / 5; // smaller variation
            const rot = (i * 47) % 360;
            const dur = 10 + (i % 8) * 1.5;
            const delay = (i % 6) * 0.4;
            const opacity = 0.06 + (i % 6) * 0.09;
            return (
              <img
                key={`leaf-${i}`}
                src={image3}
                alt=""
                className="bg-leaf"
                style={{
                  left,
                  top,
                  width: `${Math.round(scale * 60)}%`,
                  transform: `rotate(${rot}deg)`,
                  animation: `float ${dur}s ease-in-out ${delay}s infinite`,
                  opacity,
                }}
              />
            );
          })}
        </div>

        {/* semi-opaque black overlay above leaves */}
        <div className="bg-overlay" aria-hidden />

        {/* content above background */}
        <div className="content-layer">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
