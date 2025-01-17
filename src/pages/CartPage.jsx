import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { userId } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items when the component loads
    if (userId) {
      axios.get(`https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/cart?userId=${userId}`)
        .then((response) => {
          setCartItems(response.data);
          calculateTotalPrice(response.data);
        })
        .catch((error) => {
          console.log("Error fetching cart items:", error);
        });
    }
  });

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      axios.delete('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/cart/remove', {
        data: { userId, cartItemId }
      })
        .then((response) => {
          setCartItems((prevItems) => prevItems.filter(item => item.cart_item_id !== cartItemId));
        })
        .catch((error) => {
          console.log("Error removing item:", error);
        });
    } else {
      axios.put('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/cart/update', {
        userId,
        cartItemId,
        newQuantity
      })
        .then((response) => {
          setCartItems((prevItems) =>
            prevItems.map(item =>
              item.cart_item_id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
          );
          calculateTotalPrice(cartItems);
        })
        .catch((error) => {
          console.log("Error updating quantity:", error);
        });
    }

  };

  const removeItem = (cartItemId) => {
    // Remove item from the cart
    axios.delete('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/cart/remove', {
      data: { userId, cartItemId }
    })
      .then((response) => {
        setCartItems((prevItems) => prevItems.filter(item => item.cart_item_id !== cartItemId));
        calculateTotalPrice(cartItems);
      })
      .catch((error) => {
        console.log("Error removing item:", error);
      });
  };

  const calculateTotalPrice = (items) => {
    // Calculate the total price of all items in the cart
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  if (cartItems.length === 0) {
    return <div className="text-center text-2xl font-bold mt-10">Your cart is empty</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl text-center font-semibold text-gray-800 mb-8">Your Cart</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {cartItems.map((item) => (
            <div key={item.cart_item_id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-800">{item.product_name}</h2>
                <p className="text-gray-600 ml-4">${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded mr-2"
                >
                  -
                </button>
                <p className="text-lg">{item.quantity}</p>
                <button
                  onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded ml-2"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.cart_item_id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">Total Price:</h3>
            <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/checkout"
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
