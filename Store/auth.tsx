import { configureStore, createSlice } from "@reduxjs/toolkit"

type initialState = {
    isAdmin: boolean,
    isLoggedin: boolean,
    username: string
}

const initialState : initialState= {
    isAdmin : false,
    isLoggedin: false,
    username: ''
}
const authActions = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login(state: any, action: any){
            state.isLoggedin = true
            state.username = action.payload.username
        },
        authAdmin(state: any , action: any){
            state.isLoggedin = true,
            state.isAdmin = true
            state.username = action.payload.username
        },
        logout(state: any){
            state.isLoggedin = false,
            state.isAdmin = false,
            state.username = ''
        },
    }
})
export const authAction = authActions.actions;

export const authStore = authActions.reducer;
