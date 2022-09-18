import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Form = (props) => {
  const navigate= useNavigate()
  const { update = null, data, setData } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(update) {
        await axios.put(URL_API + '/adm/profesions_lw/', data)
      } else {
        await axios.post(URL_API + '/adm/profesions_lw/', data)
      }
      navigate('/profesions_lw')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input 
            type="text"
            className="form-control"
            name="name"
            onChange={onChange}
            value={data.name}
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold m-0"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/profesions_lw"}
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