
// const express = require('express'); 
// const mongoose = require('mongoose'); 
// const cors = require('cors');       
// const dotenv = require('dotenv');   

// const authRouter = require('./routes/authroutes');     
// const resumeRouter = require('./routes/resumeroutes'); 
// const { notFound, errorHandler } = require('./middlewares/errorHandler'); 

// dotenv.config();


// const app = express();

// // Add this simple route to handle GET requests to the root URL
// app.get("/", (req, res) => {
//   res.send("Backend server is running.");
// });

// // ... your other app.use routes go here ...
// // e.g., app.use('/api/users', userRoutes);

// const corsOptions = {
//   origin: 'https://abdevillerss.github.io',
//   optionsSuccessStatus: 200 // For legacy browser support
// };

// app.use(cors(corsOptions));   


// app.use((req, res, next) => {
//   // Allow requests from your specific frontend URL
//   res.setHeader('Access-Control-Allow-Origin', 'https://abdevillerss.github.io');

//   // Allow specific methods the browser can use
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );

//   // Allow specific headers the browser can send
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization'
//   );

//   // Handle the OPTIONS preflight request
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });// Enables CORS for all routes, allowing our frontend to make requests.
// app.use(express.json()); 

// app.use((req, res, next) => {
//     console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
//     next(); // Pass control to the next middleware/handler
// });
// const MONGO_URI = process.env.MONGO_URI;


// mongoose.connect(MONGO_URI)
//     .then(() => console.log('Successfully connected to MongoDB.')) // Log a success message.
//     .catch(err => {

//         console.error('Database connection error:', err);
//         process.exit(1);
//     });


// app.use('/api/auth', authRouter);

// app.use('/api/resumes', resumeRouter);

// app.use(notFound);     
// app.use(errorHandler); 

// const PORT = process.env.PORT || 3001;


// app.listen(PORT, () => {
//     console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });


const express = require('express');
const app = express();

// --- START: ROBUST CORS CONFIGURATION ---
// This MUST be the very first middleware.
app.use((req, res, next) => {
  // Allow requests from your specific frontend URL
  res.setHeader('Access-Control-Allow-Origin', 'https://abdevillerss.github.io');
  
  // Allow specific methods the browser can use
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  
  // Allow specific headers the browser can send, especially Authorization for tokens
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  
  // Handle the browser's "preflight" OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
// --- END: ROBUST CORS CONFIGURATION ---

app.use(express.json());

// --- START: NEW DEBUG ROUTE ---
app.get("/api/debug-cors", (req, res) => {
  console.log("--- DEBUG-CORS Route Hit ---");
  console.log("Request Headers:", req.headers);
  res.status(200).json({ message: "CORS debug successful! The backend is connected." });
});
// --- END: NEW DEBUG ROUTE ---

// Your original root route
app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

// ... your other API routes (app.use('/api/users', ...)) ...
// Make sure to re-add your other route handlers here if they are in this file.


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));