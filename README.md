# phindu-assistant
A digital ledger and alternative credit-scoring plartform designed specifically for informal Malawian micro-merchants who struggle with traditional bookkeeping apps due to language or literacy barriers.

## Installation

In project root directory, run:

```bash
source .venv/bin/activate
pip install -r requirements.txt
```

## Database Migration

Run database migration:

```bash
alembic upgrade head
```

## Development Server

Start development server:

```bash
uvicorn src.main:app --reload
```
