import { MongoClient } from 'mongodb'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Users from '../../Components/Admin/Users'

type user = {
    id: string,
    username: string,
    role: string,
    email: string
}
interface User {
  users :user[]
}
// const users = ({users} : User) => {
//   return (
//     // <Users users={users}/>
//   )
// }

// export default users;
export const  getStaticProps: GetStaticProps = async() => {
    const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Users?retryWrites=true&w=majority');
        const db = client.db();
        const post = db.collection('users');
        const users: any[] = await post.find().toArray();
        return {
            props: {
                users: users.map(user => ({
                    id: user._id?.toString(),
                    username: user.username,
                    role: user.role,
                    email: user.email
            }))
          }
        }
}
      
