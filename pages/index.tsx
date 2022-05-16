import type {  NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
    <h2>Nothing here</h2>
    </>

  )

}

  export  async function getStaticProps(){
     return {
       redirect: {
         destination: '/Login'
       },
       props: {
         some: 'nothing'
       }
     }
  }
export default Home
