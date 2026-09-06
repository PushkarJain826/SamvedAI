"""enable pgvector extension

Revision ID: dfb994d3c451
Revises: d2c1ec390314
Create Date: 2026-09-06 23:15:00.243207

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dfb994d3c451'
down_revision: Union[str, Sequence[str], None] = 'd2c1ec390314'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")


def downgrade() -> None:
    op.execute("DROP EXTENSION IF EXISTS vector")
