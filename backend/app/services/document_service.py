from sqlalchemy.orm import Session

from app.models.document import Document


def create_document(
    db: Session,
    title: str,
    authority_id: int,
    language_id: int,
    document_type_id: int,
    topic_id: int,
    source_url: str,
    state_id: int | None = None,
    district_id: int | None = None,
    version: str | None = None,
):
    document = Document(
        title=title,
        authority_id=authority_id,
        language_id=language_id,
        document_type_id=document_type_id,
        topic_id=topic_id,
        source_url=source_url,
        state_id=state_id,
        district_id=district_id,
        version=version,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document