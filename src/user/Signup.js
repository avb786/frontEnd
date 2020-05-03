import React, {useState} from 'react'
import Base from "../core/Base"
import {Link} from 'react-router-dom';
import { signup } from '../auth/helper';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, password, error, success} = values;

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data =>{
            console.log(data.error_msg)
            if(data.error_msg){
                setValues({...values, error: data.error_msg, success: false})
            }
            else{
                setValues({...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true
                })
            }
        })
        .catch(console.log("Error in sign up"));
    }

    const signUpForm = () =>{
        return(
            <div className="row signUp">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label for="" className="text-dark">Name</label>
                            <input className="form-control" type="text" value={name} onChange={handleChange("name")} />
                        </div>
                        <div className="form-group">
                            <label for="" className="text-dark">Email</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label for="" className="text-dark">Password</label>
                            <input type="password"  className="form-control" value={password}  onChange={handleChange("password")}/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMsg = () =>{
        console.log("error", success)
        if(success){
        return(
            <div className="row err-msg">
                <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success" >
            Account Created Successfully. Please {" "}<Link to="/signin" >Login here</Link>
        </div>
        </div>
        </div>
        )
    }
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

    return (
        <Base title="Sign Up" description="You're Sign UP">
        {successMsg()}
        {errorMsg()}
        {signUpForm()}
    <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;