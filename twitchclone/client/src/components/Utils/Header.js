import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        Streamier
      </Link>

      <div className='right menu'>
        <Link to='/' className='item'>
          All Streams
        </Link>
        <Link to='/' className='item'>
          Login with Google
        </Link>
      </div>
    </div>
  )
}