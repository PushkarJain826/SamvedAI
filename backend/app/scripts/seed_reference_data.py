from app.db.database import SessionLocal
from app.models.language import Language
from app.models.authority import Authority
from app.models.document_type import DocumentType
from app.models.topic import Topic


db = SessionLocal()

try:
    # Get existing language by code or create it
    language = db.query(Language).filter_by(code="en").first()

    if language is None:
        language = Language(
            code="en",
            name="English",
            native_name="English",
        )
        db.add(language)

    # Get existing authority by code or name
    authority = (
        db.query(Authority)
        .filter(
            (Authority.code == "GOI")
            | (Authority.name == "Government of India")
        )
        .first()
    )

    if authority is None:
        authority = Authority(
            name="Government of India",
            code="GOI",
            level="central",
        )
        db.add(authority)

    # Get existing document type by code or name
    document_type = (
        db.query(DocumentType)
        .filter(
            (DocumentType.code == "scheme")
            | (DocumentType.name == "Government Scheme Document")
        )
        .first()
    )

    if document_type is None:
        document_type = DocumentType(
            name="Government Scheme Document",
            code="scheme",
        )
        db.add(document_type)

    # Get existing topic by code or name
    topic = (
        db.query(Topic)
        .filter(
            (Topic.code == "crop-insurance")
            | (Topic.name == "Crop Insurance")
        )
        .first()
    )

    if topic is None:
        topic = Topic(
            name="Crop Insurance",
            code="crop-insurance",
        )
        db.add(topic)

    db.commit()

    print("Reference data is ready.")

except Exception:
    db.rollback()
    raise

finally:
    db.close()