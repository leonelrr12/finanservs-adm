import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from "./Form"

const New = () => {
  const [data, setData] = useState({})
  const [sectors, setSectors] = useState({})
  const [profesions, setProfesions] = useState({})

  const getSectors = async () => {
    console.log(URL + '/api/sectors');
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
    getSectors()
    getProfesions()
  },[])

  return ( 
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nueva Relación Sector Profesión
            </h2>
            <Form 
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
 
export default New;