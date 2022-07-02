import * as React from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import { CircularProgress, Radio } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { utilitiesAction } from '../Store/utilities';
import useDataFetch, { useNewUser } from '../Hooks/useDataFetch';
import {authAction} from '../Store/auth';
import { useRouter } from 'next/router';
import getDate from '../Helpers/getDate';
import { createUserDefaultValue } from '../Helpers/Types';
import TextInput from "./TextInput";
import Holder from "./Holder";
const schema = yup.object().shape({
  username: yup.string().required().min(6),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  role: yup.string().required()
})
export default function RegisterPage() {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, getValues} = useForm<createUserDefaultValue>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: ''
    }
  })
    type data = {
      idToken: string
    }
  const router = useRouter();
         const onSuccess = (data: data) => {
         const {username, email, role} = getValues(); 
         const userData = {username, email,role, date: getDate}
         sessionStorage.setItem('idToken', data.idToken)
         const snackData = {
        message: `Hi ${username}, You have successfully Sign up`,
        severity: 'success'
       } 
        addUser(userData);
        if(role === 'Admin'){
          dispatch(authAction.authAdmin({username}))
          router.push('/admin')
        }else{
          dispatch(authAction.login({username}));
          router.push('/users')
        }
            dispatch(utilitiesAction.snackStart(snackData));
      }
  const {isLoading, isError, error, isSuccess, mutate} = useDataFetch(onSuccess);
    React.useEffect(() => {
    if(isSuccess){
      reset()
    }
    if(isError){
      reset({
        ...getValues(), password: ''
      })
    }
  }, [isSuccess, isError])
    const { mutate: addUser  } = useNewUser();
    const onSubmit: SubmitHandler<createUserDefaultValue> = (data) => {
      const signUpData = {
        password: data.password,
        email: data.email,
        returnSecureToken: true
      }
      mutate(signUpData)    
  };
  return (
    <Holder>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            {isError && <FormHelperText sx={{color: 'red'}}>{error?.response?.data?.error?.message}</FormHelperText>}
            <Controller
            name='username'
            control={control}
            render={({field, formState: {errors}  }) => (
            <TextInput
                 data={errors.username} field={field} id='username'
              />
            )}
            />
           <Controller 
           control={control}
           name='email'
           render={({ field, formState: {errors}}) => (
               <TextInput
                   data={errors?.email} field={field} id='email' type='email'
               />
           )}
           />
            <Controller
            name='password'
            control={control}
            render={({field, formState:{errors}}) => (
                <TextInput
                    data={errors?.password} field={field} id='password' type='password'
                />
            )}
            />
     <Controller 
     name='role'
     control={control}
     render={({ field: {value, onChange}, formState: { errors}}) => (
    <FormControl  error={!!errors?.role}>
      <FormLabel>Role </FormLabel>
      <RadioGroup value={value}  onChange={onChange} sx={{display:'inline'}} >
        <FormControlLabel value='User' control={<Radio/>} label='User'/>
        <FormControlLabel value='Admin' control={<Radio/>} label='Admin'/>
      </RadioGroup>
      <FormHelperText>{errors?.role?.message}</FormHelperText>
      </FormControl>
     )}
     />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendOutlined/>}
            >
              Register
              {isLoading && <CircularProgress/>}
            </Button >
            <Grid container>
              <Grid item sx={{color: 'blue'}}>
                <Link href="/Login">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
    </Holder>
  );
}