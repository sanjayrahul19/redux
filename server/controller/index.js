const User = require('../schema/index.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const registerUser = async(req,res) => {
try {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({message: 'User already exists'})
  }

    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
 return res.status(200).json({ message: 'User created successfully' });
  } else {
     return res.status(400).json({ message: 'User not created' });
  }

} catch (error) {
  console.log(error);
 res.status(500).json({ message: error.message });
}
}


const loginUser = async(req,res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password);;
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = await jwt.sign({ id: userExists._id }, "secretKey", { expiresIn: '1d' });
      return res.status(200).json({ token, data: userExists });
    } else {
      return res.status(400).json({ message: 'User does not exist' });
    }
  } catch (error) {
 console.log(error);
 res.status(500).json({ message: error.message });
  }
}

const getUser = async(req,res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User does not exist' });
    return res.status(200).json({ message: 'User exists', data: user });
  } catch (error) {
console.log(error);
res.status(500).json({ message: error.message });
  }
}


module.exports = { registerUser, loginUser, getUser };
