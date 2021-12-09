/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
import NotData from '../NotData'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Show = () => {
  const [affiliets, setAffiliets] = useState([])

  useEffect(() => {
    getAll()
  },[])

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/red-sponsor')
    const da = await res.data
    setAffiliets(da)
  }

  return ( 
    <>
      <h2 className="text-center my-2">Red de Afiliados</h2>
 
      <table className="table table-striped table-md">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
            <th scope="col">Sponsor</th>
            <th scope="col">Creado en:</th>
            <th scope="col">Estado Solicitud</th>
            <th scope="col">Fecha</th>
            <th scope="col">Monto</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(affiliets) === "object") ? 
            affiliets.map(item => {
              return (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>{item.Nombre}</td>
                <td>{item.celular}</td>
                <td>{item.email}</td>
                <td>{item.Sponsor}</td>
                <td>{item.dateCreated}</td>
                <td>{item.Estado}</td>
                <td>{item.fcreate}</td>
                <td>{new Intl.NumberFormat("en-US", {currency: 'USD', minimumFractionDigits: 2}).format(Number(item.loanPP))}</td>
              </tr>
            )})
          :
            <tr>
              <td colSpan="13">
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