import React, { useState } from 'react'
import './Login.css'

function Login() {
  // constants for email and password state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

     //anaging form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        {/*Handle login logic here*/}

        console.log('Email: ', email)
        console.log('Password: ', password)
        alert('Login button clicked check for details')

    }

        return (
            <div className="login-container">
                <div className="login-box">

                    {/* Header part */}
                    <div className='header'>
                    <div className= "logo">
                        <image src= {logo} alt= "logo"></image>
                    </div>
                    <h1 id = "header1">Welcome to Phindu Assistance</h1>

                    <p id = "headerp">Your personal Phindu assistance <br></br>suite is ready for you</p>
                    </div>
                    </div>

                    {/* Submission form */}
                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/*password input*/}
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
                        

                        <button 
                        type="button"
                        className="toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>

                       </div>

                    </div>

                    {/*handling forgot password option*/}
                    <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div>

                    {/*sign in button*/}
                    <button type="submit" className="signIn-btn">Sign In</button>

                    </form>

                    {/*other sign up options*/}
                    <div className="other-options">
                        <p>Or continue with</p>

                    </div>

                    {/*option for signing up with google*/}
                    <div className="google-login">
                        <button className="google-btn">
                        <span className="google-icon">G</span>
                        Google
                        </button>

                    {/*option for signing up with facebook*/}
                    <button className="facebook-btn">
                        <span className="facebook-icon">F</span>
                        Facebook
                    </button>
                    </div>

                    {/*link for creating a new account*/}
                    <div className="create-account">Don't have an account? <a href="#">Create Account</a></div>
                    
                </div>
                
        )
    }

    export default Login
