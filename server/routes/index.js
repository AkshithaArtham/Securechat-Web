const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')
const getPublicKey = require('../controller/getPublicKey');
const getPrivateKey = require('../controller/getPrivateKey');
const messages = require('../controller/messages');
const verifySecretCode = require('../controller/verify-secret-code');
const { sendOTP, verifyOTP } = require('../controller/otpController');

const router = express.Router()

//create user api
router.post('/register',registerUser)
//check user email
router.post('/email',checkEmail)
//check user password
router.post('/password',checkPassword)
//login user details
router.get('/user-details',userDetails)
//logout user
router.get('/logout',logout)
//update user details
router.post('/update-user',updateUserDetails)
//search user
router.post("/search-user",searchUser)
// Fetch public key of a user
router.get('/getPublicKey/:userId', getPublicKey);
// Fetch private key of a user
router.get('/getPrivateKey/:userId', getPrivateKey);
// Delete a message
router.delete('/api/messages/:msgId', messages);
//verify secret code
router.post('/verify-secret-code',verifySecretCode);
//send-otp
router.post("/send-otp",sendOTP);
//verify-otp    
router.post("/verify-otp",verifyOTP);

module.exports = router