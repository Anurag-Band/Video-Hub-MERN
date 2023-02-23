import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Loader from '../../assets/loading.svg';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(undefined);
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePic', profilePic);
    formData.append('role', role);

    dispatch(signup(Object.fromEntries(formData)))
      .then(unwrapResult)
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setProfilePic(undefined);
        setRole('');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='name'
                label='Full Name'
                name='name'
                autoComplete='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='file'
                name='profilePic'
                accept='image/*'
                hidden
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl size='medium' fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  value={role}
                  label='Age'
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={'creator'}>Creator</MenuItem>
                  <MenuItem value={'student'}>Student</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={status === 'LOADING'}
          >
            {status === 'LOADING' ? (
              <img src={Loader} alt='Loading...' />
            ) : (
              'Sign Up'
            )}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link color={'secondary.main'} href='/login'>
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
