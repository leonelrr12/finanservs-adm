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
        await axios.put(URL_API + '/adm/entities_f/', data)
      } else {
        await axios.post(URL_API + '/adm/entities_f/', data)
      }
      history.push('/entities_f')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" className="form-control" name="name" onChange={onChange} value={data.name}
          />
        </div>
        <div className="form-group">
          <label>Ruta</label>
          <input type="text" className="form-control" name="id_ruta" onChange={onChange} value={data.id_ruta}
          />
        </div>
        <div className="form-group">
          <label>Contacto</label>
          <input type="text" className="form-control" name="contact" onChange={onChange} value={data.contact}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="text" className="form-control" name="phone_number" onChange={onChange} value={data.phone_number}
          />
        </div>
        <div className="form-group">
          <label>Celular</label>
          <input type="text" className="form-control" name="cellphone" onChange={onChange} value={data.cellphone}
          />
        </div>
        <div className="form-group mt-2">
          <label className="mx-3">Activo</label>
          <label className="mx-2">Si</label>
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "Si"}
            onChange={onChange}
            value="Si"
          />
          <label className="mx-2">No</label>
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
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/entities_f"}
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