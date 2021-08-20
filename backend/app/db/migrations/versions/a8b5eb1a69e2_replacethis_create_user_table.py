"""replacethis create user table

Revision ID: a8b5eb1a69e2
Revises: 
Create Date: 2021-08-20 06:14:56.762120

"""
from typing import Tuple
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql.schema import ForeignKey


# revision identifiers, used by Alembic
revision = "a8b5eb1a69e2"
down_revision = None
branch_labels = None
depends_on = None


def timestamps(indexed: bool = False) -> Tuple[sa.Column, sa.Column]:
    """
    This is a way in which we can include repetitive columns across tables easily. We will create a way to update the updated_at column later. TODO
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


# create a function to create user table using sqlAlchemy
# create a function to create posts table


def create_users_table() -> None:
    """
    creates a base user table --> we will replace this as we get more complex functionality. Additional tables will be added as new migrations.
    """
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        # sa.Column("profile_id",ForeignKey(profile.id)),
        sa.Column("username", sa.Text, unique=True),
        sa.Column("email", sa.Text, unique=True, nullable=False, index=True),
        sa.Column("salt", sa.Text, nullable=False),
        sa.Column("password", sa.Text, nullable=False),
        *timestamps(),  # this just unpacks the result of timestamps() function
    )


def upgrade() -> None:
    create_users_table()


def downgrade() -> None:
    op.drop_table("users")
