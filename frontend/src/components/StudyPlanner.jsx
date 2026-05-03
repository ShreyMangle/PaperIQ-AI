const PRI_COLOR = { critical: "#d85a30", high: "#ef9f27", medium: "#7c6fde", low: "#5dcaa5" }

export default function StudyPlanner({ planner }) {
  return (
    <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>📅 Smart Study Planner</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {planner.map((week, i) => (
          <div key={i} style={{ background: "#0f0f13", borderRadius: 10, padding: 18, border: `1px solid ${PRI_COLOR[week.priority] || "#2a2a38"}33` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Week {week.week}</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${PRI_COLOR[week.priority] || "#2a2a38"}22`, color: PRI_COLOR[week.priority] || "#888", textTransform: "capitalize" }}>{week.priority}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {(week.topics || []).map((t, j) => <span key={j} style={{ fontSize: 12, background: "#1e1e2e", padding: "3px 10px", borderRadius: 20, color: "#b5d4f4" }}>{t}</span>)}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>⏱ {week.hours}h recommended</div>
            <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{week.reason}</div>
          </div>
        ))}
      </div>
    </div>
  )
}