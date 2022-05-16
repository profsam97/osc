import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (req : NextApiRequest, res : NextApiResponse){
 if(req.method === 'POST'){
        const data = req.body; 
        const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Posts?retryWrites=true&w=majority');
        const db = client.db();
        const MeetupsCollections = db.collection('posts');
        const result = await MeetupsCollections.insertOne(data);
        client.close();
        res.status(201).json({message: 'User Inserted'});
    }

}