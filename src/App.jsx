import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";


import Header from './Header';
import Modal from './Modal';
import Cart from './Cart';
import Products from './Products';

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);

  let addToCart = (product) => {
    if (cart.some((item) => item.id == product.id)) {
      setModal(true);
    } else {
      setCart([...cart, product]);
      setTotal(total + parseInt(product.price));
    }
  };

  let removeCart = (item, index) => {
    cart.splice(index, 1)
    setCart([...cart])
    setTotal(total - parseInt(item.price))
  }

  let reduceQuantity = (modifiedItem, replaceIndex) => {
    if (modifiedItem.quantity && modifiedItem.quantity > 1) {
      modifiedItem.quantity = modifiedItem.quantity - 1;
    } else {
      modifiedItem.quantity = 1;
    }

    cart.splice(replaceIndex, 1, modifiedItem);
    setCart([...cart]);
  }

  let addQuantity = (modifiedItem, replaceIndex) => {
    if (modifiedItem.quantity) {
      modifiedItem.quantity = modifiedItem.quantity + 1;
    } else {
      modifiedItem.quantity = 2;
    }

    cart.splice(replaceIndex, 1, modifiedItem);
    setCart([...cart]);
  }
  
  useEffect(() => {
    const total = cart.reduce((totalSum, item) => {
      if (item?.quantity) {
        return totalSum = totalSum + (parseInt(item.quantity) * parseInt(item.price));
      } else {
        return totalSum = totalSum + parseInt(item.price);
      }
    }, 0);
    setTotal(total);
  }, [cart]);

  return (
    <BrowserRouter>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route path="/Cart" element={<Cart cart={cart} total={total} handleRemoveCart={removeCart} reduceQuantity={reduceQuantity} addQuantity={addQuantity} />} />
      </Routes>
      <Modal modal={modal} handleModal={() => setModal(false)} />
    </BrowserRouter>
  );
}

export default App;