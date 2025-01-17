import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShoppingItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  
  const formatProductNameForURL = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase(); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl text-center font-semibold text-gray-800 mb-8">Our Products</h1>
      <div className="grid grid-cols-3 gap-6 mx-24">
        {products.map(product => (
          <Link 
            to={`/item/${formatProductNameForURL(product.name)}`} 
            key={product.id} 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">${product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock_quantity}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShoppingItems;
