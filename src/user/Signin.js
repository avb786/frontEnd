import React, {useState} from 'react'
import Base from "../core/Base"
import loadingGif from "../assets/loading.gif"
import {Link, Redirect} from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email: "rk.shah@rass.com",
        password: "12345678a",
        error: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    }

  const onSubmit = event =>{
      event.preventDefault();
      setValues({...values, error: false, loading: true})
      signin({email, password})
      .then(data => {
        //   if(data.error_msg !== undefined){
        //     setValues({...values, error: data.error_msg, loading: false})
        //   }
          if(data.error){
            setValues({...values, error: data.error, loading: false})
          }
          else{
              authenticate(data, () =>{
                  setValues({...values, didRedirect: true})
              })
          }
      })
      .catch(console.log("Sign in failed"))
  }

  const performRedirect = () =>{
      if(didRedirect){
          if(user && user.role === 1 ){
              return <Redirect to="/admin/dashboard" />
          }
          else{
              return <Redirect to="/user/dashboard" />
          }
      }
      if(isAuthenticated()){
          return <Redirect to="/" />
      }
  }

    const loadingMsg = () =>{
        return( loading && (
            <div className="alert alert-info" id="loader-info">
                <img src={loadingGif} />
            </div>
        ) 
    )
    
}


    const errorMsg = () =>{
        if(error){
        return(
            <div className="row err-msg">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger">
                            {error}
                    </div>
                </div>
            </div>
        )
    }
}
    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-dark">Email</label>
                            <input onChange={handleChange("email")} value={email} type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label  className="text-dark">Password</label>
                            <input onChange={handleChange("password")} value={password} type="password"  className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign IN" description="You're Sign in">
        {loadingMsg()}
        {errorMsg()}
        {signInForm()}
        {performRedirect()}
    <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;