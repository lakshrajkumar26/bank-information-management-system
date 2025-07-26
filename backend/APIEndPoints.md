# 📘 Bank Information Management System – API Documentation

This document outlines all backend API routes for the **Bank Information Management System**, built using Node.js, Express, and MongoDB.

---

## 🚀 Server Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Check if the server is running |

---

## 🔐 Authentication Routes

**Base URL:** `/api/auth`

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/register`      | Register a new user             |
| POST   | `/login`         | Login and get a JWT token       |

---

## 👤 Role-Based Access Test Routes

**Base URL:** `/api/users`

> These routes are protected and require a valid JWT + role

| Method | Endpoint     | Roles Allowed              | Description                        |
|--------|--------------|----------------------------|------------------------------------|
| GET    | `/user`      | `admin`, `manager`, `user` | Accessible to all roles            |
| GET    | `/manager`   | `admin`, `manager`         | Accessible to manager/admin only   |
| GET    | `/admin`     | `admin`                    | Accessible to admin only           |

---

## 🏦 User Bank Account Routes

**Base URL:** `/api/user`

> These routes are **JWT protected**. Only logged-in users can access their own data.

| Method | Endpoint                   | Description                            |
|--------|----------------------------|----------------------------------------|
| GET    | `/bank-accounts`           | Get all bank accounts of logged-in user |
| POST   | `/bank-accounts`           | Add a new bank account                 |
| PUT    | `/bank-accounts/:id`       | Update a specific bank account         |
| DELETE | `/bank-accounts/:id`       | Delete a specific bank account         |

---

## 🛠️ Admin Panel Routes

**Base URL:** `/api/admin`

> These routes are **protected by JWT** and accessible **only to admins**.

| Method | Endpoint                    | Description                                                |
|--------|-----------------------------|------------------------------------------------------------|
| GET    | `/all-bank-accounts`        | View all bank accounts of all users                        |
| GET    | `/search`                   | Search/filter bank accounts by username, bankName, IFSC<br>**Query params:** `?username=laksh&bankName=SBI&ifscCode=SBIN0001` |

---

## 🧱 MongoDB Schemas

### 🧑‍💻 User Schema

```js
{
  username: String,
  email: String,     // unique
  password: String,  // hashed
  role: String       // "admin" | "manager" | "user"
}
