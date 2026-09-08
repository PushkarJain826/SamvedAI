from app.db.database import SessionLocal
from app.services.lexical_retrieval_service import retrieve_lexical_chunks


db = SessionLocal()

try:
    question = "PMFBY"

    results = retrieve_lexical_chunks(
        db=db,
        question=question,
        limit=15,
    )

    for chunk, rank in results:
        print("=" * 80)
        print("Chunk:", chunk.chunk_index)
        print("Lexical score:", rank)
        print("Pages:", chunk.page_start, "-", chunk.page_end)
        print("Section:", chunk.section)
        print(chunk.chunk_text)

finally:
    db.close()