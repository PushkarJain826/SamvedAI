SAMVEDAI — Work Done
Created the SAMVEDAI frontend.
Reviewed the frontend architecture and available features.
Identified the major frontend modules: AI Assistant, Government Schemes, Crop Insurance, Cooperative Laws, PACS Services, Financial Literacy, Grievance Assistance, and Sources & Trust.
Decided that the backend would be built with FastAPI.
Decided to use PostgreSQL as the main database.
Decided to use Docker for PostgreSQL.
Created the PostgreSQL Docker setup.
Created the root .env file for environment variables.
Added .env and other unnecessary files to .gitignore.
Set up SQLAlchemy for database interaction.
Set up Alembic for database migrations.
Connected Alembic to the PostgreSQL database.
Designed the initial database structure.
Created the languages table.
Created the states table.
Created the districts table.
Created the users table.
Created the conversations table.
Created the messages table.
Added language_id to messages so every message can store its actual language.
Created the authorities table.
Created the document_types table.
Created the topics table.
Created the documents table.
Created the document_chunks table.
Created the message_sources table for linking AI responses to the exact document chunks used.
Generated and reviewed the corresponding Alembic migrations.
Applied the database migrations successfully.
Added PostgreSQL pgvector support.
Enabled the PostgreSQL vector extension.
Added a 1024-dimensional embedding column to document_chunks.
Decided to use BAAI/bge-m3 as the single embedding model.
Installed the required embedding libraries.
Added the embedding dependencies to requirements.txt.
Prepared the first BGE-M3 embedding test.
Prepared the plan for document ingestion: PDF → text extraction → cleaning → chunking → embeddings → PostgreSQL.
Prepared the PMFBY document as the first real document to use for the RAG pipeline.
Current step
Tested BGE-M3 embedding generation.
Create a reusable embedding service.
