const express = require('express');
const { registerUser, loginUser, sendOtp, verifyOtp, loginUserWithOtp } = require('../controllers/auth');
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/loginWithOtp', loginUserWithOtp);

module.exports = authRouter;
