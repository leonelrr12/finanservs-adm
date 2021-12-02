import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
// import { signIn } from '../../store/user'
import AlertMessage from '../AlertMessage'


const Form = (props) => {
  // const dispatch = useDispatch()
  const { handleSubmit } = useForm() 
  // const navigate = useNavigate()
  const { update = null, data, roles, entities } = props
  const [errorMessage, setErrorMessage] = useState(null)

  // const onChange = (e) => {
  //   setData({...data, [e.target.name] : e.target.value})
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     if(update) {
  //       await axios.put(URL_API + '/adm/users/', data)
  //     } else {
  //       await axios.post(URL_API + '/adm/users/', data)
  //     }
  //     navigate('/users')
  //   }catch(ex){
  //     setErrorMessage("Error: Query no permitido.  Favor ver Log del Servidor.")
  //   }
  // }

  const onFormSubmit = (data) => {
    // dispatch(signIn({ credentials: data }))
  }

  const onErrors = (errors) => console.error(errors);

  return ( 
    <>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div className="form-group">
          <label>Email</label>
          <input 
            required
            type="email"
            className="form-control"
            name="email"
            value={data.email}
          />
        </div>
        <div className="form-group my-2">
          <label>Role</label>
          <select 
            name="id_role" 
            required
            className="form-control"
          >
            <option value="">&nbsp;Seleccione&nbsp;</option>
            {roles.length ? 
              roles.map(item => 
                <option value={item.id} selected={item.id === data.id_role}>{item.description}</option>
              )
            :
              ""}
          </select> 
        </div>
        <div className="form-group my-2">
          <label>Entidad Financiera</label>
          <select 
            name="entity_f"
            className="form-control"
          >
            <option value="0">&nbsp;Uso Interno&nbsp;</option>
            {entities.length ? 
              entities.map(item => 
                <option value={item.id} selected={item.id === data.entity_f}>{item.name}</option>
              )
            : ""  }
          </select>
        </div>
        <div className="form-group my-2">
          <label>Nombre</label>
          <input 
            required
            type="text"
            className="form-control"
            name="name"
            value={data.name}
          />
        </div>
        <div className="form-group my-2">
          <label>Dirección</label>
          <input 
            required
            type="text"
            className="form-control"
            name="address"
            value={data.address}
          />
        </div>
        <div className="form-group my-2">
          <label>Teléfono</label>
          <input 
            required
            type="text"
            className="form-control"
            name="phoneNumber"
            value={data.phoneNumber}
          />  
        </div>
        <div className="form-group my-2">
          <label>Celular</label>
          <input 
            required
            type="text"
            className="form-control"
            name="cellPhone"
            value={data.cellPhone}
          />
        </div>
        <div className="form-group my-3">
          <label className="mx-3">Activo:</label>&nbsp; 
          <label>Si</label>&nbsp; 
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "Si"}
            value="Si"
          />&nbsp; &nbsp; &nbsp; 
          <label>No</label>&nbsp; 
          <input 
            type="Radio"
            name="is_active"
            checked={data.is_active === "No"}
            value="No"
          />&nbsp;&nbsp;&nbsp;

          <label className="mx-3">Resetar Contraseña:</label>&nbsp; 
          <label>Si</label>&nbsp; 
          <input 
            type="Radio"
            name="is_new"
            checked={data.is_new === "Si"}
            value="Si"
          />&nbsp; &nbsp; &nbsp; 
          <label>No</label>&nbsp; 
          <input 
            type="Radio"
            name="is_new"
            checked={data.is_new === "No"}
            value="No"
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold"
          >{update ? "Actualizar" : "Agregar"}</button>
          <Link to={"/users"}
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