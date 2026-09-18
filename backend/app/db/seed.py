from app.db.database import SessionLocal
from app.models.language import Language
from app.models.authority import Authority
from app.models.document_type import DocumentType
from app.models.topic import Topic


db = SessionLocal()

try:
    language = Language(
        code="en",
        name="English",
        native_name="English",
    )

    authority = Authority(
        name="Ministry of Agriculture and Farmers Welfare",
        code="MOAFW",
        level="central",
    )

    document_type = DocumentType(
        name="Scheme Guidelines",
        code="SCHEME_GUIDELINES",
    )

    topic = Topic(
        name="Crop Insurance",
        code="CROP_INSURANCE",
    )

    db.add_all([
        language,
        authority,
        document_type,
        topic,
    ])

    db.commit()

    print("Seed data inserted.")

except Exception:
    db.rollback()
    raise

finally:
    db.close()