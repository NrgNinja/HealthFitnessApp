import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
  setIsLoading(true)
  setError(null)
  const app_name = 'lift-log'

  function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'http://localhost:5001' + route;
    }
  }

  const response = await fetch(buildPath('/api/user/signup'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await response.json()

  if (!response.ok) {
    setIsLoading(false)
    setError(json.error)
  }
  if (response.ok) {
    
    // send verification email to the user's email address
    const verificationResponse = await fetch(
      buildPath('/api/verification'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
      
    )
    const verificationJson = await verificationResponse.json()

    // save the user to local storage
    localStorage.setItem('user', JSON.stringify(json))

    // update the auth context
    dispatch({ type: 'LOGIN', payload: json })

    // update loading state
    
    setIsLoading(false)
    // new line
    setError('A verification email has been sent to ${email}. Please check your inbox and follow the instructions to complete your registration.')
  }
}

  
  // const signup = async (email, password) => {
  //   setIsLoading(true)
  //   setError(null)
  //   const app_name = 'lift-log'

  //   function buildPath(route)
  //   {
  //       if (process.env.NODE_ENV === 'production') 
  //       {
  //           return 'https://' + app_name + '.herokuapp.com/' + route;
  //       }
  //       else
  //       {
  //           return 'http://localhost:5001' + route;
  //       }
  //   }

  //   const response = await fetch(buildPath('/api/user/signup'), {
  //   // const response = await fetch('/api/user/signup'), {
  //   // const response = await fetch('http://localhost:5001/api/user/signup', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({ email, password })
  //   })
  //   const json = await response.json()

  //   if (!response.ok) {
  //     setIsLoading(false)
  //     setError(json.error)
  //   }
  //   if (response.ok) {
  //     // save the user to local storage
  //     localStorage.setItem('user', JSON.stringify(json))

  //     // update the auth context
  //     dispatch({type: 'LOGIN', payload: json})

  //     // update loading state
  //     setIsLoading(false)
  //   }
  // }

  return { signup, isLoading, error }
}