import { useState, useEffect } from 'react'
// import Swal from 'sweetalert2'
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
  Autocomplete,
} from '@mui/material'
import apiConfig from '../../config/api'
import { UserCard } from './UserCard'

const roles=['1-Administrador del Sistema', '2-Ver e imprimir documentación']
const URL_API = apiConfig.domain

const Show = () => {
  const [data, setData] = useState([])
  const [entities, setEntities] = useState({})
  const [item, setItem] = useState({
    id: '',
    email: '',
    Entidad: '',
    Role: '',
    name: '',
    cellPhone: '',
    phoneNumber: '',
    address: '',
    is_active: '',
    is_new: ''
  })
  const [itemValid, setItemValid] = useState({
    email: true,
    Entidad: true,
    Role: true,
    name: true,
    cellPhone: true,
    phoneNumber: true,
    address: true,
  })
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/users')
    const da = await res.data
    setData(da)
  }
  
  const getEntities = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
    const da = await res.data
    setEntities(da.map(d=>d.id+'-'+d.name))
  }

  const handleChange = ({ target: { name, value, type }}, maxLeng) => {
    setItem({
      ...item,
      [name]: value
    });
    if(maxLeng <= 0) return

    if(type === 'email') {
      const prueba = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if(prueba.test(value)) {
        setItemValid({
          ...itemValid,
          [name]: true
        })
        console.log(itemValid)
      } else {
        setItemValid({
          ...itemValid,
          [name]: false
        })
        console.log(itemValid)
        return
      }
    }
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

  const saveRecord = async () => {

    delete item.id
    console.log(item)
    await axios.post(URL_API + '/adm/users/', item)
    .then(response => {
      item.id=response.data.insertId
      setData(data.concat(item))
      abrirCerrarModalInsertar()
    }).catch(error => {
      console.log(error)
    })
  }

  const updateRecord = async () => {
    await axios.put(URL_API + '/adm/users/', item)
    .then(response => {
      setData(data.map(p=>p.id===item.id?item:p))
      abrirCerrarModalEditar()
    }).catch(error => {
      console.log(error)
    })
  }

  // const delRecord = async (id) => {

  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false
  //   })
    
  //   swalWithBootstrapButtons.fire({
  //     title: 'Esta seguro?',
  //     text: "No será posible revertir esto!",
  //     icon: '',
  //     showCancelButton: true,
  //     confirmButtonText: 'Aceptar',
  //     cancelButtonText: 'Cancelar',
  //     reverseButtons: true
  //   }).then( async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axios.delete(URL_API + '/adm/users/' + id)
  //         swalWithBootstrapButtons.fire(
  //           'Eliminado!',
  //           'Registro eliminado.',
  //           'success'
  //         )
  //         getAll()
  //       }catch(e){
  //         swalWithBootstrapButtons.fire(
  //           'Error en Conexion',
  //           'Favor verificar LOG del Servidor',
  //           'error'
  //         )
  //       }
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire(
  //         'Cancelado',
  //         'Registro segurado :)',
  //         'error'
  //       )
  //     }
  //   })
  // }

  
  const onClickNew = () => {
    setItem({
      id: '',
      email: '',
      Role: '',
      Entidad: '',
      name: '',
      cellPhone: '',
      phoneNumber: '',
      address: '',
      is_active: 'No',
      is_new: 'Si'
    }); 
    setItemValid({
      email: true,
      Role: false,
      Entidad: false,
      name: false,
      cellPhone: false,
      phoneNumber: false,
      address: false,
    });
    abrirCerrarModalInsertar();
  }

  const onClickUpdate = (row) => {
    setItem(row); 
    abrirCerrarModalEditar();
  }

  useEffect(() => {
    getAll()
    getEntities()
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

        <h2 className="text-center ">Lista de Usuarios</h2>
        <Button sx={{ marginBottom: 2 }} color="primary" fullWidth variant="contained" onClick={onClickNew}>Nuevo</Button>

        <Grid container justifyContent="center" spacing={2}>
          {data.map( row => (
            <Grid item xs={12} sm={6} md={4}>
              <UserCard key={row.id} user={row} onClick={ ()=>onClickUpdate(row) } />
            </Grid>
          ))}
        </Grid>

        <Modal
          open={modalInsertar}
          title="Nuevo Usuario"
          onCancel={abrirCerrarModalInsertar}
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
                component="form"
                noValidate
                autoComplete="off"
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

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e, 50)}
                  value={item.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.email.length > 50 || !itemValid.email}
                  helperText={item.email.length > 50 ? 'Lasgo máximo de 50 caracteres' : ''}
                />

                <Autocomplete
                  
                  id="Role"
                  options={roles}
                  value={item.Role}
                  onInputChange={(event, newInputValue) => {
                    setItem({
                      ...item,
                      Role: newInputValue
                    });
                    setItemValid({
                      ...itemValid,
                      Role: true
                    });
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Role" />}
                />

                <Autocomplete
                  disablePortal
                  id="Entidad"
                  options={entities}
                  value={item.Entidad}
                  onInputChange={(event, newInputValue) => {
                    setItem({
                      ...item,
                      Entidad: newInputValue
                    });
                    setItemValid({
                      ...itemValid,
                      Entidad: true
                    });
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Entidad" />}
                />

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
                  id="cellPhone"
                  name="cellPhone"
                  onChange={(e) => handleChange(e, 10)}
                  label="Celular"
                  value={item.cellPhone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.cellPhone.length > 10}
                  helperText={item.cellPhone.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
                />

                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Teléfono"
                  value={item.phoneNumber}
                  onChange={(e) => handleChange(e, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.phoneNumber.length > 10}
                  helperText={item.phoneNumber.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
                />

                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  onChange={(e) => handleChange(e, 100)}
                  label="Dirección"
                  value={item.address}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.address.length > 100}
                  helperText={item.address.length > 100 ? 'Lasgo máximo de 100 caracteres' : ''}
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
                <FormControl>
                  <FormLabel id="is_new">Resetear contraseña</FormLabel>
                  <RadioGroup
                    aria-labelledby="is_new"
                    defaultValue="No"
                    name="is_new"
                    value={item.is_new}
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
                      >Actualizar</Button>
                  </Box>
              </Box>
            </Grid>
          </Grid>
        </Modal>

        <Modal
          open={modalEditar}
          title="Actualizar Usuario"
          onCancel={abrirCerrarModalEditar}
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
                component="form"
                noValidate
                autoComplete="off"
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

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e, 50)}
                  value={item.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.email.length > 50 || !itemValid.email}
                  helperText={item.email.length > 50 ? 'Lasgo máximo de 50 caracteres' : ''}
                />

                <Autocomplete
                  
                  id="Role"
                  options={roles}
                  value={item.Role}
                  onInputChange={(event, newInputValue) => {
                    setItem({
                      ...item,
                      Role: newInputValue
                    });
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Role" />}
                />

                <Autocomplete
                  disablePortal
                  id="Entidad"
                  options={entities}
                  value={item.Entidad}
                  onInputChange={(event, newInputValue) => {
                    setItem({
                      ...item,
                      Entidad: newInputValue
                    });
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Entidad" />}
                />

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
                  id="cellPhone"
                  name="cellPhone"
                  onChange={(e) => handleChange(e, 10)}
                  label="Celular"
                  value={item.cellPhone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.cellPhone.length > 10}
                  helperText={item.cellPhone.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
                />

                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Teléfono"
                  value={item.phoneNumber}
                  onChange={(e) => handleChange(e, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.phoneNumber.length > 10}
                  helperText={item.phoneNumber.length > 10 ? 'Lasgo máximo de 10 caracteres' : ''}
                />

                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  onChange={(e) => handleChange(e, 100)}
                  label="Dirección"
                  value={item.address}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={item.address.length > 100}
                  helperText={item.address.length > 100 ? 'Lasgo máximo de 100 caracteres' : ''}
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
                <FormControl>
                  <FormLabel id="is_new">Resetear contraseña</FormLabel>
                  <RadioGroup
                    aria-labelledby="is_new"
                    defaultValue="No"
                    name="is_new"
                    value={item.is_new}
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
            </Grid>
          </Grid>
        </Modal>
      </Paper>
    </Box>
   )
}
 
export default Show