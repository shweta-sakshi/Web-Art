const mongoose = require("mongoose");

//validator is for checking if the value is valid or not.
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keySecret = "codadaserrkljhoidfbnxcjhashkzxto";

//Schema:
const userSchema = new mongoose.Schema({
     fname:{
        type:String,
        required:true,
        trim:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Not a valid e-mail")
         }
        }
     },
     password:{
         type:String,
         require:true,
         unique:true,
         minlength:6
     },
     cpassword:{
         type:String,
         require:true,
         minlength:6
     },
     //used at the time of Login
     tokens:[
         {
            token:{
               type:String,
               required:true,
            }
         }
      ]
});


//password hashing
userSchema.pre("save", async function(next){

   if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,12);
      this.cpassword = await bcrypt.hash(this.cpassword,12);
   }

   next()
});


//Token generator

userSchema.methods.generateAuthtoken = async function(){/* add generateAuthtoken method to usrSchema */
   try{
      //create JWT for authentication
      let token1 = jwt.sign({_id:this._id},keySecret,{
         //token expire after one day
         expiresIn:"1d"
      });

      //adding value to the token array of user schema
      this.tokens = this.tokens.concat({token:token1})
      await this.save();
      return token1;

   }catch (err) {
      res.status(422).json(err);
   }
}


//creating model in collection Called User using userSchema and store it in usrdb variable
const usrdb = new mongoose.model("Users", userSchema);

module.exports = usrdb;