# 🔐 AI-Powered Fraud Risk Engine with LLM Explanations

This project is a backend microservice that evaluates the risk level of a payment transaction based on custom fraud heuristics. It uses an LLM (e.g., Gemini gemini-2.0-flash) to generate human-readable explanations for the risk score and supports Redis-based caching with graceful fallback logic.

---

## 🚀 Features

- ✅ Risk scoring based on:
  - High-risk email domains (e.g. `.ru`, `fraud.net`)
  - Large transaction amount
  - Repeated IP address or device fingerprint
- ✅ LLM-generated explanations (gemini-2.0-flash)
- ✅ Redis-based prompt caching with TTL
- ✅ Fallback to direct LLM call if Redis is down
- ✅ Fraud statistics endpoint (`/fraud-stats`)
- 🧪 Easily testa




## 📦 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **LLM API:** Gemini (gemini-2.0-flash compatible)
- **Caching:** Redis (via `redis` NPM package)
- **Runtime:** Local, Docker, or cloud-compatible

---

## 🛠️ Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/<your-username>/fraud-risk-engine.git
cd fraud-risk-engine

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Add Environment Variables

OPENAI_API_KEY=your_openai_api_key_here
REDIS_URL=redis://localhost:6379

### 4️⃣ Start Redis (Optional if using local Redis)

docker run -d --name redis -p 6379:6379 redis

### 5️⃣ Start the Server

npm run dev

### 5️⃣ Swagger Documentation

[![Swagger Docs](https://img.shields.io/badge/API-Swagger-blue)](http://localhost:3000/api-docs)
