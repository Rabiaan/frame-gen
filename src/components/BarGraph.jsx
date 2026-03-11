import React, { useEffect, useState } from "react";

const data = [
  { label: "Jan", value: 42, color: "#FF3D57" },
  { label: "Feb", value: 68, color: "#FF6B35" },
  { label: "Mar", value: 55, color: "#FFB830" },
  { label: "Apr", value: 81, color: "#00E676" },
  { label: "May", value: 73, color: "#00BCD4" },
  { label: "Jun", value: 90, color: "#AA00FF" },
  { label: "Jul", value: 62, color: "#FF3D57" },
  { label: "Aug", value: 77, color: "#FF6B35" },
  { label: "Sep", value: 95, color: "#FFB830" },
  { label: "Oct", value: 50, color: "#00E676" },
  { label: "Nov", value: 84, color: "#00BCD4" },
  { label: "Dec", value: 70, color: "#AA00FF" },
];

const maxValue = Math.max(...data.map((d) => d.value));
const gridLines = [0, 25, 50, 75, 100];

export default function BarGraph() {
  const [heights, setHeights] = useState(data.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [key, setKey] = useState(0);

  const triggerAnimation = () => {
    setHeights(data.map(() => 0));
    setKey((k) => k + 1);
    data.forEach((_, i) => {
      setTimeout(() => {
        setHeights((prev) => {
          const next = [...prev];
          next[i] = data[i].value;
          return next;
        });
      }, 100 + i * 90);
    });
  };

  useEffect(() => {
    triggerAnimation();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 860 }}>

        {/* Chart container */}
        <div style={{
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 6,
          padding: "36px 28px 20px 44px",
          position: "relative",
        }}>

          {/* Y-axis labels + grid */}
          <div style={{ position: "absolute", top: 36, left: 0, right: 28, bottom: 56, pointerEvents: "none" }}>
            {gridLines.map((line) => (
              <div key={line} style={{
                position: "absolute",
                bottom: `${(line / maxValue) * 100}%`,
                left: 28,
                right: 0,
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{ position: "absolute", left: -28, fontSize: 9, color: "#3a3a4a", letterSpacing: "0.08em", transform: "translateY(50%)" }}>{line}</span>
                <div style={{ flex: 1, borderTop: line === 0 ? "1px solid rgba(255,255,255,0.12)" : "1px dashed rgba(255,255,255,0.04)" }} />
              </div>
            ))}
          </div>

          {/* Bars row */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            height: 300,
            gap: 8,
            position: "relative",
            zIndex: 1,
          }}>
            {data.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const heightPct = (heights[i] / maxValue) * 100;
              return (
                <div
                  key={item.label}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", cursor: "crosshair" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Value tooltip */}
                  <div style={{
                    marginBottom: 6,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.9)",
                    transition: "all 0.18s cubic-bezier(0.16,1,0.3,1)",
                    background: item.color,
                    color: "#000",
                    fontSize: 9,
                    fontWeight: 900,
                    padding: "3px 7px",
                    borderRadius: 3,
                    letterSpacing: "0.08em",
                  }}>
                    {item.value}
                  </div>

                  {/* Bar */}
                  <div style={{
                    width: "100%",
                    height: `${heightPct}%`,
                    background: isHovered
                      ? `linear-gradient(to top, ${item.color}, ${item.color}bb)`
                      : `linear-gradient(to top, ${item.color}88, ${item.color}44)`,
                    borderRadius: "3px 3px 0 0",
                    transition: `height 0.65s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease`,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isHovered ? `0 0 20px ${item.color}55` : "none",
                  }}>
                    {/* Inner shine */}
                    <div style={{
                      position: "absolute", top: 0, left: "20%", width: "30%", bottom: 0,
                      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
                    }} />
                    {/* Top cap */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: item.color,
                      opacity: isHovered ? 1 : 0.5,
                      transition: "opacity 0.2s",
                    }} />
                  </div>

                  {/* X label */}
                  <div style={{
                    marginTop: 10,
                    fontSize: 9,
                    color: isHovered ? item.color : "#404055",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#2a2a3a", letterSpacing: "0.22em", textTransform: "uppercase" }}>Unit · Percentage (%)</span>
          <button
            onClick={triggerAnimation}
            style={{
              background: "transparent",
              border: "1px solid #222",
              color: "#444",
              padding: "7px 18px",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 3,
              transition: "all 0.2s",
              fontFamily: "'Courier New', monospace",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#FF3D57"; e.target.style.color = "#FF3D57"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#222"; e.target.style.color = "#444"; }}
          >
            ↺ Replay
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
