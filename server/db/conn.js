const mongoose = require("mongoose");

const DB = "mongodb+srv://admin:admin@cluster0.jbtjjv2.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})