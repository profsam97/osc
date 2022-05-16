import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (req: NextApiRequest, res : NextApiResponse) {
  const data = req.body;
  const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Users?retryWrites=true&w=majority');
  const db = client.db();
  const meetupCollection = db.collection('users');
  const users = await meetupCollection.findOne({email: (data.email)})
     client.close()
 
     res.status(200).json({ data: users });
}