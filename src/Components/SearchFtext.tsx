import React from 'react';

interface Props{
    imageResult: any
}

const SearchFtext = ( {imageResult} : Props ) => {

    return (
        <>
        {imageResult?
        <div className='container'>
            <div className='row text-center justify-content-start'>
                    {imageResult.images_results.map((value:any) => {
                        return (
                            <div className='col-4 col-lg-4 col-md-4 col-sm-4 font12'>
                                <div className='m-2'>
                                    <div className='position-relative bg-grey p-2'>
                                        <img className='img-fluid mh-100 mw-100' src={value.thumbnail} />
                                    </div>
                                    <div className='w-100'>
                                            <a href={value.link}>
                                                <div className='text-truncate'>{value.title}</div>
                                                <div>{value.source}</div>
                                            </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        :''}
        </>
    );
};

export default SearchFtext;