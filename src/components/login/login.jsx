import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'


const URL_API = '' //process.env.REACT_APP_URL_SERVER

const Login = (props) => {
  const {udtStatusUser} = props

  const history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: '',
    confPassword: ''
  })

  const [errorMessage, setErrorMessage] = useState(null)

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmit = async () => {
    getNewUser()
    try {
      const uuu = await axios.get(URL_API + '/api/login/'+user.email+'/'+user.password)
      const token = uuu.data.token
      
      if(token.length > 0) {
        const userJSON = {
          username: user.email,
          token: token,
          entity_f: uuu.data.Ruta,
          role: uuu.data.Role
        }
        const dataUser = {
          loggedInSatus: true,
          user: {
            email: user.email,
            token: true,
            entity_f: uuu.data.Ruta,
            role: uuu.data.Role
          }
        }
        
        udtStatusUser(dataUser)

        window.localStorage.setItem('jwt', JSON.stringify(userJSON));
        history.push(uuu.data.Role === 1 ? "/prospects" : "/entity_f")
      } else {
        setErrorMessage(uuu.data.message)    
      }
    }catch(e) {
      setErrorMessage(e.message)    
    } 
  }  

  const getNewUser = async () => {
    console.log(URL_API + '/api/login/new-user/'+user.email);
    const uuu = await axios.get(URL_API + '/api/login/new-user/'+user.email)
    if(uuu && uuu.data.is_new){
      window.localStorage.setItem('pwd',user.email)
      history.push("/password")
    }
  }

  return ( 
    <div className="row mt-5">
      <div className="col-sm-12 col-xs-12 col-md-4 m-auto">
        <form >
          <input 
            className="form-control"
            placeholder="Email"
            required
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
            onClick={handleSubmit}
          >Iniciar Sessión</button>
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

export default Login