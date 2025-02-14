const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
})

userSchema.plugin(passportLocalMongoose)
module.exports={userSchema}
