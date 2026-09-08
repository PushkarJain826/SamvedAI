from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk
from app.services.embedding_service import generate_embedding


def retrieve_chunks(
    db: Session,
    question: str,
    limit: int = 5,
):
    question_embedding = generate_embedding(question)

    distance = DocumentChunk.embedding.cosine_distance(
        question_embedding
    )

    statement = (
        select(DocumentChunk)
        .where(DocumentChunk.embedding.is_not(None))
        .order_by(distance)
        .limit(limit)
    )

    results = db.execute(statement).scalars().all()

    return results
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk
from app.services.embedding_service import generate_embedding


def retrieve_chunks(
    db: Session,
    question: str,
    limit: int = 5,
):
    question_embedding = generate_embedding(question)

    distance = DocumentChunk.embedding.cosine_distance(
        question_embedding
    )

    statement = (
        select(DocumentChunk, distance.label("distance"))
        .where(DocumentChunk.embedding.is_not(None))
        .order_by(distance)
        .limit(limit)
    )

    results = db.execute(statement).all()

    return results
