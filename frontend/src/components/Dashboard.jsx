import TopicRankings from "./TopicRankings"
import StudyPlanner from "./StudyPlanner"
import PracticeQuestions from "./PracticeQuestions"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const COLORS = ["#7c6fde","#5dcaa5","#ef9f27","#d85a30","#d4537e","#378add","#639922","#ba7517"]

export default function Dashboard({ data }) {
  const { analysis, papers } = data
  const topics = analysis?.topic_scores || []
  const chartData = topics.slice(0, 10).map(t => ({ name: t.topic, score: t.importance_score, freq: t.frequency }))

  const card = { background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 24, marginBottom: 24 }

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Papers analyzed", value: papers.length },
          { label: "Topics found", value: topics.length },
          { label: "Coverage gaps", value: analysis?.coverage_gaps?.length || 0 },
          { label: "Study weeks", value: analysis?.study_planner?.length || 0 },
        ].map(s => (
          <div key={s.label} style={{ ...card, marginBottom: 0, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#7c6fde" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Key insights */}
      {analysis?.key_insights?.length > 0 && (
        <div style={{ ...card, background: "#1a1f2e", borderColor: "#2a3a5a" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>💡 Key Insights</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {analysis.key_insights.map((ins, i) => (
              <div key={i} style={{ background: "#1e2840", border: "1px solid #2a3a5a", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#b5d4f4" }}>{ins}</div>
            ))}
          </div>
        </div>
      )}

      {/* Frequency chart */}
      <div style={card}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>📊 Topic Importance Scores</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
            <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 12 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "#888", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 8, color: "#e8e6de" }} />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Coverage gaps */}
      {analysis?.coverage_gaps?.length > 0 && (
        <div style={{ ...card, borderColor: "#5a3a2a" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>⚠️ Syllabus Coverage Gaps</h2>
          {analysis.coverage_gaps.map((g, i) => (
            <div key={i} style={{ padding: "10px 14px", background: "#2a1a10", borderRadius: 8, marginBottom: 8, fontSize: 14, color: "#f0997b" }}>{g}</div>
          ))}
        </div>
      )}

      <TopicRankings topics={topics} />
      <StudyPlanner planner={analysis?.study_planner || []} />
      <PracticeQuestions questions={analysis?.practice_questions || []} />
    </div>
  )
}