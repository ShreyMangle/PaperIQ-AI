import { useState } from "react"

export default function UploadZone({ onAnalyze, loading, error }) {
  const [files, setFiles] = useState([])
  const [years, setYears] = useState("")
  const [syllabus, setSyllabus] = useState("")

  const submit = () => {
    if (!files.length) return
    const fd = new FormData()
    files.forEach(f => fd.append("files", f))
    fd.append("years", years)
    fd.append("syllabus", syllabus)
    onAnalyze(fd)
  }

  const card = { background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 24 }
  const input = { width: "100%", background: "#0f0f13", border: "1px solid #2a2a38", borderRadius: 8, color: "#e8e6de", padding: "10px 14px", fontSize: 14, boxSizing: "border-box" }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Analyze Past Papers</h1>
      <p style={{ color: "#888", marginBottom: 32 }}>Upload multiple years of exam papers — get topic frequency, importance scores, and a smart study plan.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Upload Papers (PDF / Image)</h2>
          <label style={{ display: "block", border: "2px dashed #3a3a50", borderRadius: 10, padding: 32, textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); setFiles(prev => [...prev, ...e.dataTransfer.files]) }}>
            <input type="file" multiple accept=".pdf,image/*" style={{ display: "none" }}
              onChange={e => setFiles(prev => [...prev, ...e.target.files])} />
            <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
            <div style={{ color: "#aaa", fontSize: 14 }}>Click or drag files here</div>
            <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>PDF, PNG, JPG supported</div>
          </label>
          {files.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {Array.from(files).map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #2a2a38", fontSize: 13 }}>
                  <span>📄</span><span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#888", cursor: "pointer" }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={card}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Years (optional)</h2>
            <input style={input} placeholder="e.g. 2022, 2023, 2024" value={years} onChange={e => setYears(e.target.value)} />
            <p style={{ color: "#666", fontSize: 12, marginTop: 8 }}>Comma-separated, matches file order</p>
          </div>
          <div style={{ ...card, flex: 1 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Syllabus (optional)</h2>
            <textarea style={{ ...input, height: 120, resize: "vertical" }} placeholder="Paste syllabus topics here for gap analysis..." value={syllabus} onChange={e => setSyllabus(e.target.value)} />
          </div>
        </div>
      </div>

      {error && <div style={{ background: "#3a1a1a", border: "1px solid #7a3030", borderRadius: 8, padding: 12, marginBottom: 16, color: "#f09595", fontSize: 14 }}>{error}</div>}

      <button onClick={submit} disabled={loading || !files.length} style={{ background: loading ? "#3a3a50" : "linear-gradient(135deg,#7c6fde,#5dcaa5)", border: "none", color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", width: "100%" }}>
        {loading ? "⏳ Analyzing with AI... (may take 30–60s)" : `🚀 Analyze ${files.length || ""} Paper${files.length !== 1 ? "s" : ""}`}
      </button>
    </div>
  )
}