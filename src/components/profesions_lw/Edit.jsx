import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from './Form';

const Edit = () => {
  const [data, setData] = useState({})
  const { id } = useParams()
  const URL = process.env.REACT_APP_URL_SERVER

  const getById = async () => {
    const res = await axios.get(URL + '/adm/profesions_lw/' + id)
    const data = await res.data
    setData(data)
  }

  useEffect(() => {
    getById()
  }, [])

  return ( 
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Modificar Profesión Línea Blanca
            </h2>
            <Form 
              update={true} 
              data={data} 
              setData={setData}
            />
          </div>
        </div>
      </div>
    </div>
   );
}

export default Edit;