from app.services.pdf_service import extract_pdf_pages
from app.services.text_cleaner import clean_pages
from app.services.chunker import pages_to_blocks, create_chunks
from app.services.embedding_service import generate_embedding


pdf_path = "data/pmfby.pdf"

pages = extract_pdf_pages(pdf_path)
pages = clean_pages(pages)

blocks = pages_to_blocks(pages)
chunks = create_chunks(blocks)

for chunk in chunks[:3]:
    embedding = generate_embedding(chunk["chunk_text"])

    print("=" * 80)
    print("Chunk:", chunk["chunk_index"])
    print("Pages:", chunk["page_start"], "-", chunk["page_end"])
    print("Embedding dimensions:", len(embedding))
    print("First 5 values:", embedding[:5])