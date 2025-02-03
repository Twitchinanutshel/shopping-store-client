import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [backend, setBackend] = useState(true)

  useEffect(() => {
    axios.get('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/health')
      .then((response) => {
        console.log('Backend is working from Heroku');
      })
      .catch((error) => {
        console.error('backend is not available:', error);
        setBackend(false);
      })
  })

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-2xl'>Welcome!</h1>
        <Link className='mt-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600' to='/shopping-items'>Click here to go shopping!</Link>
        {backend ? (
          <>
            <h1 className='bg-red-800 px-6 py-2'>HEROKU BACKEND IS NOT RUNNING!</h1>
          </>
        ) : null}
      </div>
    </>
  )
}

export default HomePage