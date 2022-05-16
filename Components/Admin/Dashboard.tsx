import { ModeComment, Person } from '@mui/icons-material'
import {  CircularProgress, Grid, Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import { viewPostDefaultValue, viewUsersDefaultValue } from '../../Helpers/Types'
import { useAllUserData, useGetPostsData } from '../../Hooks/useDataFetch'
import AdminLayout from '../Layouts/AdminLayout'
import Loader from '../UI/Loading'
import Cards from '../Utilities/Cards'

const Dashboard:NextPage = () => {
  interface auth {
    auth : {
      username: string
    }
  }
  const username = useSelector((state: auth) => state.auth.username).toUpperCase();
    const { isLoading, data: getUser} = useAllUserData();
    const {  data:getPosts} = useGetPostsData();
    const posts : viewPostDefaultValue[] = getPosts?.data;
    const users : viewUsersDefaultValue[] = getUser?.data;
    const postsLen: number = posts?.length;
    const usersLen: number  = users?.length;
      const dashboardData = [
    {
     title: 'Users',
     count: usersLen,
     directory: '/admin/users',
     color: '#337ab7',
     icon:  <Person  sx={{fontSize: 60}}/>
    },
     {
     title: 'Students',
     count: postsLen,
     directory: '/admin/view',
     color: '#5cb85c',
     icon:  <ModeComment  sx={{fontSize: 60}}/>
    },
     {
     title: 'Lecturers',
     count: postsLen,
     directory: '/admin/view',
     color: '#f0ad4e',
     icon:  <ModeComment  sx={{fontSize: 60}}/>
    }
  ]
  return (
    <AdminLayout>
        <Typography variant='h6' sx={{fontSize: {xs:14, md: 20}}} >Welcome, {username}</Typography>
        {isLoading && <Loader/>}
        {!isLoading && <Grid container mt={2} spacing={2}>
        {dashboardData.map((data) =>  (
          <Cards key={data.title} data={data} />
        ))}
        </Grid>}
   
    </AdminLayout>
  )
}

export default Dashboard