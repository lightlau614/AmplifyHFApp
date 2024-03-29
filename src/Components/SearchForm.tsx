import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Select, MenuItem, InputLabel, FormLabel,
    FormControl, ButtonGroup, Button, RadioGroup, Radio, FormControlLabel, IconButton
    } from '@mui/material';
import ClearIcon  from '@mui/icons-material/Clear';

const API_URI = "https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev"

const SearchForm = ( {passSearch}:any ) => {

    const [ error, setError ] = useState<boolean>(false);
    const [ brand , setBrand ] = useState<string>('');
    const [ gender, setGender ] = useState<string>('');
    const [ tags, setTags ] = useState<string>('');

    const [ brandlist, setBrandList ] = useState<any>();

    const fetch = async () =>{   
        setError(false);
        try {
            const data = await axios.get(API_URI + '/search/group?brand=brand');
            setBrandList(data.data.body);
        } catch {
          setError(true);
        }
    };

    useEffect(() => {
        fetch();
    },[]);

    if(error){
        return <h2>Error fetching items</h2>
    }

    const handleSearch = async ( param1: any, param2: any, param3: any) =>{

        let search_box = null;

        if(param1){
            search_box = 'brand=' + param1;
        }

        if(param2 && search_box === null){
            search_box = 'gender=' + param2;
        }else if (param2 !==''){
            search_box = search_box + '&gender=' + param2;
        }

        if(param3 !=='' && search_box === null){
            search_box = 'tags=' + param3;
        }else if (param3 !==''){
            search_box = search_box + '&tags=' + param3;
        }

        var newUrl = API_URI + '?'+search_box;
        passSearch(newUrl);

    };

    const onSubmit = ()=> {
        handleSearch(brand, gender, tags);
    };

    const onReset = () => {
        setBrand('');
        setGender('');
        setTags('');
        passSearch(API_URI);
    }

    

    return (
        <div className="row justify-content-center">
            <Grid container spacing={4} className="search_area">
                <Grid item xs={9} md={8}>
                    <FormControl fullWidth>
                        <InputLabel id="brand-label">Brand</InputLabel>
                        <Select 
                            fullWidth labelId="brand-label" id="brand" 
                            value={brand} label="brand" 
                            onChange={(e) => setBrand(e.target.value)}
                            >
                            <MenuItem value=''></MenuItem>
                            {brandlist && brandlist.map((item:any, index:any)=>{
                                return <MenuItem key={index} value={item._id.brand}>{item._id.brand}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} md={4}>
                    <FormControl fullWidth>
                        <FormLabel id="gender-label">Gender</FormLabel>
                        <RadioGroup 
                            row
                            aria-labelledby="gender-label"
                            defaultValue={gender}
                            name="radio-buttons-group"
                            value={gender}
                            onChange={ (e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="women" control={<Radio />} label="Female" />
                            <FormControlLabel value="men" control={<Radio />} label="Male" />
                            <FormControlLabel value="" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
        </Grid>
        <Grid container className="search_area">
                <Grid item xs={12} spacing={0}>
                    <FormControl fullWidth>
                        <TextField 
                            fullWidth label="Tags"
                            name="Tags" 
                            variant="standard"
                            value={tags}
                            onKeyDown={(e) =>{
                                    if(e.key === 'Enter')   {
                                        onSubmit();
                                    }
                                }
                            } 
                            onChange={(e) => {setTags(e.target.value)}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={()=>setTags('')}>
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={onSubmit}>Search</Button>
                    <Button onClick={onReset}>Reset</Button>
                </ButtonGroup>
            </Grid>
        </div>
    );

}

export default SearchForm;