import React from 'react'
import logo from '../images/logo-light.png'

function Logo() {
  return (
    <img 
        src={logo}
        title='PomoDo'
        alt='PomoDo logo'
        className='absolute w-28 top-0 left-0 h-auto'
    />
  )
}

export default Logo