import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData, roles, entities } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(update) {
        await axios.put(URL_API + '/adm/users/', data)
      } else {
        await axios.post(URL_API + '/adm/users/', data)
      }
      history.push('/users')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            required
            type="email"
            className="form-control"
            name="email"
            onChange={onChange}
            value={data.email}
          />
        </div>
        <div className="form-group my-2">
          <label>Role</label>
          <select 
            name="id_role" 
            required
            onChange={onChange}
            className="form-control"
          >
            <option value="">&nbsp;Seleccione&nbsp;</option>
            {roles.length ? 
              roles.map(item => 
                <option value={item.id} selected={item.id === data.id_role}>{item.description}</option>
              )
            :
              ""}
          </select> 
        </div>
        <div className="form-group my-2">
          <label>Entidad Financiera</label>
          <select 
            name="id_entity_f"
            onChange={onChange}
            className="form-control"
          >
            <option value="0">&nbsp;Uso Interno&nbsp;</option>
            {entities.length ? 
              entities.map(item => 
                <option value={item.id} selected={item.id === data.id_entity_f}>{item.name}</option>
              )
            : ""  }
          </select>
        </div>
        <div className="form-group my-2">
          <label>Nombre</label>
          <input 
            required
            type="text"
            className="form-control"
            name="name"
            onChange={onChange}
            value={data.name}
          />
        </div>
        <div className="form-group my-2">
          <label>Dirección</label>
          <input 
            required
            type="text"
            className="form-control"
            name="address"
            onChange={onChange}
            value={data.address}
          />
        </div>
        <div className="form-group my-2">
          <label>Teléfono</label>
          <input 
            required
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={onChange}
            value={data.phoneNumber}
          />  
        </div>
        <div className="form-group my-2">
          <label>Celular</label>
          <input 
            required
            type="text"
            className="form-control"
            name="cellPhone"
            onChange={onChange}
            value={data.cellPhone}
          />
        </div>
        <div className="form-group my-3">
          <label className="mx-3">Activo:</label>&nbsp; 
          <label>Si</label>&nbsp; 
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "Si"}
            onChange={onChange}
            value="Si"
          />&nbsp; &nbsp; &nbsp; 
          <label>No</label>&nbsp; 
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "No"}
            onChange={onChange}
            value="No"
          />&nbsp;&nbsp;&nbsp;

          <label className="mx-3">Resetar Contraseña:</label>&nbsp; 
          <label>Si</label>&nbsp; 
          <input 
            type="Radio"
            name="is_new"
            checked={data.is_new === "Si"}
            onChange={onChange}
            value="Si"
          />&nbsp; &nbsp; &nbsp; 
          <label>No</label>&nbsp; 
          <input 
            type="Radio"
            name="is_new"
            checked={data.is_new === "No"}
            onChange={onChange}
            value="No"
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/users"}
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