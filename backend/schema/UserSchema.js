const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    orders:[{type:mongoose.Schema.types.objectId,ref:'Order'}]
})

userSchema.plugin(passportLocalMongoose)
module.exports={userSchema}