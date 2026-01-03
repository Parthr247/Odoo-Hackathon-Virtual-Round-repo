🏢 Dayflow HRMS
Employee Attendance, Leave & Payroll Management System

Dayflow HRMS is a full‑stack Human Resource Management System built for hackathons and real‑world use.
It provides role‑based access for Admins and Employees to manage attendance, leave requests, payroll, and employee data efficiently.

🚀 Features
🔐 Authentication & Authorization
JWT‑based authentication

Secure password hashing (bcrypt)

Role‑based access control (Admin / Employee)

👨‍💼 Employee Features
Login / Signup

Daily Check‑In & Check‑Out

View Attendance History

Apply for Leave & Track Status

View Monthly Payroll

View & Update Profile

🧑‍💻 Admin Features
Admin Dashboard

View & Manage Employees

Approve / Reject Leave Requests

View Attendance of All Employees

Create & View Payroll Records

🛠 Tech Stack
Frontend
React (Vite)

React Router

Context API (Global Auth State)

Pure CSS (No UI libraries)

Backend
Node.js

Express.js

MySQL

JWT (Authentication)

bcryptjs (Password hashing)

Database
MySQL (Relational)

Foreign keys & indexing for performance

📁 Project Structure
Frontend (/frontend)
frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── components/
    ├── pages/
    │   ├── auth/
    │   ├── attendance/
    │   ├── leave/
    │   ├── payroll/
    │   └── profile/
    ├── services/
    └── utils/
Backend (/backend)
backend/
├── package.json
├── .env
├── schema.sql
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── db.js
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
    └── utils/
🗄 Database Schema
Tables
users

attendance

leave_requests

payroll

Highlights
One attendance record per user per day

Leave status workflow (pending → approved/rejected)

Payroll calculated server‑side

Foreign keys enforce data integrity

⚙️ Environment Variables
Create a .env file inside /backend:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dayflow_hrms

JWT_SECRET=dayflow_super_secret_key
NODE_ENV=development
🧩 Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
cd dayflow-hrms
2️⃣ Setup Database
mysql -u root -p
SOURCE backend/schema.sql;
3️⃣ Start Backend
cd backend
npm install
npm run dev
Backend runs on:

http://localhost:5000
4️⃣ Start Frontend
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:3000
🔐 API Overview
Auth
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login
GET	/api/auth/profile	Get profile
Attendance
Method	Endpoint
GET	/api/attendance/today
POST	/api/attendance/check-in
POST	/api/attendance/check-out
GET	/api/attendance/history
Leave
Method	Endpoint
POST	/api/leave/apply
GET	/api/leave/my
GET	/api/leave/all (Admin)
PUT	/api/leave/:id/status (Admin)
Payroll
Method	Endpoint
GET	/api/payroll/my
GET	/api/payroll/all (Admin)
POST	/api/payroll/create (Admin)
🧠 Architecture Decisions (Judge‑Friendly)
No ORM → Raw SQL for transparency

MVC‑style separation (Routes → Controllers → Models)

Centralized API layer (frontend)

Context API for global auth state

Security‑first approach (JWT + bcrypt)

Clean, minimal dependencies

🎯 Hackathon Highlights
✔ Full‑stack
✔ Secure authentication
✔ Real‑world HR use case
✔ Scalable architecture
✔ Clean codebase
✔ Easy to explain & demo

🏆 Future Improvements
Email notifications

PDF payslips

Role permissions expansion

Analytics dashboard

Deployment (Docker / AWS)

👥 Team
Built by:
Shivansh Gupta
Vidhu Sharma
Parth
Bhavesh

📜 License
This project is for educational & hackathon purposes.
