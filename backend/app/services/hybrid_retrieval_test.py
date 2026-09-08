from app.db.database import SessionLocal
from app.services.hybrid_retrieval_service import retrieve_hybrid_chunks


db = SessionLocal()

try:
    question = "What crops are covered under PMFBY?"

    results = retrieve_hybrid_chunks(
        db=db,
        question=question,
        limit=15,
        rerank_limit=5,
    )

    print("Results found:", len(results))

    for chunk, score in results:
        print("=" * 80)
        print("Chunk:", chunk.chunk_index)
        print("Reranker score:", score)
        print("Pages:", chunk.page_start, "-", chunk.page_end)
        print("Section:", chunk.section)
        print("Scheme:", chunk.chunk_text.splitlines()[0])
        print(chunk.chunk_text)

finally:
    db.close()