import React from 'react';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
    interface Holder {
        children: any,
        title: string
    }
const Holder : React.JSXElementConstructor<any> = (props : Holder) => {
        const  {title, children}= props;
    return(
        <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={`Please Sign ${title === 'Register' ? 'Up' : 'In' } to make a Complaint`} />
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
                Sign {title === 'Register' ? 'Up' : 'In' }
            </Typography>
            {children}
        </Box>
        </Container>
        </>
    )
};

export default Holder;