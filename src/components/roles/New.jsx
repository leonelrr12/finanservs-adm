import React, { useState } from 'react'
import Form from "./Form"

const New = () => {
  const [data, setData] = useState({})

  return ( 
    <div className="row justify-content-center my-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo Role
            </h2>
            <Form 
              data={data} 
              setData={setData}
            />
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default New;