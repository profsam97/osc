import { createSlice } from "@reduxjs/toolkit"

type initialState = {
    message: string,
    snackbarOpen: boolean,
    modalOpen: boolean,
    severity: string,
    isDeleting: boolean,
    post_id : string,
    user_id : string
}
const initialState : initialState = {
    message: '',
    snackbarOpen: false,
    severity: 'success',
    modalOpen: false,
    isDeleting: false,
    post_id: '',
    user_id : ''
} 

const utilities = createSlice({
    initialState,
    name: 'utility',
    reducers: {
        snackStart(state: any, action: any){
            state.message = action.payload.message
            state.snackbarOpen = true;
            state.severity = action.payload.severity
        },
        snackbarEnd(state: any){
            state.message = '';
            state.snackbarOpen = false;
            state.severity = 'success';
        },
        modalUserOpen(state: any, action: any){
            state.modalOpen = true;
            state.user_id = action.payload.u_id
        },
        modalPostOpen(state: any, action: any){
            state.modalOpen = true;
            state.post_id = action.payload.p_id
        },
        confirmDelete(state: any){
            state.isDeleting = true;
        },
        modalClose(state: any){
            state.modalOpen = false;
        },
        deletePostHandler(state: any){
            state.isDeleting = false;
            state.post_id = '';
        },
        deleteUserHandler(state: any){
            state.isDeleting = false;
            state.user_id = '';
        }
    }
})
export const utilitiesAction = utilities.actions;

export const utilitiesStore = utilities.reducer;