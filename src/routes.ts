import express, { Request, Response } from "express";
import Blog from "./models/Blog";
import * as controller from "./controller/controller"
import * as likesController from "./controller/likeController"
import * as queriesController from "./controller/queriesController";
import passport from "./authentication/passport";
import upload from "./config/multer";
import cloudinary from "./utils/cloudinary";
import { login, register, secureRoute } from "./authentication/login";
const router = express.Router();

router.get("/blogs",controller.getPosts);

router.post("/blogs", passport.authenticate('jwt',{session:false}),
upload.single('image'),controller.createPost);

router.get("/blogs/:id", controller.getPostById);

router.patch("/blogs/:id", passport.authenticate('jwt',{session:false}),controller.updatePost);

router.delete("/blogs/:id", passport.authenticate('jwt',{session:false}),controller.deletePost);
// router.post("/blogs/:id/comments",controller.createComment);
router.post("/blogs/:id/comments",controller.commentCreate);

router.get("/blogs/:id/comments",controller.getAllComments);

router.delete("/blogs/:id/comments/:id",controller.deleteComment);

router.get("/blogs/:id/comments/:id",controller.getCommentbyID);

router.patch("/blogs/:id/comments/:id",controller.updateComments);

router.post("/blogs/:id/likes",likesController.addLike);

router.get("/blogs/:id/likes",likesController.getLikes);

router.delete("/blogs/:id/likes",likesController.deleteLike);

router.post("/queries", queriesController.createQuery);

router.get("/queries", queriesController.getQueries);

router.get("/queries/:id", queriesController.getQueryById);

// router.patch("/queries/:id", queriesController.updateQuery);

router.delete("/queries/:id", queriesController.deleteQuery);

router.post('/signup',register);

router.post('/login',login);

router.get('/secureRoute',passport.authenticate('jwt',{session:false}),secureRoute);

// router.post('/test',upload.single('image'),(req,res,next) => {
//     const img=req.file?.path;
//    res.send(img);
// })
export default router;
