# 🚀 Job Portal Application

## 📌 Project Overview
This Job Portal Application connects job seekers with companies, offering features like job listings, profile management, filtering, notifications, and premium services.

## 🛠️ Tech Stack
- **Frontend**: Vite + React, Tailwind CSS, React Router, Lucide React, Axios  
- **Backend**: Node.js, Express.js, PostgreSQL  
- **Version Control**: Git & GitHub  

---

## 👥 Team Responsibilities & Branch Structure
Each feature is developed in a separate branch before merging into `dev` and then into `main`.

| **Branch** | **Assigned Member** | **Feature Responsibility** |
|------------|---------------------|----------------------------|
| `feature/people-connections` | Varsha | Home page & people connection management |
| `feature/company-profile` | Varshith | Company profile & job postings management |
| `feature/job-seeker-profile` | Suvetha | Job seekers' profile management |
| `feature/job-filtering` | Swathi | Job filtering functionality & listings |
| `feature/authentication` | Varshini | User authentication & admin management |
| `feature/notifications-premium` | Yuvaraja | Notifications, email alerts, premium features |
| `dev` | All Members | Integration branch for testing |
| `main` | All Members | Final deployment-ready branch |

---

## 📥 Cloning & Setting Up the Project

### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/Swathijettiboina/Job-Portal.git
cd Job-Portal
```

### 🔹 Step 2: Install Dependencies
- **Backend**  
```bash
cd backend
npm install
```
- **Frontend**  
```bash
cd ../frontend
npm install
```

### 🔹 Step 3: Run the Project
- **Backend**  
```bash
npm start
```
- **Frontend**  
```bash
npm run dev
```

---

## 🌱 Git Workflow - How to Work on Your Feature

### 🔸 Step 1: Pull Latest Changes Before Working
```bash
git checkout main
git pull origin main
git checkout dev
git pull origin dev
```

### 🔸 Step 2: Switch to Your Feature Branch
```bash
git checkout feature/your-feature
git pull origin feature/your-feature
```

### 🔸 Step 3: Work on Your Feature, Then Add & Commit
```bash
git add .
git commit -m "Implemented [your feature]"
```

### 🔸 Step 4: Push Your Changes
```bash
git push origin feature/your-feature
```

### 🔸 Step 5: Merge into `dev` After Review
```bash
git checkout dev
git merge feature/your-feature
git push origin dev
```

### 🔸 Step 6: Final Merge into `main`
```bash
git checkout main
git merge dev
git push origin main
```

---

## 📌 Important Guidelines
✅ **Always pull the latest changes before working**  
✅ **Commit frequently with clear messages**  
✅ **Work within your assigned feature branch**  
✅ **Merge into `main` only after team approval**  

Let’s collaborate effectively and make this project a success! 🚀🔥

