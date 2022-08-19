import React, { useState, useRef } from 'react';
import { FiImage } from 'react-icons/fi'

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
               <div>About {imageResult.search_information.total_results} result</div>
                <div className='row search_source_area'>
                    {imageResult.search_parameters.image_url?
                    <div className='col-sm-2 search_source'>
                        <div>
                            <img ref={imageRef} src={imageResult.search_parameters.image_url} onLoad={
                                event => {
                                    setSize({
                                        height: event.currentTarget.naturalHeight,
                                        width: event.currentTarget.naturalWidth
                                    })}
                            } />
                        </div>
                    </div>
                    :''}
                    <div className='col-sm'>
                        <div className='text-left'>
                            Image size:
                        </div>
                        <div  className='text-left'>
                            {size['height']} x {size['width']}
                        </div>
                   
                        <div  className='text-left'>
                            Find other sizes of this image:
                        </div>
                        <div className='row'>
                        {imageResult.image_sizes.map((value:any) => {
                            return <div className='col'><a href={value.link}>{value.title}</a></div>
                        })}
                       </div>
                    </div>
                </div>
                <div>
                    {imageResult.image_results.map((value:any) => {

                        let domain = (new URL(value.link));
                        var dis_result = domain.protocol + '://'+domain.hostname;
                        var pathname = domain.pathname.split('/');

                        for( let x = 0; x < pathname.length; x++){
                            if(pathname[x] !== 'en' && pathname[x] !=='product' && pathname[x] !== ""){

                                dis_result += ' > ' + pathname[x];
                            }
                        }

                        return !value.thumbnail?(
                            
                            <div className='row each_result'>
                                <div className='col'>
                                    <div className='font12'>{dis_result}</div>
                                    <div><a href={value.link} >{value.title}</a></div>
                                    <div className='row'>
                                        <div className='col font14'>{value.image_resolution? value.image_resolution + ' - ':''}  {value.snippet}</div>
                                    </div>
                                </div>
                                {value.image_resolution?
                                <div className='col'>
                                    <img src={value.thumbnail} />
                                </div>
                                :''}
                            </div>
                        ):''
                    })}
                </div>
                <div>
                    <div className='each_result'>
                        <h5><FiImage /> Visually Similar images</h5>
                    </div>
                    <div className='row sim_pic'>
                        {imageResult.inline_images.map((value:any) => {
                            return <div className='col-sm'><a href={value.link}><img src={value.thumbnail} /></a></div>
                        })}
                    </div>
                </div>
                <div>
                    <div className='each_result'>
                        Pages that include matching images
                    </div>
                    {imageResult.image_results.map((value:any) => {

                        let domain = (new URL(value.link));
                        var dis_result = domain.protocol + '://'+domain.hostname;
                        var pathname = domain.pathname.split('/');

                        for( let x = 0; x < pathname.length; x++){
                            var isnum = /^\d+$/.test(pathname[x]);
                            if(pathname[x] !== 'en' && pathname[x] !=='products' && pathname[x] !== "" && !isnum){
                                dis_result += ' > ' + pathname[x];
                            }
                        }

                        return value.thumbnail?(
                            
                            <div className='row each_result'>
                                <div className='col'>
                                    <div className='d-inline-block truncate font12'>{dis_result}</div>
                                    <div><a href={value.link} >{value.title}</a></div>
                                    <div className='row'>
                                        <div className='col font14'>{value.image_resolution?value.image_resolution:''} - {value.snippet}</div>
                                    </div>
                                </div>
                                {value.image_resolution?
                                <div className='col'>
                                    <img src={value.thumbnail} />
                                </div>
                                :''}
                            </div>
                        ):''
                    })}
                </div>
            </div>
            :''}
        </>
    );
};

export default SearchFImage;