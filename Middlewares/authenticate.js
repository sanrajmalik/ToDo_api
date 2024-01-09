// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticate;
