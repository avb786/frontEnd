import React, { useState } from 'react';
import {API} from '../../backend'
const ImageHelper = ({product})=> {

  // const imagUrl = () =>{
  //     if (product) {
       
  //         const imgurl = `${API}/product/photo/${product._id}`
  //      return imgurl
  //     }
  //     else{
  //       return  `https://www.pexels.com/photo/dawn-landscape-mountains-fashion-4171211/`
  //     }
  // }

    const imagUrl = product ? `${API}/product/photo/${product._id}` : `https://www.pexels.com/photo/dawn-landscape-mountains-fashion-4171211/`
        return (

            <div className="rounded border border-success p-2">
             
                <img
                  src={imagUrl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
        );
    
}

export default ImageHelper;