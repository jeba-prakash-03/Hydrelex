# HYDRELEX LIFT SYSTEMS – Premium Corporate Website

A complete, production-ready corporate website and administration management platform for **HYDRELEX LIFT SYSTEMS**.

Built with a design aesthetic inspired by **Premium Industrial Minimalism & Architectural Luxury** (modern international elevator manufacturers like Otis, Schindler, Kone), combining editorial typography (`Space Grotesk` + `Inter`), structured blueprint grid accents, subtle Framer Motion micro-interactions, responsive mobile engineering, and a secure Node.js + MySQL 8 persistence backend.

---

## 1. Verified Company Identity

- **Company Name:** HYDRELEX LIFT SYSTEMS
- **Tagline:** A way to reach a goal
- **Headquarters Address:**
  No. B3-G4, Arakonam Road,
  Mevallurkuppam Village,
  Sriperumbudur Taluk – 602015,
  Tamil Nadu, India.
- **Contact Telephones:**
  - `+91 89393 59592`
  - `+91 97893 97504`
- **UDYAM Registration:** `UDYAM-TN-08-0090275`
- **GSTIN:** `33BNOPK2159N1ZJ`

---

## 2. Technology Stack

### Frontend:
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom `#101D32` Deep Midnight Navy, `#183B62` Industrial Blue, `#3478D4` Electric Blue)
- **Typography:** Space Grotesk (Headlines & Numbers) + Inter (Body Copy & Metadata)
- **Animations:** Framer Motion (Transitions, staggered reveals, modals, respecting `prefers-reduced-motion`)
- **Forms & Validation:** React Hook Form + Zod schema validation
- **Routing:** React Router v6
- **Icons:** Lucide React

### Backend:
- **Runtime:** Node.js v20+ with Express.js
- **Language:** TypeScript (via `tsx` engine)
- **Authentication:** JWT (JSON Web Tokens) with 7-day expiration
- **Password Security:** `bcryptjs` hashing (salt rounds: 10)
- **File Uploads:** Multer with mime-type restriction & safe disk storage
- **Spam & Abuse Protection:** `express-rate-limit` + hidden honeypot fields on public submission forms
- **Security:** Helmet HTTP headers + CORS restrictions

### Database:
- **Engine:** MySQL 8
- **Driver:** `mysql2/promise` with pooled connections
- **Integrity:** Relational schema, foreign keys, cascades, indexes, utf8mb4 encoding

---

## 3. Database Schema Overview

The database `hydrelex_db` contains 10 structured relational tables:

1. `admins` - Authenticated operations staff and administrators.
2. `products` - Configurable lift models (Passenger, Goods, Hydraulic, Industrial, Customized).
3. `services` - Configurable service offerings (Installation, Maintenance, Repairs, Modernization, Consultation).
4. `enquiries` - Client consultation requests with unique reference numbers (`HYD-YYYYMM-XXXX`) and tracking status.
5. `appointments` - Requested and confirmed site engineering appointments linked to enquiries.
6. `reviews` - Moderated customer feedback (defaults to `PENDING`; only `APPROVED` reviews appear publicly).
7. `projects` - Photographic gallery showcase items with `is_sample` indicator.
8. `project_images` - Multiple gallery images per project.
9. `company_settings` - Global key-value store for company address, phones, GSTIN, UDYAM, social links, and headlines.
10. `admin_activity_logs` - Audit log recording administrative actions (logins, status changes, approvals).

---

## 4. Quick Start & Setup Commands

### Step 1: Clone or navigate to the directory
```bash
cd /home/jeba-prakash/Jeba/hydrelex
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```

Ensure your MySQL database credentials in `server/.env` are correct:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hydrelex_db
JWT_SECRET=hydrelex_jwt_super_secret_key_2026_vertical_mobility
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@hydrelex.com
ADMIN_INITIAL_PASSWORD=Hydrelex@2026!
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Step 3: Run Database Migrations and Seed
```bash
cd server
npm run migrate
npm run seed
cd ..
```
*Creates all 10 tables and seeds the initial verified company profile, editable product/service offerings, and the default admin user.*

### Step 4: Run Both Backend and Frontend in Development
From the project root:
```bash
npm run dev
```
- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Admin Portal:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 5. Default Admin Credentials

- **URL:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Username / Email:** `admin@hydrelex.com` or `admin`
- **Password:** `Hydrelex@2026!`

*(Password is securely hashed via bcrypt. Change via the database or admin profile upon initial deployment.)*

---

## 6. Key Features

1. **Customer Consultation & Appointment Booking:**
   - Multi-field consultation form: Full Name, Phone, Email, Company, Site Location, Enquiry Category, Product Interest, Preferred Appointment Date, Time Window, and Project Scope Description.
   - Generates a unique tracking reference code: e.g. `HYD-2611-1234`.
   - Built-in **Track Consultation Status** tool where customers verify their appointment status using their reference number and phone.
   - Bot protection with hidden honeypot fields and express-rate-limit.

2. **Customer Feedback & Review System:**
   - Interactive 5-star rating submission with customer name, review headline, description, and optional photo upload.
   - Status defaults to `PENDING`. Only `APPROVED` reviews appear publicly.
   - Dynamic real-time calculation of average star ratings and verified review counts.

3. **Secure Operations Admin Dashboard:**
   - Real-time KPI summary (Total Inquiries, Pending Action, Confirmed Site Surveys, Completed, Approved Reviews).
   - Inquiries registry with full-text search, status filters, full details modal, internal notes editor, and appointment scheduler.
   - Product and Service catalog manager (CRUD, active toggle, ordering).
   - Project Gallery manager with `Sample Placeholder` flag.
   - Corporate settings editor (update address, phones, GSTIN, UDYAM, headlines anytime).

---

## 7. Production Build

To build both the frontend and backend for deployment:
```bash
npm run build
```
- Client static assets are output to `client/dist/`.
- Server TypeScript files compile to `server/dist/`.
- In production, run `npm --prefix server start`.

---

© HYDRELEX LIFT SYSTEMS. Sriperumbudur Taluk, Tamil Nadu – 602015.

