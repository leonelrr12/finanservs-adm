import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from "./Form"

const URL_API = process.env.REACT_APP_URL_SERVER

const New = () => {
  const [data, setData] = useState({})
  const [entities, setEntities] = useState({})
  const [sectorProfesion, setSectorProfesion] = useState({})

  const getEntities = async () => {
    const res = await axios.get(URL_API + '/api/entities_f')
    const data = await res.data
    setEntities(data)
  }

  const getSectorProfesion = async () => {
    const res = await axios.get(URL_API + '/api/sector_profesion')
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