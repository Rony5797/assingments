const User = require('../models/users');
const {generateToken,hashPassword,comparePassword} = require('../helpers/auth');
require("dotenv").config();

exports.register = async (req, res) => {
    try {
      // 1. destructure name, email, password from req.body
      const { name, email, password } = req.body;
      
      // 2. all fields require validation
      if (!name.trim()) {
        return res.json({ error: "Name is required" });
      }
      if (!email) {
        return res.json({ error: "Email is required" });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
      }
      // 3. check if email is taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ error: "Email is already register" });
      }
      // 4. hash password
      const hashedPassword = await hashPassword(password);
      // 5. register user    
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      // 6. create signed jwt
      const token = generateToken(user._id,process.env.SECRET_KEY);
      // 7. send response
      res.status(200).json({
        message: "User successfully created",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token,
      });
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        err
      })
        console.log(err);
    }
  };
  
  exports.login = async (req, res) => {
    try {
      // 1. destructure name, email, password from req.body
      const { email, password } = req.body;
      // 2. all fields require validation
      if (!email) {
        return res.json({ error: "Email is required" });
      }
      if (!password || password.length < 6) {
        return res.json({ error: "Password must be at least 6 characters long" });
      }
      // 3. check if email is taken
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "User not found please register" });
      }
      // 4. compare password
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      // 5. create signed jwt
      const token = generateToken(user._id,process.env.SECRET_KEY);
      // 7. send response
     
      res.status(200).json({
        massage: "login successful",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token,
      });
    } catch (err) {
      res.status(401).json({
        message: "User not successful login",
        err
      })
      console.log(err);
    }
  };