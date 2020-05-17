import React, {useEffect} from "react";
import Menu from './Menu';
import "../styles.css";
import loadingGif from "../assets/loader.svg"

const Loader = () =>{
    return(
        <img src={loadingGif} />
    )
}

export default Loader;