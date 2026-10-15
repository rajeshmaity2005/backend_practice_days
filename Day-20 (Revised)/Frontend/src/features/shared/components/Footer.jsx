import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import "../footer.scss"

const Footer = () => {

    const location = useLocation()
    const navigate = useNavigate()

    location.pathname === "/"
    location.pathname === "/all-posts"

    const isHome = location.pathname === "/";
    const isProfile = location.pathname === "/all-posts";



    return (
        <footer className='footer'>
            <div className='circular-btn'>

                <button
                    className={`normal-icon ${isHome ? "active" : ""}`}
                    onClick={() => navigate("/")}
                >
                    {isHome ? (
                        // filled SVG
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM11 13V19H13V13H11Z" />
                        </svg>
                    ) : (
                        // outline SVG
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 19H19V9.97815L12 4.53371L5 9.97815V19H11V13H13V19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z" /></svg>
                    )}
                </button>


                <button
                    onClick={() => { navigate("/create-post") }}
                    className='new-post-btn'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
                </button>


                <button
                    className={`normal-icon ${isProfile ? "active" : ""}`}
                    onClick={() => navigate("/all-posts")}
                >
                    {isProfile ? (
                        // filled SVG
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z" />
                        </svg>
                    ) : (
                        // outline SVG
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
                        </svg>
                    )}
                </button>
            </div>
        </footer>
    )
}

export default Footer
