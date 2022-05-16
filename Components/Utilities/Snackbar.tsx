import { Alert, Snackbar } from '@mui/material';
import { opendir } from 'fs';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { utilitiesAction } from '../../Store/utilities';
interface rootState {
  util : {
    message: string,
    snackbarOpen: boolean,
    severity: string,
  }
}
const Snapbar = () => {
    const open  = useSelector((state: rootState ) => state.util.snackbarOpen);

    const message = useSelector((state: rootState) => state.util.message);
    const severity = useSelector((state: rootState) => state.util.severity);
    const dispatch = useDispatch();
    const handleClose = (event:React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(utilitiesAction.snackbarEnd())
    } 
  return (

    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
    <Alert variant='filled' elevation={4} onClose={handleClose} severity={severity=== 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
       {message}
     </Alert>
    </Snackbar>
  )
}

export default Snapbar