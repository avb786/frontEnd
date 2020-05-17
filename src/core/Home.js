import React, {useState, useEffect, useLayoutEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import Loader from '../admin/Loader'
import { getProductsGroup } from "./helper/coreapicalls";

export default function Home() {
  console.log("API IS", API);

 const [products, setProducts] = useState([])
 const [error, setError] = useState(false)
 const [load, setLoad] = useState(false);

 

  const loadAllProduct = () =>{
    setLoad(true)
    getProductsGroup().then(data =>{
      if(data.error){
        setError(data.error)
      }
      else{
        setProducts(data);
        setLoad(false)
      }
    })
  }

  useEffect(() => {
    loadAllProduct();
  }, []);


  return (
    <Base title="Home Page" description="Welcome to AIS">
       <Loader loading = {load} />
      <div className="row text-center">
        
        <div className="row">
          {products.map((product, index) =>{
            return (
              <div key={index} className="col-4 mb-4">
                <Card product = {product} />
              </div>
            )
          })}
        </div>
        
      </div>
    </Base>
  );
}
