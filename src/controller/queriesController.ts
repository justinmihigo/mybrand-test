import express,{Request, Response} from "express";
import Queries from "../models/Queries";
import { queryValidation } from "../utils/validation";
export const getQueries = async (req: Request, res: Response) => {
    try {
        const queries = await Queries.find();
        res.send(queries);
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};

export const createQuery = async (req: Request, res: Response )=>{
    const{name,email,query}= req.body;
    try {
        const querynew = new Queries({
          name,
          email,
          query,
        });
        const {error}=queryValidation(req.body);
        if(error){
          res.status(400).send ({error: error.message});
          console.log(error);
        }
        await querynew.save();
        res.send(querynew);
      } catch (error) {
        res.status(400).send({ error: "Invalid request" });
      }
};

export const getQueryById = async (req: Request, res: Response) => {
    try {
        let query = await Queries.findOne({ _id: req.params.id });
        // const comme=await Comment.findOne({blogId:req.params.id});
        if (!query) {
          res.status(404).send({ error: "Query not found" });
          return;
        }
        res.send(query);
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};

// export const updateQuery = async (req: Request, res: Response) => {
//     try {
//         const query= await Queries.findOne({ _id: req.params.id });
//         if (!query) {
//           res.status(404).send({ error: "Blog not found" });
//           return;
//         }
//         if (req.body.name) {
//           query.name = req.body.name;
//         }
//         if (req.body.email) {
//           query.email = req.body.email;
//         }
//         if(req.body.query)
//         {
//             query.query = req.body.query;  
//         }
//         await query.save();
//         res.send(query);
//       } catch (error) {
//         res.status(500).send({ error: "Server error" });
//       }
//     };

export const deleteQuery = async (req: Request, res: Response) => {
    try {
        const deletedQuery = await Queries.deleteOne({ _id: req.params.id });
        if (deletedQuery.deletedCount === 0) {
          res.status(404).send({ error: "Query not found" });
          return;
        }
        res.status(204).send({message:'deleted successfully'});
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};