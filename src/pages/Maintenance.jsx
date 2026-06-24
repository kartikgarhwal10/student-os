import { useEffect, useState } from "react";

function Gear({ size = 40, speed = 4, reverse = false, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{
        animation: `spin ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
      }}
    >
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.622 10.395l-1.097-.63a8.082 8.082 0 0 0 0-3.527l1.097-.63a.5.5 0 0 0 .183-.683l-1.5-2.598a.5.5 0 0 0-.683-.183l-1.097.63a8.06 8.06 0 0 0-3.052-1.762V.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1.512A8.06 8.06 0 0 0 6.425 3.774l-1.097-.63a.5.5 0 0 0-.683.183L3.145 5.925a.5.5 0 0 0 .183.683l1.097.63a8.082 8.082 0 0 0 0 3.527l-1.097.63a.5.5 0 0 0-.183.683l1.5 2.598a.5.5 0 0 0 .683.183l1.097-.63a8.06 8.06 0 0 0 3.052 1.762V17.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1.512a8.06 8.06 0 0 0 3.052-1.762l1.097.63a.5.5 0 0 0 .683-.183l1.5-2.598a.5.5 0 0 0-.183-.683Z"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = Math.floor(Math.random() * 25) + 60; // random 60–85%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-xs text-slate-400">
        <span>System Upgrade Progress</span>
        <span className="font-semibold text-blue-400">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StatusItem({ icon, label, status, color }) {
  const colors = {
    green: "text-emerald-400 bg-emerald-400/10",
    yellow: "text-amber-400 bg-amber-400/10",
    blue: "text-blue-400 bg-blue-400/10",
  };
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-4 py-3 text-sm">
      <div className="flex items-center gap-2 text-slate-300">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[color]}`}>
        {status}
      </span>
    </div>
  );
}

function FloatingParticle({ delay, duration, x, y, size }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(96,165,250,0.15)",
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

const particles = [
  { delay: 0, duration: 6, x: 10, y: 20, size: 6 },
  { delay: 1, duration: 8, x: 85, y: 15, size: 10 },
  { delay: 2, duration: 5, x: 70, y: 75, size: 7 },
  { delay: 0.5, duration: 7, x: 20, y: 80, size: 5 },
  { delay: 3, duration: 9, x: 50, y: 10, size: 8 },
  { delay: 1.5, duration: 6, x: 90, y: 60, size: 4 },
  { delay: 2.5, duration: 8, x: 5, y: 50, size: 9 },
  { delay: 0.8, duration: 7, x: 60, y: 90, size: 6 },
];

function Maintenance() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeInUp 0.7s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.55s; opacity: 0; }
        .fade-up-5 { animation-delay: 0.7s; opacity: 0; }
        .shimmer-text {
          background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 40%, #38bdf8 70%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .glass-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(96, 165, 250, 0.15);
        }
        .pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid rgba(96,165,250,0.4);
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .pulse-ring-2 {
          animation-delay: 0.66s;
        }
        .pulse-ring-3 {
          animation-delay: 1.33s;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* Main card */}
        <div
          className="glass-card"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "520px",
            borderRadius: "1.75rem",
            padding: "2.5rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(96,165,250,0.1)",
          }}
        >
          {/* Icon with pulse rings */}
          <div className="fade-up fade-up-1" style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <div className="pulse-ring" />
              <div className="pulse-ring pulse-ring-2" />
              <div className="pulse-ring pulse-ring-3" />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e3a5f 0%, #1e1b4b 100%)",
                  border: "2px solid rgba(96,165,250,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                🔧
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="fade-up fade-up-2" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#93c5fd",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.3rem 1rem",
                borderRadius: "9999px",
                marginBottom: "1rem",
              }}
            >
              🚧 Down for Maintenance
            </span>
            <h1
              className="shimmer-text"
              style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.2, margin: 0 }}
            >
              We'll Be Back Soon
            </h1>
          </div>

          {/* Subtitle */}
          <div className="fade-up fade-up-3">
            <p
              style={{
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginTop: "0.75rem",
                marginBottom: "1.75rem",
              }}
            >
              Student OS is currently undergoing scheduled maintenance to bring
              you a better experience. We're working hard to get everything back
              online{dots}
            </p>

            {/* Gears row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
              <Gear size={32} speed={5} />
              <Gear size={22} speed={3} reverse />
              <Gear size={36} speed={7} />
              <Gear size={24} speed={4} reverse />
              <Gear size={30} speed={6} />
            </div>
          </div>

          {/* Progress */}
          <div className="fade-up fade-up-4" style={{ marginBottom: "1.5rem" }}>
            <ProgressBar />
          </div>

          {/* Status items */}
          <div className="fade-up fade-up-5" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
            <StatusItem icon="🗄️" label="Database"        status="Migrating"  color="yellow" />
            <StatusItem icon="⚙️" label="API Services"    status="Restarting" color="blue"   />
            <StatusItem icon="🔒" label="Auth System"     status="Online"     color="green"  />
            <StatusItem icon="🎨" label="UI / Frontend"   status="Deploying"  color="yellow" />
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              borderTop: "1px solid rgba(96,165,250,0.1)",
              paddingTop: "1.25rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.18)",
                color: "#93c5fd",
                fontSize: "0.8rem",
                fontWeight: 500,
                padding: "0.4rem 1.1rem",
                borderRadius: "9999px",
              }}
            >
              🚀 Built by KartikLabs
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maintenance;