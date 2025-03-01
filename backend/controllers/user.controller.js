import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({message:'All fields are required'})
    }

    const user = await User.findOne({username});
    if(user){
        return res.status(400).json({message:'User already exists'})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username,password:hashedPassword});
    await newUser.save();
    res.status(201).json({message:'User created successfully'})
}

export const login = async(req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({message:'All fields are required'})
    }
    const user = await User.findOne({username});
    if (!user) return res.status(400).send('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid password');
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
}