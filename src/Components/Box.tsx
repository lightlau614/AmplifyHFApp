
import React from 'react';

interface Props {
  data: Object[],
  passDialog:Function
}

const Box:any = ( { data, passDialog } : Props ) => {

  const handleClick = async ( event:any ) => {
    passDialog(event.target.alt)
  }
  
  return data?data.map( (el:any, index:any) => (
      <div className="col-sm col-md">
        <div className="item" key={index}>
          <div className="item_info container">
            <div className='row'>
              <div className='col'>
                <img alt={el._id} src={el.image_list_on_S3[0]? el.image_list_on_S3[0]: el.image_list_from_source} onClick={handleClick} />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                Brand
              </div>
              <div className='col'>
                {el.brand}
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                Gender
              </div>
              <div className='col'>
                {el.gender}
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                Product Type
              </div>
              <div className='col'>
                {el.product_type}
              </div>
            </div>
          </div> 
        </div>
      </div>
  )):'';
}

export default Box;