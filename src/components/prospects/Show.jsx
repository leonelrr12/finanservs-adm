import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth } from '../../config/firebase.js'
import axios from 'axios'
import NotData from '../NotData'

const Show = () => {
  const history = useHistory()
  const [prospects, setProspects] = useState([])
  const URL = process.env.REACT_APP_URL_SERVER
  const { id_personal = null, id_entity = null } = useParams()

  console.log(id_personal, id_entity)

  useEffect(() => {
    auth.onAuthStateChanged( user => {
      if (!user){
        history.push("/login")
      }else{
        getAll()
      }
    })
  },[])

  const getAll = async () => {
    const res = await axios.get(URL + '/adm/prospects')
    const data = await res.data
    setProspects(data)
  }

  return ( 
    <>
      <h2 className="text-center my-4">Prospectos</h2>
      <table className="table table-striped table-md">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cedula</th>
            <th scope="col">Entidad</th>
            <th scope="col">Email</th>
            <th scope="col">Celular</th>
            <th scope="col">File 1</th>
            <th scope="col">File 2</th>
            <th scope="col">File 3</th>
            <th scope="col">File 4</th>
            <th scope="col">Estado</th>
            <th scope="col">Creado</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(prospects) === "object") ? 
            prospects.map(item => {
              return (
              <tr key={item.id} className={item.dias > 60 ? "bg-danger" : (item.dias > 30 ? "bg-warning" : "")}>
                <td className="text-center">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.id_personal}</td>
                <td>{item.entity}</td>
                <td>{item.email}</td>
                <td>{item.cellphone}</td>
                <td>{item.imag_id}</td>
                <td>{item.imag_cp}</td>
                <td>{item.imag_fss}</td>
                <td>{item.imag_rs}</td>
                <td>{item.estado}</td>
                <td>{item.fcreate}</td>
                {/* <td>{item.dias}</td> */}
              </tr>
            )})
          :
            <tr>
              <td colSpan="12">
              <NotData />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </>
   )
}
 
export default Show