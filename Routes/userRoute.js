const express = require('express');
const jwtAuth = require('../Middlewares/jwtAuth');
const User = require('../Models/User');
const bycrypt= require('bcrypt')

const router = express.Router();


router.post('/register',async (req,resp)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email) {
            return resp.status(401).json({ error: 'Please enter name and email' });
        }
        const hashPassword = await jwtAuth.hashPassword(password);
        const ifUser = await User.findOne({ email});
        if(ifUser){
            return resp.status(401).json({ error: 'User already registered' });
            
        }
        const user = User.create({ name,email, password: hashPassword })

        const token = jwtAuth.generateToken(user);
        resp.json({ token });
    } catch (error) {
        resp.status(500).json({ error: 'Registration failed' });

    }
})


router.post('/login',async (req,resp)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({ email});

        if (!user) {
            return resp.status(401).json({ error: 'Invalid credentials' });
          }

        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return resp.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwtAuth.generateToken(user);
        resp.json({ token });
    } catch (error) {
        resp.status(500).json({ error: 'Login failed' });

    }
})


module.exports = router;


