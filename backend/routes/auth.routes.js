import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        let student = await Student.findOne({email});
        if(student){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const Stu = new Student({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({message: "User registerd"});
    }catch(error){
        res.status(500).json({message: "server error"});
    }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const stu = await Student.findOne({email });
        if(!stu){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,stu.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({id: stu._id},process.env.JWT_SECRET,{expiresIn: '1d'});
        res.json({
            message: "Login successful",
            token});

    }catch(error){
        res.status(500).json({message: "server error"});
    }
})