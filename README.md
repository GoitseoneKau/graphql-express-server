# 🚀 GraphQL Express Server — MEAN Stack Monorepo

A clean, learning-focused **MEAN stack monorepo** combining:

- **Express.js GraphQL API (Node.js backend)**
- **Angular frontend (Apollo Angular client)**
- **MongoDB database**
- **Shared tooling & unified workspace setup**

This repository is designed to help you explore modern GraphQL backend patterns, Angular integration, and monorepo best practices.

---

## 📦 Monorepo Structure

```python
graphql-express-server/
│
├── packages/
│ ├── api/ # Node.js + Express + Apollo GraphQL Server
│ └── frontend/ # Angular application (Apollo Angular)
│
├── package.json # Root package for shared scripts
└── README.md
```


### **API Package Includes**
- Express server  
- Apollo GraphQL endpoint  
- Mongoose/MongoDB database models  
- Modular schema & resolvers  
- Environment variable configuration  

### **Frontend Package Includes**
- Angular app (standalone components)  
- Apollo Angular client setup  
- Services & CRUD UI for interacting with the API  

---

## ⚙️ Quick Start

```bash
# 1. Install all dependencies
npm install

# 2. Start backend & frontend (concurrently)
npm run dev

# 3. Run tests for both apps
npm test

```

# 🧰 Tech Stack
## Backend

- Node.js

- Express.js

- Apollo Server (GraphQL)

- MongoDB + Mongoose

- TypeScript (optional depending on repo)

## Frontend

- Angular 17–20

- Apollo Angular Client

- Signals-based reactive flow

## Tooling

- npm Workspaces (Monorepo)

- Nodemon

- Angular CLI




# ✨ Features

📡 Full GraphQL API with modular schema & resolvers

🗂️ Monorepo architecture with shared tooling

💾 MongoDB integration using Mongoose

🧩 MEAN front-to-back workflow with Apollo Angular

🔥 Dev-friendly workflow (npm run dev)

🧪 Testing setup included

# 🏁 Getting Started
## 1️⃣ Clone the repository
git clone https://github.com/your-username/graphql-express-server
cd graphql-express-server

## 2️⃣ Install dependencies
npm install

## 3️⃣ Configure environment variables

Create a .env file inside apps/api:

PORT=4000
MONGO_URI=mongodb://localhost:27017/your-db

## 4️⃣ Start the monorepo
```python
npm run dev
```


**Your apps will run at:**

Backend: http://localhost:4000/graphql

Frontend: http://localhost:4200
