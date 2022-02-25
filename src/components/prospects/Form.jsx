/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Form = (props) => {
  const { update = null, handleClose2, estadoAnt, id } = props
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ estados, setEstados ] = useState([])
  const [ data, setData ] = useState({})

  const user = useSelector((state) => state.user.user);

  const {id: idUser } = user
  console.log(idUser)

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    data.ejecutivo=idUser
    try {
      if(update) {
        await axios.put(URL_API + '/adm/prospects/entity_f/', data)
        handleClose2()
        if(estadoAnt !== data.estado) {
          const res = await axios.get(URL_API + '/adm/email-estado/' + data.id)
          const da = await res.data[0]
          const body = {
            "id": da.id,
            "email": da.email,
            "nombre": da.nombre, 
            "monto": da.monto, 
            "celular": da.celular,
            "fcreate": da.fcreate, 
            "dias": da.dias,
            "asunto": `Estatus de la Solicitud No.: ${da.id} << ${da.estado} >>`,
            "mensaje": "Es nuestro interes mantenerlo actualizado con el estatus de su trámite.  Cualquier consulta no dude en contactarnos.",
            "email_banco": da.email_banco,
            "email_sponsor": da.email_sponsor,
            "estado": da.estado,
            "comentarios": da.comentarios,
          }
          await axios.post(URL_API + '/adm/send-email/', body)
        }
      }
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }    
  }

  const onCancelar = () => {
    handleClose2()
  }

  const getById = async () => {
    const res = await axios.get(URL_API + '/adm/prospects/entity_f/entity/' + id)
    const data = await res.data
    setData(data)
  }

  useEffect(() => {
    getById()
  },[])

  useEffect(() => {
    axios.get('/adm/estados_tramite')
    .then(estados => setEstados(estados.data))
  },[])

  return ( 
        <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Modificar Prospecto
            </h2>
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
                </div>
        </div>
      </div>
    </div>
   )
}
 
export default Form;