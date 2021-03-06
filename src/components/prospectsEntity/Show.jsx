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
import { TableHead } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';

const URL_API = '' // process.env.REACT_APP_URL_SERVER

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


const Show = () => {
  const history = useHistory()
  const [prospects, setProspects] = useState([])
  const [images, setImages] = useState([])
  const [data, setData] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)

  const bucket = process.env.REACT_APP_BUCKET;
  const id_entity = '300';
  const entity_f = 'BAC';
    
  useEffect(() => {
    verifyToken().then(res => {
      const { isValid } = res
      if(isValid){
        getByEntity_f(id_entity)
        getImages()
      }else{
        window.localStorage.removeItem('jwt')
        history.push("/login")
      }
    })
  },[])

  const getByEntity_f = async (id_entity) => {
    const res = await axios.get(URL_API + '/adm/prospects/entity_f/' + id_entity)
    const data = await res.data
    setProspects(data)
  }

  const getImages = async () => {
    const res = await axios.get(URL_API + '/upload/list/', { 
      params: { bucket: bucket, entity_f: entity_f } 
    })
    const data = await res.data
    setImages(data)
  }

  const getOneFile = async (key, nameFile) => {
    const res = await axios.get(URL_API + '/upload/file/', { 
      params: { bucket: bucket, key: key, name: nameFile } 
    })
    const data = (await res.data)
    console.log(data)
  }

  const getFiles = async () => {
    const res = await axios.get(URL_API + '/upload/files/', { 
      params: { bucket: bucket, entity_f: entity_f } 
    })
    const data = await res.data
  }  

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});
  const [item2, setItem2] = useState({});

  const handleOpen = (pitem) => {
    setItem(pitem)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = (pitem) => {
    const id = '7-94-485' //pitem['C??dula Id']

    const newD = []
    images.map(item => {
      const x = item.Key.split('/')
      if(x.length > 2) {
        if(x[2] === id) {
          const obj = {
            "Key": item.Key,
            "Date": item.LastModified,
            "Size": Math.floor(item.Size/1000),
            "ETag": item.ETag,
            "File": x[3]
          }
          newD.push(obj)
        }
      }
    })    
    setItem2(newD)
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

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
            <th scope="col">Tel??fono</th>
            <th scope="col">Sector</th>
            <th scope="col">Profesi??n</th>
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
                <td>{item['C??dula Id']}</td>
                <td>{item.Entidad}</td>
                <td>{item.Email}</td>
                <td>{item.Celular}</td>
                <td>{item.Telefono}</td>
                <td>{item.Sector}</td>
                <td>{item['Profesi??n']}</td>
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
            <h2 id="transition-modal-title" className="text-center">Informaci??n General</h2>
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
              <Button variant="contained" color="secondary"
                onClick={()=>{handleOpen2(item)}}
              >
                Ver Im??genes
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

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
            <h2 id="transition-modal-title" className="text-center">Archivos</h2>
            <TableContainer component={Paper} className={classes.container}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Documento</TableCell>
                    <TableCell align="left">Size</TableCell>
                    <TableCell align="left">Fecha</TableCell>
                    <TableCell align="left">Acci??n</TableCell>
                  </TableRow>
                </TableHead>                
                <TableBody id="transition-modal-description">
                    {Object.keys(item2).map((key) => (
                    <TableRow>
                        <TableCell align="left">{item2[key].File}</TableCell>
                        <TableCell align="left">{item2[key].Size}MB</TableCell>
                        <TableCell align="left">{item2[key].Date}</TableCell>
                        <TableCell align="left">
                          <button onClick={()=>{getOneFile(item2[key].Key, item2[key].File)}} className="btn btn-secondary btn-sm"><GetAppIcon /></button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.root + " text-center"}>
              <Button variant="contained" color="secondary"
                onClick={()=>{getFiles(item2)}}
              >
                Descargar Todo
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
   )
}
 
export default Show