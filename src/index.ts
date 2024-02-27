import express, { Express} from "express";
import routes from "./routes";
import passport from "passport";
import dbConnection from "./config/db"
import bodyParser from "body-parser";
    const app: Express = express();
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({ extended:false}));
    app.use(express.json());
    app.use("/api", routes);
     // dbConnection(); 
  //   try{
  //      app.listen(5000, () => {
  //     console.log("Server has started!");
  //      });
  //   }
  // catch(error){
  //   console.error("Error Starting the server:", error);
  // }
  export default app;