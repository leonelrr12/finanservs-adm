import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import NotData from '../NotData'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Show = () => {
  const [data, setData] = useState([])
  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/terms_loan')
    const da = await res.data
    setData(da)
  }

  const delRecord = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "No será posible revertir esto!",
      icon: '',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(URL_API + '/adm/terms_loan/' + id)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          getAll()
        }catch(e){
          swalWithBootstrapButtons.fire(
            'Error en Conexion',
            'Favor verificar LOG del Servidor',
            'error'
          )
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Registro segurado :)',
          'error'
        )
      }
    })
  }

  useEffect(() => {
    getAll()
  },[])

  return ( 
    <div className="container-sm m-auto mt-3">
      <h2 className="text-center">Plazos del Préstamo</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/terms_loan/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Días</th>
            <th scope="col">Activo</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(data) === "object") ? 
            data.map(item => {
              return (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.is_active}</td>
                <td className="text-center">
                  <Link to={"/terms_loan/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => {delRecord(item.id)}} className="btn btn-danger btn-sm mx-2 m-0">Borrar</button>
                </td>
              </tr>
              )})
          :
            <tr>
              <td colSpan="4">
              <NotData />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
   )
}
 
export default Show