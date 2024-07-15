import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';

export const createUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        //check if the email is already taken or not
        const user = await User.findOne({email});
        if(user){
            res.status(422).json('User email already taken');
        }else{
            //encrypt user password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt)
            const newUser = new User({
                ...req.body,
                password:hashedPassword
            });
            const savedUser = await newUser.save();
            res.status(200).json('Account created successfully');
        }
    } catch (error) {
        console.log('Error occured creating user')
    }
}

export const getAllUsers=async(req, res)=>{
    try {
        const users = await User.find({});
        res.status(201).json(users);
    } catch (error) {
        console.log('Could not fetch users, error occured');
    }
}
export const getUser=async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(201).json(user);
    } catch (error) {
        console.log('Could not fetch user, error occured');
    }
}
export const deleteUser=async(req, res)=>{
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json('User deleted successfully');
    } catch (error) {
        console.log('Could not delete user, error occured');
    }
}

export const updateUser=async(req, res)=>{
    try {
        const {id} = req.params;
        const {password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const user =  await User.findByIdAndUpdate(id,
            {$set:{...req.body, password:hash}}, {new:true}
        );
        res.status(200).json(user);
    } catch (error) {
        console.log('Could not delete user, error occured');
        console.log(error)
    }
}


export const signInUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const isUser = await User.findOne({email});
        // check if user exists
        if(!isUser){
            res.status(404).json('Invalid email or password');
        }
        else{
            // check if user's password is correct
            const isPasswordCorrect = await bcrypt.compare(password, isUser?.password);
            if(!isPasswordCorrect){
                res.status(404).json('Invalid email or password');
            }else{
                // remove password from the data sent to the frontend
                const {password, ...otherData} = isUser._doc;
                res.status(201).json({...otherData})
            }
        }
    } catch (error) {
        console.log(error)
    }
}