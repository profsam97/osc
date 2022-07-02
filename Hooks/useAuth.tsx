import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

   interface authData {
  auth:{
  isAdmin: boolean
  }
}   
   export default  function useAuth () {
   const router = useRouter();

   const isAdmin = useSelector((state: authData) => state.auth.isAdmin);
   React.useEffect(() => {
    const idToken = sessionStorage.getItem('idToken');
   const isLoggedIn = !!idToken;
     if(!isLoggedIn){
       router.push('/Login')
     }
   }, [isAdmin])
}