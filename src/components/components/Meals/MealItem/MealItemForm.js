import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 7){
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
    console.log(enteredAmount);
    setAmountIsValid(true);
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}/*This would not work as it is a Custom Component, to fix this go to compinent which recieves ref as prop*/
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: "number",
          min: "1",
          max: "7",
          step: "1",
          defaultValue: "0",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (0-7).</p>}
    </form>
  );
};

export default MealItemForm;
