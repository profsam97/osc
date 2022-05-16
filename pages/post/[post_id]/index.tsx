import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import {GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import DetailsPage from "../../../Components/detailsPage";
import Loader from "../../../Components/UI/Loading";
import { viewPostDefaultValue } from "../../../Helpers/Types";
type post = {
 posts: {
  _id: ObjectId,
  username: string,
  date: string,
  details: string
 }
}
const postDetails  = (props: post) =>{
   const router = useRouter();
   const {posts } = props;
   if(router.isFallback){
     console.log('sdsd')
     return <Loader/>
   }else{
   return  (
    <>
    <DetailsPage posts={posts} />
    </>
    ) 
   } 
}
interface IParams  extends ParsedUrlQuery{
  post_id : string
} 
export async function getStaticPaths(){
   const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Posts?retryWrites=true&w=majority');
        const db : Db = client.db();
        const post : Collection<viewPostDefaultValue> = db.collection('posts');
        const posts = await post.find({}, { projection:  {_id: 1}}).toArray();
        client.close()
  return {
    fallback: true,
    paths :  posts.map(post =>({params: {post_id: post._id.toString()},}))
  }
}
type getPost = {
  _id: ObjectId,
  username: string,
  date: string,
  details: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const {post_id}  = context.params  as IParams;
  const postLen = post_id.length
  if(postLen === 24 ){
  const client = await MongoClient.connect('mongodb+srv://samuel:TxxzfTXdwqJfCClt@cluster0.ic6ns.mongodb.net/Posts?retryWrites=true&w=majority');
  const db: Db = client.db();
  const posts : Collection<getPost>= db.collection('posts');
  const post = await posts.findOne({_id: new ObjectId(post_id.trim()) })
  client.close()
  if(post_id){
    try {
    return {
    props: {
      posts: {
        id: post?._id.toString(),
        username: post?.username,
        date: post?.date,
        details : post?.details
      }
    }
    }
   } catch (error) {
      
    }
  }
  return {
    notFound: true
  }
 } 
  return {
    notFound: true
  }
}
export default postDetails;
