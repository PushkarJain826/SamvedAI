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

    search_query = func.plainto_tsquery(
        "simple",
        question,
    )

    rank = func.ts_rank_cd(
        search_vector,
        search_query,
    )

    statement = (
        select(DocumentChunk, rank.label("rank"))
        .where(rank > 0)
        .order_by(rank.desc())
        .limit(limit)
    )

    return db.execute(statement).all()