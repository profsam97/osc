import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { SendOutlined } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import  { useDataPost, useLoginUser } from '../Hooks/useDataFetch';
import { CircularProgress, FormHelperText } from '@mui/material';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authAction } from '../Store/auth';
import Loader from './UI/Loading';
import { loginUserDefaultValue } from '../Helpers/Types';
import Head from 'next/head';
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
})

export default function LoginPage() {

  const dispatch = useDispatch();
  const {  handleSubmit, control, getValues, reset, formState : {  isSubmitSuccessful } } = useForm<loginUserDefaultValue>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter();
  
  const newUserHandler = (data: any) => {
    const user = data?.data;  
    const {role, username} = user;    
    if(role === 'Admin'){ 
          dispatch(authAction.authAdmin({username}))
          router.push('/admin')
        }else{
          dispatch(authAction.login({username}))
          router.push('/users')
        }
  }
    const onSuccess = (data:any) => {
        sessionStorage.setItem('idToken', data.idToken)
      loginUser({email: data.email})
    }
    const {isLoading, isError, error, isSuccess, mutate} = useDataPost(onSuccess);
    const {isLoading: loginLoading, mutate: loginUser} = useLoginUser(newUserHandler);
 

  React.useEffect(() => {
    if(isSuccess){
      reset()
    }
    if(isError && !isSuccess){
      reset({
        ...getValues(), password: '' 
      })
    }
  }, [isSuccess, isError])

  const onSubmit: SubmitHandler<loginUserDefaultValue> = async (data) => {
  
    const signInData = {
      password: data.password,
      email: data.email,
      returnSecureToken: true
    }
     mutate(signInData)
  };

  return (
    <>
    <Head>
    <title>Login</title>
    <meta name='description' content='Please Login to your account' />
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}> 
          {loginLoading && <Loader/>}
          {isError && <FormHelperText sx={{color: 'red'}}> {error?.response?.data?.error?.message}</FormHelperText>}
          <Controller 
          name='email'
          control={control}
          render={({field, formState: {errors}}) => (
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              helperText={errors?.email?.message}
              error={errors?.email ? true : false}
              {...field}
            />
          )
          }
          />
          <Controller 
          control={control}
          name='password'
          render={({ field, formState: {errors} }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              helperText={errors?.password?.message}
              error={errors?.password ? true : false}
              label="Password"
              type="password"
              id="password"
              {...field}
              autoComplete="current-password"
            />
          )}
          />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendOutlined/>}
            >
              {isLoading && <CircularProgress/>}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  href="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item sx={{color: 'blue'}}>
                <Link href="/Register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
</>
  );
}