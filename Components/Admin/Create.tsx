import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import AdminLayout from '../Layouts/AdminLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import  {useRouter} from  'next/router';
import { useNewPost } from '../../Hooks/useDataFetch'
import { useDispatch, useSelector } from 'react-redux'
import { utilitiesAction } from '../../Store/utilities'
import Rules from '../../Helpers/Validatation'
import getDate from '../../Helpers/getDate'
import { CreatePostDefaultValue } from '../../Helpers/Types'
import TextInput from "../TextInput";
const CreatePage:NextPage = () => {
   interface Auth {
     auth: {
       username: string
     }
   }

    const router = useRouter();
      
    const dispatch = useDispatch();
    const snackbar = {
      message: 'Posted Successfully',
      severity: 'success'
    }

    const username = useSelector((state: Auth)=> state.auth.username);

    const onSuccess = () => {
        dispatch(utilitiesAction.snackStart(snackbar));
        router.push('/admin/view')
    }
    const {isLoading, mutate: addPostHandler } = useNewPost(onSuccess);
  const onSubmit:SubmitHandler<CreatePostDefaultValue> = () => {
    const postData = {...getValues(), username, date: getDate}
    addPostHandler(postData)
    }

    const {handleSubmit, control, getValues, reset, formState: {isSubmitSuccessful}} = useForm<CreatePostDefaultValue>({
      resolver: yupResolver(Rules),
      mode: 'onChange',
      defaultValues:{
        matric: '',
        course: '',
        course_code: '',
        lecturer: '',
        session_month: '',
        session_year: '',
        missed_mark: 0,
        details: ''
      }
    })
    useEffect(() => {
      if(isSubmitSuccessful){
        // addPostHandler()
        reset()
      }
    }, [isSubmitSuccessful, reset])
  return (
    <AdminLayout>
        <Box  sx={{alignItems:'center'}}>
        <Typography align='center' variant='h3' sx={{fontSize:{xs:20, md: 30, lg: 40}}}>UNIVERSITY OF LAGOS</Typography>
        <Typography align='center' variant='body1'>ONLINE STUDENT COMPLAINT PORTAL
            RESULT COMPLAINT
        </Typography>
        </Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
          name='matric'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.matric} field={field} id='matric'
              />
          )}
          />
           <Controller
          name='course'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.course} field={field} id='course'
              />
            )}
            />
          <Controller
          name='course_code'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.course_code} field={field} id='course_code'
              />
            )}
          />
          <Controller
          name='lecturer'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.lecturer} field={field} id='lecturer'
              />
            )}
            />
          <Controller
          name='session_month'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.session_month} field={field} id='session_month'
              />
              )}
          />
          <Controller
          name='session_year'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextInput
                  data={errors?.session_year} field={field} id='session_year'
              />
            )}
          />
          <Controller
          name='missed_mark'
          control={control}
          render={({field,  formState: {errors}}) => (
              <TextInput
                  data={errors?.missed_mark} field={field} id='missed_mark' type='number'
              />
            )}
          />
          <Controller
          name='details'
          control={control}
          render={({field, formState: {errors}}) => (
          <TextField
              margin="normal"
              required
              fullWidth
              multiline={true}
              rows={3}
              {...field}
              error={!!errors?.details}
              helperText={errors?.details?.message}
              label="Enter Details"
              type="text"
              id="details"
              autoComplete="details"
            />
          )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              endIcon={<AddCircleOutlineOutlined/>}
            >
              Submit {isLoading && <CircularProgress/>}
            </Button>
          </Box>
    </AdminLayout>
  )
}

export default CreatePage