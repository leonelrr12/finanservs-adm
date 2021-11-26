import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Input, Form, Radio } from 'antd'
import 'antd/dist/antd.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import NotData from '../NotData'

const URL_API = '' // process.env.REACT_APP_URL_SERVER
const { Item } = Form

const layout={
  labelCol:{
    span: 6
  },
  wrapperCol:{
    span: 16
  }
}

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
      {(typeof(data) === "object") ?
        <Table columns={columns} dataSource={data} />
      :
        <tr>
          <td colSpan="8">
          <NotData />
          </td>
        </tr>
      }

      <Modal
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
        <Form {...layout}>
          <Item label="Nombre">
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
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Actualizar Entidad Financiera"
        onCancel={abrirCerrarModalEditar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
          <Button type="primary" onClick={updateRecord}>Actualizar</Button>
        ]}
      >
        <Form {...layout}>
          <Item label="ID">{item.id}</Item>
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
        </Form>
      </Modal>

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
      </Modal>
    </div>
   )
}
 
export default Show