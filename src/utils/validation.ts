import Joi from "joi";
import IBlog from "../types/blogTypes";
import passport from "passport";
export const loginValidation= (login:{email:string, password:string})=>{
    const schema=   Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()
    });
    return schema.validate(login);   
}

export const blogValidation=(blog:{title:string,content:string, image:string})=>{
    const blogSchema= Joi.object({
        title:Joi.string().required(),
        content: Joi.string().required().min(5),
        image: Joi.string().optional()
    })
    return blogSchema.validate(blog);
}

export const commentValidation=(comment:{name:string, email:string, comment:string})=>{
    const commentSchema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        comment: Joi.string().required()
    })
    return commentSchema.validate(comment);
}

export const queryValidation=(query:{name:string, email:string, query:string})=>{
    const commentSchema= Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        query: Joi.string().required()
    })
    return commentSchema.validate(query);
}

export const validateSignup= Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})