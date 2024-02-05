import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, FormControl, IconButton } from '@mui/material';

//Service import
import AuthService from '../Services/auth.service';

//Icon import
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';

interface Props{
    logOpen: boolean;
    returnLog: Function;
}

interface State{
    username: string
    password: string;
    showPassword: boolean;
}

const LoginBox = ( { logOpen, returnLog }:Props) => {

    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [ count , setCount ] = useState<number>(0);
    const [ values, setValues ] = useState<State>({
        username: '',
        password: '',
        showPassword: false
    });
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<any>('');

    let navigate = useNavigate();

    const descriptionElementRef = useRef<HTMLElement>(null);

    const handleClose = () => {
        setLoginOpen(false);
        setCount(0);
        returnLog(false);
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }

    if(logOpen){
        if(count === 0){
            setCount(1);
            setLoginOpen(true);
        }
    }

    useEffect(()=>{
        if(loginOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    },[loginOpen]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setMessage('');
        setLoading(true);
        await AuthService.login(values.username, values.password).then(
            (response) => {
                if(response.statusCode === 200 ) {
                    navigate("/");
                    window.location.reload();
                    setLoading(false);
                }else if (response.statusCode === 400){
                    setMessage(response.body.message);
                }
            },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString;
                setMessage(resMessage);
            }
        );
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        setValues({...values, [prop]: event.target.value})
    }

    return (
        <>
            <Dialog
                open={loginOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormControl fullWidth>
                                <div>{message}</div>
                                <TextField 
                                    fullWidth label="Username"
                                    name="username" 
                                    variant="standard"
                                    helperText="Enter your username"
                                    onChange={handleChange('username')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField 
                                    fullWidth label="Password"
                                    name="Password" 
                                    type={values.showPassword? 'text' : 'password' }
                                    value={ values.password }
                                    variant="standard"
                                    helperText="Enter your password"
                                    onChange={handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword? <VisibilityOff />: <Visibility />}
                                                </IconButton>                                                        
                                        )
                                    }}
                                />
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type="submit">Login</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default LoginBox;