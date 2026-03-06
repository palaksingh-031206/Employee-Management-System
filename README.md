# Employee Management System

A **Full Stack Employee Management System** built using **React, Node.js, Express, and MongoDB**.
This application allows organizations to efficiently manage employee information including creating, updating, deleting, searching, filtering, and sorting employee records.
The system also provides a **dashboard overview with useful statistics** such as total employees, departments, designations, and average salary.

🚀 Live Demo
🔗 https://employee-management-rsdk.onrender.com

📌 Features
* ➕ Add new employees
* ✏️ Edit employee details
* ❌ Delete employees
* 🔍 Search employees by **Employee ID**
* 🏢 Filter employees by **Department**
* 💰 Sort employees by **Salary**
* 📊 Dashboard with statistics
* 🟢 Activate / Deactivate employees
* 📅 Track employee joining dates
* 📱 Responsive and modern UI

---

🛠️ Tech Stack
 Frontend
* React
* Vite
* Axios
* React Router
* React Hot Toast
* CSS/Tailwind

Backend
* Node.js
* Express.js
* MongoDB
* Mongoose

Deployment
Render (Frontend + Backend)
---
📂 Project Structure
employee-management-system

```
frontend
│
├── src
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── EmployeeCard.jsx
│   │   └── EmployeeNotFound.jsx
│   │
│   ├── pages
│   │   ├── HomePage.jsx
│   │   ├── CreatePage.jsx
│   │   ├── EmployeeDetailPage.jsx
│   │   └── DashboardPage.jsx
│   │
│   ├── lib
│   │   └── axios.js
|   |   └── utils.js
│   │
│   └── App.jsx
|   └── index.css
|   └── main.jsx
|

backend

├── config
|   └── db.js
│
├── models
│   └── employeeModel.js
│
├── routes
│   └── employeeRoutes.js
│
├── controllers
│   └── employeeController.js
│
└── server.js
```
---
⚙️Installation and Setup
Backend Setup
```
cd backend
npm install
npm start
```
Frontend Setup
```
cd frontend
npm install
npm run dev
```
---
📊 Dashboard Overview
The dashboard provides useful insights such as:

* Total Employees
* Total Departments
* Total Designations
* Average Salary
This helps administrators quickly understand workforce statistics.
---
🔮 Future Improvements

* Employee authentication system
* Role-based access (Admin / Manager)
* Pagination for large employee lists
* Export employee data to Excel
* Advanced analytics dashboard
---
👨‍💻 Author
Palak Singh
GitHub: https://github.com/palaksingh-031206










