const mongoose=require("mongoose")
const connectDatabase=()=>
{
    mongoose.connect(process.env.URI).then((data)=>{
        console.log(`mongodb is connected successfully at port number: ${data.connection.host}`)
    })
}

module.exports=connectDatabase