import * as React from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { SendOutlined } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import  { useDataPost, useLoginUser } from '../Hooks/useDataFetch';
import { CircularProgress, FormHelperText } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authAction } from '../Store/auth';
import Loader from './UI/Loading';
import { loginUserDefaultValue } from '../Helpers/Types';
import TextInput from "./TextInput";
import Holder from "./Holder";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
})

export default function LoginPage() {

  const dispatch = useDispatch();
  const {  handleSubmit, control, getValues, reset } = useForm<loginUserDefaultValue>({
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
      <Holder>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {loginLoading && <Loader/>}
          {isError && <FormHelperText sx={{color: 'red'}}> {error?.response?.data?.error?.message}</FormHelperText>}
          <Controller 
          name='email'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.email} field={field} id='email'
              />
          )
          }
          />
          <Controller 
          control={control}
          name='password'
          render={({ field, formState: {errors} }) => (
              <TextInput
                  data={errors?.password} field={field} id='password' type='password'
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
              <Grid item sx={{color: 'blue'}}>
                <Link href="/Register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Holder>
  );
}