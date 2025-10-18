# ResumeWise AI 📄✨

ResumeWise AI is an intelligent resume builder designed to help users create professional, ATS-friendly resumes tailored for specific job applications. Leveraging the power of AI (Google Gemini), it offers features like content improvement, ATS scoring, and job-specific personalization.


---

## Key Features 🚀

* **Template Selection:** Choose from different professional resume templates optimized for ATS compliance.
* **Intuitive Editor:** Easily add and edit standard resume sections (Personal Details, Summary, Experience, Projects, Education, Skills) and create custom sections.
* **AI Writing Assistant:** Improve the wording, conciseness, and impact of your resume content with AI suggestions.
* **ATS Score & Analysis:** Get an estimated score (out of 100) indicating how well your resume might perform in Applicant Tracking Systems, along with actionable feedback.
* **AI Job Personalization:** Paste a job description and get strategic feedback, rewritten sections (summary, experience points), new project ideas, and relevant skills tailored to that specific role.
* **Live Preview & Download:** See a real-time PDF preview of your resume as you edit and download the finished version.
* **User Authentication:** Securely save and manage multiple resumes under your account.

---

## Tech Stack 💻

* **Frontend:** React, React Router, Axios, CSS Modules
* **Backend:** Node.js, Express.js, REST APIs, Socket.IO, Mongoose (likely)
* **Databases & Messaging:** MongoDB, Redis, RabbitMQ
* **AI:** Google Gemini API
* **Deployment & Tools:** Docker, Git, GitHub, Cloudinary, Kubernetes, AWS (EC2, S3, Lambda)
* **Authentication:** JWT (JSON Web Tokens) (inferred)

---

## About the Author 👋

This project was built by **Mandadi Pavan Sai Kumar**, an Electronics and Communication Engineering student at NIT Srinagar with a passion for architecting robust and scalable software solutions.

Pavan demonstrates proficiency in full-stack development, notably through projects like:

* **Social Platform Backend:** Designed and deployed a scalable backend using a **Node.js microservices architecture** (Auth, Posts, Feeds, Profiles) with MongoDB. Implemented real-time chat via **Socket.IO**, enhanced performance with **Redis caching** and **RabbitMQ** asynchronous tasks, integrated **Cloudinary** for media, and containerized the application with **Docker**.
* **ResumeWise AI (This Project):** Created an AI-powered tool for generating ATS-friendly resumes, featuring multiple templates and leveraging the **Google Gemini API** for position-specific suggestions and improvement analysis.
* **DRDO Internship Project:** Developed a real-time car parking simulation using **C++ and OOP**, engineering complex state machines and algorithms to manage numerous spaces reliably, later translating the models to Verilog.

He possesses a strong foundation in **C++, Data Structures & Algorithms, and OOP** combined with practical skills in **React, Node.js, Express, MongoDB, Docker, Kubernetes, and AWS**. Pavan is adept at creative problem-solving and engineering efficient solutions for complex technical challenges.

**Connect with Pavan:**
* **LinkedIn:** [linkedin.com/in/pavan-sai-kumar-mandadi](https://linkedin.com/in/pavan-sai-kumar-mandadi)
* **GitHub:** [github.com/mandadipavansai](https://github.com/mandadipavansai)
* **Email:** [mandadipavansai.23@gmail.com](mailto:mandadipavansai.23@gmail.com)

---

## Getting Started 🏁

### Prerequisites

* Node.js (v14 or later recommended)
* npm (usually comes with Node.js)
* MongoDB database (local or cloud instance like MongoDB Atlas)
* Google Gemini API Key (from Google AI Studio)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/mandadipavansai/resumebuilder-backend.git](https://github.com/mandadipavansai/resumebuilder-backend.git)
    cd resumebuilder-backend # Assuming frontend is inside or alongside
    ```

2.  **Backend Setup:**
    * Navigate to the `backend` directory: `cd backend`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `backend` directory and add the following environment variables:
        ```env
        PORT=8000 # Or your preferred port
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key_for_jwt
        GEMINI_API_KEY=your_google_gemini_api_key
        ```
    * Start the backend server: `npm run dev` (or your specific start script)

3.  **Frontend Setup:**
    * Navigate to the `frontend-new` directory: `cd ../frontend-new`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `frontend-new` directory and add the backend API URL:
        ```env
        REACT_APP_API_URL=http://localhost:8000 # Match backend port if different
        ```
    * Start the frontend development server: `npm start`

4.  **Access the Application:** Open your browser and go to `http://localhost:3000` (or the port specified by Create React App).

---

## Available Scripts (Frontend) 📜

In the `frontend-new` directory, you can run:

* **`npm start`**: Runs the app in development mode.
* **`npm run build`**: Builds the app for production.
* **`npm test`**: Runs the test runner.

*(Refer to the Create React App documentation for more details on these scripts)*

---

## Contributing 🤝

Contributions are welcome! Please feel free to submit issues or pull requests.

*(Optional: Add more specific contribution guidelines here if you have them.)*

---

