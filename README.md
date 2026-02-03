# 📦 Full-Stack Inventory Management System

A professional CRUD (Create, Read, Update, Delete) application designed to manage product stock levels, pricing, and inventory data in real-time.

## 🌟 Key Features
- **Product Management:** Add, view, and delete inventory items.
- **Full-Stack Integration:** React frontend communicating with a Java Spring Boot REST API.
- **Data Persistence:** Integrated with MySQL for reliable data storage.
- **Responsive UI:** Modern dashboard built with React components.

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js v19, Axios, CSS3 |
| **Backend** | Java 21, Spring Boot 3, Maven |
| **Database** | MySQL |
| **ORM** | Spring Data JPA / Hibernate |

---

## 📂 Project Structure
This repository contains both the Backend and Frontend logic:
* `backend-spring-boot/` - Java logic, REST Controllers, and Database configuration.
* `frontend-react/` - React components and API service layers.

---

## ⚙️ Setup & Installation

### 1. Backend (Java/Spring Boot)
1. Ensure you have **MySQL** running and a database created.
2. Update `src/main/resources/application.properties` with your MySQL username and password.
3. Open the project in **Eclipse** or IntelliJ.
4. Run the application as a **Spring Boot App**.

### 2. Frontend (React)
1. Open your terminal in the frontend folder.
2. Run `npm install` to download dependencies.
3. Run `npm start` to launch the dashboard at `http://localhost:3000`.

---

## 🚀 Future Enhancements
- [ ] Add User Authentication (Spring Security).
- [ ] Implement "Edit/Update" functionality for products.
- [ ] Add Search and Filter by category.
