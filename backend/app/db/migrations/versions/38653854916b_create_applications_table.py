"""create applications table

Revision ID: 38653854916b
Revises: a8b5eb1a69e2
Create Date: 2021-09-21 10:30:44.136979

"""
from alembic import op
import sqlalchemy as sa

from typing import Tuple

# revision identifiers, used by Alembic
revision = "38653854916b"
down_revision = "a8b5eb1a69e2"
branch_labels = None
depends_on = None


# # pgsql updated at trigger created by a function
# def create_updated_at_trigger() -> None:
#     op.execute(
#         """
#         CREATE OR REPLACE FUNCTION update_updated_at_column()
#             RETURNS TRIGGER AS
#         $$
#         BEGIN
#             NEW.updated_at = now();
#             RETURN NEW;
#         END;
#         $$ language 'plpgsql';
#         """
#     )


def timestamps(indexed: bool = False) -> Tuple[sa.Column, sa.Column]:
    """
    This is a way in which we can include repetitive columns across tables easily. We will create a way to update the updated_at column later.

    updated at is updated via a trigger on the table which is created via a function.
    """
    return (
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
            index=indexed,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
            index=indexed,
        ),
    )


def create_applications_table() -> None:
    op.create_table(
        "user_applications",
        sa.Column(
            "user_id",  # user id
            sa.Integer,
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "post_id",
            sa.Integer,
            sa.ForeignKey("posts.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("status", sa.Text, nullable=False, server_default="???", index=True),
        *timestamps()
    )
    # make primary key from composite
    op.create_primary_key(
        "pk_user_applications",
        "user_applications",
        ["user_id", "post_id"],
    )
    # make updated at
    op.execute(
        """
        CREATE TRIGGER update_user_applications_modtime
            BEFORE UPDATE
            ON user_applications
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )


def upgrade() -> None:
    create_applications_table()


def downgrade() -> None:
    op.drop_table("user_applications")
