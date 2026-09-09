from app.db.database import SessionLocal
from app.services.retrieval.lexical import retrieve_lexical_chunks


db = SessionLocal()

try:
    question = "What crops are covered under PMFBY?"

    results = retrieve_lexical_chunks(
        db=db,
        question=question,
        limit=15,
    )

    print("Results found:", len(results))

    for chunk, rank in results:
        print("=" * 80)
        print("Chunk:", chunk.chunk_index)
        print("Lexical score:", rank)
        print("Pages:", chunk.page_start, "-", chunk.page_end)
        print("Section:", chunk.section)
        print(chunk.chunk_text)

finally:
    db.close()