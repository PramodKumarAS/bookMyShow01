const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./Routes/user");
const movieRouter = require("./Routes/movie");
const theatreRouter = require("./Routes/theatre");
const showRouter = require("./Routes/show");
const bookRouter = require("./Routes/booking");
const cors = require("cors");
const path = require("path")

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors())

// ✅ Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../Frontend")));

// User Routes
app.use("/api", userRouter);
app.use("/api", theatreRouter)
app.use("/api", movieRouter);
app.use("/api", showRouter)
app.use("/api", bookRouter)

// ✅ Handle SPA client-side routing fallback
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

// Connect to MongoDB
const connectDB = require("./Config/db");
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
