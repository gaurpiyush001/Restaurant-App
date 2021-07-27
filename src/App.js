import React from 'react';
import Header from './components/components/Layout/Header';
import Meals from './components/components/Meals/Meals';
import Cart from './components/components/Cart/Cart';
import {useState} from 'react'; //Parent component mein render krayenegy Cart toh uski state bhi yehi manage hongi
import CartProvider from './store/CartProvider';

function App() {

  const [CartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {CartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
