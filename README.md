# 📝 Todo List App

This is a full-stack project using **Node.js** for the backend and **React (TypeScript)** for the frontend.

---

## ℹ️ About

This application helps you track daily tasks.
Tasks can be organized into categories and assigned priorities.

You can create an account and start managing your tasks.

---

## ⚙️ Tech Stack

* Express
* React
* PostgreSQL
* Redis
* Redux Toolkit (RTK)
* JWT Authentication
* Cookies

---

## 🌐 API Endpoints

### 🔐 Auth (`/`)

* **POST** `/login` → Log in user, generate/refresh token, set cookie, create session
* **POST** `/register` → Register user, generate token, set cookie, create session
* **POST** `/logout` → Log out user, clear token & cookie, store session

### 📋 Tasks (`/tasks`)

* **GET** `/` → Get all tasks
* **GET** `/:id` → Get task by ID
* **POST** `/` → Create a task
* **PUT** `/:id` → Update task by ID
* **DELETE** `/:id` → Delete task by ID


