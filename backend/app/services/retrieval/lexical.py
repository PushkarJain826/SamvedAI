from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


def retrieve_lexical_chunks(
    db: Session,
    question: str,
    limit: int = 15,
):
    search_vector = func.to_tsvector(
        "simple",
        DocumentChunk.chunk_text,
    )

    stopwords = {
        "what",
        "is",
        "are",
        "the",
        "a",
        "an",
        "of",
        "under",
        "in",
        "on",
        "for",
        "to",
        "and",
        "or",
        "how",
        "which",
        "can",
        "does",
    }

    words = question.split()

    keywords = " OR ".join(
        word
        for word in words
        if word.lower() not in stopwords
    )

    search_query = func.websearch_to_tsquery(
        "simple",
        keywords,
    )

    rank = func.ts_rank_cd(
        search_vector,
        search_query,
    )

    statement = (
        select(DocumentChunk, rank.label("rank"))
        .where(
            search_vector.op("@@")(search_query)
        )
        .order_by(rank.desc())
        .limit(limit)
    )

    return db.execute(statement).all()