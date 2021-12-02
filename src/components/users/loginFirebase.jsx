import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {auth} from '../../config/firebase.js'
import AlertMessage from '../AlertMessage'

const Login = () => {
  const navigate= useNavigate()
  const [user, setUser] = useState({
    email: 'guasimo01@gmail.com',
    password: '12345678'
  })

  const [errorMessage, setErrorMessage] = useState(null)
  // const [userId, setUserId] = useState(null)

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password)
      navigate("/")
    }catch(e) {
      setErrorMessage(e.message)
    } 
  }

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password)
      // setUserId(res.user.uid)
      // localStorage.setItem('uid', res.user.uid)
      navigate("/")
    }catch(e) {
      setErrorMessage(e.message)    
    } 
  }  

  return ( 
    <div className="row mt-5">
      <div className="col-sm-12 col-xs-12 col-md-4 m-auto">
        <form onSubmit={handleSubmit}>
          <input 
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={user.email}
          /> 
          <input 
            className="form-control mt-3"
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          /> 
          <button
            type="button"
            className="form-control btn btn-primary btn-block mt-3"
            onClick={handleLogin}
          >Iniciar Sessión</button>
          <button
            type="submit"
            className="form-control btn btn-info btn-block mt-3"
          >Registrar Usuario</button>
        </form>
        { errorMessage ? 
        <AlertMessage 
          type={"warning"}
          message={errorMessage} 
          setMsg={setErrorMessage}
        />
        : ""
      }
      </div>
    </div>
  );
}
 
export default Login;