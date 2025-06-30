import products from './data/products.json'
import { Products } from './components/Products'
import { Ticket } from './components/Ticket'
import './App.css'
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveProduct = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <>
      <h1>Fruiteria</h1>
      <div className="container">
        <Products products={products} onAddToCart={handleAddToCart} />
        <Ticket cart={cart} onRemoveProduct={handleRemoveProduct} onClearCart={handleClearCart} />
      </div>
    </>
  )
}

export default App
