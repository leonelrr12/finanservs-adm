import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import verifyToken from '../login/token'
import NotData from '../NotData'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '2%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },   
  root2: {
    flexGrow: 1,
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, 
}));


const Show = () => {
  const classes = useStyles();
  
  const history = useHistory()
  const [prospects, setProspects] = useState([])
  const [prospectsA, setProspectsA] = useState([])
  const [entities, setEntities] = useState([])
  const [entity, setEntity] = useState('0')
  const URL = process.env.REACT_APP_URL_SERVER

  useEffect(() => {
    verifyToken().then(res => {
      const { isValid } = res
      if(isValid){
        getEntities()
      }else{
        window.localStorage.removeItem('jwt')
        history.push("/login")
      }
    })
  },[])

  useEffect(() => {
    getByEntity()
  },[entity])

  const getByEntity = async () => {
    const res = await axios.get(URL + '/adm/prospects/entity_f/' + entity)
    const da = await res.data
    setProspects(da)
    setProspectsA(da)
  }

  const handleChange = (event) => {
    setEntity(event.target.value)
  }

  const handleState = (event) => {
    if(event.target.checked){
      const showActivo = prospects.filter(p => p.Estado !== 'Rechazado')
      setProspectsA(showActivo)
    }else{
      setProspectsA(prospects)
    }
  }

  const getEntities = async () => {
    const res = await axios.get(URL + '/api/entities_f')
    const da = await res.data
    setEntities(da)
  }

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleOpen = (pitem) => {
    setItem(pitem)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return ( 
    <>
      <h2 className="text-center my-2">Prospectos</h2>
      <div className={classes.root2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2}>
              <label className="font-weight-lighter">Entidad Financiera: </label>
              <select className="font-weight-lighter" onChange={handleChange} name='entity'>
                <option value="0">Seleccione una Entidad</option>
                {entities.map((item) => (
                  <option value={item.id_ruta}>{item.name}</option>
                ))}
              </select>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2}>
              <div className="">
              <input type="checkbox" name="estado" onChange={handleState}/>
              <label className="font-weight-lighter mx-2">Solo Activos</label>
            </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      {/* <div className="row mb-3 d-flex">
        <div className="col-sm-12 col-md-6">

        </div>
        <div className="col-sm-12 col-md-6 text-center">

        </div>
      </div> */}
      <table className="table table-striped table-md">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cedula</th>
            <th scope="col">Entidad</th>
            <th scope="col">Email</th>
            <th scope="col">Celular</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Sector</th>
            <th scope="col">Profesión</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(prospectsA) === "object") ? 
            prospectsA.map(item => {
              return (
              <tr key={item.ID} className={item.dias > 60 ? "bg-danger" : (item.dias > 30 ? "bg-warning" : "")}>
                <td className="text-center">{item.ID}</td>
                <td>{item.Nombre}</td>
                <td>{item['Cédula Id']}</td>
                <td>{item.Entidad}</td>
                <td>{item.Email}</td>
                <td>{item.Celular}</td>
                <td>{item.Telefono}</td>
                <td>{item.Sector}</td>
                <td>{item['Profesión']}</td>
                <td>{item.Estado}</td>
                <td>
                    <button onClick={()=>{handleOpen(item)}} className="btn btn-secondary btn-sm">Ver +</button>
                    <Link to={"/entity_f/edit/" + item.ID} className="btn btn-warning btn-sm">Editar</Link>
                </td>
                {/* <td>{item.dias}</td> */}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className="text-center">Información General</h2>
            <TableContainer component={Paper} className={classes.container}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody id="transition-modal-description">
                    {Object.keys(item).map((key) => (
                    <TableRow>
                        <TableCell align="right">{key}:</TableCell>
                        <TableCell align="left">{item[key]}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.root + " text-center"}>
              <Button variant="contained" color="primary">
                Imprimir
              </Button>
              <Button variant="contained" color="secondary">
                Descargar Imágenes
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
   )
}
 
export default Show