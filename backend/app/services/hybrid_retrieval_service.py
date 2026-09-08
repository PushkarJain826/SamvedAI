from sqlalchemy.orm import Session

from app.services.retrieval_service import retrieve_chunks
from app.services.lexical_retrieval_service import retrieve_lexical_chunks
from app.services.reranker_service import rerank_chunks


def retrieve_hybrid_chunks(
    db: Session,
    question: str,
    limit: int = 15,
    rerank_limit: int = 5,
):
    semantic_results = retrieve_chunks(
        db=db,
        question=question,
        limit=limit,
    )

    lexical_results = retrieve_lexical_chunks(
        db=db,
        question=question,
        limit=limit,
    )

    candidates = {}

    for chunk, score in semantic_results:
        candidates[chunk.id] = chunk

    for chunk, score in lexical_results:
        candidates[chunk.id] = chunk

    candidate_results = [
        (chunk, None)
        for chunk in candidates.values()
    ]

    reranked_results = rerank_chunks(
        question=question,
        results=candidate_results,
        limit=rerank_limit,
    )

    return reranked_results