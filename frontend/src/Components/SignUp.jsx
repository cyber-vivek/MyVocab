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
import { register } from '../services/apiServices';
import { toast } from 'react-toastify';
import { userLogin } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
    const [formValue, setFormValue] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const isUserAuthenticated = useSelector(state => state?.auth?.isUserAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignUp = (event) => {
        event.preventDefault();
        const formData = JSON.parse(JSON.stringify(formValue));
        delete formData.confirmPassword;
        register(formData).then((res) => {
            if (res.status === 200) {
                res = res.data;
                toast.success(res.message);
                const authToken = res.authToken;
                const userData = res.userData;
                dispatch(userLogin({authToken, userData}));
            }
        })
    }

    useEffect(() => {
        if (isUserAuthenticated) {
            navigate('/')
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
                    Sign Up
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSignUp}>
                    <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={formValue.name}
                        onChange={(event) => setFormValue({ ...formValue, name: event.target.value })}
                    />
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
                        onChange={(event) => setFormValue({ ...formValue, email: event.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        placeholder='Must be atleast 8 characters long'
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formValue.password}
                        onChange={(event) => setFormValue({ ...formValue, password: event.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm Password"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={formValue.confirmPassword}
                        error={formValue.password !== formValue.confirmPassword && formValue.confirmPassword.length}
                        helperText="Password should match"
                        onChange={(event) => setFormValue({ ...formValue, confirmPassword: event.target.value })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!(formValue.name.length && formValue.email.length && formValue.password.length && formValue.password === formValue.confirmPassword)}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
    )
}

export default SignUp