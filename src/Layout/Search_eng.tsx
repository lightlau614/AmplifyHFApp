import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Select, MenuItem, InputLabel, FormLabel,
    FormControl, ButtonGroup, Button, RadioGroup, Radio, FormControlLabel, IconButton, InputAdornment
    } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

//Component Import
import SearchFImage from '../Components/SearchFImage';
import SearchFtext from '../Components/SearchFtext';


//Icon Import
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = "https://yfvg5swaie.execute-api.ap-southeast-1.amazonaws.com/dev";

const Search_eng = () => {


    const [ searchfile, setSearchfile ] = useState<string>('');
    const inputFile = useRef<HTMLInputElement>(null);
    const [ fileupload, setFileUpload ] = useState<any>('')
    const [ searchResult, setSearchResult ] = useState<any>('');

    const onSubmit = async () => {
        const formData = new FormData();
        let location;
        if(fileupload.length > 0){
            
            formData.append("file", fileupload[0]);        
            // location = await axios.post(API_URL, formData);
            location = await axios({
                            method: 'post',
                            headers: {'Content-Type': 'form-data'},
                            url: API_URL,
                            data: formData
                        });
        }else if(searchfile !== ''){
            formData.append("body", searchfile);
            location = await axios.get(API_URL+ 'stext?text='+ searchfile);
        }
        setSearchResult(location);
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
                setFileUpload(files)
            }
        }
      };

    //   console.log(searchResult)

    return (
        <div className="row">
            <Grid container >
                <Grid item xs={10}>
                    <FormControl fullWidth>
                        <TextField 
                            fullWidth label=""
                            name="Tags" 
                            variant="standard"
                            value={searchfile}
                            onKeyDown={(e) =>{
                                    if(e.key === 'Enter')   {
                                        onSubmit;
                                    }
                                }
                            } 
                            onChange={(e) => {setSearchfile(e.target.value)}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={ () => {
                                        setSearchfile('');
                                        setFileUpload('');
                                     }}>
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <IconButton >
                        <PhotoCameraIcon onClick={ handleInputImage } />
                    </IconButton>
                    <input name="file" ref={inputFile} type="file" onChange={handleFileUpload} hidden />
                </Grid>
                <Grid item>
                    <IconButton onClick={onSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            
            {fileupload.length > 0 || searchfile !== '' ?
                <SearchFImage imageResult={searchResult?searchResult.data:''} />
                :
                <SearchFtext imageResult={searchResult?searchResult.data:''}/>
            }
        </div>
    );
};

export default Search_eng;