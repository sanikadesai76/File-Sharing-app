# 🌩️ CloudBox – File Storage & Sharing Web App

CloudBox is a full-stack web application that allows users to **upload, store, download, and delete files securely** using AWS Cloud services.  
The app includes **user authentication**, **file management**, and is built using the **MERN stack** with a **Node.js backend** connected to **AWS Lambda and S3**.

---

## 🚀 Features

- 📤 **Upload Files:** Upload any file securely to the cloud.  
- 📥 **Download Files:** Download files using secure pre-signed URLs.  
- ❌ **Delete Files:** Remove files from the cloud storage.  
- 🔐 **Authentication:** User login & signup system to protect access.  
- ☁️ **AWS Integration:** Uses S3 for file storage and Lambda for serverless backend.  
- 🌐 **Responsive UI:** Built with React and Tailwind CSS (optional).

---

## 🛠️ Tech Stack

### Frontend:
- React.js  
- HTML, CSS, JavaScript  
- Axios / Fetch API  

### Backend:
- Node.js  
- Express.js  
- AWS Lambda (Serverless Functions)  
- API Gateway (for REST APIs)  

### Database:
- MongoDB (for user data and file metadata)

### Cloud Services:
- AWS S3 (File Storage)  
- AWS Cognito (User Authentication)  

---

## ⚙️ How It Works

1. Users sign up or log in via the authentication system.  
2. They can upload files which are sent to the backend (Node.js / AWS Lambda).  
3. The backend uploads files to **AWS S3** and stores metadata in MongoDB.  
4. Users can **view**, **download**, or **delete** files securely using pre-signed URLs.

---

