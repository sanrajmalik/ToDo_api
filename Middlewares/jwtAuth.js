const jwt = require('jsonwebtoken')
const bycrypt= require('bcrypt')


const generateToken = (user)=>{
    return jwt.sign({userId:user._id},'secretKey',{ expiresIn: '1h' })

    
}

const hashPassword = async (password) => {
    return await bycrypt.hash(password, 10);
  };


  module.exports = {
    generateToken,
    hashPassword,
  };