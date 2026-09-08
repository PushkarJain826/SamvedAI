from sentence_transformers import CrossEncoder

model = CrossEncoder("BAAI/bge-reranker-v2-m3")


def rerank_chunks(
    question: str,
    results: list,
    limit: int = 5,
):
    pairs = [
        (question, chunk.chunk_text)
        for chunk, _ in results
    ]

    scores = model.predict(pairs)

    reranked = []

    for (chunk, _), score in zip(results, scores):
        reranked.append((chunk, float(score)))

    reranked.sort(
        key=lambda item: item[1],
        reverse=True,
    )

    return reranked[:limit]