const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.js");
const businessRouter = require("./routes/business.js");
const { verifyToken } = require("./middleware/verifyToken.js");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.status(200).send("Welcome");
});

app.use("/api/auth", authRoutes);
app.use("/api/business", verifyToken, businessRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
