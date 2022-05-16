
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { createPostDefaultValue, createUserDefaultValue, createUserDefaultValueMongodb } from '../Helpers/Types';

export default function useDataFetch (onSuccess: any) {
    const signUpHandler = async (data: object) => {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASimw07XUpe9_-ZnTER035z08A8jxrUSQ`, data)
        return response.data;
    }
    return useMutation(signUpHandler, {
       onSuccess,
       onError: async (data: any) => {    
        // console.log(data.response.data.error.message)
        return data;
      },
    });
}

export  function useDataPost (onSuccess: any) {
    const signInHandler = async (data: object) => {
        const response =  await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASimw07XUpe9_-ZnTER035z08A8jxrUSQ`, data)
        return response.data;
    }
    return useMutation('signIn', signInHandler, {
        onSuccess,
        onError: async(data: any) => {
            console.log(data)
        }
    });
}

export function useNewUser () {
    const newUserHandler = async(data: createUserDefaultValueMongodb) => {
        const response = await axios.post(`/api/new-user`, data)
        return response.data;
    }
    return useMutation(newUserHandler, {
        onError: async(data: any) => {
            console.log(data)
        }
    });
}
export function useLoginUser (onSuccess: any) {
    interface data {
        email: string
    }
    const newUserHandler = async(data: data) => {
        const response = await axios.post('/api/login', data)
        return response.data;
    }
    return useMutation(newUserHandler, {
        onError: async(data: object) => {
            console.log(data)
        }, 
        onSuccess
    });
}
export function useNewPost (onSuccess: any) {
    const newPostHandler = async(data: createPostDefaultValue) => {
        const response = await axios.post('/api/post', data)
        return response.data;
    }
    return useMutation(newPostHandler, {
        onError: async(data: object) => {
            console.log(data)
        }, 
        onSuccess
    });
}
export function useUserPost () {
    interface defaultValue {
        username: string
    }
    const userPostHandler = async(data: defaultValue) => {
        const response = await axios.post('/api/getUserposts', data)
        return response.data;
    }
    return useMutation(userPostHandler, {
        onError: async(data: object) => {
            console.log(data)
        }, 
    });
}
export function useGetPostsData () {
    const getPostHandler = async() => {
        const response = await axios.get('/api/getAllPosts')
        return response.data;
    }
    return useQuery('getPostData', getPostHandler, {
        onError: async(data: object) => {
            console.log(data)
        }
    });
}
export function useAllUserData () {
    const getAllUserHandler = async() => {
        const response = await axios.get('/api/getAllUsers')
        return response.data;
    }
    return useQuery('getAllUserData', getAllUserHandler, {
        onError: async(data: object) => {
            console.log(data)
        },
    });
}
export function useDeletePost () {
    type defaultType = {
        post_id: string
    }
    const deletePostHandler = async(data: defaultType) => {
        const response = await axios.post('/api/deletePost', data)
        return response.data;
    }
    return useMutation(deletePostHandler, {
        onError: async(data: object) => {
            console.log(data)
        }, 
        
    });
}
export  function useDeleteUser () {
    type defaultType = {
        user_id: string
    }
    const deleteUserHandler = async(data: defaultType) => {
        const response = await axios.post('/api/deleteUser', data)
        const idToken = sessionStorage.getItem('idToken');
        const data1 = {
            idToken
        }
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyASimw07XUpe9_-ZnTER035z08A8jxrUSQ`, data1)
        return response.data;
    }
    return useMutation(deleteUserHandler, {
        onError: async(data: object) => {
            console.log(data)
        }, 
        
    });
}