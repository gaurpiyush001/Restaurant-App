//...GOAL of this component is to simply MANAGE the CARD-CONTEXT-DATA and provide the context to all components that want ACCESS to it....//
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//this function is said to change or maintain state dynamically
//below function is called whenever there is an action from dispatch function
//below function recieves automatically the current State and action(which is generally an Object) action is dispatched by programmer from dispatch function in order to call cartReducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    console.log(existingCartItemIndex, existingCartItem);
    let updatedItems;

    if (existingCartItem && existingCartItemIndex != -1) {
      let updatedItem;
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); //concat will return a newArray
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) { //Here we wanna completely remove the item from the array
      updatedItems = state.items.filter( item => item.id !== action.id);
    }else{ //Here we want to just decrease the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1};

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }

  }

  if(action.type === 'CLEAR') {//clearing cart after successfully ordering food items
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    //below function we are passing action, by which we can run different pieces of code depending on which Action Type was Dispatched
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type:'CLEAR'});
  }

  //below object will be dynamic
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
//we can now use this cart Provider component i.e CardContext to wrap all components that need access to the cart
