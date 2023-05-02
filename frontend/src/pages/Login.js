import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { motion as m } from "framer-motion"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <m.form className="login" onSubmit={handleSubmit}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}>
      <h3>LOG IN TO YOUR ACCOUNT</h3>
      
      <label>Email Address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>LOG IN</button>
      {error && <div className="error">{error}</div>}
    </m.form>
  )
}

export default Login