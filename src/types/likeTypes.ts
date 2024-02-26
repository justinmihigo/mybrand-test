import mongoose, {Schema} from "mongoose";
export default interface ILike{
    blogId: Schema.Types.ObjectId;
    like:number;
    isLike: boolean;
}