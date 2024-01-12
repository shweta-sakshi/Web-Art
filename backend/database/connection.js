const mongoose = require('mongoose');

//storing connection string in DB variable
const DB = "mongodb://shweta25sakshi:1234Shweta@ac-fvldect-shard-00-00.whzxfw8.mongodb.net:27017,ac-fvldect-shard-00-01.whzxfw8.mongodb.net:27017,ac-fvldect-shard-00-02.whzxfw8.mongodb.net:27017/AuthUsers?ssl=true&replicaSet=atlas-7e7f7a-shard-0&authSource=admin&retryWrites=true&w=majority"

//connecting to database
mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=> console.log("Database connected")).catch((errr)=>{
    console.log(errr);
})