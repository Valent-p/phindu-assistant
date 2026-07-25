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
        
    }