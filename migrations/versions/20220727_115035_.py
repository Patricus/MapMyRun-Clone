"""empty message

Revision ID: 2e6e61d6a88a
Revises: 0edab023373c
Create Date: 2022-07-27 11:50:35.776191

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2e6e61d6a88a'
down_revision = '0edab023373c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('bookmarks', sa.Column('title', sa.String(length=50), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('bookmarks', 'title')
    # ### end Alembic commands ###
