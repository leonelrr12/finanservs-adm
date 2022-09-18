/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from './Form'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Edit = (props) => {
  const [data, setData] = useState({})
  const [entities, setEntities] = useState({})
  const [sectorProfesion, setSectorProfesion] = useState({})
  const { id } = useParams()

  const getById = async () => {
    const res = await axios.get(URL_API + '/adm/entity_params/' + id)
    const data = await res.data
    setData(data)
  }

  const getEntities = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
    const data = await res.data
    setEntities(data)
  }
  const getSectorProfesion = async () => {
    const res = await axios.get(URL_API + '/adm/sector_profesion')
    const data = await res.data
    setSectorProfesion(data)
  }

  useEffect(() => {
    getById()
    getEntities()
    getSectorProfesion()
  },[])

  return ( 
    <div className="container-sm row justify-content-center mt-5 m-auto">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Modificar Tarifa para Cálculo
            </h2>
            <Form 
              update={true} 
              data={data} 
              entities={entities}
              sectorProfesion={sectorProfesion}
              setData={setData}
            />
          </div>
        </div>
      </div>
    </div>
   );
}

export default Edit;