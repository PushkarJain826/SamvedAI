import re


NUMBERED_HEADING_PATTERN = re.compile(
    r"^(\d+(?:\.\d+)*)\.\s+(.+?)(?::)?$"
)


def page_to_blocks(page: dict) -> list[dict]:
    text = page["text"]
    page_number = page["page_number"]

    lines = text.splitlines()

    blocks = []
    current_lines = []

    def save_current_block():
        if not current_lines:
            return

        block_text = " ".join(
            line.strip()
            for line in current_lines
            if line.strip()
        )

        if block_text:
            blocks.append({
                "text": block_text,
                "page": page_number,
            })

        current_lines.clear()

    for line in lines:
        line = line.strip()

        # Blank line means the current paragraph has ended.
        if not line:
            save_current_block()
            continue

        heading_type, heading = parse_heading(line)
        major_heading = parse_major_heading(line)

        # Keep genuine headings as separate blocks.
        if heading_type is not None or major_heading is not None:
            save_current_block()

            blocks.append({
                "text": line,
                "page": page_number,
            })

            continue

        current_lines.append(line)

    save_current_block()

    return blocks


def pages_to_blocks(pages: list[dict]) -> list[dict]:
    blocks = []

    for page in pages:
        blocks.extend(page_to_blocks(page))

    return blocks


def parse_major_heading(text: str) -> str | None:
    text = text.strip()

    major_headings = [
        "Weather Based Crop Insurance Scheme (WBCIS):-",
        "Unified Package Insurance Scheme (UPIS)",
    ]

    for heading in major_headings:
        if text.lower() == heading.lower():
            return heading

    return None


def parse_heading(text: str) -> tuple[str | None, str | None]:
    """
    Detect genuine numbered headings.

    We deliberately use a conservative heuristic because
    normal document content can also begin with a number.
    """

    text = text.strip()

    match = NUMBERED_HEADING_PATTERN.match(text)

    if not match:
        return None, None

    number, title = match.groups()
    title = title.strip()

    # Very long numbered paragraphs are probably normal content,
    # not headings.
    if len(title) > 120:
        return None, None

    # Headings in this document are generally written in uppercase.
    # This prevents things like:
    #
    # 3. DAC&FW has designated...
    #
    # from being treated as headings.
    letters = [char for char in title if char.isalpha()]

    if not letters:
        return None, None

    uppercase_ratio = sum(
        char.isupper() for char in letters
    ) / len(letters)

    if uppercase_ratio < 0.70:
        return None, None

    level = number.count(".") + 1

    if level == 1:
        heading_type = "section"
    else:
        heading_type = "subsection"

    return heading_type, f"{number}. {title}"


def build_context(
    section: str | None,
    subsection: str | None,
) -> str:

    parts = []

    if section:
        parts.append(f"Section: {section}")

    if subsection:
        parts.append(f"Subsection: {subsection}")

    return "\n".join(parts)


def create_chunks(
    blocks: list[dict],
    max_characters: int = 2500,
) -> list[dict]:

    chunks = []

    current_blocks = []
    current_pages = []

    current_section = None
    current_subsection = None

    chunk_index = 0

    def save_current_chunk():
        nonlocal chunk_index

        if not current_blocks:
            return

        context = build_context(
            current_section,
            current_subsection,
        )

        body = "\n\n".join(
            block["text"] for block in current_blocks
        )

        if context:
            chunk_text = f"{context}\n\n{body}"
        else:
            chunk_text = body

        chunks.append({
            "chunk_text": chunk_text,
            "chunk_index": chunk_index,
            "page_start": min(current_pages),
            "page_end": max(current_pages),
            "section": current_section,
            "subsection": current_subsection,
        })

        chunk_index += 1

    for block in blocks:

        text = block["text"]
        page = block["page"]

        heading_type, heading = parse_heading(text)
        major_heading = parse_major_heading(text)

        # -----------------------------------
        # New major heading
        # -----------------------------------

        if major_heading is not None:
            save_current_chunk()

            current_blocks.clear()
            current_pages.clear()

            current_section = major_heading
            current_subsection = None

            continue

        # -----------------------------------
        # New section
        # -----------------------------------

        if heading_type == "section":

            # Save everything belonging to the
            # previous section first.
            save_current_chunk()

            current_blocks.clear()
            current_pages.clear()

            current_section = heading
            current_subsection = None

            continue

        # -----------------------------------
        # New subsection
        # -----------------------------------

        if heading_type == "subsection":

            # Save previous content before changing
            # subsection context.
            save_current_chunk()

            current_blocks.clear()
            current_pages.clear()

            current_subsection = heading

            continue

        # -----------------------------------
        # Normal content
        # -----------------------------------

        context = build_context(
            current_section,
            current_subsection,
        )

        current_body = "\n\n".join(
            block["text"] for block in current_blocks
        )

        if current_body:
            proposed_body = (
                current_body
                + "\n\n"
                + text
            )
        else:
            proposed_body = text

        if context:
            proposed_text = (
                context
                + "\n\n"
                + proposed_body
            )
        else:
            proposed_text = proposed_body

        # If the chunk becomes too large,
        # save the existing content first.
        if current_blocks and len(proposed_text) > max_characters:

            save_current_chunk()

            current_blocks.clear()
            current_pages.clear()

        current_blocks.append(block)
        current_pages.append(page)

    # Save final chunk
    save_current_chunk()

    return chunks


if __name__ == "__main__":
    from app.services.pdf_service import extract_pdf_pages
    from app.services.text_cleaner import clean_pages

    pdf_path = "data/pmfby.pdf"

    pages = extract_pdf_pages(pdf_path)
    pages = clean_pages(pages)

    blocks = pages_to_blocks(pages)

    chunks = create_chunks(blocks)

    print("Total chunks:", len(chunks))

    for chunk in chunks:
        print("\n" + "=" * 80)
        print("CHUNK:", chunk["chunk_index"])
        print("PAGES:", chunk["page_start"], "-", chunk["page_end"])
        print("SECTION:", chunk["section"])
        print("SUBSECTION:", chunk["subsection"])
        print(chunk["chunk_text"])