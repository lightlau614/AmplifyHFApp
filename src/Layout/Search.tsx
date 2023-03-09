import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import axios from 'axios';

//Components
import Box from "../Components/Box";

import SearchForm from "../Components/SearchForm";

import Loading from "../Resource/images/Spinner-1s-200px.svg";

// const API = 'https://6corpcrbk3.execute-api.ap-southeast-1.amazonaws.com/dev';
const API = 'https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev';

const DialogBox = React.lazy(() => import('../Components/DialogBox'));

const Search = () => {

    const [ error, setError ] =useState<boolean>(false);
    const [ data, setData ] = useState<any>();
    const [ url, setUrl ] = useState<string>(API);

    const [ params, setParams ] = useState<any>({
        brand: '',
        gender: '',
        tags: '',
        sort: '',
        skip: 50
    });

    const [ skip , setSkip ] = useState<number>(50);
    const [ count , setCount] = useState<any>(0);

    //Each Box dialog
    const [ dialogData, setDialogData ] = useState<any>();
    const [ diaOpen, setDiaOpen ] = useState<boolean>(false);

    //Window Scroll
    const ref = useRef<HTMLDivElement>(null);
    const [ y, setY ] = useState(window.scrollY);

    //function to fetch data
    const fetch = useCallback( async () =>{   
        setError(false);
        if( count == 0 ){
            try {
                const data = await axios.get(url);
                setData(data.data.body);
            } catch {
                setError(true);
            }
        }
    },[url]);

    const HandleNavigation = useCallback( 
        async ( e:any ) => {

            const window = e.currentTarget;
            let lastScrollY = window.pageYOffset;
            let sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight) / 0.95;

            if( y < window.scrollY ) {              
                const scrollY = window.pageYoffset;
                if ( ref.current ) {
                    if ( ( ref.current.clientHeight - lastScrollY ) < sbHeight ) {
                        window.removeEventListener( "scroll", HandleNavigation );
                        setSkip(skip+50);
                        if ( url.includes('?') ) {
                            const predata = await axios.get( url + '&skip=' + skip );
                            for( let x = 0; x < predata.data.body.length; x++ ) {
                                data.push(predata.data.body[x]);
                            }
                        }else{
                            const predata = await axios.get( url + '?skip=' + skip );
                            for( let x = 0; x < predata.data.body.length; x++ ) {
                                data.push(predata.data.body[x]);
                            }
                        }

                    }
                }
            }
            setY(window.scrollY);
        },[y]
    )

    useEffect( () => {
        // fetch(url, params);
        fetch();
        //Window Scroll
        setY(window.scrollY);
    },[] );

    useEffect(() => {
        window.addEventListener( "scroll", HandleNavigation );
        return () => {
            window.removeEventListener( "scroll", HandleNavigation );
        }
    },[y])

    if( !data ){
        return (
            <div className="Loading-box h-100 d-flex align-items-center justify-content-center">
                <img src={Loading} className="Loading" alt="Loading" />
            </div>
        );
    }
        
    if( error ){
        return <h2>Error fetching items</h2>
    }

    const passSearch = async ( item:any ) => {
        setCount(0);
        setUrl(item);
        const predata = await axios.get(item)
        setData(predata.data.body)
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
            <div className="search_box container onTop">
                <SearchForm passSearch={passSearch} />
            </div>
            <div className="items row topBody" ref={ref}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DialogBox dialogData={dialogData} diaOpen={diaOpen} returnDia={returnDia}/>
                </Suspense>
                <Box data={data} passDialog={passDialog}/>
            </div>
        </>
    );
};

export default Search;



