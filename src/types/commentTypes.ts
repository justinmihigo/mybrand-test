import { Types, Schema } from "mongoose"
interface IComment{
    name: string,
    email: string,
    blogId: Schema.Types.ObjectId,
    comment: string,
    date: Date
}
export default IComment;