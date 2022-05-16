import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewUsersDefaultValue } from '../../Helpers/Types'
import { useAllUserData, useDeleteUser } from '../../Hooks/useDataFetch'
import { utilitiesAction } from '../../Store/utilities'
import AdminLayout from '../Layouts/AdminLayout'
import Loader from '../UI/Loading'
interface util {
        util : {
            isDeleting: boolean,
            user_id: string
        }
    }
const Users: NextPage = () => {
    
    const dispatch = useDispatch()
    const isDeleting = useSelector((state: util) => state.util.isDeleting);
    const user_id = useSelector((state: util) => state.util.user_id);
    const {mutate: deleteUser} = useDeleteUser();

    const {refetch, isLoading, isError, isFetching, data } = useAllUserData();
    const snackbar = {
        message: 'User Deleted successfully',
        severity: 'error'
    }
    useEffect(() => {
      if(isDeleting){
        dispatch(utilitiesAction.snackStart(snackbar))
        deleteUser({user_id})
        dispatch(utilitiesAction.deleteUserHandler())
      }  
     setTimeout(() => {
        refetch()
      }, 2000);  
    }, [isDeleting])
    const deleteUserHandler = (id: string) => {
       dispatch(utilitiesAction.modalUserOpen({u_id: id}))
    }
    const users : viewUsersDefaultValue[] = data?.data
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
        <Typography variant='body1' color='text.secondary'>View Users</Typography>
        {isError && <Typography variant='body2'>Opps Something went wrong
         <Button variant='outlined' onClick={retryHandler} >Click here to retry</Button></Typography>}
        {isFetching && <Loader/>}
        {users?.length === 0 && <Typography variant='body2' align='center'> No User Yet</Typography>}
        {!isLoading  && users?.length !== 0 &&
             <TableContainer component={Paper} sx={{mt:2}}>
            <Table sx={{minWidth: 650, background: 'dark'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell >Username</TableCell>
                        <TableCell >Email </TableCell>
                        <TableCell >Created </TableCell>
                        <TableCell >Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map(user => {
                        return (
                            <TableRow key={user._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{user.username}
                                </TableCell>
                                <TableCell >{user.email}</TableCell>
                                <TableCell >{user.role}</TableCell>
                                <TableCell >{user.date}</TableCell>
                                <TableCell ><Button variant='contained' color='error' onClick={deleteUserHandler.bind(null, user._id)}>Delete</Button></TableCell>
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

export default Users;