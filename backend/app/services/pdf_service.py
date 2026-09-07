import pymupdf


def extract_pdf_pages(pdf_path: str) -> list[dict]:
    document = pymupdf.open(pdf_path)

    pages = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text("text")

        pages.append({
            "page_number": page_number,
            "text": text,
        })

    document.close()

    return pages

if __name__ == "__main__":
    pdf_path = "data/pmfby.pdf"

    pages = extract_pdf_pages(pdf_path)

    for page in pages:
        print(f"\n========== PAGE {page['page_number']} ==========")

        lines = page["text"].splitlines()

        for line in lines[:15]:
            print(repr(line))