import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingItem = () => {
  const { name } = useParams();
  const { isLoggedIn, userId } = useContext(AuthContext)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/products/${name}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, [name]);

  const addToCart = () => {
    axios.post('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/cart/add', {
      userId,               
      name: product.name,  
      stock_quantity: 1           
    })
    .then(response => {
      console.log(response.data.message);
    })
    toast.success("Item added to cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    })
    .catch(error => {
      console.log("Error adding to cart:", error);
    });
  };



  if (!product) {
    return <div className="text-center text-2xl font-bold mt-10">Item not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="absolute top-0 right-0 p-4">
        <Link
          to="/shopping-items"
          className="text-blue-600 hover:text-blue-800 text-xl font-bold underline"
        >
          Go Back
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="text-gray-600 space-y-3 my-2">
            <p className="text-lg">
              <span className="font-semibold">Price:</span> ${product.price}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Description:</span> {product.description}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Stock:</span> {product.stock_quantity} available
            </p>
          </div>
          {isLoggedIn ? <button
            onClick={addToCart}
            className="mt-6 w-full bg-green-500 text-white font-semibold text-lg py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Add to Cart
          </button> : <>
            <Link className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" to='/sign-up'>Sign up</Link> or <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" to='/log-in'>Log in</Link>
          </>}
        </div>
      </div>
    </div>
  );
};

export default ShoppingItem;
