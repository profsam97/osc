import { yupResolver } from '@hookform/resolvers/yup'
import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../Layouts/Layout'
import { useGetPostsData, useNewPost } from '../../Hooks/useDataFetch'
import Rules from '../../Helpers/Validatation'
import { utilitiesAction } from '../../Store/utilities'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import getDate from '../../Helpers/getDate'
import { CreatePostDefaultValue } from '../../Helpers/Types'
import TextInput from "../TextInput";
const CreatePage:NextPage = () => {

    type posts = {
        _id: string,
        course: string,
        course_code: string,
        session_month: string,
        session_year: string,
}   
    interface Auth {
      auth: {
        username: string
      }
    }
    const dispatch = useDispatch();
    const snackbar = {
      message: 'Posted Successfully',
      severity: 'success'
    }
    const router = useRouter();
    const username = useSelector((state: Auth)=> state.auth.username);
    const onSuccess = () => {
        dispatch(utilitiesAction.snackStart(snackbar));
        router.push('/users/view')
    }

    const {handleSubmit, reset, getValues, control, formState : {isSubmitSuccessful}} = useForm<CreatePostDefaultValue>({
      resolver: yupResolver(Rules),
      mode: 'onChange',
      defaultValues: {
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
        reset()
      }
    },[isSubmitSuccessful, reset])
    const {isLoading: isSubmitting, mutate: addPostHandler } = useNewPost(onSuccess);
    const onSubmit: SubmitHandler<CreatePostDefaultValue> = () => {
      const postData = {...getValues(), username, date: getDate}
      addPostHandler(postData)
    }
  const { isLoading, data} = useGetPostsData();
    console.log(data?.data)
    const posts : posts[] = data?.data;
  return (
    <Layout>
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
            render={({field: {value, onChange}, formState: {errors}}) => (
            <TextField
              margin="normal"
              required
              select
              fullWidth
              value={value}
              onChange={onChange}
              helperText={errors?.course?.message}
              error={!!errors?.course}
              label="select course"
              type="text"
              id="course"
              autoComplete="course"
            >
              {isLoading && 'Loading...'}
              {posts?.map((post) => {
                return (
                <MenuItem key={post._id?.toString()} value={post.course}>{post.course}</MenuItem>
               ) })}
              </TextField>
            )}
            />
           <Controller 
            name='course_code'
            control={control}
            render={({field : {onChange, value}, formState: {errors}}) => (
            <TextField
              margin="normal"
              required
              fullWidth
              select
              value={value}
              onChange={onChange}
              helperText={errors?.course_code?.message}
              error={!!errors?.course_code}
              name="course_code"
              label="course code"
              type="text"
              id="course_code"
              autoComplete="course_code"
            >
            {isLoading && 'Loading...'}
            {posts?.map((post) => {
                return (
                <MenuItem key={post._id?.toString()} value={post.course_code}>{post.course_code}</MenuItem>
               ) })}
              </TextField>
              )}
              />
            <Controller 
            name='lecturer'
            control={control}
            render={({field , formState: {errors}}) => (
                <TextInput
                    data={errors?.lecturer} field={field} id='lecturer'
                />
            )}
            />
            <Controller 
            name='session_month'
            control={control}
            render={({field: {onChange, value}, formState: {errors}}) => (
             <TextField
              margin="normal"
              required
              fullWidth
              select
              value={value}
              onChange={onChange}
              helperText={errors?.session_month?.message}
              error={!!errors?.session_month}
              name="session-month"
              label="Session month"
              type="text"
              id="section_month"
              autoComplete="section_month"
            >
            {isLoading && 'Loading...'}
            {posts?.map((post) => {
                return (
                <MenuItem key={post._id?.toString()} value={post.session_month}>{post.session_month}</MenuItem>
               ) })}
              </TextField>
            )}
            />
            <Controller 
            name='session_year'
            control={control}
            render={({field : {onChange, value}, formState: {errors}}) => (
            <TextField
              margin="normal"
              required
              fullWidth
              select
              value={value}
              onChange={onChange}
              helperText={errors?.session_year?.message}
              error={!!errors?.session_year}
              name="session_year"
              label="session_year"
              type="text"
              id="session_year"
              autoComplete="session_year"
            >
            {isLoading && 'Loading...'}
            {posts?.map((post) => {
                return (
                <MenuItem key={post._id?.toString()} value={post.session_year}>{post.session_year}</MenuItem>
               ) })}
              </TextField>
              )}
            />
            <Controller 
            name='missed_mark'
            control={control}
            render={({field, formState: {errors}}) => (
                <TextInput
                    data={errors?.missed_mark} field={field} id='missed_mark'
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
              helperText={errors?.details?.message}
              error={!!errors?.details}
              name="details"
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
              endIcon={<AddCircleOutlineOutlined/>}
              disabled={isSubmitting}
            >
              Submit {isSubmitting && <CircularProgress/>}
            </Button>
          </Box>
    </Layout>
  )
}

export default CreatePage