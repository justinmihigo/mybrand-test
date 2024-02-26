import { Request,Response } from "express";
import Like from "../models/Like";
import upload from "../config/multer";
import Blog from "../models/Blog";


export const addLike= async(req:Request, res: Response)=>{
    
    const blogId= req.params.id;
    const blog= await Blog.findById(blogId);
    if(!blog){
        res.status(400).send({message:'blog not found'});
    }
    if(blog){
        blog.likes+=1;
    }
    await blog?.save();
    return res.status(200).json(blog);
   
};
export const getLikes= async(req:Request, res: Response)=>{
    const like= await Blog.findOne({_id:req.params.id});
    res.json({likes:like?.likes});
}
export const deleteLike= async(req: Request, res: Response)=>{
    try{
        const blogId= req.params.id;
        const blog= await Blog.findById(blogId);
        if (blog){
            blog.likes--;
            blog.save();
            return res.status(200).send({blog});
        }
        
    }
    catch(error){
        res.status(500).send({error:"Server error"});
    }
    
    
}