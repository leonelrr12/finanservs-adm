import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from './Form';

const Edit = (props) => {
  const [data, setData] = useState({})
  const [sectors, setSectors] = useState({})
  const [profesions, setProfesions] = useState({})
  const { id } = useParams()
  const URL = process.env.REACT_APP_URL_SERVER

  const getById = async () => {
    const res = await axios.get(URL + '/adm/sector_profesion/' + id)
    const data = await res.data
    setData(data)
  }
  const getSectors = async () => {
    const res = await axios.get(URL + '/api/sectors')
    const data = await res.data
    setSectors(data)
  }
  const getProfesions = async () => {
    const res = await axios.get(URL + '/api/profesions')
    const data = await res.data
    setProfesions(data)
  }

  useEffect(() => {
    getById()
    getSectors()
    getProfesions()
  },[])

  return ( 
    <div className="row justify-content-center mt-5">
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