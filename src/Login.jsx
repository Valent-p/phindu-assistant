import React, { useState } from 'react'
import './Login.css'

function Login() {
    // constants for email and password state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

    // Managing form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here

        console.log('Email: ', email)
        console.log('Password: ', password)
        alert('Login button clicked check for details')

        return (
            <div className="login-container">
                <div className="login-box">

                    //Header part
                    <div className= "logo">logo</div>
                    <h1>Welcome to Phindu Assistance</h1>

                    <P>Your personal Phindu assistance suite is ready for you</P>
                    </div>

                    
        
    }