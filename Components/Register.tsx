import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import { CircularProgress, Radio } from '@mui/material';
import { Router, SendOutlined } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { utilitiesAction } from '../Store/utilities';
import useDataFetch, { useNewUser } from '../Hooks/useDataFetch';
import {authAction} from '../Store/auth';
import { useRouter } from 'next/router';
import getDate from '../Helpers/getDate';
import Loader from './UI/Loading';
import { createUserDefaultValue } from '../Helpers/Types';
import Head from 'next/head';
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
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            {isError && <FormHelperText sx={{color: 'red'}}>{error?.response?.data?.error?.message}</FormHelperText>}
            <Controller
            name='username'
            control={control}
            render={({field, formState: {errors}  }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              error={errors?.username ? true : false}
              helperText={errors?.username?.message}
              {...field}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            )}
            />
           <Controller 
           control={control}
           name='email'
           render={({ field, formState: {errors}}) => (
           <TextField
              margin="normal"
              required
              fullWidth
              helperText={errors?.email?.message}
              error={errors?.email ? true : false}
              {...field}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
           )}
           />
            <Controller 
            name='password'
            control={control}
            render={({field, formState:{errors}}) => (
            <TextField
              margin="normal"
              required
              fullWidth
              helperText={errors?.password?.message}
              error={errors?.password ? true : false}
              {...field}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            )}
            />
     <Controller 
     name='role'
     control={control}
     render={({ field: {value, onChange}, formState: { errors}}) => (
    <FormControl  error={errors?.role ? true : false}>
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
        </Box>
      </Container>
  </>
  );
}