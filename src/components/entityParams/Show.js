import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotData from '../NotData'

const URL_API = '' // process.env.REACT_APP_URL_SERVER

const useStyles = makeStyles((theme) => ({ 
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, 
}));


const Show = () => {
  const classes = useStyles();

  const [data, setData] = useState([])
  const [dataE, setDataE] = useState([])
  const [entities, setEntities] = useState([])
  const [entity, setEntity] = useState('0')

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/entity_params')
    const da = await res.data
    setDataE(da)
  }

  const getEntities = async () => {
    const res = await axios.get(URL_API + '/api/entities_f')
    const da = await res.data
    setEntities(da)
  }

  const handleChange = (event) => {
    setEntity(event.target.value)
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
    getEntities()
  },[])

  useEffect(() => {
    const showActivo = dataE.filter(p => p.id_entity === Number(entity))
    setData(showActivo)
  },[entity])


  return ( 
    <div className="w-100 m-auto">
      <h2 className="text-center mt-5">Tarifas para Cálculo</h2>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <label className="font-weight-lighter">Entidad Financiera: </label>
              <select className="font-weight-lighter" onChange={handleChange} name='entity'>
                <option value="0">Seleccione una Entidad</option>
                {entities.map((item) => (
                  <option value={item.id} selected={item.id===entity}>{item.name}</option>
                ))}
              </select>
            </Paper>
          </Grid>
        </Grid>
      </div>      
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
          {(typeof(data) === "object") ? 
            data.map(item => {
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