const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/fundflow", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes

app.use("/api/budgets", require("./routes/budget"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/vendors", require("./routes/vendors"));
app.use("/api/transactions", require("./routes/transactions"));


app.listen(PORT, () => console.log('Server running on port ${PORT}'));