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

                    //Submission form
                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Email Adress</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        //password input
                        <div className = "input-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                        type="button"
                        className="toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    </form>

                </div>
            </div>
        )
    }