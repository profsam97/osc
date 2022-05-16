import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Modal from '../Components/Utilities/Modal';
import Snapbar from '../Components/Utilities/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider, useSelector } from 'react-redux';
import Store from '../Store';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand',
      fontWeightBold: 700,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600
    }
  })
  return (
    <QueryClientProvider client={client} >
    <Provider store={Store}>
    <ThemeProvider theme={theme}>
    <Snapbar/>
    <Modal/>
    <Component {...pageProps}/>
    </ThemeProvider>
    </Provider>
     <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
    )
}

export default MyApp
