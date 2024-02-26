import mongoose, {Schema} from "mongoose";
export interface IUser{
    username: string,
    email: string,
    password: string
}
const userSchema= new Schema<IUser>({
    username: String,
    email: String,
    password: String
});

export default mongoose.model('User',userSchema);