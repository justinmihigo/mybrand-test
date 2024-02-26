import mongoose, {Schema} from "mongoose"
import IBlog from "../types/blogTypes";
import { Commentschema } from "./Comment";
import Joi from "joi";
const schema= new Schema<IBlog>({
    title:String,
    content: String,
    image:String,
    comments:[Commentschema],
    likes:{ type:Number, default:0}
})
const blog=mongoose.model("Blog",schema);
export default blog;