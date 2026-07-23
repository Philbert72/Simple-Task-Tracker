# Simple Task/Project Tracker

A full-stack task tracker: a FastAPI + PostgreSQL REST API and a Vue 3 (Composition API) frontend. Create tasks, move them between `Todo` / `In Progress` / `Done`, and delete them — all without a page reload.

## Stack

- **Backend:** FastAPI, SQLModel (SQLAlchemy + Pydantic), PostgreSQL, python-dotenv
- **Frontend:** Vue 3 (Composition API), Vite, Tailwind CSS, Axios

## Project Structure

```
.
├─ backend/
│  ├─ app/
│  │  ├─ main.py      # FastAPI app, routes, CORS
│  │  ├─ models.py    # Task model, Pydantic schemas, validation
│  │  └─ database.py  # Engine/session setup, reads .env
│  ├─ requirements.txt
│  └─ .env.example
│
├─ frontend/
│  ├─ src/
│  │  ├─ components/   # TaskForm, KanbanBoard, TaskCard
│  │  ├─ api.js        # Axios client
│  │  ├─ useTasks.js   # Shared reactive task state
│  │  └─ App.vue
│  └─ .env
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL installed and running locally

## 1. Database

Create a database and role matching `backend/.env.example` (or update `.env` in the next step to match your own setup):

```bash
psql -d postgres -c "CREATE ROLE tracker LOGIN PASSWORD 'tracker';"
psql -d postgres -c "CREATE DATABASE tracker OWNER tracker;"
```

PostgreSQL should now be reachable at `localhost:5432` with database `tracker`, user `tracker`, password `tracker`.

## 2. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # adjust credentials to match your PostgreSQL setup
uvicorn app.main:app --reload --port 8000
```

The API starts at `http://localhost:8000`. Tables are created automatically on startup (`SQLModel.metadata.create_all`) — no manual migration step needed.

Interactive API docs: `http://localhost:8000/docs`

### Endpoints

| Method | Path          | Description                                    |
|--------|---------------|-------------------------------------------------|
| GET    | `/tasks`      | List all tasks                                  |
| POST   | `/tasks`      | Create a task (`title`, `description`, `status`, `due_date`)|
| PUT    | `/tasks/{id}` | Update a task's title, description, status, and/or due date|
| DELETE | `/tasks/{id}` | Delete a task                                   |

`status` must be one of `Todo`, `In Progress`, `Done`. `title` cannot be blank — both are validated by the API. `due_date` is optional (`YYYY-MM-DD`) and can be cleared by setting it to `null`.

### Environment variables (`backend/.env`)

| Variable            | Default     | Description                  |
|---------------------|-------------|-------------------------------|
| `POSTGRES_USER`     | `tracker`   | Database user                 |
| `POSTGRES_PASSWORD` | `tracker`   | Database password              |
| `POSTGRES_DB`       | `tracker`   | Database name                  |
| `POSTGRES_HOST`     | `localhost` | Database host                  |
| `POSTGRES_PORT`     | `5432`      | Database port                  |
| `CORS_ORIGINS`      | `http://localhost:5173` | Comma-separated origins allowed to call the API |

Credentials are never hardcoded — `database.py` and `main.py` both load them via `python-dotenv`.

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and talks to the API at the URL configured in `frontend/.env` (`VITE_API_BASE_URL`, defaults to `http://localhost:8000`).

## Running everything

Make sure PostgreSQL is running, then open two terminals:

```bash
# 1
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000

# 2
cd frontend && npm run dev
```

Then visit `http://localhost:5173`.

## Features

- **Kanban board** — tasks are fetched from the API and grouped into three columns (`Todo`, `In Progress`, `Done`).
- **Create task** — inline form, no page reload; new card appears in the `Todo` column immediately. Due date is optional.
- **Change status** — dropdown per card moves it to another column via `PUT`, reflected instantly.
- **Due date** — set or change per card; overdue tasks (past due, not `Done`) are highlighted in red.
- **Delete task** — removes via `DELETE` and updates the board in place.
- Clean, responsive UI built with Tailwind CSS.
