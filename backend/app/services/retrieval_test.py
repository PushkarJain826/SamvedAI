from app.db.database import SessionLocal
from app.services.retrieval_service import retrieve_chunks
from app.services.reranker_service import rerank_chunks


db = SessionLocal()

try:
    question = "What crops are covered under PMFBY?"

    results = retrieve_chunks(
        db=db,
        question=question,
        limit=15,
    )

    reranked_results = rerank_chunks(
        question=question,
        results=results,
        limit=5,
    )

    for chunk, score in reranked_results:
        print("=" * 80)
        print("Chunk:", chunk.chunk_index)
        print("Reranker score:", score)
        print("Pages:", chunk.page_start, "-", chunk.page_end)
        print("Section:", chunk.section)
        print(chunk.chunk_text)

finally:
    db.close()