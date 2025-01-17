import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-2xl'>Welcome!</h1>
        <Link className='mt-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600' to='/shopping-items'>Click here to go shopping!</Link>

      </div>
    </>
  )
}

export default HomePage