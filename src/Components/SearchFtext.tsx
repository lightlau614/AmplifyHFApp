import React from 'react';

interface Props{
    imageResult: any
}

const SearchFtext = ( {imageResult} : Props ) => {

    return (
        <>
        {imageResult?
        <div className='container'>
            <div className='row'>
                {imageResult.images_results.map((value:any) => {
                    return (
                        <div className='col-sm'>
                            <div>
                                <img src={value.thumbnail} />
                            </div>
                            <a href={value.link}>
                            <div>{value.title}</div>
                            <div>{value.source}</div></a>
                        </div>
                    );
                })}
            </div>
        </div>:''}
        </>
    );
};

export default SearchFtext;