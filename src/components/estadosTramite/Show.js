import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import NotData from '../NotData'
require('dotenv').config()

const Show = () => {
  const [estados_tramite, setEstados_tramite] = useState([])
  const URL = process.env.REACT_APP_URL_SERVER

  const getAll = async () => {
    const res = await axios.get(URL + '/adm/estados_tramite')
    const data = await res.data
    setEstados_tramite(data)
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
      text: "No será porsible revertir esto!",
      icon: '',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(URL + '/adm/estados_tramite/' + id)
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
      <h2 className="text-center mt-5">Estados del Trámite</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/estados_tramite/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Activo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(estados_tramite) === "object") ? 
            estados_tramite.map(item => {
              return (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.is_active}</td>
                <td>
                  <Link to={"/estados_tramite/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
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