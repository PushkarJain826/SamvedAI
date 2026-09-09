from fastapi import APIRouter
from pydantic import BaseModel

from app.db.database import SessionLocal
from app.services.retrieval.hybrid import retrieve_hybrid_chunks
from app.services.llm.generation import generate_answer


router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):
    db = SessionLocal()

    try:
        results = retrieve_hybrid_chunks(
            db=db,
            question=request.message,
            limit=15,
            rerank_limit=5,
        )

        answer = generate_answer(
            question=request.message,
            results=results,
        )

        sources = []

        for chunk, score in results:
            sources.append({
                "chunk_id": chunk.id,
                "document_id": chunk.document_id,
                "section": chunk.section,
                "page_start": chunk.page_start,
                "page_end": chunk.page_end,
                "relevance_score": score,
            })

        return {
            "message": answer,
            "sources": sources,
        }

    finally:
        db.close()
