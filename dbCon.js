const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set("strictQuery",true);

const DBConnect = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected", connect.connection.host)
    }catch(e){
        console.log("error"+ e)
    }
}

module.exports = DBConnect;