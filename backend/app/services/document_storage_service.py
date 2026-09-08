from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


def save_chunks(
    db: Session,
    document_id: int,
    chunks: list[dict],
):
    for chunk in chunks:
        document_chunk = DocumentChunk(
            document_id=document_id,
            chunk_text=chunk["chunk_text"],
            chunk_index=chunk["chunk_index"],
            page_start=chunk["page_start"],
            page_end=chunk["page_end"],
            section=chunk["section"],
            embedding=chunk["embedding"],
        )

        db.add(document_chunk)