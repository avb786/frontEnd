import React, {useEffect} from "react";
import Menu from './Menu';
import "../styles.css";
import loadingGif from "../assets/loader.svg"
import Loader from "./Loader";

// import Loader from './Loader'



const Base = ({
  title = "My Title",
  description = "My desription",
  className = "p-4",
  children
}) => (
  
  <div>
    <div className="container-fluid fullClass">
        <Menu />
      <div className=" text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer  mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-red">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
