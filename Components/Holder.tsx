import React from 'react';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Holder : React.JSXElementConstructor<any> = (props) => {
    return(
        <>
        <Head>
            <title>Register</title>
            <meta name='description' content='Please Sign Up to make a Complaint' />
        </Head>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            {props.children}
        </Box>
        </Container>
        </>
    )
};

export default Holder;