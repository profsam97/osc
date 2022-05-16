import type {  NextPage } from 'next'
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth'

const Home = () => {
   const router = useRouter();
   React.useEffect(() => {
   const idToken = sessionStorage.getItem('idToken');
   const isLoggedin = !!idToken;
    if(!isLoggedin){
       router.push('/Login')
     } else {
      router.push('/users')
     }
   }, [])  
   return (
    <>
    
    </>
   )

}

export default Home
