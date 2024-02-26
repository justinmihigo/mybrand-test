import mongoose,{Schema, model} from "mongoose";
import IComment from "../types/commentTypes";
import blog from "./Blog";
export const Commentschema= new Schema<IComment>({
    name:{type: String},
    email:{type: String},
    comment:{type: String},
    date:{type: Date, default: new Date()},
});
const Comment=model('Comment',Commentschema);
export default Comment;
