import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { 
  Button, 
  FormControl, 
  Modal, 
  Radio, 
  Box, 
  Paper, 
  Grid,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Divider,
} from '@mui/material'
import apiConfig from '../../config/api'
import { UserCard } from './UserCard'

const URL_API = apiConfig.domain

const Show = () => {
  const [data, setData] = useState([])
  const [item, setItem] = useState({
    id: '',
    name: '',
    id_ruta: '',
    contact: '',
    phone_number: '',
    cellphone: '',
    emails: '',
    is_active: ''
  })
  const [itemValid, setItemValid] = useState({
    name: true,
    id_ruta: true,
    contact: true,
    phone_number: true,
    cellphone: true,
  })
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/users')
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
          await axios.delete(URL_API + '/adm/users/' + id)
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

  
  const onClickNew = () => {
    setItem({
      id:'',
      name:'',
      id_ruta:'',
      contact:'',
      phone_number:'',
      cellphone:'',
      emails:'',
      type: 1,
      is_active: 'No'
    }); 
    setItemValid({
      name: false,
      id_ruta: false,
      contact: false,
      phone_number: false,
      cellphone: false,
    });
    // abrirCerrarModalInsertar();
  }

  const onClickUpdate = (row) => {
    setItem(row); 
    // abrirCerrarModalEditar();
  }

  useEffect(() => {
    getAll()
  },[])

  return ( 
    // <div className="w-75 m-auto">
    //   <h2 className="text-center mt-5">Usuarios</h2>
    //   <div className="my-2 d-flex justify-content-end">
    //     <Link to={"/users/new"} className="btn btn-primary btn-md ">Nuevo</Link>
    //   </div>

      <Box sx={{ marginBottom: 2, paddingX: 5, paddingY: 2 }}>
        <Paper
          sx={{ 
            p: 4,
            height: '100%',
            width: '100%',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#d3d3d3',
          }}
        >

          <h2 className="text-center ">Lista de Usuarios</h2>
          <Button sx={{ marginBottom: 2 }} color="primary" fullWidth variant="contained" onClick={onClickNew}>Nuevo</Button>

          <Grid container justifyContent="center" spacing={2}>
            {data.map( row => (
              <Grid item xs={12} sm={6} md={4}>
                <UserCard key={row.id} user={row} onClick={ ()=>onClickUpdate(row) } />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      // <table className="table table-striped table-sm">
      //   <thead className="bg-primary text-white">
      //     <tr>
      //       <th scope="col" className="text-center">ID</th>
      //       <th scope="col">Email</th>
      //       <th scope="col">Entidad</th>
      //       <th scope="col">Nombre</th>
      //       <th scope="col">Telefono</th>
      //       <th scope="col">Celular</th>
      //       <th scope="col">Estado</th>
      //       <th scope="col">Acciones</th>
      //     </tr>
      //   </thead>
      //   <tbody> 
      //     {(typeof(data) === "object") ? 
      //       data.map(item => {
      //         return (
      //         <tr key={item.id}>
      //           <td className="text-center">{item.id}</td>
      //           <td>{item.email}</td>
      //           <td>{item.Entidad}</td>
      //           <td>{item.name}</td>
      //           <td>{item.phoneNumber}</td>
      //           <td>{item.cellPhone}</td>
      //           <td>{item.is_active}</td>
      //           <td>
      //             <Link to={"/users/edit/" + item.id} className="btn btn-warning btn-sm">Editar</Link>
      //             <button onClick={() => {delRecord(item.id)}} className="btn btn-danger btn-sm mx-2">Borrar</button>
      //           </td>
      //         </tr>
      //         )})
      //       :
      //         <tr>
      //           <td colSpan="4">
      //           <NotData />
      //           </td>
      //         </tr>
      //       }
      //   </tbody>
      // </table>
    // </div>
   )
}
 
export default Show