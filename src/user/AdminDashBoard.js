import React, { Component } from 'react';
import Base from '../core/Base'
import {isAuthenticated} from '../auth/helper/index'
import { Link, withRouter } from "react-router-dom";



const AdminDashBoard = () => {
        const {user: {name, email, role}} = isAuthenticated();

        const adminLeftSide = () =>{
            return(
                <div className="card">
                    <h4 className="card-header">Admin Navigate</h4>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <Link to="/admin/create/category" className="nav-link">Create Categories</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/admin/categories" className="nav-link">Manage Categories</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/admin/create/product" className="nav-link">Create Product</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/admin/orders" className="nav-link">Manage Order</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/admin/products" className="nav-link">Manage Products</Link>
                        </li>
                    </ul>
                </div>
            )
        }

       const adminRightSide = () =>{
           return(
              <div class="card mb-4">
                  <h4 class="card-header">Admin Info</h4>
                  <ul class="list-group">
                      <li class="list-group-item">
                          <span class="badge badge-info mr-2">Name:</span> {name}
                      </li>
                      <li class="list-group-item">
                          <span class="badge badge-info mr-2">Email:</span> {email}
                      </li>
                      <li class="list-group-item">
                          {isAuthenticated().user.role === 1 && (
                              <span class="badge badge-danger mr-2">Role: Admin</span> 
                          )}
                      </li>
                  </ul>
              </div>
           )
       }

        return (
            <Base title="Welcome to Admin page" 
            description="Manage your Products here"
            className = "container bg-info p-4"
            >
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
                
            </div>
            
            
            </Base>
        );
    
}

export default AdminDashBoard;

