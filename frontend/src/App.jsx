import { useState } from "react"
import UploadZone from "./components/UploadZone"
import Dashboard from "./components/Dashboard"

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async (formData) => {
  if (loading) return  // prevent double call
  setLoading(true)
  setError("")
  try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResult(data)
  } catch (e) {
      setError(e.message)
  } finally {
      setLoading(false)
  }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", color: "#e8e6de", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ background: "#1a1a24", borderBottom: "1px solid #2a2a38", padding: "16px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7c6fde,#5dcaa5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>P</div>
        <span style={{ fontSize: 20, fontWeight: 600 }}>PaperIQ</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#888", background: "#2a2a38", padding: "4px 10px", borderRadius: 20 }}>AI-Powered Exam Analyzer</span>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {!result ? (
          <UploadZone onAnalyze={handleAnalyze} loading={loading} error={error} />
        ) : (
          <>
            <button onClick={() => setResult(null)} style={{ marginBottom: 24, background: "#2a2a38", border: "none", color: "#e8e6de", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>
              ← Analyze new papers
            </button>
            <Dashboard data={result} />
          </>
        )}
      </main>
    </div>
  )
}