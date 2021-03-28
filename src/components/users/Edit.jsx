import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from './Form';

const Edit = () => {
  const [data, setData] = useState({})
  const [roles, setRoles] = useState({})
  const [entities, setEntities] = useState({})
  const { id } = useParams()
  const URL = process.env.REACT_APP_URL_SERVER

  const getById = async () => {
    const res = await axios.get(URL + '/adm/users/' + id)
    const da = await res.data
    setData(da)
  }

  const getRoles = async () => {
    const res = await axios.get(URL + '/adm/roles')
    const da = await res.data
    setRoles(da)
  }

  const getEntities = async () => {
    const res = await axios.get(URL + '/api/entities_f')
    const da = await res.data
    setEntities(da)
  }

  useEffect(() => {
    getById()
    getRoles()
    getEntities()
  },[])

  return ( 
    <div className="row justify-content-center my-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-2 font-weight-bold">
              Modificar Usuario
            </h2>
            <Form 
              update={true} 
              data={data} 
              roles={roles}
              entities={entities}
              setData={setData}
            />
          </div>
        </div>
      </div>
    </div>
   );
}

export default Edit;