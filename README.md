# 🏥 Telemedicine Platform

A full-stack telemedicine web application that connects **Patients**, **Doctors**, and **Admins** in a single platform. Features include appointment booking with online payment, real-time chat messaging, digital prescriptions, doctor scheduling, coupon management, and an admin dashboard — all wrapped in a modern, responsive UI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## 🌐 Overview

This platform enables three types of users:

| Role | Capabilities |
|------|-------------|
| **Patient** | Browse doctors, book appointments, make payments, view prescriptions, chat with doctors |
| **Doctor** | Manage schedule, view appointments, write prescriptions, manage patients, track payments |
| **Admin** | Manage users & doctors, create discount coupons, view contact messages, configure settings |

---

## ✨ Features

### 🔐 Authentication & Security
- Email/password registration with **OTP-based email verification** (via Nodemailer)
- **Google OAuth 2.0** login via Passport.js
- **JWT-based** session management
- Forgot password flow with OTP reset
- Role-based access control (Patient / Doctor / Admin)
- Account blocking by admin

### 👤 Patient Portal
- **Find Doctors** — Filter by specialization, search by name
- **Public Doctor Profiles** — View ratings, bio, qualifications, consultation fee
- **Appointment Booking** — Select date and available time slots via a booking modal
- **Online Payment** — Pay consultation fees using **Razorpay** (with coupon/discount support)
- **Appointment History** — Track upcoming and past appointments
- **Digital Prescriptions** — View prescriptions issued by doctors
- **Real-time Chat** — Message doctors via WebSocket-powered chat
- **Profile Management** — Update personal info and theme (light/dark)

### 🩺 Doctor Portal
- **Dashboard** — Overview of appointments and stats using Recharts
- **Schedule Management** — Define available days and time slots
- **Appointment Management** — Accept, reject, or complete appointments
- **Patient List** — View patients who have booked appointments
- **Prescription Writing** — Issue medicines, dosage, frequency, follow-up dates
- **Payment Tracking** — View payment info per appointment
- **Profile Management** — Update profile picture, bio, qualifications, consultation fee
- **Real-time Chat** — Communicate with patients

### 🛡️ Admin Panel
- **Dashboard** — Platform-wide statistics and overview
- **User Management** — View, block, and manage all patient and doctor accounts
- **Doctor Management** — Approve or manage doctor profiles
- **Coupon Management** — Create discount coupons with expiry and usage limits
- **Messages & Contact** — View contact form submissions from users
- **Settings** — Configure platform settings

### ⚙️ Background Jobs
- **Auto-Cancel Cron Job** — Runs every 10 minutes via `node-cron` to automatically cancel pending appointments whose scheduled time has passed

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js v5** | Web framework & REST API |
| **MongoDB** | NoSQL database (MongoDB Atlas) |
| **Mongoose** | ODM for MongoDB schema modeling |
| **Socket.IO v4** | Real-time bidirectional WebSocket communication |
| **JSON Web Token (JWT)** | Stateless authentication tokens |
| **bcrypt** | Password hashing |
| **Passport.js** | OAuth 2.0 middleware |
| **passport-google-oauth20** | Google authentication strategy |
| **Nodemailer** | Email sending (OTP, verification, notifications) |
| **Razorpay** | Payment gateway integration (INR) |
| **node-cron** | Scheduled background tasks |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing |
| **express-session** | Session management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **Vite 7** | Build tool and dev server |
| **React Router DOM v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Axios** | HTTP client for API calls |
| **Socket.IO Client v4** | WebSocket client for real-time messaging |
| **Recharts** | Chart and analytics visualization |
| **GSAP 3** | Animations |
| **Lucide React** | Icon library |
| **React Icons** | Extended icon set |
| **React Hot Toast** | Notification toasts |

---

## 📁 Project Structure

