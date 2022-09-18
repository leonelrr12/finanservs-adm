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
        await axios.put(URL_API + '/adm/type_documents/', data)
      } else {
        await axios.post(URL_API + '/adm/type_documents/', data)
      }
      navigate('/type_documents')
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
        <div className="form-group mt-2">
          <label className="mx-3">Activo</label>
          <label>Si</label>
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "Si"}
            onChange={onChange}
            value="Si"
          />
          <label>No</label>
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "No"}
            onChange={onChange}
            value="No"
          />
        </div>  
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold m-0"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/type_documents"}
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