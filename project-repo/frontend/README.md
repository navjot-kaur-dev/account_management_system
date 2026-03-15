# Account Management System

A professional Full Stack financial application designed to manage user accounts, secure authentication, and peer-to-peer fund transfers.

## 🚀 Project Overview
This system provides a seamless experience for users to manage their personal finances. Upon registration, users are granted a starting balance to explore the platform's core features, including real-time transfers and detailed transaction tracking.

## ✨ Key Features
* **Secure Authentication:** Full Signup and Login flow powered by JWT (JSON Web Tokens) and encrypted passwords.
* **Automated Ledger:** Every new account is initialized with a starting balance of **₹10,000** as per institutional requirements.
* **Smart Transfers:** Robust backend logic ensuring senders have sufficient funds and recipients are verified before any transaction is processed.
* **Dynamic Statements:** A comprehensive transaction table that tracks every move, featuring intuitive color-coded indicators for financial clarity.
* **Aesthetic UI:** A modern, responsive interface built with a Web3-inspired color palette and professional typography.

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS (v4), React Router, Context API.
* **Backend:** Node.js, Express.js.
* **Database:** Supabase (PostgreSQL).
* **Security:** JWT-based protected routing and middleware.

## 📊 Data Visualization (Statements)
The application strictly follows financial reporting standards:
* **Credit Transactions:** Highlighted in **Green** to represent incoming funds.
* **Debit Transactions:** Highlighted in **Red** to represent outgoing funds.

## 📁 Project Structure
- `frontend/`: Contains the React source code, components, and state management.
- `backend/`: Contains the API logic, database controllers, and authentication middleware.