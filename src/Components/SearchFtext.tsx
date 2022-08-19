import React from 'react';

interface Props{
    imageResult: any
}

const SearchFtext = ( {imageResult} : Props ) => {

    return (
        <>
        {imageResult?
        <div className='container'>
            <div className='row text-center justify-content-center'>
                    {imageResult.images_results.map((value:any) => {
                        return (
                            <div className='col col-lg col-md col-sm dc font12'>
                                <div className='m5'>
                                    <div className='hp-250 wp-250 p-relative bg-grey'>
                                        <img className='mh-100 mw-100 img-vhcenter' src={value.thumbnail} />
                                    </div>
                                    <div className='wp-250'>
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