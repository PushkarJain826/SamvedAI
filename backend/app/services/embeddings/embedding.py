from sentence_transformers import SentenceTransformer


model = SentenceTransformer(
    "BAAI/bge-m3",
    device="cuda",
)


def generate_embedding(text: str) -> list[float]:
    embedding = model.encode(
        text,
        normalize_embeddings=True,
    )

    return embedding.tolist()
if __name__ == "__main__":
    text = "Farmers growing notified crops in a notified area are eligible for crop insurance."

    embedding = generate_embedding(text)

    print("Embedding dimensions:", len(embedding))
    print("First 5 values:", embedding[:5])