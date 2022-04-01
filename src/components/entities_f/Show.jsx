import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Button, 
  FormControl, 
  InputLabel, 
  Modal, 
  OutlinedInput, 
  Radio, 
  Table, 
  Box, 
  TableContainer, 
  Paper, 
  TableHead, 
  TableRow, 
  TableBody, 
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import NotData from '../NotData'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Show = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState('Si')
  const [item, setItem] = useState({
    id:'',
    name:'',
    id_ruta:'',
    contact:'',
    phone_number:'',
    cellphone:'',
    emails:'',
    is_active:''
  })
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const handleChange = e => {
    const {name, value} = e.target
    setItem({...item,
    [name]: value})
  }
  const onChange = e => {
    setValue(e.target.value)
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Ruta",
      dataIndex: "id_ruta",
      key: "id_ruta"
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact"
    },
    {
      title: "Teléfono",
      dataIndex: "phone_number",
      key: "phone_number"
    },
    {
      title: "Celular",
      dataIndex: "callphone",
      key: "callphone"
    },
    {
      title: "Emails",
      dataIndex: "emails",
      key: "emails"
    },
    {
      title: "Activo",
      dataIndex: "is_active",
      key: "is_active"
    },    
    {
      title: "Acciones",
      key: "acciones",
      render: fila => 
      <>
         <Button type="primary" onClick={()=>{setItem(fila); setValue(fila.is_active); recordSelected('Editar')}}><EditOutlined /></Button>{"   "}
         <Button type="primary" onClick={()=>{setItem(fila); recordSelected('')}} danger><DeleteOutlined /></Button>
      </>
    },    
  ]

  const getAll = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
    const data = await res.data
    setData(data)
  }

  const recordSelected = (caso) => {
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const saveRecord = async () => {
    item.is_active=value
    delete item.id
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
    item.is_active=value
    await axios.put(URL_API + '/adm/entities_f/', item)
    .then(response => {
      setData(data.map(p=>p.id===item.id?item:p))
      abrirCerrarModalEditar()
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteRecord = async () => {
    await axios.delete(URL_API + '/adm/entities_f/' + item.id)
    .then(response => {
      setData(data.filter(p=>p.id!==item.id))
      abrirCerrarModalEliminar()
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getAll()
  },[])

  return ( 
    <div className="m-auto">
      <h2 className="text-center mt-5">Entidades Financieras</h2>
      <Button type="primary" onClick={abrirCerrarModalInsertar}>Nuevo</Button>

      {/* {(typeof(data) === "object") ? 
        <Table columns={columns} dataSource={data} />
      :
        <tr>
          <td colSpan="8">
          <NotData />
          </td>
        </tr>
      } */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Ruta</StyledTableCell>
            <StyledTableCell align="left">Contacto</StyledTableCell>
            <StyledTableCell align="left">Teléfono</StyledTableCell>
            <StyledTableCell align="left">Celular</StyledTableCell>
            <StyledTableCell align="left">Emails</StyledTableCell>
            <StyledTableCell align="left">Activo</StyledTableCell>
            <StyledTableCell align="left">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell width={50} align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.id_ruta}</StyledTableCell>
              <StyledTableCell align="left">{row.contact}</StyledTableCell>
              <StyledTableCell align="left">{row.phone_number}</StyledTableCell>
              <StyledTableCell align="left">{row.cellphone}</StyledTableCell>
              <StyledTableCell width={50} align="left">{row.emails}</StyledTableCell>
              <StyledTableCell align="left">{row.is_active}</StyledTableCell>
              <StyledTableCell width={50} align="left">
              <>
                <Button type="primary" onClick={()=>{setItem(row.is_active); setValue(row.is_active); recordSelected('Editar')}}><EditOutlined /></Button>{"   "}
                <Button type="primary" onClick={()=>{setItem(row.is_active); recordSelected('')}} danger><DeleteOutlined /></Button>
              </>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      {/* <Modal
        visible={modalInsertar}
        title="Nueva Entidad Financiera"
        destroyOnClose={true}
        onCancel={abrirCerrarModalInsertar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
          <Button type="primary" onClick={saveRecord}>{"Guardar"}</Button>,
        ]}
      >
        <Box>
        <FormControl>
        <InputLabel htmlFor="name">Nombre</InputLabel>
        <OutlinedInput
          id="name"
          name="name"
          onChange={handleChange}
          label="Name"
        />
      </FormControl> */}

          {/* <Item label="Nombre">
            <Input name="name" onChange={handleChange}/>
          </Item>
          <Item label="Ruta">
            <Input name="id_ruta" onChange={handleChange}/>
          </Item>
          <Item label="Contacto">
            <Input name="contact" onChange={handleChange}/>
          </Item>
          <Item label="Teléfono">
            <Input name="phone_number" onChange={handleChange}/>
          </Item>
          <Item label="Celular">
            <Input name="cellphone" onChange={handleChange}/>
          </Item>
          <Item label="Emails">
            <textarea name="emails" onChange={handleChange} rows="4" cols="50" placeholder="jperez@gmail.com, tmitre@hotmail.com"></textarea>
            Emails separados por (,) coma.
          </Item>
          <Item label="Activo">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={'Si'}>Si</Radio>
              <Radio value={'No'}>No</Radio>
            </Radio.Group>
          </Item> 
         </Box>
      </Modal> */}

      {/* <Modal
        visible={modalEditar}
        title="Actualizar Entidad Financiera"
        onCancel={abrirCerrarModalEditar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
          <Button type="primary" onClick={updateRecord}>Actualizar</Button>
        ]}
      >
        <Box 
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <Item label="ID">{item.id}</Item>
          <Item label="Nombre">
            <Input name="name" onChange={handleChange} value={item && item.name}/>
          </Item>
          <Item label="Ruta">
            <Input name="id_ruta" onChange={handleChange} value={item && item.id_ruta}/>
          </Item>
          <Item label="Contacto">
            <Input name="contact" onChange={handleChange} value={item && item.contact}/>
          </Item>
          <Item label="Teléfono">
            <Input name="phone_number" onChange={handleChange} value={item && item.phone_number}/>
          </Item>
          <Item label="Celular">
            <Input name="cellphone" onChange={handleChange} value={item && item.cellphone}/>
          </Item>
          <Item label="Emails">
            <textarea name="emails" onChange={handleChange} rows="4" cols="50" value={item && item.emails ? item.emails : ""}></textarea>
            Emails separados por (,) coma.
          </Item>
          <Item label="Activo">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value='Si'>Si</Radio>
              <Radio value='No'>No</Radio>
            </Radio.Group>
          </Item> 
        </Box>
      </Modal> */}
{/* 
      <Modal
         visible={modalEliminar}
         onCancel={abrirCerrarModalEliminar}
         centered
         footer={[
           <Button onClick={abrirCerrarModalEliminar}>No</Button>,
           <Button type="primary" danger onClick={deleteRecord}>Si</Button>
         ]}
      >
         Esta seguro que desea elimnar el registro con <b><br />ID: {item.id} - {item.name}</b>
      </Modal> */}
    </div>
   )
}
 
export default Show