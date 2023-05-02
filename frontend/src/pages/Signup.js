import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { motion as m } from "framer-motion"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <m.form className="signup" onSubmit={handleSubmit}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}>
      <h3>SIGN UP FOR A NEW ACCOUNT</h3>
      
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

      <button disabled={isLoading}>SIGN UP</button>
      {error && <div className="error">{error}</div>}
    </m.form>
  )
}

export default Signup