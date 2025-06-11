# AI-Enhanced Document Management Dashboard
- The **backend API** for the AI-Enhanced Document Management Dashboard built using **Node.js**, **Express**, **PostgreSQL**, and **Prisma ORM**. It includes user authentication, document CRUD operations, pagination, and a simulated AI document summarization feature.
- The **frontend application** for the **AI-Enhanced Document Management Dashboard**, built using **Next.js 13+**, **TypeScript**, **Tailwind CSS**, and **PrimeReact**. It enables users to securely log in, manage documents, perform CRUD operations, and interact with an intelligent document system.

---

## 📁 Monorepo Structure
```bash
/project-root
│
├── backend
│ ├── controllers
│ ├── middleware
│ ├── routes
│ ├── prisma
│ ├── tests
│ └── index.js
├── frontend
│ ├── src/               
│   ├── app/               
│   ├── documents/       
│   └── login/          
│   └── register/ 
├── context/             
├── styles/             
├── public/ 
```
---

## 🚀 Backend Features
- 🔐 Secure authentication with JWT & bcrypt
- 📄 CRUD for document metadata
- 🔍 Search & pagination
- 🤖 Simulated AI summary for each document
- 🧪 Basic unit testing using Jest & Supertest
- 🕒 Timestamps for document history
## 🚀 Frontend Features
- 🔐 **Authentication** (Login, Protected Routes)
- 📁 **Document Listing** with Pagination and Search
- 🆕 **Create, View, Delete Documents**
- 🔍 **Search** by title
- 🧾 **Tag Display**, Created Date, Description Preview
- ✅ **Confirmation Dialog** for Deletion
- 🔄 **Responsive UI** with PrimeReact and Tailwind
---

## ⚙️ Tech Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Jest for testing
- Next.js
- TypeScript
- Tailwind CSS 
- PrimeReact  
- Axios  
- Context API 

---

## 🛠️ Setup Instructions

## Install Dependencies
```bash
cd frontend
npm install

cd backend 
npm install
```
## Set Up .env
Create a .env file in the backend root:
```bash
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/document_dashboard
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
Replace USER, PASSWORD, and your_jwt_secret_key accordingly.

## Set Up Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
This will generate your client and sync the database.
```

## Start the project
```bash
cd backend
npm run dev

cd frontend
npm run dev
```
Backend will be running on http://localhost:4000.
Frontend will be running on http://localhost:3000.

## 📦 API Endpoints
```bash
Endpoint	                Method	Auth Required	Description
/api/auth/register	        POST	    ❌	       Register a new user
/api/auth/login	            POST	    ❌	       Log in and receive JWT
/api/documents	            GET	        ✅	       Get all documents (paginated)
/api/documents/:id	        GET	        ✅	       Get a specific document
/api/documents	            POST	    ✅	       reate a new document
/api/documents/:id	        PUT	        ✅	       Update an existing document
/api/documents/:id	        DELETE	    ✅	       Delete a document
/api/documents/:id/summary	GET	        ✅	       Simulate AI summary of document
```

Use Authorization: Bearer <token> header for protected routes.

## 🤖 Simulated AI Summary Logic
On calling /api/documents/:id/summary, one of the following summaries is randomly returned:

- “Summary: This document highlights key objectives and goals.”
- “Summary: Contains important insights and recommendations.”
- The first 30 words of the document's description

## 🔒 Known Issues / Limitations
- No real AI integration (simulated only)
- No file upload support
- Test coverage is basic
---


## 📄 License
MIT

## 👨‍💻 Author
Developed by Muhammad Ali Mirza