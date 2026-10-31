import React, { useState } from 'react'
import "../styles/formgroup.scss"
import { Link, useNavigate } from 'react-router'
import logo from "../../../assets/logo-white.png"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate("/")
  }



  return (
    <main className='login-page'>
      <div className="form-container">
        <img src={logo} alt="Moodify" className='logo' />
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>

          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          <button type='submit'>Continue</button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </main>
  )
}

export default Login