const mongo=require('mongoose');

const connectDB=async()=>{
    try{
        await mongo.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    }
    catch(err){
        console.error(err);
    }
}


module.exports=connectDB