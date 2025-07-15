const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./Routes/user");
const movieRouter = require("./Routes/movie");
const theatreRouter = require("./Routes/theatre");
const showRouter = require("./Routes/show");
const bookRouter = require("./Routes/booking");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://bookmyshow01-1.onrender.com', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// //Apply CORS **before** routes
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// User Routes
app.use("/api", userRouter);
app.use("/api", theatreRouter)
app.use("/api", movieRouter);
app.use("/api", showRouter)
app.use("/api", bookRouter)

// Connect to MongoDB
const connectDB = require("./Config/db");
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
