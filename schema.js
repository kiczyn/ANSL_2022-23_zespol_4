const mongo=require('mongoose');
const LogInSchema=new mongo.Schema({
    login:{
        type: String,
        required: true
    },
    haslo:{
        type: String,
        required: true
    }
})

const model=new mongo.model("uzytkownicy",LogInSchema)
module.exports=model;
