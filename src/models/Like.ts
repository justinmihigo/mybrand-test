import mongoose,{Schema}from "mongoose";
import ILike from "../types/likeTypes";
import blog from "./Blog";
const likeSchema=new Schema <ILike>({
    blogId:{type: Schema.Types.ObjectId, ref: blog},
    like:{type:Number, default:0},
    isLike:{type: Boolean, default:false}
})
export default mongoose.model<ILike>("likes",likeSchema);