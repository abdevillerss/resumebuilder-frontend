
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');       
const dotenv = require('dotenv');   

const authRouter = require('./routes/authroutes');     
const resumeRouter = require('./routes/resumeroutes'); 
const { notFound, errorHandler } = require('./middlewares/errorHandler'); 

dotenv.config();


const app = express();

// Add this simple route to handle GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

// ... your other app.use routes go here ...
// e.g., app.use('/api/users', userRoutes);

const corsOptions = {
  origin: 'https://abdevillerss.github.io',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));       // Enables CORS for all routes, allowing our frontend to make requests.
app.use(express.json()); 

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware/handler
});
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.')) // Log a success message.
    .catch(err => {

        console.error('Database connection error:', err);
        process.exit(1);
    });


app.use('/api/auth', authRouter);

app.use('/api/resumes', resumeRouter);

app.use(notFound);     
app.use(errorHandler); 

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
