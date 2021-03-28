import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import NotData from '../NotData'
require('dotenv').config()

const Show = () => {
  const [purposes, setPurposes] = useState([])
  const URL = process.env.REACT_APP_URL_SERVER

  const getAll = async () => {
    const res = await axios.get(URL + '/adm/sector_profesion')
    const data = await res.data
    setPurposes(data)
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
          await axios.delete(URL + '/adm/sector_profesion/' + id)
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
    <div className="w-50 m-auto">
      <h2 className="text-center mt-5">Relación Sector Profesión</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/sector_profesion/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Sector</th>
            <th scope="col">Profesión</th>
            <th scope="col">Activo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(purposes) === "object") ? 
            purposes.map(item => {
              return (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.sector}</td>
                  <td>{item.profesion}</td>
                  <td>{item.is_active}</td>
                  <td>
                    <Link to={"/sector_profesion/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
                    <button onClick={() => {delRecord(item.id)}} className="btn btn-danger btn-sm mx-2">Borrar</button>
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