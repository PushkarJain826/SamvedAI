from app.db.database import SessionLocal
from app.services.retrieval.hybrid import retrieve_hybrid_chunks
from app.services.llm.generation import generate_answer


questions = [
    "What risks are covered under PMFBY and what is the premium rate "
    "for Kharif Food & Oilseeds crops?"
]


db = SessionLocal()

try:
    for question in questions:
        print("=" * 80)
        print("Question:", question)

        results = retrieve_hybrid_chunks(
            db=db,
            question=question,
            limit=15,
            rerank_limit=5,
        )

        print("Evidence found:", len(results))
        for chunk, score in results:
            print(
                "Chunk:",
                chunk.chunk_index,
                "| Score:",
                score,
                "| Section:",
                chunk.section,
                "| Pages:",
                chunk.page_start,
                "-",
                chunk.page_end,
            )

        if results:
            chunk, score = results[0]

            print("Top chunk:", chunk.chunk_index)
            print("Reranker score:", score)
            print("Section:", chunk.section)
            print("Pages:", chunk.page_start, "-", chunk.page_end)

        answer = generate_answer(
            question=question,
            results=results,
        )

        print("Answer:")
        print(answer)

finally:
    db.close()