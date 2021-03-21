import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const URL = process.env.REACT_APP_URL_SERVER

    try {
      if(update) {
        await axios.put(URL + '/adm/prospects/entity_f', data)
      }
      history.push('/prospects/entity_f')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }    
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
 
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >"Actualizar"</button>
          <Link to={"/prospects/entity_f/"}
            className="btn btn-warning font-weight-bold mx-3"
          >Cancelar</Link>
        </div>
      </form>
      { errorMessage ? 
        <AlertMessage 
          type={"warning"}
          message={errorMessage} 
          setMsg={setErrorMessage}
        />
        : ""
      }    
    </>  
   )
}
 
export default Form;