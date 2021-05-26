import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import NotData from '../NotData'

const URL_API = process.env.REACT_APP_URL_SERVER

const Show = () => {
  const [data, setData] = useState([])
  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/sectors')
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
          await axios.delete(URL_API + '/adm/sectors/' + id)
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
      <h2 className="text-center mt-5">Sector Laboral</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/sectors/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Abreviado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(data) === "object") ? 
            data.map(sector => {
              return (
              <tr key={sector.id}>
                <td className="text-center">{sector.id}</td>
                <td>{sector.name}</td>
                <td>{sector.short_name}</td>
                <td>
                  <Link to={"/sectors/edit/" + sector.id} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => {delRecord(sector.id)}} className="btn btn-danger btn-sm mx-2">Borrar</button>
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