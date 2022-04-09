import { useState, useEffect } from 'react'
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
import { EntityCard } from './EntityCard';

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
  // const [modalEliminar, setModalEliminar] = useState(false)

  const handleChange = ({ target: { name, value }}, maxLeng) => {
    setItem({
      ...item,
      [name]: value
    });
    if(maxLeng <= 0) return

    if(value.length > maxLeng) {
      setItemValid({
        ...itemValid,
        [name]: false
      })
    } else {
      setItemValid({
        ...itemValid,
        [name]: true
      })
    }
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }
  // const abrirCerrarModalEliminar = () => {
  //   setModalEliminar(!modalEliminar)
  // }

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
    const data = await res.data
    setData(data)
  }

  const saveRecord = async () => {

    delete item.id
    console.log(item)
    await axios.post(URL_API + '/adm/entities_f/', item)
    .then(response => {
      item.id=response.data.insertId
      setData(data.concat(item))
      abrirCerrarModalInsertar()
    }).catch(error => {
      console.log(error)
    })
  }

  const updateRecord = async () => {
    await axios.put(URL_API + '/adm/entities_f/', item)
    .then(response => {
      setData(data.map(p=>p.id===item.id?item:p))
      abrirCerrarModalEditar()
    }).catch(error => {
      console.log(error)
    })
  }

  // const deleteRecord = async () => {
  //   await axios.delete(URL_API + '/adm/entities_f/' + item.id)
  //   .then(response => {
  //     setData(data.filter(p=>p.id!==item.id))
  //     abrirCerrarModalEliminar()
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

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
    abrirCerrarModalInsertar();
  }

  const onClickUpdate = (row) => {
    setItem(row); 
    abrirCerrarModalEditar();
  }

  useEffect(() => {
    getAll()
  },[])

  return ( 
    <Box sx={{ marginBottom: 2, paddingX: 5, paddingY: 2 }}>
      <Paper
        sx={{ 
          p: 4,
          height: '100%',
          width: '100%',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#d3d3d3',
        }}
      >

        <h2 className="text-center ">Entidades Financieras</h2>
        <Button sx={{ marginBottom: 2 }} color="primary" fullWidth variant="contained" onClick={onClickNew}>Nuevo</Button>

        <Grid container justifyContent="center" spacing={2}>
          {data.map( row => (
            <Grid item xs={12} sm={6} md={4}>
              <EntityCard key={row.id} entity={row} onClick={ ()=>onClickUpdate(row) } />
            </Grid>
          ))}
        </Grid>

        <Modal
          open={modalInsertar}
          title="Nueva Entidad Financiera"
          destroyOnClose={true}
          onCancel={abrirCerrarModalInsertar}
          centered
          sx={{
            display: 'flex',
            p: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
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

            <TextField
              fullWidth
              required
              id="name"
              name="name"
              onChange={(e) => handleChange(e, 60)}
              label="Nombre"
              value={item.name}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.name.length > 60}
              helperText={item.name.length > 60 ? 'Lasgo máximo de 60 caracteres' : ''}
            />

            <TextField
              fullWidth
              required
              id="id_ruta"
              name="id_ruta"
              onChange={(e) => handleChange(e, 10)}
              label="Ruta"
              value={item.id_ruta}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.id_ruta.length > 10}
              helperText={item.id_ruta.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              required
              id="contact"
              name="contact"
              onChange={(e) => handleChange(e, 60)}
              label="Contacto"
              value={item.contact}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.contact.length > 60}
              helperText={item.contact.length > 60 ? 'Lasgo máximo de 60 caracteres' : ''}
            />

            <TextField
              fullWidth
              required
              id="cellphone"
              name="cellphone"
              onChange={(e) => handleChange(e, 10)}
              label="Celular"
              value={item.cellphone}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.cellphone.length > 10}
              helperText={item.cellphone.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              required
              id="phone_number"
              name="phone_number"
              onChange={(e) => handleChange(e, 10)}
              label="Teléfono"
              value={item.phone_number}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.phone_number.length > 10}
              helperText={item.phone_number.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              label="Emails"
              type="email"
              id="emails"
              name="emails"
              onChange={(e) => handleChange(e, 0)}
              multiline
              rows={3}
              helperText="Emails separados por (,) coma."
              value={item.emails}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl>
              <FormLabel id="is_active">Activo</FormLabel>
              <RadioGroup
                aria-labelledby="is_active"
                defaultValue="No"
                name="is_active"
                value={item.is_active}
                onChange={handleChange} 
                row
              >
                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <Divider sx={{ mb: 2 }}/>
              <Box textAlign="end">
                  <Button variant="outlined" color="warning" onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                  <Button 
                    sx={{ ml: 2 }} 
                    variant="contained" 
                    color="primary" 
                    onClick={saveRecord}
                    disabled={!Object.values(itemValid).reduce((p,c) => p = p && c, true)}
                  >Guardar</Button>
              </Box>       
          </Box>
        </Modal>

        <Modal
          open={modalEditar}
          title="Actualizar Entidad Financiera"
          onCancel={abrirCerrarModalEditar}
          centered
          sx={{
            display: 'flex',
            p: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
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
            <TextField
              fullWidth
              id="name"
              name="name"
              onChange={(e) => handleChange(e, 60)}
              label="Nombre"
              value={item.name}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.name.length > 60}
              helperText={item.name.length > 60 ? 'Lasgo máximo de 60 caracteres' : ''}
            />

            <TextField
              fullWidth
              id="id_ruta"
              name="id_ruta"
              onChange={(e) => handleChange(e, 10)}
              label="Ruta"
              value={item.id_ruta}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.id_ruta.length > 10}
              helperText={item.id_ruta.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              id="contact"
              name="contact"
              onChange={(e) => handleChange(e, 60)}
              label="Contacto"
              value={item.contact}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.contact.length > 60}
              helperText={item.contact.length > 60 ? 'Lasgo máximo de 60 caracteres' : ''}
            />

            <TextField
              fullWidth
              id="cellphone"
              name="cellphone"
              onChange={(e) => handleChange(e, 10)}
              label="Celular"
              value={item.cellphone}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.cellphone.length > 10}
              helperText={item.cellphone.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              id="phone_number"
              name="phone_number"
              label="Teléfono"
              value={item.phone_number}
              onChange={(e) => handleChange(e, 10)}
              InputLabelProps={{
                shrink: true,
              }}
              error={item.phone_number.length > 10}
              helperText={item.phone_number.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
            />

            <TextField
              fullWidth
              label="Emails"
              type="email"
              id="emails"
              name="emails"
              onChange={(e) => handleChange(e, 0)}
              multiline
              maxRows={4}
              rows={3}
              helperText="Emails separados por (,) coma."
              value={item.emails}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl>
              <FormLabel id="is_active">Activo</FormLabel>
              <RadioGroup
                aria-labelledby="is_active"
                defaultValue="No"
                name="is_active"
                value={item.is_active}
                onChange={handleChange} 
                row
              >
                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <Divider sx={{ mb: 2 }}/>
              <Box textAlign="end">
                  <Button variant="outlined" color="warning" onClick={abrirCerrarModalEditar}>Cancelar</Button>
                  <Button 
                    sx={{ ml: 2 }} 
                    variant="contained" 
                    color="primary" 
                    onClick={updateRecord}
                    disabled={!Object.values(itemValid).reduce((p,c) => p = p && c, true)}
                  >Actualizar</Button>
              </Box>
          </Box>
        </Modal>
      </Paper>
    </Box>
   )
}
 
export default Show