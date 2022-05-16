import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, Theme } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { utilitiesAction } from '../../Store/utilities';

const style  = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};
  interface modal {
    util : {
      modalOpen: boolean
    }
  }
export default function BasicModal() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const open = useSelector((state: modal) => state.util.modalOpen);
  const handleClose = () => dispatch(utilitiesAction.modalClose());
  const confirmDelete = () => {
    setIsLoading(true);
    dispatch(utilitiesAction.confirmDelete())
    setTimeout(() => {
    setIsLoading(false)
    dispatch(utilitiesAction.modalClose());
    },2000)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            Are you Sure 
          </Typography>
        <Stack direction='row' spacing={2} mt={5} sx={{justifyContent: 'space-between'}}>
            <Button variant='contained' endIcon={<Cancel/>} 
            onClick={handleClose} color='info' >Cancel</Button>
            <Button variant='contained' endIcon={<Delete/>}
             color='error' onClick={confirmDelete} disabled={isLoading} >{!isLoading && 'Delete'}
             {isLoading && 'Deleting...'}</Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}
