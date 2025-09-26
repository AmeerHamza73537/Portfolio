import React from 'react'

const Navbar = () => {
  return (
    <>
        <div id='navbar' className=' h-16 flex justify-around items-center'>
                <p>Portfolio</p>
                <ul className='flex gap-8'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Skills</li>
                    <li>Projects</li>
                    <li>Contact</li>
                </ul>
        </div>
    </>
  )
}

export default Navbar
