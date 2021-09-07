"""Create users, posts, profiles tables

Revision ID: a8b5eb1a69e2
Revises: 
Create Date: 2021-08-20 06:14:56.762120

"""
from typing import Tuple
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.schema import ForeignKey


# revision identifiers, used by Alembic
revision = "a8b5eb1a69e2"
down_revision = None
branch_labels = None
depends_on = None


# pgsql updated at trigger created by a function
def create_updated_at_trigger() -> None:
    op.execute(
        """
        CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS
        $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        """
    )


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


# create a function to create user table using sqlAlchemy
# create a function to create posts table


def create_users_table() -> None:
    """
    creates a base user table.
    """
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        # sa.Column("profile_id",ForeignKey(profile.id)), TODO
        sa.Column("profile_id", sa.Integer, default=1),
        sa.Column("email", sa.Text, unique=True, nullable=False, index=True),
        sa.Column("is_org", sa.Boolean, nullable=False, server_default="False"),
        sa.Column("salt", sa.Text, nullable=False),
        sa.Column("password", sa.Text, nullable=False),
        # sa.Column("username", sa.Text, unique=True), # no usernames
        *timestamps(),  # this just unpacks the result of timestamps() function
    )
    # create a trigger to perform 'updated at' on change of values
    op.execute(
        """
        CREATE TRIGGER update_user_modtime
            BEFORE UPDATE
            ON users
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )


def create_posts_table() -> None:
    """
    creates a base posts table with update and created at
    """
    op.create_table(
        "posts",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("title", sa.Text, nullable=False, server_default="title"),
        sa.Column("short_desc", sa.Text, nullable=False, server_default="short_desc"),
        sa.Column("long_desc", sa.Text, nullable=False, server_default="long_desc"),
        sa.Column(
            "image", sa.Text, nullable=True, server_default="image"
        ),  # url to post 'image(s)',
        sa.Column("location", sa.Text, nullable=True, server_default="location"),
        sa.Column("is_published", sa.Boolean, nullable=False),
        sa.Column("org_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE")),
        *timestamps(),
    )
    # create a trigger to perform 'updated at' on modify of values
    op.execute(
        """
        CREATE TRIGGER update_posts_modtime
            BEFORE UPDATE
            ON posts
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )


def create_profiles_table() -> None:
    op.create_table(
        "profiles",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("first", sa.Text, nullable=True),
        sa.Column("last", sa.Text, nullable=True),
        sa.Column("phone", sa.Text, nullable=True),
        sa.Column("bio", sa.Text, nullable=True, server_default=""),
        sa.Column("image", sa.Text, nullable=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE")),
        sa.Column("org_name", sa.Text, nullable=True, server_default=""),
        sa.Column("org_loc", sa.Text, nullable=True, server_default=""),
        *timestamps(),
    )
    op.execute(
        """
        CREATE TRIGGER update_profiles_modtime
            BEFORE UPDATE
            ON profiles
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )


def upgrade() -> None:
    create_updated_at_trigger()
    create_users_table()
    create_profiles_table()
    create_posts_table()


def downgrade() -> None:
    op.drop_table("posts")  # posts first as it has key constraints to users
    op.drop_table("users")
    # remove function to create updated at trigger
    op.execute("DROP FUNCTION update_updated_at_column")
