import { LocationCityOutlined } from '@mui/icons-material'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ObjectId } from 'mongodb'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Loader from './UI/Loading'
type post = {
 posts: {
  _id: ObjectId,
  username: string,
  date: string,
  details: string
 }
}
const DetailsPage = (props: post) => {
  const router = useRouter();
  if(router.isFallback){
     console.log('sdsd')
     return <Loader/>
   }
  const {username, date, details} = props.posts;
  return (
    <>
      <Head>
      <title>{username} complains about his result</title>
      <meta name ='description' content={details} />
    </Head>
    <Container component='main' maxWidth='xl'>
    <Box
    sx={{
        display: 'flex',
        mt: 5,
        p:2,
        flexDirection: 'column',
    }}
    >
    <Grid container spacing={3}>
    <Grid item xs={12} sm={8}>
    <Typography   variant="h6" color="initial">
    Posted by, {username}
    </Typography>
    <Typography variant='body1' mt={3}>
    {details}
    </Typography>
    <Button sx={{mt:2}}  onClick={() => router.back()} variant='outlined'>Go Back</Button>
    </Grid>
    <Grid item xs={0}  sm={1} />
     <Grid item xs={12} sm={3}>
    <Typography variant='h6'>
     <LocationCityOutlined/> Posted on {date}.
     </Typography>
    </Grid>
    </Grid>
    </Box>

    </Container>
    </>
  )
}

export default DetailsPage