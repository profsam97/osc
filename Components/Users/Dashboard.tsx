import { ModeComment, Person } from '@mui/icons-material'
import {  Grid, Skeleton, Stack, Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import { viewPostDefaultValue, viewUsersDefaultValue } from '../../Helpers/Types'
import {  useAllUserData, useUserPost } from '../../Hooks/useDataFetch'
import Layout from '../Layouts/Layout'
import Loader from '../UI/Loading'
import Cards from '../Utilities/Cards'

const Dashboard:NextPage = () => {
  interface auth {
   auth : {
    username: string
   } 
  }


  const username = useSelector((state: auth) => state.auth.username);
    const {isLoading, data: userPost, mutate:getUserPost} = useUserPost();
    const { data: userData} = useAllUserData();
    const users : viewUsersDefaultValue[] = userData?.data;
    const userPosts : viewPostDefaultValue[]  = userPost?.data
    const usersLen: number  = users?.length;
    const userPostsLen: number = userPosts?.length;
    React.useEffect(() => {
      getUserPost({username: username})
    },[username])
      const dashboardData = [
    {
     title: 'Users',
     count: usersLen,
     directory: '/users/users',
     color: '#337ab7',
     icon:  <Person  sx={{fontSize: 60}}/>
    },
     {
     title: 'Students',
     count: userPostsLen,
     directory: '/users/view',
     color: '#5cb85c',
     icon:  <ModeComment  sx={{fontSize: 60}}/>
    },
     {
     title: 'Lecturers',
     count: userPostsLen,
     directory: '/users/view',
     color: '#f0ad4e',
    icon:  <ModeComment  sx={{fontSize: 60}}/>
    }
  ]
  return (
    <Layout>
        <Typography variant='h6' sx={{fontSize: {xs:14, md: 20}}} >Welcome, {username}</Typography>
      <Grid container mt={2} spacing={{xs:2, sm: 3, md: 6,lg:2}}>
      {dashboardData.map((data) => {
          return (
          <>
          {isLoading ? 
          <Grid key={data.title} item xs={12} sm={6} md={4}>
          <Stack spacing={0.5}  sx={{width: {xs: 220, sm: 200, md: 250, lg: 310, xl: 350}}}>
          <Skeleton variant='rectangular'  animation='wave' height={158}  /> 
          <Skeleton  animation='wave' />
          </Stack>
          </Grid>
           :
        <Cards key={data.title} data={data}/>}
         </>
          )
      })}
        </Grid>
  
    </Layout>
  )
}

export default Dashboard