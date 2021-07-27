import classes from "./Input.module.css";
import React from "react";

//In order to fix the ref issue realted to Custom Component, wrap the that component Function with React.forwardRef now Component function will recieve ref argument as well as props 
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    );
});

export default Input;