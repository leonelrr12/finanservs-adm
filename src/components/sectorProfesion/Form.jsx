import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const URL_API = process.env.REACT_APP_URL_SERVER

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData, sectors, profesions } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(update) {
        await axios.put(URL_API + '/adm/sector_profesion/', data)
      } else {
        await axios.post(URL_API + '/adm/sector_profesion/', data)
      }
      history.push('/sector_profesion')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mx-3">Sector: </label>
          <select>
            {sectors.length ? 
              sectors.map(item => 
                <option value={item.id} selected={item.id === data.id_sector}>{item.name}</option>
              )
            : ""  }
          </select>
        </div>
        <div className="form-group my-3">
          <label className="mx-3">Profesión: </label>
          <select>
            {profesions.length ? 
              profesions.map(item => 
                <option value={item.id} selected={item.id === data.id_profesion}>{item.name}</option>
              )
            : ""  }
          </select>
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
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/sector_profesion"}
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