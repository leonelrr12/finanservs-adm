import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import verifyToken from '../login/token'
import NotData from '../NotData'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const Show = () => {
  const [data, setData] = useState([])
  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/roles')
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
          await axios.delete(URL_API + '/adm/roles/' + id)
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

  const [tokenValid, setTokenValid] = useState(false)
  useEffect(() => {
    verifyToken().then(res => {
      const { isValid } = res
      if(isValid){
        setTokenValid(true)
        getAll()
      }else{
        window.localStorage.removeItem('jwt')
      }
    })
  },[])

  return ( 
    <>
    {tokenValid ? 
    <div className="w-75 m-auto">
      <h2 className="text-center mt-5">Usuarios</h2>
      <div className="my-2 d-flex justify-content-end">
        <Link to={"/roles/new"} className="btn btn-primary btn-md ">Nuevo</Link>
      </div>
      <table className="table table-striped table-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Role</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(data) === "object") ? 
            data.map(item => {
              return (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>{item.role}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={"/roles/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => {delRecord(item.id)}} className="btn btn-danger btn-sm mx-2">Borrar</button>
                </td>
              </tr>
              )})
            :
              <tr>
                <td colSpan="3">
                <NotData />
                </td>
              </tr>
            }
        </tbody>
      </table>
    </div>
      :""}
      </>
   )
}
 
export default Show