import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Truncate from '../../Helpers/Truncate'
import { viewPostDefaultValue } from '../../Helpers/Types'
import { useDeletePost, useUserPost } from '../../Hooks/useDataFetch'
import { utilitiesAction } from '../../Store/utilities'
import Layout from '../Layouts/Layout'
import Loader from '../UI/Loading'
 interface auth {
     auth: {
         username: string
     }
 }
const ViewPage:NextPage = () => {
    const router = useRouter();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    interface User {
        data: viewPostDefaultValue[]
    }
    interface util {
        util : {
            isDeleting: boolean,
            post_id: string
        }
    }

    const username = useSelector((state: auth) => state.auth.username);
    const isDeleting = useSelector((state: util) => state.util.isDeleting);
    const post_id = useSelector((state: util) => state.util.post_id);
    const {mutate: deletePost} = useDeletePost();
    const snackbar = {
        message: 'Post Deleted successfully',
        severity: 'error'
    }
    useEffect(() => {
      if(isDeleting){
        dispatch(utilitiesAction.snackStart(snackbar))
        dispatch(utilitiesAction.deletePostHandler())
        deletePost({post_id})
       const timeOut = setTimeout(() => {
        retryHandler();
        }, 2000)
    return (() => clearTimeout(timeOut));  
    }
    }, [isDeleting])
    const {isError, isLoading,  data, mutate:getUserPost} = useUserPost();
    const posts: User = data;
    const dispatch = useDispatch()
    const deletePostHandler = (id: string) => {
       dispatch(utilitiesAction.modalPostOpen({p_id: id}))
    }
    const retryHandler = () => {
        getUserPost({username: username})
    }
    useEffect(() => {   
    getUserPost({username: username})
    },[username])

    // console.log(isError)
  return (
    <Layout>
        <Box  sx={{alignItems:'center'}}>
        <Typography align='center' variant='h3' sx={{fontSize:{xs:15, md: 30, lg: 40}}}>UNIVERSITY OF LAGOS</Typography>
        <Typography align='center' variant='body1'>ONLINE STUDENT COMPLAINT PORTAL
            RESULT COMPLAINT
        </Typography>
        </Box>  
        {isLoading && <Loader/>}
        
        {data?.data?.length == 0 &&
        <Stack direction='row' mt={2}>
        <Typography variant="body1" color="text.secondaty">Such Empty. <Paper elevation={0} sx={{color:'blue', display: 'inline'}}> <Link  href='/users/create/'>click here to posts</Link></Paper></Typography>
        </Stack>}
        {isError && <h3>Something went wrong <Button variant='contained' color='primary' disabled={isLoading} onClick={retryHandler}>Retry</Button></h3>}
        {data?.data?.length > 0 &&  
             <TableContainer component={Paper} sx={{mt:2}}>
            <Table sx={{minWidth: 650, background: 'dark'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Username </TableCell>
                        <TableCell >Matric No</TableCell>
                        <TableCell >Course </TableCell>
                        <TableCell >Session </TableCell>
                        <TableCell >Lecturer</TableCell>
                        <TableCell >Missed Mark </TableCell>
                        <TableCell >Details </TableCell>
                        <TableCell >View </TableCell>
                        <TableCell >Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts?.data?.map(post => {
                        return (
                            <TableRow key={post._id.toString()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{post.username}</TableCell>
                                <TableCell >{post.matric}</TableCell>
                                <TableCell >{post.course}</TableCell>
                                <TableCell >{post.session_year}</TableCell>
                                <TableCell >{post.lecturer}</TableCell>
                                 <TableCell >{ post.missed_mark}</TableCell><TableCell>{Truncate(post.details, 30)}</TableCell> 
                                <TableCell ><Button variant='contained' onClick={() => router.push(`/post/${post._id.toString()}`)} color='primary'>View</Button> </TableCell>
                                <TableCell onClick={deletePostHandler.bind(null, post._id)}><Button variant='contained' color='error'>Delete</Button></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
}
          </Layout>
  )
}

export default ViewPage