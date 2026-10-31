import React, { useState } from 'react'
import "../styles/formgroup.scss"
import { Link, useNavigate } from 'react-router'
import logo from "../../../assets/logo-white.png"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }


  return (
    <main className='register-page'>
      <div className="form-container">
        <img src={logo} alt="Moodify" className='logo' />
        <h1>Sign up to start listening</h1>
        <form onSubmit={handleSubmit}>

          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="username"
          />

          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="name@domain.com"
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="password"
          />


          <button type='submit'>Create Account</button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </main>
  )
}

export default Register