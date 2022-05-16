import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (req:NextApiRequest, res: NextApiResponse){
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Posts?retryWrites=true&w=majority');
        const db = client.db();
        const post = db.collection('posts');
        const posts: any[] = await post.find({username: data.username}).toArray();
        res.status(200).json({data: posts})
        client.close()
}
