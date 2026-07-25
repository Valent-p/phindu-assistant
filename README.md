# Phindu Assistant

A digital ledger and alternative credit-scoring platform designed specifically for informal Malawian micro-merchants who struggle with traditional bookkeeping apps due to language or literacy barriers.

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) or pip

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd phindu-assistant

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## Configuration

Copy `.env.example` to `.env` and set your values (optional — sensible defaults are provided for local development):

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite+aiosqlite:///phindudb.db` | Async SQLAlchemy database URL |
| `JWT_SECRET_KEY` | *(see config.py)* | Secret used to sign JWT tokens — **change in production** |
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Token lifetime (24 h) |

---

## Database Migrations (Alembic)

Alembic manages schema changes. All migrations live in `alembic/versions/`.

```bash
# Apply all pending migrations (first-time setup or after pulling new changes)
alembic upgrade head

# Create a new migration after changing a model
alembic revision --autogenerate -m "describe your change"

# Roll back one migration
alembic downgrade -1

# Roll back all the way to an empty database
alembic downgrade base

# Show current migration state
alembic current

# Show migration history
alembic history --verbose
```

> [!NOTE]
> `render_as_batch=True` is set in `alembic/env.py` so SQLite ALTER TABLE
> operations (column renames, type changes) work correctly via table rebuilds.

---

## Development Server

```bash
# Start the FastAPI dev server with hot reload
python3 -m uvicorn src.main:app --reload
```

The API will be available at:

| URL | Description |
|---|---|
| `http://localhost:8000` | Root health-check |
| `http://localhost:8000/docs` | Swagger UI (interactive) |
| `http://localhost:8000/redoc` | ReDoc documentation |

---

## API Overview

### Auth — `/auth`

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ✗ | Register a new user, returns JWT |
| `POST` | `/auth/login` | ✗ | Login with `username` + `password` form, returns JWT |

### Users — `/users`

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/users/me` | ✔ Bearer | Return the currently authenticated user |

### Products — `/products`

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/products/` | ✔ Bearer | Create a new product |
| `GET` | `/products/` | ✔ Bearer | List all products owned by the current user |
| `POST` | `/products/instances` | ✔ Bearer | Record a sale instance of a product |

---

## Project Structure

```
phindu-assistant/
├── alembic/               # Migration scripts & Alembic env
│   └── versions/
├── src/
│   ├── api/               # FastAPI routers (auth, user, product)
│   ├── core/              # Settings, security utilities (JWT, hashing)
│   ├── db/                # SQLAlchemy repos + database session
│   ├── models/            # SQLAlchemy ORM models
│   └── schemas/           # Pydantic request/response schemas
├── alembic.ini
├── requirements.txt
└── README.md
```

---

## Code Quality

```bash
# Lint and auto-fix
ruff check --fix src/

# Format
ruff format src/
```
