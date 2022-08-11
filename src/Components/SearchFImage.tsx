import React, { useState, useEffect, useRef } from 'react';
import { EventEmitter } from 'stream';

interface Props{
    imageResult: any
}

const SearchFImage = ( {imageResult} : Props ) => {
    
    const [ size, setSize ] = useState<any>({});
    const imageRef = useRef(null);
    
    return (
        <>
            {imageResult?
            <div className='container'>
                About {imageResult.search_information.total_results} result
                <div className='row search_source'>
                    {imageResult.search_parameters.image_url?
                    <div className='col-sm'>
                        <img ref={imageRef} src={imageResult.search_parameters.image_url} onLoad={
                            event => {
                                setSize({
                                    height: event.currentTarget.naturalHeight,
                                    width: event.currentTarget.naturalWidth
                                })}
                        } />
                    </div>
                    :''}

                    <div className='col-sm'>
                    
                        <div>
                            Image size:
                        </div>
                        <div>
                            {size['height']} x {size['width']}
                        </div>
                   
                        {imageResult.image_sizes?
                        <div>
                            Find other sizes of this image:
                        </div>:''}
                        {imageResult.image_sizes?imageResult.image_sizes.map((value:any) => {
                            return <div><a href={value.link}>{value.title}</a></div>
                        }):''}
                       
                    </div>

                </div>
                <div>
                    <div>
                        Visually Similar images
                    </div>
                    <div className='row'>
                        {imageResult.inline_images.map((value:any) => {
                            return <div className='col-sm'><a href={value.link}><img src={value.thumbnail} /></a></div>
                        })}
                    </div>
                </div>
                <div>
                    {imageResult.image_results.map((value:any) => {
                        return(
                            <div className='row'>
                                <div className='col'>
                                    <div>{value.link}</div>
                                    <div><a href={value.link} >{value.title}</a></div>
                                    {value.image_resolution?<div>{value.image_resolution}</div>:''}
                                    <div>{value.snippet}</div>
                                </div>
                                {value.image_resolution?
                                <div className='col'>
                                    <img src={value.thumbnail} />
                                </div>
                                :''}
                            </div>
                        ) 
                    })}
                </div>
            </div>
            :''}
        </>
    );
};

export default SearchFImage;