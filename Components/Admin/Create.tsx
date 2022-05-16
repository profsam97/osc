import { AddCircleOutlineOutlined, SendOutlined } from '@mui/icons-material'
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
  const onSubmit:SubmitHandler<CreatePostDefaultValue> = (data) => {
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
          <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.matric ? true : false}
              helperText={errors?.matric?.message}
              id="matric"
              label="Matric no"
              name="matric"
              autoComplete="matric"
              autoFocus
            />
          )}
          />
           <Controller
          name='course'
          control={control}
          render={({field, formState: {errors}}) => (
              <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.course ? true : false}
              helperText={errors?.course?.message}
              name="course"
              label="enter course"
              type="text"
              id="course"
              autoComplete="course"
            />
            )}
            />
          <Controller
          name='course_code'
          control={control}
          render={({field, formState: {errors}}) => (
           <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.course_code ? true : false}
              helperText={errors?.course_code?.message}
              name="course_code"
              label="course code"
              type="text"
              id="course_code"
              autoComplete="course_code"
            />
            )}
          />
          <Controller
          name='lecturer'
          control={control}
          render={({field, formState: {errors}}) => (
            <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.lecturer ? true : false}
              helperText={errors?.lecturer?.message}
              name="Lecturer"
              label="Lecturer Name"
              type="text"
              id="lecturer"
              autoComplete="lecturer"
            />
            )}
            />
          <Controller
          name='session_month'
          control={control}
          render={({field, formState: {errors}}) => (
           <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              type='text'
              error={errors?.session_month ? true : false}
              helperText={errors?.session_month?.message}
              name="session-month"
              label="Session month"
              id="section_month"
              autoComplete="section_month"
            />
              )}
          />
          <Controller
          name='session_year'
          control={control}
          render={({field, formState: {errors}}) => (
           <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.session_year ? true : false}
              helperText={errors?.session_year?.message}
              name="session_year"
              label="session_year"
              type="text"
              id="session_year"
              autoComplete="session_year"
            />
            )}

          />
          <Controller
          name='missed_mark'
          control={control}
          render={({field,  formState: {errors}}) => (
             <TextField
              margin="normal"
              required
              fullWidth
              {...field}
              error={errors?.missed_mark ? true : false}
              helperText={errors?.missed_mark?.message}
              label="Missed Mark"
              type="number"
              id="missed_mark"
              autoComplete="missed_mark"
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
              error={errors?.details ? true : false}
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