import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(update) {
        await axios.put(URL_API + '/adm/roles/', data)
      } else {
        await axios.post(URL_API + '/adm/roles/', data)
      }
      history.push('/roles')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }


  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role</label>
          <input 
            required
            type="text"
            className="form-control"
            name="role"
            onChange={onChange}
            value={data.role}
          />
        </div>
        <div className="form-group my-2">
          <label>Descripción</label>
          <input 
            required
            type="text"
            className="form-control"
            name="description"
            onChange={onChange}
            value={data.description}
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/roles"}
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