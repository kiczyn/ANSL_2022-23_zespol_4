const mongo=require('mongoose');
const karty=new mongo.Schema({
    atak:{
        type: Number,
        required: true
    },
    zycie:{
        type: Number,
        required: true
    },
    koszt:{
        type: Number,
        required: true

    },
    link:{
        type: String,
        required:true
    }
    
})

const model2=new mongo.model("karty",karty)
module.exports=model2;
