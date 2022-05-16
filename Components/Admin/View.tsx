import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Truncate from '../../Helpers/Truncate'
import { viewPostDefaultValue } from '../../Helpers/Types'
import { useDeletePost, useGetPostsData } from '../../Hooks/useDataFetch'
import { utilitiesAction } from '../../Store/utilities'
import AdminLayout from '../Layouts/AdminLayout'
import Loader from '../UI/Loading'

interface util {
        util : {
            isDeleting: boolean,
            post_id: string
        }
    }
const ViewPage: NextPage = () => {
    const dispatch = useDispatch()
    const isDeleting = useSelector((state: util) => state.util.isDeleting);
    const post_id = useSelector((state: util) => state.util.post_id);
     const {mutate: deletePost} = useDeletePost();
const { refetch, isFetching, isError, isLoading, data:getPosts} = useGetPostsData();
    const posts: viewPostDefaultValue[] = getPosts?.data;
        const snackbar = {
        message: 'Post Deleted successfully',
        severity: 'error'
    }
    useEffect(() => {
      if(isDeleting){
        dispatch(utilitiesAction.snackStart(snackbar))
        deletePost({post_id})
        dispatch(utilitiesAction.deletePostHandler())
      }
      setTimeout(() => {
          refetch()
      }, 2000);  
    }, [isDeleting])
    const router = useRouter();
    const deletePostHandler = (id: string) => {
       dispatch(utilitiesAction.modalPostOpen({p_id: id}))
    }
    const retryHandler = () => {
        refetch()
    }
  return (
    <AdminLayout>
        <Box  sx={{alignItems:'center'}}>
        <Typography align='center' variant='h3' sx={{fontSize:{xs:20, md: 30, lg: 40}}}>UNIVERSITY OF LAGOS</Typography>
        <Typography align='center' variant='body1'>ONLINE STUDENT COMPLAINT PORTAL
            RESULT COMPLAINT
        </Typography>
        </Box>  
            {isFetching && <Loader/>}
            {posts?.length === 0 &&  <Stack direction='row' mt={2}>
        <Typography variant="body1" color="text.secondaty">You have not posted yet. <Paper elevation={0} sx={{color:'blue', display: 'inline'}}> <Link  href='/admin/create/'> click here to posts</Link></Paper></Typography>
        </Stack> }
         {isError && <Typography variant='body2'>Opps Something went wrong
            <Button variant='outlined' onClick={retryHandler} >Click here to retry</Button></Typography>}
        {!isLoading && posts?.length !== 0 &&  
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
                        <TableCell >Details </TableCell>
                        <TableCell >View</TableCell>
                        <TableCell >Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts?.map(post => {
                        return (
                            <TableRow key={post._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                    <TableCell component="th" scope="row">{post.username}</TableCell>
                                <TableCell >{post.matric}</TableCell>
                                <TableCell >{post.course}</TableCell>
                                <TableCell >{post.session_year}</TableCell>
                                <TableCell >{post.lecturer}</TableCell>
                                 <TableCell >{ post.missed_mark}</TableCell> 
                                 <TableCell >{Truncate(post.details, 30)}</TableCell> 
                                 <TableCell >{post.date}</TableCell> 
                                <TableCell ><Button variant='contained' color='primary' onClick={() => router.push(`/post/${post._id.toString()}`)} >View</Button></TableCell>
                                <TableCell ><Button variant='contained' color='error' onClick={deletePostHandler.bind(null, post._id)} >Delete</Button></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        }
          </AdminLayout>
  )
}
export default ViewPage
