import { NextApiRequest, NextApiResponse } from "next";
import { useSelector } from "react-redux";

interface auth  {
    auth : {
        isAdmin : boolean
    }
}
export default async function handler(req :NextApiRequest, res: NextApiResponse){
    // const isAdmin = useSelector((state: auth) => state.auth.isAdmin);

    res.status(200).json({data: true});

}