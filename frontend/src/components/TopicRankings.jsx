export default function TopicRankings({ topics }) {
  const priorityColor = { increasing: "#5dcaa5", stable: "#ef9f27", decreasing: "#d85a30" }
  return (
    <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>🏆 Topic Rankings</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {topics.sort((a,b) => b.importance_score - a.importance_score).map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#0f0f13", borderRadius: 10, border: "1px solid #2a2a38" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: i < 3 ? "#7c6fde22" : "#2a2a38", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: i < 3 ? "#7c6fde" : "#666", fontSize: 14, flexShrink: 0 }}>#{i+1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{t.topic}</div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888" }}>
                <span>Frequency: <b style={{ color: "#e8e6de" }}>{t.frequency}x</b></span>
                <span>Avg marks: <b style={{ color: "#e8e6de" }}>{t.avg_marks}</b></span>
                <span style={{ color: priorityColor[t.trend] || "#888" }}>▲ {t.trend}</span>
              </div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.importance_score > 80 ? "#5dcaa5" : t.importance_score > 60 ? "#ef9f27" : "#888" }}>{t.importance_score}</div>
              <div style={{ fontSize: 11, color: "#666" }}>score</div>
            </div>
            <div style={{ width: 80, height: 6, background: "#2a2a38", borderRadius: 3, flexShrink: 0 }}>
              <div style={{ width: `${t.importance_score}%`, height: "100%", background: t.importance_score > 80 ? "#5dcaa5" : "#7c6fde", borderRadius: 3 }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}