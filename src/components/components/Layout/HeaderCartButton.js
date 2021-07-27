import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext); //By doing this Whenever the Context changes then the HeaderCartButton will get Re-Evaluated by React(here we are setting a connection)
  
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);



  let btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
  //we will utilize useEffect to play this animation
  //So, here I want my btnClasses to include the animation bump class and then I want to set a Timer which removes that class again, so that when it added again in future it plays animation
  //So I will be using here useState also bcz I will be re-evaluating and re-Render the component, when that animation class is added conditionally

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //writing CLEAN-UP function(important hai aur god-practice hai to write cleanup function in useEffect)
    return () => {
      clearTimeout(timer);//we want this bcz if a new timer is fired before the last one finishes then we want to halt and clear that previous timer and start a new Timer
    };


  }, [items]);

  return (
    <button onClick={props.onShowCartHeader} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
