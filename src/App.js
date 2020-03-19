import React from "react";
import { Route } from "react-router-dom";
import products from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

import { useLocalStorage } from "./hooks/useLocalStorage";

import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [cart, setCart] = useLocalStorage("cart", []);

  const addItem = item => {
    setCart([...cart, item]);
  };
  const removeItem = id => {
    const filtered = cart.filter(item => item.id !== id);
    setCart(filtered);
  };

  return (
    <ProductContext.Provider value={products}>
      <CartContext.Provider value={{ cart, addItem, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
