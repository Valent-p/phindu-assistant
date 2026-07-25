import React, { useState } from 'react'
import './Login.css'

function Login() {
    // constants for username and password state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')