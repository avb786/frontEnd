import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
// import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';
import ReactDOM from "react-dom";
import { getProductsGroup } from '../core/helper/coreapicalls'
import { API } from '../backend';
import Loader from '../admin/Loader';

const ManageProducts = () => {


        const [products, setProducts] = useState([])
        const [productsGroup, setProductsGroup] = useState([])
        const [error, setError] = useState(false);
        const [load, setLoad] = useState(false)
        

        const {user, token} = isAuthenticated();

        const loadAllProduct = () =>{
            setLoad(true)
            getProductsGroup().then(data =>{
              if(data.error){
                setError(data.error)
              }
              else{
                setProductsGroup(data);
                setLoad(false)
              }
            })
          }
        
         

        const preload = () =>{
            setLoad(true)
            getProducts().then(data =>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    console.log(data[0].photo.data.data)
                    setProducts(data);
                    setLoad(false)

                }
            })
        }

        const deleteThisProduct = productId => {
            deleteProduct(productId, user._id, token).then(data => {
              if (data.error) {
                console.log(data.error);
              } else {
                preload();
              }
            });
          };
    
        useEffect(() => {
            preload();
            loadAllProduct();
          }, []);

        return (
            <Base title="Welcome admin" description="Manage products here">
                <h2 className="mb-4">All products:</h2>
                <Link className="btn btn-info" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
                </Link>
                <Loader loading = {load} />
                <div className="row ">
                    <div className="col-12 ">
                        <h2 className="text-center my-3">Total Products :{products.length}</h2>
                        <div className="row">
                            {products.map((productsGroup, index) => {
                                return (

                                    <div key={index} className="card col-3 mr-2 mt-2" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={`${API}/product/photo/${productsGroup._id}`} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{productsGroup.name}</h5>
                                            <p className="card-text">{productsGroup.description}</p>
                                            <p className="card-text"><span className="text-warning">Price :</span>{productsGroup.price} Rs</p>
                                            <p className="card-text"><span className="text-danger">Stock :</span>{productsGroup.stock} left</p>
                                            
                                            <div class="card-body">
                                                <span class="card-link">
                                                    <Link
                                                        className="btn btn-success"
                                                        to={`/admin/product/update/${productsGroup._id}`}
                                                    >
                                                        <span className="">Update</span>
                                                    </Link>

                                                </span>
                                                <span class="card-link">
                                                    <span onClick={() => {
                                                        deleteThisProduct(productsGroup._id);
                                                    }} className="btn btn-danger">
                                                        Delete
                                                    </span>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })}
                        </div>



                    </div>
                </div>
            </Base>
        );
}

export default ManageProducts ;