```
Telemedicine-main/
│
├── backend/                    # Node.js + Express API server
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── passport.js     # Google OAuth configuration
│   │   ├── controllers/        # Business logic layer
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── doctorController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── prescriptionController.js
│   │   │   ├── messageController.js
│   │   │   ├── paymentController.js
│   │   │   ├── couponController.js
│   │   │   ├── reviewController.js
│   │   │   ├── contactController.js
│   │   │   └── adminController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js   # JWT verification
│   │   │   ├── roleMiddleware.js   # Role-based access
│   │   │   └── errorMiddleware.js
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Doctor.js
│   │   │   ├── Appointment.js
│   │   │   ├── Prescription.js
│   │   │   ├── Message.js
│   │   │   ├── Review.js
│   │   │   ├── Coupon.js
│   │   │   ├── Contact.js
│   │   │   └── Admin.js
│   │   ├── routes/             # Express route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── doctorRoutes.js
│   │   │   ├── appointmentRouter.js
│   │   │   ├── prescriptionRoutes.js
│   │   │   ├── messageRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── couponRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── services/
│   │   │   └── emailService.js     # Nodemailer email service
│   │   ├── utils/
│   │   │   ├── cronJobs.js         # Auto-cancel scheduled job
│   │   │   ├── generateOTP.js
│   │   │   └── generateToken.js
│   │   ├── server.js           # Express app entry point
│   │   └── socket.js           # Socket.IO initialization
│   ├── seedDoctors.js          # Script to seed doctor data
│   ├── makeAdminRoot.js        # Script to assign admin role
│   └── .env                    # Environment variables
│
├── Frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingModal.jsx       # Appointment booking UI
│   │   │   ├── PrescriptionModal.jsx  # Prescription writing UI
│   │   │   ├── Sidebar.jsx            # Authenticated navigation
│   │   │   ├── PublicNavbar.jsx       # Public landing navbar
│   │   │   └── admin/                 # Admin-specific components
│   │   ├── pages/
│   │   │   ├── auth/          # Login, Signup, OTP, Google OAuth
│   │   │   ├── homepage/      # Landing page & role dashboards
│   │   │   ├── patient/       # Patient-facing pages
│   │   │   ├── doctor/        # Doctor-facing pages
│   │   │   ├── admin/         # Admin panel pages
│   │   │   └── messages/      # Real-time chat
│   │   ├── context/           # React Context (Auth state)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Helper functions
│   │   ├── config.js          # API base URL & socket URL config
│   │   └── App.jsx            # Root router with all routes
│   ├── vercel.json            # Vercel SPA rewrite rules
│   └── vite.config.js
│
├── run_app.sh                  # One-click startup (macOS/Linux)
├── run_app.bat                 # One-click startup (Windows)
└── check_slots.js              # Utility to inspect slot data
```

---

## 🗄️ Database Models

### User
- `userName`, `fullName`, `email`, `password` (bcrypt hashed)
- `googleId`, `authProvider` — supports local + Google OAuth
- `role` — `"Patient"` | `"Doctor"` | `"Admin"`
- `isEmailVerified`, `emailVerificationOTP`, `emailVerificationExpires`
- `style` — `"light"` | `"dark"` theme preference
- `isActive` — can be blocked by admin
- `prescriptions[]` — referenced Prescription IDs

### Doctor
- Linked to a `User` via `userId`
- `specialization` (e.g., Cardiologist, Dermatologist, Neurologist…)
- `qualification`, `experience`, `consultationFee`
- `availableTimes[]` — per-day time slot arrays (`{ day, slots: [{ startTime, endTime }] }`)
- `rating`, `totalRatings`, `bio`, `profilePic`

### Appointment
- References `patient` (User) and `doctor` (Doctor)
- `date` (YYYY-MM-DD), `timeSlot` (`{ start, end }` in HH:MM)
- `status` — `pending` | `accepted` | `rejected` | `completed` | `cancelled`
- `meetingRoom` — for video call link storage
- `paymentInfo` — `{ paymentId, orderId, amount }` from Razorpay

### Prescription
- References `appointment`, `doctor`, `patient`
- `notes` (up to 2000 chars)
- `medicines[]` — `{ name, dosage, frequency, duration }`
- `followUpDate`

### Coupon
- `code` (unique, uppercase), `discountPercentage`
- `expirationDate`, `usageLimit`, `usedCount`, `isActive`

### Message
- Real-time chat messages between users

### Review
- Patient reviews and ratings for doctors

### Contact
- Contact form submissions from users

---

