const Admin = require("../Model/Admin");
const User = require("../Model/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signupUser = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      // Check if the email is already registered
      const existingUser =
        role === "admin"
          ? await Admin.findOne({ email })
          : await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered." });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user or admin
      let newUser;
      if (role === "admin") {
        newUser = new Admin({ username, email, password: hashedPassword });
      } else {
        newUser = new User({ username, email, password: hashedPassword });
      }
  
      await newUser.save();
  
      // Generate token or session
      const token = jwt.sign(
        { id: newUser._id, role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      // Send token as a cookie
      res.cookie("token", token, { httpOnly: true });
      res.status(201).json({ message: `${role} signup successful.` });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong.", error });
    }
  };
const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const user =
        role === "admin"
          ? await Admin.findOne({ email })
          : await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Generate token or session
      const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: `${role} login successful.` });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong.", error });
    }
  };
  module.exports={loginUser,signupUser}
  