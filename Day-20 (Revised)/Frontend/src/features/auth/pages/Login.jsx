import React from 'react'
import "../styles/form.scss"



const Login = () => {

    const submitHandler = (e) => {
        e.preventDefault()
    }


    return (
        <main>
            <div className="form-container">
                <h1>Welcome Back!</h1>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder='Enter Username'
                    />
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter Password'
                    />
                    <button>Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login
