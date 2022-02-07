import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from "./Form"
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const New = () => {
  const [data, setData] = useState({})
  const [entities, setEntities] = useState({})
  const [sectorProfesion, setSectorProfesion] = useState({})

  const getEntities = async () => {
    const res = await axios.get(URL_API + '/adm/entities_f')
    const data = await res.data
    setEntities(data)
  }

  const getSectorProfesion = async () => {
    const res = await axios.get(URL_API + '/adm/laboral_sector')
    const data = await res.data
    setSectorProfesion(data)
  }

  useEffect(() => {
    getEntities()
    getSectorProfesion()
  },[])

  return ( 
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nueva Tarifa para Cálculo
            </h2>
            <Form 
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
 
export default New;