## 🔗 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login with email/password |
| `POST` | `/api/auth/verify-email` | Send OTP to email |
| `POST` | `/api/auth/verify-otp` | Verify OTP |
| `POST` | `/api/auth/forgot-password` | Send reset OTP |
| `POST` | `/api/auth/reset-password` | Reset password with OTP |
| `GET`  | `/api/auth/google` | Initiate Google OAuth |
| `GET`  | `/api/auth/google/callback` | Google OAuth callback |
| `GET`  | `/api/auth/me` | Get current logged-in user |
| `GET`  | `/api/doctor` | List all doctors |
| `GET`  | `/api/doctor/:id` | Get doctor profile |
| `PUT`  | `/api/doctor/:id` | Update doctor profile |
| `GET`  | `/api/appointments` | Get appointments |
| `POST` | `/api/appointments` | Book appointment |
| `PUT`  | `/api/appointments/:id` | Update appointment status |
| `GET`  | `/api/prescription` | Get prescriptions |
| `POST` | `/api/prescription` | Create prescription |
| `GET`  | `/api/messages` | Get chat messages |
| `POST` | `/api/messages` | Send a message |
| `POST` | `/api/payment/create-order` | Create Razorpay order |
| `POST` | `/api/payment/verify` | Verify payment signature |
| `GET`  | `/api/payment/key` | Get Razorpay public key |
| `GET`  | `/api/coupons` | List coupons |
| `POST` | `/api/coupons` | Create coupon |
| `POST` | `/api/reviews` | Add a review |
| `GET`  | `/api/reviews/:doctorId` | Get reviews for a doctor |
| `POST` | `/api/contact` | Submit contact form |
| `GET`  | `/api/admin/*` | Admin management endpoints |

---

## 🔧 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=5001

# MongoDB Atlas
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/telemedicine?retryWrites=true&w=majority

# JWT
SECRET_KEY=your_jwt_secret_key

# Session
SESSION_SECRET=your_session_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:5173

# Nodemailer (SMTP)
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

> **Note:** For Gmail SMTP, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your account password.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- A **MongoDB Atlas** account (free tier works)
- A **Razorpay** account (test mode) — optional, for payments
- A **Google Cloud Console** project with OAuth 2.0 credentials — optional, for Google login
- A Gmail account with App Password enabled — optional, for email OTPs

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Telemedicine-main.git
cd Telemedicine-main
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create and configure your `.env` file (see [Environment Variables](#environment-variables) above), then:

```bash
npm run dev
# Backend will run at http://localhost:5001
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
# Frontend will run at http://localhost:5173
```

### 4. One-Click Start (Both Servers)

**macOS/Linux:**
```bash
chmod +x run_app.sh
./run_app.sh
```

**Windows:**
```bat
run_app.bat
```

### 5. Seed Doctor Data (Optional)

```bash
cd backend
node seedDoctors.js
```

### 6. Create Admin Account

```bash
cd backend
node makeAdminRoot.js
```

---

## 📜 Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with hot-reload (nodemon) |
| `npm start` | Start server in production mode |
| `node seedDoctors.js` | Seed initial doctor records |
| `node makeAdminRoot.js` | Promote a user to Admin role |
| `node checkUser.js` | Debug / inspect a user record |
| `node check_slots.js` | Debug / inspect time slots |
| `node check_reviews.js` | Debug / inspect reviews |

### Frontend (`/Frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## ☁️ Deployment

### Frontend — Vercel

The `Frontend/vercel.json` is pre-configured for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Deploy by connecting your GitHub repo to [Vercel](https://vercel.com) and setting the root directory to `Frontend`. Add `VITE_API_BASE_URL` as an environment variable pointing to your deployed backend URL.

### Backend — Any Node.js Host

Deploy to **Railway**, **Render**, **Fly.io**, or any Node-compatible host. Set all `.env` variables in the platform's environment settings. Update `GOOGLE_CALLBACK_URL` and `FRONTEND_URL` to reflect production URLs.

---

## 🔌 Real-Time Architecture

Socket.IO is used for **real-time chat** between patients and doctors:

- Each user **joins a room** based on their user ID on connection (`join_room` event)
- Messages are sent via the REST API and simultaneously **emitted via socket** to the recipient's room
- **Typing indicators** are supported (`typing` / `display_typing` events)

---

## 🗓️ Automated Tasks

| Job | Schedule | Description |
|-----|----------|-------------|
| Auto-Cancel Appointments | Every 10 minutes | Cancels `pending` appointments whose scheduled time has passed |

---

## 📦 Supported Doctor Specializations

`General Physician` · `Cardiologist` · `Dermatologist` · `Pediatrician` · `Orthopedic` · `Neurologist` · `Psychiatrist` · `Gynecologist` · `Dentist` · `ENT Specialist` · `Oncologist`

---

## 📄 License

This project is licensed under the **ISC License**.
