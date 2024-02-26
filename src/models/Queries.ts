import mongoose, {Schema,model} from "mongoose";
import { IQueries } from "../types/queries";
const querySchema= new Schema<IQueries>({
    name:{type: String},
    email:{type:String},
    query:{type: String},
    date:{type:Date, default: new Date()}
});
export default model('Query',querySchema);