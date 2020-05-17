import React, { Component } from 'react';
import loadingGif from "../assets/loader.svg"

const Loader =({loading}) => {
        
        return ( loading && (
            <div className="offset-md-5 ">
            <img src={loadingGif} />
            <h4 className="text-info">Loading you're products..</h4>
        </div>
        )
           
        );
     
   
}

export default Loader;