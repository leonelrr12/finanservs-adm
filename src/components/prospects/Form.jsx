import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

const Form = (props) => {
  const history = useHistory()
  const { update = null, data, setData } = props
  const [errorMessage, setErrorMessage] = useState(null)

  console.log('AAAAAAAAAAAA',data);

  const onChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const URL = process.env.REACT_APP_URL_SERVER

    try {
      if(update) {
        await axios.put(URL + '/adm/prospects/', data)
      } else {
        await axios.post(URL + '/adm/prospects/', data)
      }
      history.push('/prospects')
    }catch(ex){
      setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
    }    
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" name="id_personal" onChange={onChange} value={data.id_personal} placeholder="id_personal"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="idUser" onChange={onChange} value={data.idUser} placeholder="idUser"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="name" onChange={onChange} value={data.name} placeholder="name"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="fname" onChange={onChange} value={data.fname} placeholder="fname"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="fname_2" onChange={onChange} value={data.fname_2} placeholder="fname_2"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="lname" onChange={onChange} value={data.lname} placeholder="lname"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="lname_2" onChange={onChange} value={data.lname_2} placeholder="lname_2"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="entity" onChange={onChange} value={data.entity} placeholder="entity"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="estado" onChange={onChange} value={data.estado} placeholder="estado"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="email" onChange={onChange} value={data.email} placeholder="email"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="cellphone" onChange={onChange} value={data.cellphone} placeholder="cellphone"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="imag_id" onChange={onChange} value={data.imag_id} placeholder="imag_id"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="imag_cp" onChange={onChange} value={data.imag_cp} placeholder="imag_cp"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="imag_fss" onChange={onChange} value={data.imag_fss} placeholder="imag_fss"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="imag_rs" onChange={onChange} value={data.imag_rs} placeholder="imag_rs"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="origin_id" onChange={onChange} value={data.origin_id} placeholder="origin_id"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="json_text" onChange={onChange} value={data.json_text} placeholder="json_text"/>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/"}
            className="btn btn-warning font-weight-bold mx-3"
          >Cancelar</Link>
        </div>
      </form>
      { errorMessage ? 
        <AlertMessage 
          type={"warning"}
          message={errorMessage} 
          setMsg={setErrorMessage}
        />
        : ""
      }    
    </>  
   )
}
 
export default Form;