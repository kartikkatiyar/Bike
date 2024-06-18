const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors")
const app = express();

const authRoutes = require('./routes/auth.js');
const businessRouter = require('./routes/business.js');

dotenv.config()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use('/api/auth', authRoutes);
app.use('/api/business', businessRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
