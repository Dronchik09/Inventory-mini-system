# 📦 Inventory Mini System

> A full-stack web application designed for inventory tracking with automated real-time stock status calculations.

---

## ⚡ Tech Stack

| Domain       | Technologies & Libraries                                       |
| :----------- | :------------------------------------------------------------- |
| **Frontend** | React 18, Vite, TypeScript, TanStack Query, Axios, CSS Modules |
| **Backend**  | Node.js (v20), Express.js, TypeScript, Prisma ORM              |
| **Database** | SQLite                                                         |
| **DevOps**   | Docker, Docker Compose _(configuration files)_                 |

---

## 🏗️ Project Architecture

The project adheres to a clean, modular structure separating business logic, HTTP routing, and database operations:

```text
inventory-mini-system/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema & model definitions
│   ├── src/
│   │   ├── config/                # Prisma client singleton
│   │   ├── controllers/           # Request validation & HTTP responses
│   │   ├── routes/                # Express routing layer
│   │   ├── services/              # Business logic & DB interaction
│   │   ├── utils/                 # Status calculation utilities
│   │   └── index.ts               # Server entry point
│   ├── Dockerfile
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/                   # Axios API service calls
│   │   ├── components/
│   │   │   ├── EditProductModal/  # Modal for editing product details
│   │   │   ├── ProductForm/       # Creation form component
│   │   │   └── ProductList/       # Table view with inline controls
│   │   ├── types/                 # TypeScript interfaces & DTOs
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Schema

The database layer utilizes **SQLite** orchestrated by **Prisma ORM**.

### Product Model (`schema.prisma`)

```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  quantity  Int
  price     Float
  status    String
  createdAt DateTime @default(now())
}
```

### Stock Status Automation

The `status` field is automatically determined based on the current `quantity`:

- `quantity == 0` $\rightarrow$ `out_of_stock`
- `1 <= quantity <= 5` $\rightarrow$ `low_stock`
- `quantity > 5` $\rightarrow$ `in_stock`

---

## 🔌 API Endpoints

All endpoints are prefixed under `/products` and communicate using JSON format.

| Method   | Route           | Description                       | Request Body                                                 |
| :------- | :-------------- | :-------------------------------- | :----------------------------------------------------------- |
| `GET`    | `/products`     | Fetch all products                | None                                                         |
| `POST`   | `/products`     | Create a new product              | `{ "name": string, "quantity": number, "price": number }`    |
| `PATCH`  | `/products/:id` | Update product details / quantity | `{ "name"?: string, "quantity"?: number, "price"?: number }` |
| `DELETE` | `/products/:id` | Delete a product                  | None                                                         |

---

## 🚀 How to Run the Project (Local Setup)

> **Note on Docker:** Docker configurations (`Dockerfile`, `docker-compose.yml`) are fully constructed and validated for containerized environments. However, due to system-level CPU virtualization restrictions on the local workstation, the system is executed and demonstrated via native Node.js processes.

### 1. Prerequisites

- **Node.js** (v18.x or v20.x)
- **npm** (v9.x or v10.x)

---

### 2. Backend Setup

From the project root:

```bash
cd backend
npm install
npx prisma db push
npm run dev
```

- Backend server runs on: `http://localhost:4000`
- Test endpoint: `http://localhost:4000/products`

---

### 3. Frontend Setup

In a separate terminal window from the project root:

```bash
cd frontend
npm install
npm run dev
```

- Frontend client runs on: `http://localhost:3000` (or `http://localhost:5173`)

---

## 🐳 Docker Configuration Overview

- **`backend/Dockerfile`**: Configured to install dependencies, run Prisma client generation, build TypeScript source, apply schema migrations via `prisma db push`, and expose port `4000`.
- **`frontend/Dockerfile`**: Node.js container set up to run the Vite development server bound to host `0.0.0.0` on port `3000`.
- **`docker-compose.yml`**: Orchestrates service lifecycle, binds network ports (`3000:3000`, `4000:4000`), and establishes a persistent volume for the SQLite database.

---

## 📊 Project Completion Status

- [x] Layered modular backend architecture (Routes, Controllers, Services, Utilities).
- [x] Automatic inventory status calculation logic based on quantity thresholds.
- [x] Client-side component architecture with scoped CSS Modules.
- [x] Product creation with input validation.
- [x] Real-time quantity adjustment controls (`+` / `-`) triggering status recalculation.
- [x] Dedicated modal dialog for editing item attributes (`name`, `price`, `quantity`).
- [x] Delete functionality with automatic query cache invalidation (TanStack Query).
- [x] Docker and Docker Compose configuration files.
- [ ] Direct execution inside Docker Desktop (blocked by host CPU virtualization limits).

---

## 🤖 AI Usage Report

- **AI tool used:** Google Gemini
- **What I used AI for:**
  - Generating boilerplates for modular architecture (Controllers, Services, Routes separation).
  - Building Docker configs (`Dockerfile` for both services and `docker-compose.yml`).
  - Resolving TypeScript import errors (`verbatimModuleSyntax` / `ts(1484)`).
- **2–3 example prompts:**
  1. \_"Я починаю full-stack проєкт з нуля. У мене є дві порожні папки: /backend та /frontend.
     Мені потрібна ТІЛЬКИ початкова збірка та конфігурація оточення (без бізнес-логіки та CRUD-функціоналу).
     Для папки /backend:
     Ініціалізуй Node.js + TypeScript + Express.js.
     Надай базовий package.json зі скриптами ("build", "start", "dev") та необхідними залежностями (express, cors, dotenv, ts-node-dev, typescript, @types/node, @types/express, @types/cors).
     Надай tsconfig.json.
     Надай інструкцію і конфіг для ініціалізації Prisma з провайдером SQLite.
     Створи мінімальний src/index.ts, який просто слухає порт 4000 і повертає статус сервера.
     Для папки /frontend:
     Напиши одну консольну команду для швидкого розгортання React + TypeScript (через Vite) у папку frontend.
     Вкажи, як налаштувати dev-сервер на порт 3000.
     Виведи чіткий покроковий список команд у терміналі, які треба виконати для встановлення залежностей та першого запуску обох частин локально.

  "_ 2. _"У мене повністю реалізовано додаток Inventory Mini System: backend (Node/Prisma/SQLite на 4000) та frontend (Vite/React на 3000). Допоможи налаштувати Dockerfile для обох частин та кореневий docker-compose.yml."\_

- **What I changed manually:**
  - Decoupled logic from single-file scripts into distinct service and utility layers.
  - Fine-tuned styles, light-theme contrast, and table borders inside CSS Modules.
  - Implemented the `EditProductModal` component and integrated mutation handling inside `ProductList.tsx`.
- **What was difficult:**
  - Encountering hardware-level virtualization restrictions with Docker Desktop on the host system.
  - Structuring TanStack Query mutations to keep inline quantity adjustments and full modal edits synchronized without UI flickering.
