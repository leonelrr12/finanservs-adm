/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
import NotData from '../NotData'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Edit from '../prospectsEntity/Edit'
import { InfoModal } from './InfoModal';


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


const Show = (props) => {
  const classes = useStyles();

  const [prospects, setProspects] = useState([])
  const [prospectsA, setProspectsA] = useState([])
  const [entities, setEntities] = useState([])
  const [entity, setEntity] = useState('0')
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    getEntities()
  },[])

  useEffect(() => {
    getByEntity()
  },[entity])

  const getByEntity = async () => {
    const res = await axios.get('/adm/prospects/entity_f/' + entity)
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
    const res = await axios.get('/adm/entities_f')
    const da = await res.data
    setEntities(da)
  }

  const handleOpen = (pitem) => {
    setItem(pitem)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = (pitem) => {
    setItem(pitem)
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    getByEntity(entity)
  };

  return ( 
    <>
      <h2 className="text-center my-2">Prospectos</h2>
 
      {/* <Sign /> */}
      <div className={classes.root2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2}>
              <label className="font-weight-lighter">Entidad Financiera: </label>
              <select className="font-weight-lighter" onChange={handleChange} name='entity'>
                <option value="0">Seleccione una Entidad</option>
                {entities.map((item) => (
                  <option key={item.id} value={item.id_ruta}>{item.name}</option>
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
            <th scope="col">Ejecutivo</th>
            <th scope="col">Monto</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          {(typeof(prospectsA) === "object") ? 
            prospectsA.map(item => {
              return (
              <tr key={item.A1ID} className={item.dias > 60 ? "bg-danger" : (item.dias > 30 ? "bg-warning" : "")}>
                <td className="text-center">{item.A1ID}</td>
                <td>{item.A5Nombre}</td>
                <td>{item['A4Cédula Id']}</td>
                <td>{item.C8Entidad}</td>
                <td>{item.C5Email}</td>
                <td>{item.C6Celular}</td>
                <td>{item.C7Telefono}</td>
                <td>{item.B1Sector}</td>
                <td>{item['B2Profesión']}</td>
                <td>{item.F6Ejecutivo}</td>
                <td>{new Intl.NumberFormat("en-US", {currency: 'USD', minimumFractionDigits: 2}).format(Number(item['B6Préstamo Personal']))}</td>
                <td>{item.A2Estado}</td>
                <td>
                    <button onClick={()=>{handleOpen(item)}} className="btn btn-secondary btn-sm">Ver +</button>
                    <button onClick={()=>{handleOpen2(item)}} className="btn btn-warning btn-sm">Editar</button>
                    {/* <Link to={"/entity_f/edit/" + item.ID} className="btn btn-warning btn-sm">Editar</Link> */}
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

      <InfoModal item={item} open={open} setOpen={setOpen} handleClose={handleClose}/>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={classes.paper}>
            <Edit 
              handleClose2={handleClose2}
              id={item.ID}
              estadoAnt={item.nEstado}
            />
          </div>
        </Fade>
      </Modal>
    </>
   )
}
 

export default Show