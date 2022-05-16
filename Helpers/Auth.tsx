import { useSelector } from "react-redux"

interface Auth {
    auth : {
        isAdmin: boolean,
        isLoggedin: boolean
    }
}
export const isLoggedin = useSelector((state: Auth) => state.auth.isLoggedin);
export  const isAdmin = useSelector((state: Auth) => state.auth.isAdmin);
