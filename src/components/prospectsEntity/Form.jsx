import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const Form = (props) => {
  const { update = null, data, setData, handleClose2 } = props
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ estados, setEstados ] = useState([])
  const [ idUser, setIdUser ] = useState(0)

  const onChange = (e) => {
    
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    data.ejecutivo=idUser
    try {
      if(update) {
        await axios.put(URL_API + '/adm/prospects/entity_f/', data)
      }
      handleClose2()
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }    
  }

  const onCancelar = () => {
    handleClose2()
  }

  useEffect(() => {
    axios.get(URL_API + '/adm/estados_tramite')
    .then(estados => setEstados(estados.data))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('jwt');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setIdUser(user.idUser)
    }
  },[])

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
        <div className="form-group mt-2">
          <label>Comentarios:</label>
          <textarea id="w3review" rows="6" cols="50"
            className="form-control"
            name="comentarios"
            onChange={onChange}
            value={data.comentarios || ''}
          >
          </textarea>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >Actualizar</button>
          <button
            onClick={onCancelar}
            className="btn btn-warning font-weight-bold mx-2"
          >Cancelar</button>
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