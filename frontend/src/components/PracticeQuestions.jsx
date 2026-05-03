import { useState } from "react"
const DIFF_COLOR = { easy: "#5dcaa5", medium: "#ef9f27", hard: "#d85a30" }

export default function PracticeQuestions({ questions }) {
  const [filter, setFilter] = useState("all")
  const filtered = filter === "all" ? questions : questions.filter(q => q.difficulty === filter)

  return (
    <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>📝 Practice Questions</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {["all","easy","medium","hard"].map(d => (
            <button key={d} onClick={() => setFilter(d)} style={{ background: filter === d ? "#7c6fde" : "#2a2a38", border: "none", color: "#e8e6de", padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, textTransform: "capitalize" }}>{d}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((q, i) => (
          <div key={i} style={{ background: "#0f0f13", borderRadius: 10, padding: 16, border: "1px solid #2a2a38" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 20, background: `${DIFF_COLOR[q.difficulty] || "#888"}22`, color: DIFF_COLOR[q.difficulty] || "#888" }}>{q.difficulty}</span>
              <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 20, background: "#1e1e2e", color: "#b5d4f4" }}>{q.topic}</span>
              <span style={{ fontSize: 12, color: "#666", marginLeft: "auto" }}>{q.marks} marks</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>{q.question}</p>
          </div>
        ))}
      </div>
    </div>
  )
}