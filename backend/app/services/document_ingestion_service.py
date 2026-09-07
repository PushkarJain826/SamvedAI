from app.db.database import SessionLocal
from app.services.pdf_service import extract_pdf_pages
from app.services.text_cleaner import clean_pages
from app.services.chunker import pages_to_blocks, create_chunks
from app.services.embedding_service import generate_embedding
from app.services.document_storage_service import save_chunks
from app.services.document_service import create_document


def ingest_document(
    pdf_path: str,
    title: str,
    authority_id: int,
    language_id: int,
    document_type_id: int,
    topic_id: int,
    source_url: str,
):
    db = SessionLocal()

    try:
        # Create document record
        document = create_document(
            db=db,
            title=title,
            authority_id=authority_id,
            language_id=language_id,
            document_type_id=document_type_id,
            topic_id=topic_id,
            source_url=source_url,
        )

        # Extract and clean pages
        pages = extract_pdf_pages(pdf_path)
        pages = clean_pages(pages)

        # Create chunks
        blocks = pages_to_blocks(pages)
        chunks = create_chunks(blocks)

        # Generate embeddings
        for chunk in chunks:
            chunk["embedding"] = generate_embedding(
                chunk["chunk_text"]
            )

        # Store chunks
        save_chunks(
            db=db,
            document_id=document.id,
            chunks=chunks,
        )

        print("Document ID:", document.id)
        print("Chunks stored:", len(chunks))

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    ingest_document(
        pdf_path="data/pmfby.pdf",
        title="Pradhan Mantri Fasal Bima Yojana",
        authority_id=1,
        language_id=1,
        document_type_id=1,
        topic_id=1,
        source_url="https://pmfby.gov.in/pdf/New%20Schemes-english_.pdf",
    )