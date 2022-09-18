/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import apiConfig from '../../config/api'
import { Input } from '@mui/material';
import { LoginContext } from "../../context/loginContext";

const URL_API = apiConfig.domain

const Form = (props) => {
  const { update = null, handleClose2, estadoAnt, data, setData, Role = 2 } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [estados, setEstados] = useState([])
  const { userInfo: user } = useContext(LoginContext)

  const { id: idUser } = user
  // console.log(idUser)

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // console.log(data, [e.target.name], e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    data.ejecutivo = idUser
    try {
      if (update) {
        const wrkDdata = { 
          estado: data.n1Estado, 
          comentarios: data.F7Comentarios, 
          ejecutivo: data.ejecutivo, 
          id: data.A1ID, 
          monto: data["B6Préstamo Personal"],
          plazo: data.B8Plazo,
          letra: data.B9Letra
        }
        await axios.put(URL_API + '/adm/prospects/estado/', wrkDdata)
        handleClose2()
        if (estadoAnt !== data.estado) {
          const res = await axios.get(URL_API + '/adm/email-estado/' + data.A1ID)
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
    } catch (ex) {
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor." + ex)
    }
  }

  const onCancelar = () => {
    handleClose2()
  }

  useEffect(() => {
    axios.get('/adm/estados_tramite')
      .then(estados => setEstados(estados.data))
  }, [])

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-12">
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
                  name="n1Estado"
                  onChange={onChange}
                  value={data.n1Estado}
                >
                  {estados ?
                    estados.map(estado => (
                      <option value={estado.id} selected={estado.id === data.id}>{estado.name}</option>
                    ))
                    : ''
                  }
                </select>
              </div>
              {Role === 1 ? (
                <>
                  <div className="form-group">
                    <label>Monto Aprobado</label>
                    <Input
                      className="form-control"
                      name="B6Préstamo Personal"
                      onChange={onChange}
                      value={data["B6Préstamo Personal"]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Plazo Aprobado</label>
                    <Input
                      className="form-control"
                      name="B8Plazo"
                      onChange={onChange}
                      value={data.B8Plazo}
                    />
                  </div>
                  <div className="form-group">
                    <label>Letra Aprobada</label>
                    <Input
                      className="form-control"
                      name="B9Letra"
                      onChange={onChange}
                      value={data.B9Letra}
                    />
                  </div>
                </>
              ) : null}

              <div className="form-group mt-2">
                <label>Comentarios:</label>
                <textarea id="w3review" rows="6" cols="50"
                  className="form-control"
                  name="F7Comentarios"
                  onChange={onChange}
                  value={data.F7Comentarios || ''}
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
            {errorMessage ?
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