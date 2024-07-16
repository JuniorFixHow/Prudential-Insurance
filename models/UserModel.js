import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    department:String,
    role:String,
    title:String,
    gender:String,
    photo:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
    },
    lcd:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})

// Check if the model already exists before creating new one
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;