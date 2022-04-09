/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { Checkbox, FormControlLabel, Grid, Modal, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import NotData from '../NotData'
import Form from './Form'
import { InfoModal } from './InfoModal';
import apiConfig from '../../config/api'
import DownloadExcel from './Excel'
import ListProspects from '../ListProspects';
import { Box } from '@mui/system';


const URL_API = apiConfig.domain

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '2%',
    // boxShadow: theme.shadows[5],
    padding: 2, //theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
  root: {
    '& > *': {
      margin: 2, //theme.spacing(1),
    },
  },   
  root2: {
    flexGrow: 1,
  },
  paper2: {
    padding: 2, //theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#e5dddd', //theme.palette.text.secondary,
    height: 40,
  }, 
}));


const Show = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);

  const [prospects, setProspects] = useState([])
  const [prospectsA, setProspectsA] = useState([])
  const [entities, setEntities] = useState([])
  const [estado, setEstado] = useState(1);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});
  
  const { Role, Ruta, Tipo_Agente, Agente } = user
  const [entity, setEntity] = useState(Role === 1 ? '0' : Ruta)
  const [entityName, setEntityName] = useState("")
  

  const getByEntity = async (entity) => {
    const res = await axios.get(URL_API + '/adm/prospects/entity_f/' + entity)
    const da = await res.data
    setProspects(da)
  }

  const handleChange = (event) => {
    setEntity(event.target.value.split('/')[0])
    setEntityName(event.target.value.split('/')[1])
    const entity2 = event.target.value.split('/')[0]

    let showActivo=[]
    if(estado === 1) {
      showActivo = prospects.filter(p => p.zzzEntity_No === entity2 && p.n1Estado !== 4)
    } else {
      showActivo = prospects.filter(p => p.zzzEntity_No === entity2)
    }
    setProspectsA(showActivo)
  }

  const handleEstado = (event) => {
    if(event.target.checked){
      setEstado(1)
      const showActivo = prospects.filter(p => p.zzzEntity_No === entity && p.n1Estado !== 4)
      setProspectsA(showActivo)
    }else{
      const showActivo = prospects.filter(p => p.zzzEntity_No === entity)
      setProspectsA(showActivo)
      setEstado(0)
    }
  }

  const getEntities = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
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
    switch (item.n1Estado) {
      case "1":
        item.A2Estado = 'Nuevo'
        break;
      case "2":
        item.A2Estado = 'Proceso'
        break;
      case "3":
        item.A2Estado = 'Aprobado'
        break;
      case "4":
        item.A2Estado = 'Rechazado'
        break;
      case "5":
        item.A2Estado = 'En Comité'
        break;
      default:
        break;
    }
    setOpen2(false);
    let uptData = prospects.map(p => p.A1ID === item.A1ID ? item : p)
    setProspects(uptData)

    uptData = prospectsA.map(p => p.A1ID === item.A1ID ? item : p)
    setProspectsA(uptData)
  };

  // const crearPdf = (id) => {
  //   var oReq = new XMLHttpRequest();
  //   var URLToPDF = `${URL_API}/upload/prospectsPDF/${id}/${estado}`
   
  //   oReq.open("GET", URLToPDF, true);
   
  //   oReq.responseType = "blob";
  //   oReq.onload = function() {
  //     const pdfFile = new Blob([oReq.response], { type: "application/pdf" });
  //     const fileURL = URL.createObjectURL(pdfFile);
  //     window.open(fileURL, "_blank");
  //   };
  //   oReq.send();
  // }


  useEffect(() => {
    getEntities()
  },[])

  useEffect(() => {
    if(Role === 1 || Tipo_Agente === 2) {
      getByEntity(Role+","+Tipo_Agente+","+Agente+","+entity)
    } else {
      getByEntity(Role+","+Tipo_Agente+","+Agente+","+Ruta)
    }
  },[])


  return ( 
    <div className="my-4">

      <Grid
        spacing={4}
        container  
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={10}>
          <Typography align="center" variant="h3" component="h1">Prospectos</Typography>
        </Grid>
        <Grid item xs={12} md={2} alignContent="center">
            <ListProspects id={entity} estado={estado} nameEntity={entityName}/>
            <DownloadExcel prospects={prospects}/>
        </Grid>
      </Grid>

      <div className={classes.root2}>
        <Grid container spacing={3}>
          { (Role === 1 || Tipo_Agente === 2) ? (
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper2} elevation={9} sx={{ pt: 1.3, mb: 1 }}>
                <label className="font-weight-lighter">Entidad Financiera: </label>
                <select className="font-weight-lighter" onChange={ handleChange } name='entity'>
                  <option value="0">Seleccione una Entidad</option>
                  {entities.map((item) => (
                    // selected={item.id_ruta === entity}
                    <option key={item.id} value={item.id_ruta + "/" + item.name}>{item.name}</option>
                  ))}
                </select>
              </Paper>
            </Grid>
          )
          : ""
          }
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2} elevation={9}>
              <FormControlLabel onChange={ handleEstado } control={<Checkbox defaultChecked />} label="Solo Activos" />
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
                </td>
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

      <InfoModal item={item} open={open} setOpen={setOpen} handleClose={handleClose} entity={entity}/>

      <Modal
        open={open2}
        title="Nuevo Usuario"
        onCancel={handleClose2}
        centered
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}

      >
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '95%' },
            position: 'relative',
            alignContent: 'center',
            width: 400,
            borderRadius: '7px',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 2,
          }}
        >
          <Form 
            id={item.A1ID}
            data={item}
            setData={setItem}
            update={true} 
            handleClose2={handleClose2}
            estadoAnt={item.n1Estado}
          />
        </Box>
      </Modal>
    </div>
   )
}
 

export default Show