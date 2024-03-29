import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, InputLabel, Select, MenuItem, FormHelperText, TextField, FormControl, IconButton } from '@mui/material';
import axios from 'axios';

//Service
import { validUser } from '../Services/Regex';

//Icon import
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';

const API_URL = "https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev"

interface Props{
    uOpen: boolean;
    reUser: Function;
    stID: any;
}

interface State{
    id: string;
    username: string;
    password: string;
    confirm: string;
    group: string;
    token: any;
    showPassword: boolean;
    showComfirm: boolean;
}

const UserBox = ( { uOpen, reUser, stID }:Props) =>{

    const [userOpen, setUserOpen] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const [ count , setCount ] = useState<number>(0);
    const [ values, setValues ] = useState<State>({
        id:'',
        username: '',
        password: '',
        confirm: '',
        group: '',
        token: '',
        showPassword: false,
        showComfirm:false
    });

    const [ message, setMessage ] = useState<any>('');
    const [ usergroup, setUserGroup ] = useState<any>();

    //Validation
    const [ userError, setUserError ] = useState<boolean>(false);
    const [ passError, setPassError ] = useState<boolean>(false);
    const [ conError, setConError ] = useState<boolean>(false);
    const [ groupError, setGroupError ] = useState<boolean>(false);

    let navigate = useNavigate();

    const descriptionElementRef = useRef<HTMLElement>(null);

    const fetch = async () =>{   
        setError(false);
        try {
            const data = await axios.get(API_URL +'/user/group/');
            setUserGroup(data.data.body);
        } catch {
          setError(true);
        }
    };

    if(uOpen){
        if(count === 0){
            setCount(1);
            setUserOpen(true);
        }
    }

    useEffect(()=>{
        if(userOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    },[userOpen]);

    useEffect( () => {
        fetch();
    },[]);

    useEffect( () => {
        if(stID !== ''){
            getOneData(stID);
        }
    },[stID])

    const getOneData = async (e:any) => {
        console.log(e);
        await axios.post(API_URL + "/user/create", {
            id: e,
            token: sessionStorage.getItem('token')
        }).then((response) => {
                setValues({
                    id: response.data.body[0]._id,
                    username: response.data.body[0].username,
                    password: '',
                    confirm: '',
                    token:'',
                    group: response.data.body[0].group,
                    showPassword: false,
                    showComfirm: false
                });
            }).catch(error =>{
                setMessage(error);
            });
    };

    const handleClose = () => {
        setValues({
            id:'',
            username: '',
            password: '',
            confirm: '',
            group: '',
            token: '',
            showPassword: false,
            showComfirm:false
        });
        setUserOpen(false);
        setCount(0);
        reUser(false);
        setUserError(false);
        setPassError(false);
        setConError(false);
        setGroupError(false);
    }

    const handleDel = async (e:any) => {
        await axios.delete(API_URL + "/user", {
            data: { id: stID , token: sessionStorage.getItem('token')}}
        ).then((response)=>{
            if(response.data.body === 'SUCCESS'){
                handleClose();
            }else{
                setMessage(response.data.body)
            }
            
        }).catch(error =>{
            setMessage(error);
        });
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }

    const handleClickShowComfirm = () => {
        setValues({...values, showComfirm: !values.showComfirm});
    }

    const submit = async () => {
        if( userError === false && passError === false && conError === false && groupError === false ){
            try {
                await axios.post(API_URL + "/user/create", values)
                    .then((response)=>{
                        if(response.data.body.message === 'SUCCESS' || response.data.body.message.modifiedCount ){
                            handleClose();
                        }else{
                            setMessage('This account already existed');
                        }
                });
            } catch {
              setError(true);
            }
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(values.password === ''){
            setPassError(true);
        }else{
            setPassError(false);
        }
        if(values.password !== values.confirm){
            setConError(true);
        }else{
            setConError(false)
        }
        if(!validUser.test(values.username)){
            setUserError(true);
        }else{
            setUserError(false);
        }
        if(values.group === ''){
            setGroupError(true);
        }

        if(sessionStorage.getItem('token')){
            values['token'] = sessionStorage.getItem('token');
        }



        submit();
        
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        setValues({...values, [prop]: event.target.value});
    }

    const handleSelectChange = (e:any) => {
        setValues({...values, ['group']: e.target.value});
    }

    return (
        <>
            <Dialog
                open={userOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle
                        >Create
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>{message}</div>
                            <FormControl fullWidth>
                                <div>{message}</div>
                                <TextField 
                                    error={userError===true}
                                    disabled={stID?true:false}
                                    fullWidth label="Username"
                                    name="username" 
                                    variant="standard"
                                    value={values.username}
                                    helperText={userError===true?"Please enter letter or Numer!":"Enter your username"}
                                    onChange={handleChange('username')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    error={passError===true}
                                    fullWidth label="Password"
                                    name="Password" 
                                    type={values.showPassword? 'text' : 'password' }
                                    value={ values.password }
                                    variant="standard"
                                    helperText={"Enter your password"}
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
                            <FormControl fullWidth>
                                <TextField 
                                    error={conError===true}
                                    fullWidth label="Confirm"
                                    name="Confirm" 
                                    type={values.showComfirm? 'text' : 'password' }
                                    value={ values.confirm }
                                    variant="standard"
                                    helperText={conError===true? values.confirm===''? "Enter your password":"Oops, that's not the same password as the first One":"Enter your password"}
                                    onChange={handleChange('confirm')}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowComfirm}
                                                edge="end"
                                            >
                                                {values.showComfirm? <VisibilityOff />: <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="group-label">Group</InputLabel>
                                <Select 
                                    error={groupError===true}
                                    fullWidth labelId="group-label" id="group" 
                                    label="group"
                                    value={values.group}
                                    onChange={handleSelectChange}
                                    >
                                    <MenuItem value=''></MenuItem>
                                    {usergroup && usergroup.map((item:any, index:any)=>{
                                        return <MenuItem key={index} value={item.group}>{item.group}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText error={groupError===true}>{groupError===true?'Please choose group':''}</FormHelperText>
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        {stID?<Button onClick={handleDel}>Delete</Button>:''}
                        <Button type="submit">{!stID?'Create':'Submit'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default UserBox;