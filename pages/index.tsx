import axios from 'axios'
import type { GetStaticProps, NextPage } from 'next'
import { isAdmin } from '../Helpers/Auth'

const Home: NextPage = () => {
  return (
    <>
    </>

  )

}

  export  async function getStaticProps(){
     const response = await axios.get('http://localhost:3000/api/auth');
     const data = await response.data;
     if(data){
     return {
       redirect: {
         destination: '/Login'
       }
     }
    }
       return {
         props: {}
     }
  }
export default Home
