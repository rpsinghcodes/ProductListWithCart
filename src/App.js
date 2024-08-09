import { useState } from "react";

import Card from "./component/Card/Card";
import Cart from "./component/Cart/Cart";
import data from './data.json';
import Modal from "./component/Modal/Modal";


function App() {
  const [itemCart, setItemCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddToCart = (name, price, img) => {
    console.log(name);
    console.log('itemCart: ', itemCart)
    const inCart = itemCart.some(item => item.name === name);

    if(inCart) {
      setItemCart(prevData => prevData.map(item => item.name === name ? {...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price} : item))

    } else {      
      setItemCart(prevData => ([...prevData, {
        img,
        name,
        quantity: 1,
        price,
        totalPrice: price
      }]))
    }
  }
  const addQuantity = (name) => {
    setItemCart(prevData => prevData.map(item => item.name === name ? {...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price} : item))
  }

  const reduceQuantity = name => {
    const index = itemCart.findIndex(item => item.name === name);

    const quantity = itemCart[index].quantity;
    if(quantity === 1 ) {
      const filteredCart = itemCart.filter(item => item.name !== name);
      setItemCart(filteredCart);
    }else {
      setItemCart(prevData => prevData.map(item => item.name === name ? {...item, quantity: item.quantity - 1} : item))
    }

  }

  const handleRemoveItem = name => {
    const filteredCart = itemCart.filter(item => item.name !== name);
    setItemCart(filteredCart);
  }

  const handleNewOrder = () => {
    setIsModalOpen(false);
    setItemCart([]);
  }
  
  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  }

  
  return (
    <>
    
      <Modal
       onNewOrder={handleNewOrder}
        open={isModalOpen}
        items={itemCart}
        />
        
    <div className={`p-14 mobile:p-6 font-redHot bg-rose-100 ${isModalOpen && " opacity-[0.4]"}`}>    
      <h1 className="text-4xl font-bold">Desert</h1>
      <div className="flex items-start mobile:flex-wrap ">
        <div className="flex flex-1 flex-wrap gap-4 ">
        {data.map(item => <Card key={item.name} addQuantity={addQuantity} reduceQuantity={reduceQuantity} items={itemCart} img={item.image} name={item.name} category={item.category} price={item.price} onAddToCart={handleAddToCart} />)}
        </div>
        <Cart cart={itemCart} onRemoveItem={handleRemoveItem} onConfirmOrder={handleConfirmOrder} />
      </div>
    </div>
    </>
  );
}

export default App;
