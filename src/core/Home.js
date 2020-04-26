import React from 'react';
import "../styles.css"
import {API} from "../backend"
export default function Home(){
    console.log("API is", API)
return(
  <div>
    <h1 className="text-white">Hello  Frontend</h1>
  </div>
)

}

