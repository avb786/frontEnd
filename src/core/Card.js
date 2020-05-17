import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import Loader from '../admin/Loader';

const Card =({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,  //function(f) {return f}
    reload = undefined
}) =>  {
 
  const [redirect, setRedirect] = useState(false);
  const [count, setCount ]  = useState(product.count);


    const cardTitle = product ? product.name :"Photo is memorable";
    const cardDescription = product ? product.description :"Photo is memorable use it valuable";
    const cardPrice = product ? product.price :"Photo is memorable Price is nothing";

    const addToCart = () =>{
      addItemToCart(product, () =>{
        setRedirect(true)
      })
    }
    const getRedirect = (redirect) => {
      if(redirect){
        return <Redirect to="/cart" />
      }
    }

    const showAddToCart = (addtoCart) =>{
        return(
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
            )
        )

    }

    const showremoveFromCart = (removeFromCart) =>{
        return (
            removeFromCart && (
                <button
                        onClick={() => {
                          removeItemFromCart(product._id)
                          setReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2"
                      >
                        Remove from cart
                      </button>
            )
        )
    }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              {getRedirect(redirect)}
              <ImageHelper product = {product} />
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showremoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
       


export default Card;