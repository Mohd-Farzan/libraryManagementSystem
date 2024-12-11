const express = require('express');
const router = express.Router();
const {loginUser,signupUser} = require('../controller/AuthControlle');

router.post("/user/login", (req, res) => loginUser(req, res, "user"));
router.post("/admin/login", (req, res) => loginUser(req, res, "admin"));
router.get('/signup', (req, res) => {
    res.render('signup');  // This will render the 'signup.ejs' page
  });
router.post('/signup', signupUser);


module.exports = router;
