import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Grid, TextField, Select, MenuItem, InputLabel, FormLabel,
    FormControl, ButtonGroup, Button, RadioGroup, Radio, FormControlLabel, IconButton, InputAdornment
    } from '@mui/material';
import axios from 'axios';

//Component Import
import SearchFImage from '../Components/SearchFImage';
import SearchFtext from '../Components/SearchFtext';
import Loading from "../Resource/images/Spinner-1s-200px.svg";

//Icon Import
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';

const DialogBox = React.lazy(() => import('../Components/DialogBox'));

// const API_URL = "https://yfvg5swaie.execute-api.ap-southeast-1.amazonaws.com/dev";
// const API_TEXT_URL = "https://shs8u30cxj.execute-api.ap-southeast-1.amazonaws.com/dev";
const F_API_URL = "https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev"
const DB_API = 'https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev';

const Search_eng = () => {

    const [ searchfile, setSearchfile ] = useState<string>('');
    const inputFile = useRef<HTMLInputElement>(null);
    const [ fileupload, setFileUpload ] = useState<any>('')
    const [ searchResult, setSearchResult ] = useState<any>('');
    const [ dbResult, setDBResult ] = useState<any>('');
    const [ openLoading, setOpenLoading ] = useState<boolean>(false);
    const [ filesearch, setFileSearch ] = useState<any>(0);

    //Each Box dialog
    const [ dialogData, setDialogData ] = useState<any>();
    const [ diaOpen, setDiaOpen ] = useState<boolean>(false);

    const onSubmit = async () => {
        setOpenLoading(true);
        const formData = new FormData();
        let location;
        let db_data;

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
                                url: F_API_URL+'/search',
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

                db_data = await axios.post(DB_API + '/searchdb', params, {
                    headers: {'Content-Type': 'application/json'},
                })
                                
            }

            setSearchResult(location);
            setDBResult(db_data? db_data.data:'');
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
                setDBResult('');
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

    const passDialog = async ( item:any ) =>{
        const reuslt = [item];
        setDialogData(reuslt);
        setDiaOpen(true);
    }

    const returnDia = async (item:any)=>{
        setDiaOpen(item)
    }

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
                                        setDBResult('');
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
                <div className="Loading-box w-100 h-100 top-0 start-0 position-absolute bg-black bg-opacity-50" style={{zIndex: 1}}>
                    <div className='position-relative h-100'>
                        <div className='position-absolute start-50 top-50 translate-middle'>
                            <img src={Loading} className="Loading img-fluid" alt="Loading" />
                        </div>
                    </div>
                </div>
            :
            (searchResult && searchResult.data && searchResult.data.message)?'Unfortunately Search has stopped working':''}
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                    {!(searchResult && searchResult.data && searchResult.data.message)?
                        fileupload.length > 0 && filesearch === 1?
                        <SearchFImage imageResult={searchResult?searchResult.data:''} />
                        :
                        <SearchFtext imageResult={searchResult?searchResult.data.body:''}/>
                    :''}
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <DialogBox dialogData={dialogData} diaOpen={diaOpen} returnDia={returnDia}/>
                </Suspense>
                <div className='col-4 col-sm-4 col-md-4 col-lg-4 mt-2 mb-2'>
                    <div className='row d-flex justify-content-start'>
                    {Object.keys(dbResult).length > 0 && Object.values(dbResult).map((item:any)=>{
                        
                        return (
                            
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5 position-relative mt-2 mb-2'  key={item.id} onClick={ () => { passDialog(item) }}>
                                    <div className='col p-2 bg-grey' >
                                        <img className='img-fluid' src={item.image_list_on_S3 && item.image_list_on_S3[0] ? item.image_list_on_S3[0] : (item.image_list_from_source && item.image_list_from_source[0] ? item.image_list_from_source[0] : "")} alt="Product Image"/>
                                    </div>
                                    <div className='position-absolute bottom-0 start-0 bg-black bg-opacity-25 text-white  w-100 ms-2 me-2 ps-2 pe-2 font12'>
                                        HKD $ {item.price}
                                    </div>
                                </div>
                            
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search_eng;