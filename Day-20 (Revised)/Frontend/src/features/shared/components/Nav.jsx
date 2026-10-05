import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()



    return (
        <nav className='nav-bar'>
            <img className='logo-img' src="/instalogo.png" alt="" />
            <button 
            onClick={()=>{navigate("/create-post")}}
            className='button primary-button'>new post</button>
        </nav>
    )
}

export default Nav
