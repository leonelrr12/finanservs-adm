/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { Box, Checkbox, FormControlLabel, Grid, Modal, TextField, Typography } from '@mui/material';

import NotData from '../NotData'
import Form from './Form'
import { InfoModal } from './InfoModal';
import apiConfig from '../../config/api'
import DownloadExcel from './Excel'
import ListProspects from '../ListProspects';
import { userData } from '../../redux/slices/user';


const Show = (props) => {
  const user = useSelector(userData);

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


  const ee = new Date()
  let d0 = ee.getDate().toString()
  if(d0 > '27') d0 = '28'
  const dd = ('0'+d0).slice(-2)
  const mm0 = ('0'+ee.getMonth().toString()).slice(-2)
  const mm1 = ('0'+(ee.getMonth()+1).toString()).slice(-2)
  const yy = ee.getFullYear()
  
  const [fdesde, setFDesde] = useState(`${yy}-${mm0}-${dd}`);
  const [fhasta, setFHasta] = useState(`${yy}-${mm1}-${dd}`);

  const getByEntity = async (info) => {
    const res = await axios.get(apiConfig.domain + '/adm/prospects/entity_f/' + info)
    const da = await res.data
    setProspects(da)
    setProspectsA(da)
  }

  const handleChange = (event) => {
    setEntity(event.target.value.split('/')[0])
    setEntityName(event.target.value.split('/')[1])
    const entity2 = event.target.value.split('/')[0]

    let showActivo=[]
    if(estado === 1) {
      showActivo = prospects.filter(p => p.zzzEntity_No === entity2 && p.n1Estado !== 4 && p.n1Estado !== 6)
    } else {
      showActivo = prospects.filter(p => p.zzzEntity_No === entity2)
    }
    setProspectsA(showActivo)
  }

  const handleEstado = (event) => {
    if(event.target.checked){
      setEstado(1)
      const showActivo = prospects.filter(p => p.zzzEntity_No === entity && p.n1Estado !== 4 && p.n1Estado !== 6)
      setProspectsA(showActivo)
    }else{
      const showActivo = prospects.filter(p => p.zzzEntity_No === entity)
      setProspectsA(showActivo)
      setEstado(0)
    }
  }

  const getEntities = async () => {
    const res = await axios.get(apiConfig.domain + '/adm/entities_f')
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
      case "6":
        item.A2Estado = 'Liquidado'
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
  //   var URLToPDF = `${apiConfig.domain}/upload/prospectsPDF/${id}/${estado}`
   
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
      getByEntity(Role+","+Tipo_Agente+","+Agente+","+entity+","+fdesde+","+fhasta)
    } else {
      getByEntity(Role+","+Tipo_Agente+","+Agente+","+Ruta+","+fdesde+","+fhasta)
    }
  },[entity, fdesde, fhasta])

  return ( 
    <div className="my-4">
      <Grid
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={10}>
          <Typography align="center" variant="h3" component="h1">Prospectos</Typography>
        </Grid>
        <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' }}}>
            <ListProspects id={entity} estado={estado} nameEntity={entityName} fdesde={fdesde} fhasta={fhasta} />
            <DownloadExcel entity={entity} prospects={prospects} fdesde={fdesde} fhasta={fhasta}/>
        </Grid>
      </Grid>

      <Grid 
        container
        alignItems="center"
      >
        <Grid item xs={12} md={4} sx={{ pt: 1.3, mb: 1 }}>
          { (Role === 1 || Tipo_Agente === 2) ? (
            <Box sx={{ ml: 4 }}>
              <label className="font-weight-lighter">Entidad Financiera: </label>
              <select className="font-weight-lighter" onChange={ handleChange } name='entity'>
                <option value="0">Seleccione una Entidad</option>
                {entities.map((item) => (
                  <option key={item.id} value={item.id_ruta + "/" + item.name}>{item.name}</option>
                ))}
              </select>
            </Box>
          )
          : ""
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{ ml: { xs: 4, md: 0 }}}
          >
            <FormControlLabel onChange={ handleEstado } control={<Checkbox />} label="Solo Activos" />
          </Box>
        </Grid>

        <Grid item xs={12} md={4} sx={{ pt: 1.3, mb: 1 }}>
          <Box>
            <TextField
              id="date"
              label="Desde"
              type="date"
              defaultValue={ fdesde }
              value={ fdesde }
              onChange={ (e) => setFDesde(e.target.value) }
              sx={{ width: 220, mr: 2, mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Hasta"
              type="date"
              value={ fhasta }
              onChange={ (e) => setFHasta(e.target.value) }
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
      </Grid>

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
        <Grid container justifyContent="center">
          <Grid item xs={11} md={3.5}>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '95%' },
                position: 'relative',
                alignContent: 'center',
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
                Role={Role}
              />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
   )
}
 

export default Show