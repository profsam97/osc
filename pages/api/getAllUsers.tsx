import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (req:NextApiRequest, res: NextApiResponse){
        const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Users?retryWrites=true&w=majority');
        const db = client.db();
        const user = db.collection('users');
        const users: any[] = await user.find().toArray();
        res.status(200).json({data: users})
        client.close()
}
