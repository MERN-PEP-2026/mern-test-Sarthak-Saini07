import express from 'express';

import Course from '../models/course.model.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',protect,async(req,res)=>{
    const {courseName,courseDescription,instructor} = req.body;
    try{
        const course = await Course.create({
            courseName,
            courseDescription,
            instructor
        });
        res.status(201).json(course);
    }catch(error){
        res.status(500).json({message: "server error"});
    }
});
router.get('/',async(req,res)=>{
    const courses = await Course.find();
    res.json(courses);
});
router.delete('/:id',protect,async(req,res)=>{
   await Course.findByIdAndDelete(req.params.id);
   res.json({message: "Course deleted"});
});

export default router;