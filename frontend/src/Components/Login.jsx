import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { login } from '../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {userLogin} from '../actions/authActions'

const Login = () => {
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const isUserAuthenticated = useSelector(state => state?.auth?.isUserAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignIn = (event) => {
    event.preventDefault();
    login(formValue).then(res => {
      if(res.status == 200) {
        toast.success("Logged in Successfully");
        res = res.data;
        const authToken = res.authToken;
        const userData = res.userData;
        dispatch(userLogin({authToken, userData})); 
      }
    })
  }

  useEffect(() => {
    if(isUserAuthenticated) {
      navigate('/');
    }
  }, [isUserAuthenticated])

  return (
    <Box sx={{ paddingTop: 8, height: '100vh', overflowY: 'auto', background: 'url(assets/login-background.svg)', backgroundSize: 'cover', boxSizing: 'border-box' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 15px'
        }}
      >
        <Typography component="h1" variant="h5">
          My Vocab
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSignIn}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type='email'
            autoFocus
            value={formValue.email}
            onChange={(event) => setFormValue({...formValue, email: event.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formValue.password}
            onChange={(event) => setFormValue({...formValue, password: event.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link  to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  )
}

export default Login