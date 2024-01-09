const mongoose = require('mongoose')

mongoose.set("strictQuery",true);

const DBConnect = async ()=>{
    try{
        const connect = await mongoose.connect("mongodb+srv://sanraj:sanraj@cluster0.zayt9uv.mongodb.net/ToDoApp");
        console.log("DB connected", connect.connection.host)
    }catch(e){
        console.log("error"+ e)
    }
}

module.exports = DBConnect;