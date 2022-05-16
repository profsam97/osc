import { ArrowRightAlt, Person } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

export interface IAppProps {
  data: {
     title: string,
     count: number,
     directory: string,
     color: string,
     icon: any
  }  
}
interface auth {
  auth : {
    isAdmin: boolean
  }
}

export default function Cards (props: IAppProps) {
    const isAdmin = useSelector((state: auth) => state.auth.isAdmin);
    const {title, count, directory, icon, color} = props.data;
    const router = useRouter();
  return (
  <>
   <Grid item xs={12} sm={6}md={4}>
     <Box 
        sx={{
          borderTopLeftRadius:3,
          borderTopRightRadius: 3,
          p: 3,
          backgroundColor: `${color}`,
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          <Stack direction='row' sx={{justifyContent: 'space-between', color: '#fff'}}>
            <Box 
            sx={{width: 70, height: 70, mt:3}}>
              {icon}
            </Box>
              <Stack direction='column' >
            <Typography variant='h2'  alignSelf='flex-end' >{count}</Typography>
           <Typography variant='subtitle2' >{title}</Typography>
          </Stack>
          </Stack>
        </Box>
        <Button sx={{borderTopLeftRadius: 0, borderTopRightRadius: 0, color: `${color}`  }} variant='outlined' fullWidth  endIcon={<ArrowRightAlt/>} disabled={title === 'Users' && !isAdmin } onClick={() => router.push(`${directory}`)}>View Details</Button>
        </Grid>
     </>
  )
}
