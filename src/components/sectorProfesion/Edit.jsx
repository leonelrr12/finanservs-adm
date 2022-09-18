import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from './Form'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Edit = (props) => {
  const [data, setData] = useState({})
  const [sectors, setSectors] = useState({})
  const [profesions, setProfesions] = useState({})
  const { id } = useParams()

  const getById = async () => {
    const res = await axios.get(URL_API + '/adm/sector_profesion/' + id)
    const data = await res.data
    setData(data)
  }
  const getSectors = async () => {
    const res = await axios.get(URL_API + '/adm/sectors')
    const data = await res.data
    setSectors(data)
  }
  const getProfesions = async () => {
    const res = await axios.get(URL_API + '/adm/profesions')
    const data = await res.data
    setProfesions(data)
  }

  useEffect(() => {
    getById()
    getSectors()
    getProfesions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return ( 
    <div className="container-sm row justify-content-center mt-3 m-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Modificar Relación Sector Profesión
            </h2>
            <Form 
              update={true} 
              data={data} 
              sectors={sectors}
              profesions={profesions}
              setData={setData}
            />
          </div>
        </div>
      </div>
    </div>
   );
}

export default Edit;