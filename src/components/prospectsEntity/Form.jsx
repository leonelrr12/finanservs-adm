import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [estados, setEstados] = useState([])

  const onChange = (e) => {
    
    setData({...data, [e.target.name] : e.target.value})
  }

  const URL = process.env.REACT_APP_URL_SERVER

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(update) {
        await axios.put(URL + '/adm/prospects/entity_f/', data)
      }
      history.push('/entity_f')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }    
  }

  useEffect(() => {
    axios.get(URL + '/adm/estados_tramite')
    .then(estados => setEstados(estados.data))
  })


  return ( 
    <>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Estado</label>
          <select 
            className="form-control"
              name="estado"
              onChange={onChange}
              value={data.estado}
          >
            {estados ?             
              estados.map(estado => (
                <option value={estado.id} selected = {estado.id === data.id}>{estado.name}</option>
              ))
              : ''
            }
          </select>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >Actualizar</button>
          <Link to={"/entity_f/"}
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