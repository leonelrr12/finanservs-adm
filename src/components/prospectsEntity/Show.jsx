/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import NotData from '../NotData'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Edit from './Edit'
import { InfoModal } from '../prospects/InfoModal';

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
}));


const Show = (props) => {
  const [prospects, setProspects] = useState([])
  const user = useSelector((state) => state.user.user);

  let id_entity = ""
  if(user) {
    id_entity = user.Ruta
  }

  useEffect(() => {
    if(id_entity) {
      getByEntity_f(id_entity)
    } 
  },[id_entity])

  const getByEntity_f = async (id_entity) => {
    const res = await axios.get('/adm/prospects/entity_f/' + id_entity)
    const data = await res.data
    setProspects(data)
  }

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});
  const [estado, setEstado] = useState('')

  const handleOpen = (pitem) => {
    setItem(pitem)
    setOpen(true)
  }
  const handleOpen2 = (pitem) => {
    setItem(pitem)
    setEstado(pitem.nEstado)
    setOpen2(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setOpen2(false)
    getByEntity_f(id_entity)
  }

  return ( 
    <>
      <h2 className="text-center my-4">Prospectos</h2>
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
          {(typeof(prospects) === "object") ? 
            prospects.map(item => {
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
                <td>{item.Ejecutivo}</td>
                <td>{new Intl.NumberFormat("en-US", {currency: 'USD', minimumFractionDigits: 2}).format(Number(item['Préstamo Personal']))}</td>
                <td>{item.Estado}</td>
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
              estadoAnt={estado}
            />
          </div>
        </Fade>
      </Modal>
    </>
   )
}
 
export default Show