import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

//Components
import Box from "../Components/Box";
import DialogBox from "../Components/DialogBox";

import Loading from "../Resource/images/Spinner-1s-200px.svg";

const Search = () => {

    const [ error, setError ] =useState<boolean>(false);
    const [ data, setData ] = useState<any>();
    const [ url, setUrl ] = useState<string>('https://xnsu2dpmhg.execute-api.ap-southeast-1.amazonaws.com/dev');

    const [ skip , setSkip ] = useState<number>(50);
    const [ count , setCount] = useState<any>(0);

    //Each Box dialog
    const [ dialogData, setDialogData ] = useState<any>();
    const [ diaOpen, setDiaOpen ] = useState<boolean>(false);

    //Window Scroll
    const ref = useRef<HTMLDivElement>(null);
    const [y, setY] = useState(window.scrollY);

    //function to fetch data
    const fetch = useCallback( async () =>{    
        setError(false);
        if(count == 0){
            try {
                const data = await axios.get(url);
                setData(data.data.body);
                setCount(1);
            } catch {
                setError(true);
            }
        }
    },[url]);

    useEffect(() => {
        fetch();
        //Window Scroll
        // setY(window.scrollY);
        
    },[]);

    if(!data){
        return (
            <div className="Loading-box h-100 d-flex align-items-center justify-content-center">
                <img src={Loading} className="Loading" alt="Loading" />
            </div>
        );
    }
        
    if(error){
        return <h2>Error fetching items</h2>
    }

    const passDialog = async ( item:any ) =>{
        const result = data.filter( (o:any) => o._id.includes(item));
        setDialogData(result);
        setDiaOpen(true);
    }

    const returnDia = async (item:any)=>{
        setDiaOpen(item)
    }

    return (
        <>
            <div className="search_box container">
                {/* <SearchForm passSearch={passSearch}/> */}
            </div>
            <div className="items row" ref={ref}>
                <DialogBox dialogData={dialogData} diaOpen={diaOpen} returnDia={returnDia}/>
                <Box data={data} passDialog={passDialog}/>
            </div>
        </>
    );
};

export default Search;