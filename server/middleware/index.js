const User = require("../schema/index.js");
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRegister = (req,res,next) => {
  const { error } = validateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({message:error.details[0].message})
  }
  next()
}

const verify = async(req,res,next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ message: 'Invalid token' });
    const decoded = jwt.verify(token, 'secretKey'); // Verify token
    const user = await User.findById(decoded.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.log(error);
     res.status(401).json({ message: 'UnAuthorized' });
  }
}

module.exports = { verify, validateRegister };
