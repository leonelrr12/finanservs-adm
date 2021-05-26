import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const URL_API = process.env.REACT_APP_URL_SERVER

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData, entities, sectorProfesion } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(update) {
        await axios.put(URL_API + '/adm/entity_params/', data)
      } else {
        await axios.post(URL_API + '/adm/entity_params/', data)
      }
      history.push('/entity_params')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mx-3">Entidad Fianciera: </label>
          <select 
            name="id_entity_f"
            onChange={onChange}
            required
          >
            <option value="">&nbsp;Seleccione&nbsp;</option>
            {entities.length ? 
              entities.map(item => 
                <option value={item.id} selected={item.id === data.id_entity_f}>{item.name}</option>
              )
            : ""  }
          </select>
        </div>
        <div className="form-group my-3">
          <label className="mx-3">Sector-Profesión: </label>
          <select 
            name="id_sector_profesion"
            onChange={onChange}  
            required
          >
            <option value="">&nbsp;Seleccione&nbsp;</option>
            {sectorProfesion.length ? 
              sectorProfesion.map(item => 
                <option value={item.id} selected={item.id === data.id_sector_profesion}>{item.name}</option>
              )
            : ""  }
          </select>
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Cap. Descto. c/Hip</label>
          <input required name="descto_chip" type="text" className="form-control" onChange={onChange} value={data.descto_chip}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Cap. Descto. s/Hip</label>
          <input required name="descto_ship" type="text" className="form-control" onChange={onChange} value={data.descto_ship}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Cap. End. c/Hip</label>
          <input required name="deuda_chip" type="text" className="form-control" onChange={onChange} value={data.deuda_chip}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Cap. End. s/Hip</label>
          <input required name="deuda_ship" type="text" className="form-control" onChange={onChange} value={data.deuda_ship}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Monto Mínimo</label>
          <input required name="mount_min" type="text" className="form-control" onChange={onChange} value={data.mount_min}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Monto Máximo</label>
          <input required name="mount_max" type="text" className="form-control" onChange={onChange} value={data.mount_max}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Plazo Máximo</label>
          <input required name="plazo_max" type="text" className="form-control" onChange={onChange} value={data.plazo_max}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Tasa</label>
          <input required name="tasa" type="text" className="form-control" onChange={onChange} value={data.tasa}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label>Comisión</label>
          <input name="comision" type="text" className="form-control" onChange={onChange} value={data.comision}
          />
        </div>
        <div className="form-group mx-3 mt-3">
          <label className="mx-3">Activo</label>&nbsp;&nbsp;
          <label>Si</label>
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "Si"}
            onChange={onChange}
            value="Si"
          />&nbsp;&nbsp;&nbsp;
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
          <Link to={"/entity_params"}
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