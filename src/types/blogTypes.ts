interface IBlog{
    title: string,
    content: string,
    image: string,
    date?: Date,
    likes: number,
    comments?:[] | any;
}
export default IBlog;