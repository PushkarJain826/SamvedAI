import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def build_evidence(results: list) -> str:
    evidence_parts = []

    for index, (chunk, score) in enumerate(results, start=1):
        evidence_parts.append(
            f"""
Evidence {index}
Scheme: {chunk.chunk_text.splitlines()[0].replace("Scheme: ", "")}
Section: {chunk.section}
Pages: {chunk.page_start} - {chunk.page_end}

{chunk.chunk_text}
"""
        )

    return "\n".join(evidence_parts)


def generate_answer(
    question: str,
    results: list,
) -> str:
    evidence = build_evidence(results)

    prompt = f"""
    You are SAMVEDAI, an AI assistant that answers questions about government
    documents using ONLY the provided evidence.

    Rules:

    1. Answer strictly from the evidence provided.
    2. Do not use outside knowledge.
    3. Do not make assumptions or infer facts that are not explicitly stated.
    4. If the evidence does not contain the answer, say:
       "The provided documents do not contain enough information to answer this."
    5. Prefer the most relevant evidence over less relevant evidence.
    6. Answer only what is necessary to directly answer the user's question.
        Do not add related information unless it is necessary to answer the question.
    7. Do not use information merely because it appears in the evidence.
        Each piece of information must directly support the user's question.
    8. When stating facts, cite the supporting section and page in this format:
       [Section: X | Pages: Y-Z]
    9. Keep the answer clear, concise, and factual.

    Evidence:
    {evidence}

    User Question:
    {question}
    """

    response = client.chat.completions.create(
        model="qwen/qwen3.6-27b",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        max_tokens=1000,
        reasoning_effort="none",
        reasoning_format="hidden",
    )

    return response.choices[0].message.content