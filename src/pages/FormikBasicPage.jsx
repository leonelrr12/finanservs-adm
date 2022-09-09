import { useFormik } from 'formik'
import { OutlinedInput, Button, TextField, FormControl, FormHelperText } from '@mui/material';

import '../styles/styles.css'

export const FormikBasicPage = () => {

  const validate = ({ fname, lname, email }) => {
    const errors = {}
    if (fname.length < 3) errors.fname = 'Debe ingresar un nombre valido.'
    return errors
  }

  const { handleChange, values, handleSubmit, errors } = useFormik({
    initialValues: {
      fname: "Leonel",
      lname: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validate
  })

  return (
    <div className="w-50 m-auto">
      <h2 className="text-center mt-4">Actualizar Datos del Prospecto</h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="mt-4">
          <label for="fname" class="form-label">Nombre</label>
          <input
            class="form-control"
            type="text"
            name="fname"
            onChange={handleChange}
            value={values.fname}
          />
        </div>
        {errors.fname && <span>{errors.fname}</span>}
        <div className="mt-2">
          <label for="lname" class="form-label">Apellido</label>
          <input
            class="form-control"
            type="text"
            name="lname"
            onChange={handleChange}
            value={values.lname}
          />
        </div>
        {errors.lname && <span>{errors.lname}</span>}
        <div className="mt-2">
          <label for="email" class="form-label">Email</label>
          <input
            class="form-control"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        {errors.email && <span>{errors.email}</span>}

        <div className="mt-4">
          <button
            className='btn btn-primary w-100'
            type='submit'
          >Actualizar</button>
        </div>
      </form>
    </div>
  )
}