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
    const res = await axios.get(URL + '/adm/entity_params')
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
          await axios.delete(URL + '/adm/entity_params/' + id)
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
  }, [])

  return ( 
    <div className="w-100 m-auto">
      <h2 className="text-center mt-5">Tarifas para Cálculo</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/entity_params/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Entidad</th>
            <th scope="col">Sector Profesión</th>
            <th scope="col">Cap.Desc. c/Hip</th>
            <th scope="col">Cap.Desc. s/Hip</th>
            <th scope="col">Cap. End. c/Hip</th>
            <th scope="col">Cap. End. s/Hip</th>
            <th scope="col">Monto Min</th>
            <th scope="col">Monto Max</th>
            <th scope="col">Plazo Mx</th>
            <th scope="col">Tasa</th>
            <th scope="col">Comision</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody> 
          {(typeof(purposes) === "object") ? 
            purposes.map(item => {
              return (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.entity}</td>
                  <td>{item.sector_profesion}</td>
                  <td>{item.descto_chip}</td>
                  <td>{item.descto_ship}</td>
                  <td>{item.deuda_chip}</td>
                  <td>{item.deuda_ship}</td>
                  <td>{item.mount_min}</td>
                  <td>{item.mount_max}</td>
                  <td>{item.plazo_max}</td>
                  <td>{item.tasa}</td>
                  <td>{item.comision}</td>
                  <td>
                    <Link to={"/entity_params/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
                    <button onClick={() => {delRecord(item.id)}} className="btn btn-danger btn-sm mx-2">Borrar</button>
                  </td> 
                </tr>
                )})
              :
                <tr>
                  <td colSpan="10">
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