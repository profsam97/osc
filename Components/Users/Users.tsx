import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import React from 'react'
import Layout from '../Layouts/Layout'

function createData(    
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number)
    {
     return {name, calories, fat, carbs, protein};
   }

 const rows = [
     createData('Frozen yogurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
     createData('Eclair', 262, 16.0, 24, 6.0),
     createData('Cupcake', 305, 3.7 , 67, 4.3),
     createData('GingerBread', 356, 16.0, 49, 3.9),
 ]
const Users:NextPage = () => {
  return (
    <Layout>
        <Box  sx={{alignItems:'center'}}>
        <Typography align='center' variant='h3' sx={{fontSize:{xs:20, md: 30, lg: 40}}}>UNIVERSITY OF LAGOS</Typography>
        <Typography align='center' variant='body1'>ONLINE STUDENT COMPLAINT PORTAL
            RESULT COMPLAINT
        </Typography>
        </Box>  
        <Typography variant='body1' color='text.secondary'>View Users</Typography>
             <TableContainer component={Paper} sx={{mt:2}}>
            <Table sx={{minWidth: 650, background: 'dark'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell >Username</TableCell>
                        <TableCell >Email </TableCell>
                        <TableCell >Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell >{row.calories}</TableCell>
                                <TableCell >{row.fat}</TableCell>
                                <TableCell ><Button variant='contained' color='error'>Delete</Button></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
          </Layout>
  )
}

export default Users;