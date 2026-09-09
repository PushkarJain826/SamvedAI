import re


def clean_page_text(text: str) -> str:
    # Remove standalone page numbers
    text = re.sub(r"(?m)^\s*\d+\s*$", "", text)

    # Normalize spaces and tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    return text.strip()


def clean_pages(pages: list[dict]) -> list[dict]:
    cleaned_pages = []

    for page in pages:
        cleaned_pages.append({
            "page_number": page["page_number"],
            "text": clean_page_text(page["text"]),
        })

    return cleaned_pages