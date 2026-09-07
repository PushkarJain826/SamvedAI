from app.services.pdf_service import extract_pdf_pages
from app.services.text_cleaner import clean_pages


pdf_path = "data/pmfby.pdf"

pages = extract_pdf_pages(pdf_path)
cleaned_pages = clean_pages(pages)

for page in cleaned_pages[:3]:
    print(f"\n--- PAGE {page['page_number']} ---")
    print(page["text"])