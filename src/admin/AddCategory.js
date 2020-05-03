import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import {createCategory} from './helper/adminapicall'

const AddCategory = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="text-right">
      <Link className="btn btn-sm btn-success " to="/admin/dashboard">
      <i class="fa fa-home fa-2x" aria-hidden="true"></i>
         <span> Admin Home</span>
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
    setNames(event.target.value)
  }

  const onSubmit = (event) =>{
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend request fired
    createCategory(user._id, token, {name})
    .then(data => {
        if(data.error) {
            setError(true)
        }
        else{
            setError("");
            setSuccess(true);
            setName("");
        }
    })
  }

  const successMessage = () => {
    if(success){
        return(
        <h4 className="text-success">{names}  created Successfully</h4>
        )
    }
  }

  const warningMessage = () => {
      if(error){
          return(
              <h4 className="text-alert">Failed to create category</h4>
          )
      }
      
}
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange = {handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-light">Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-light p-4"
    >
      <div className="row bg-secondary text-white rounded">
        <div className="col-md-8 offset-md-2">
            {goBack()}
            {successMessage()}
            {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
