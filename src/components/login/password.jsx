import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Password = () => {
  const navigate = useNavigate()
  const { search } = useLocation();
  const query = new URLSearchParams(search)
  const email = query.get("email")

  const [user, setUser] = useState({
    email,
    password: '',
    confPassword: ''
  })

  const [errorMessage, setErrorMessage] = useState(null)

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmit = async () => {
    
    if(user.confPassword.length){
      if(user.confPassword !== user.password) {
        setErrorMessage('Contraseñas no coinciden!') 
        return
      }
    }
    try {
      await axios.put(URL_API + '/api/login/chgpwd', user)
      navigate("/")
    }catch(e) {
      setErrorMessage(e.message)    
    } 
  }  

  return ( 
    <div className="row mt-5">
      <div className="col-sm-12 col-xs-12 col-md-4 m-auto">
        <form >
          <input 
            className="form-control mt-3"
            placeholder="Nueva Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          /> 
          <input 
            className="form-control mt-3"
            placeholder="Confirmar Contraseña"
            name="confPassword"
            type="password"
            onChange={handleChange}
            value={user.confPassword}
          /> 
          <button
            type="button"
            className="form-control btn btn-primary btn-block mt-3"
            onClick={handleSubmit}
          >Cambiar Contraseña</button>
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

export default Password