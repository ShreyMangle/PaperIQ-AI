from groq import Groq
import json
import re
import os
from dotenv import load_dotenv
import time

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

EXTRACT_PROMPT = """You are an expert exam paper analyzer.
Analyze this past exam paper and extract structured information.

Return ONLY valid JSON, no markdown, no explanation:
{
  "year": "2023",
  "subject": "Mathematics",
  "topics": [
    {"name": "Calculus", "questions": [1,3,7], "marks": 25, "difficulty": "hard"},
    {"name": "Algebra", "questions": [2,4], "marks": 15, "difficulty": "medium"}
  ],
  "question_types": {"MCQ": 10, "long_answer": 5, "short_answer": 8},
  "total_marks": 100
}"""

ANALYSIS_PROMPT = """You are an expert exam strategist. Analyze topic frequency data from multiple past papers.

Topic data: {topic_data}
Syllabus: {syllabus}

Return ONLY valid JSON, no markdown:
{{
  "topic_scores": [
    {{"topic": "Calculus", "frequency": 8, "avg_marks": 22, "importance_score": 95, "trend": "increasing", "coverage": "high"}}
  ],
  "coverage_gaps": ["Topic X is in syllabus but never appeared"],
  "study_planner": [
    {{"week": 1, "topics": ["Calculus"], "hours": 10, "priority": "critical", "reason": "Appears in 90% of papers"}}
  ],
  "practice_questions": [
    {{"topic": "Calculus", "question": "Find the derivative of x³ + 2x²", "difficulty": "medium", "marks": 5}}
  ],
  "key_insights": ["Calculus has appeared every year since 2018"]
}}"""


def _generate(prompt: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # updated model
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=4000
    )
    return response.choices[0].message.content


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    import fitz
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    return "".join(page.get_text() for page in doc)


def analyze_single_paper(file_bytes: bytes, filename: str, year: str) -> dict:
    time.sleep(3)
    is_pdf = filename.lower().endswith(".pdf")

    if is_pdf:
        text = extract_text_from_pdf(file_bytes)
        if len(text.strip()) > 100:
            paper_content = text[:6000]
        else:
            paper_content = "Scanned PDF - limited text extracted"
    else:
        paper_content = "Image file - please use PDF for best results"

    prompt = f"{EXTRACT_PROMPT}\n\nYear hint: {year}\n\nPaper content:\n{paper_content}"
    response_text = _generate(prompt)

    raw = re.sub(r"```json|```", "", response_text).strip()
    result = json.loads(raw)
    result["year"] = year or result.get("year", "Unknown")
    return result


def generate_full_analysis(all_paper_data: list, syllabus: str) -> dict:
    topic_map = {}
    for paper in all_paper_data:
        for topic in paper.get("topics", []):
            name = topic["name"]
            if name not in topic_map:
                topic_map[name] = {"count": 0, "total_marks": 0, "years": []}
            topic_map[name]["count"] += 1
            topic_map[name]["total_marks"] += topic.get("marks", 0)
            topic_map[name]["years"].append(paper.get("year", "?"))

    prompt = ANALYSIS_PROMPT.format(
        topic_data=json.dumps(topic_map),
        syllabus=syllabus or "Not provided — infer from paper topics"
    )
    raw = re.sub(r"```json|```", "", _generate(prompt)).strip()
    return json.loads(raw)