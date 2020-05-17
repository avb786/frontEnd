import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated} from '../auth/helper';
import { updateCategory, getCategory } from './helper/adminapicall';

const UpdateCategory = ({ match }) => {

    const [name, setName] = useState("");
  const [names, setNames] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const preload = categoryId => {
    getCategory(categoryId).then(data => {
      //console.log(data);
      if (data.error) {
        setError(data.error);
        setName("")
      } else {
          console.log(data.name)
        setName(data.name);
        setNames(data.name)
      }
    });
  };


  const goBack = () => (
    <div className="text-right">
      <Link className="btn btn-sm btn-success " to="/admin/dashboard">
      <i class="fa fa-home fa-2x" aria-hidden="true"></i>
         <span> Admin Home</span>
      </Link>
    </div>
  );

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
            <h4 className="text-alert">Failed to update category</h4>
        )
    }
    
}
  const onSubmit = (event) =>{
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend request fired
    updateCategory(user._id, token, {name}, match.params.categoryId)
    .then(data => {
        if(data.error) {
            setError(true)
        }
        else{
            setError("");
            setSuccess(true);
            setName(data.name);
        }
    })
  }

    const handleChange = event => {
        setError("");
        setName(event.target.value);
        setNames(event.target.value)
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
            <button onClick={onSubmit} className="btn btn-outline-light">Update Category</button>
          </div>
        </form>
      );
    
    return (
        <Base
          title="Add a product here!"
          description="Welcome to product creation section"
          className="container bg-light p-4"
        >
          <Link to="/admin/dashboard" className="btn btn-md  btn-dark">
          <i class="fa fa-home fa-2x" aria-hidden="true"></i> Admin Dashboard
          </Link>
          <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {goBack()}
                {warningMessage()}
              {successMessage()}
              {myCategoryForm()}
            </div>
          </div>
        </Base>
      );
   
}

export default UpdateCategory;