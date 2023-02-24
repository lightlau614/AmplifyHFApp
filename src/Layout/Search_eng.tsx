import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Select, MenuItem, InputLabel, FormLabel,
    FormControl, ButtonGroup, Button, RadioGroup, Radio, FormControlLabel, IconButton, InputAdornment
    } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

//Component Import
import SearchFImage from '../Components/SearchFImage';
import SearchFtext from '../Components/SearchFtext';
import Loading from "../Resource/images/Spinner-1s-200px.svg";

//Icon Import
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = "https://yfvg5swaie.execute-api.ap-southeast-1.amazonaws.com/dev";
const API_TEXT_URL = "https://shs8u30cxj.execute-api.ap-southeast-1.amazonaws.com/dev";
const F_API_URL = "https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev"

const Search_eng = () => {

    const [ searchfile, setSearchfile ] = useState<string>('');
    const inputFile = useRef<HTMLInputElement>(null);
    const [ fileupload, setFileUpload ] = useState<any>('')
    const [ searchResult, setSearchResult ] = useState<any>('');
    const [ openLoading, setOpenLoading ] = useState<boolean>(false);
    const [ filesearch, setFileSearch ] = useState<any>(0);

    const onSubmit = async () => {
        setOpenLoading(true);
        const formData = new FormData();
        let location;

        const user_params = {
            "user": sessionStorage.getItem('user'),
            "group": sessionStorage.getItem('group'),
            "token": sessionStorage.getItem('token')
        }

        // let auth_check = await axios.post(F_API_URL+'/search', user_params, {      
        //     headers: {'Content-Type': 'application/json'},
        // });
        // if (auth_check.data.body.message === "SUCCESS"){
            if(fileupload.length > 0){                        
                formData.append('file', fileupload[0]);

                // location = await axios.post(F_API_URL+'/search', formData);
                location = await axios({
                                method: 'post',
                                headers: {'Content-Type': 'multipart/form-data'},
                                url: API_URL+'/search',
                                data: formData
                            });

            }else if(searchfile !== ''){
                // formData.append('keyword', searchfile);
                
                const params = JSON.stringify({
                    "keyword": searchfile
                });

                // location = await axios.post(F_API_URL+'/search', formData);

                location = await axios.post(F_API_URL+'/search', params, {      
                    headers: {'Content-Type': 'application/json'},
                });
                
            }
            setSearchResult(location);
            if(fileupload.length > 0){
                setFileSearch(1);
            }else{
                setFileSearch(0);
            }
            setOpenLoading(false);
            
        // }
    };

    const handleInputImage = () => {
        if(inputFile.current){
            inputFile.current.click();
        }
    }

    const handleFileUpload = ( e:any ) => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            if ( fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg') {
                setSearchfile(files[0].name);
                setFileUpload(files);
            }
        }
    };

    // useEffect(()=>{
    //     let session = sessionStorage.getItem('user');
    //     let token = sessionStorage.getItem('token');
    //     if(!session && !token){
    //         window.location.replace('/');
    //     }
    // })

    return (
        <div className="row">
            <Grid container justifyContent={'center'}>
                <Grid item xs={10}>
                    <FormControl fullWidth>
                        <TextField 
                            fullWidth label=""
                            name="Tags" 
                            variant="standard"
                            value={searchfile}
                            onKeyDown={(e) =>{
                                    if(e.key === 'Enter')   {
                                        onSubmit();
                                    }
                                }
                            } 
                            onChange={(e) => {setSearchfile(e.target.value)}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={ () => {
                                        setSearchfile('');
                                        setFileUpload('');
                                        setSearchResult('');
                                     }}>
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={0}>
                    <IconButton >
                        <PhotoCameraIcon onClick={ handleInputImage } />
                    </IconButton>
                    <input name="file" ref={inputFile} type="file" onChange={handleFileUpload} hidden />
                </Grid>
                <Grid item xs={0}>
                    <IconButton onClick={onSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {openLoading?
                <div className="Loading-box h-100 d-flex align-items-center justify-content-center">
                <img src={Loading} className="Loading" alt="Loading" />
            </div>:
            (searchResult && searchResult.data && searchResult.data.message)?'Unfortunately Search has stopped working':''}
            
            {!(searchResult && searchResult.data && searchResult.data.message)?
                fileupload.length > 0 && filesearch === 1?
                <SearchFImage imageResult={searchResult?searchResult.data:''} />
                :
                <SearchFtext imageResult={searchResult?searchResult.data.body:''}/>
            :''}
        </div>
    );
};

export default Search_eng;