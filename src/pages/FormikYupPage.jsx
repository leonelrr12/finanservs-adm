import { useFormik } from 'formik'
import * as Yup from 'yup'

import '../styles/styles.css'

const FormikYupPage = () => {

  const {
    handleSubmit, errors, touched, getFieldProps
  } = useFormik({
    initialValues: {
      fname: "",
      fname_2: "",
      lname: "",
      lname_2: "",
      email: "",
      phoneNumber: "",
      work_name: "",
      work_cargo: "",
      work_address: "",
      work_phone: "",
      work_phone_ext: "",
      work_prev_name: "",
      work_prev_month: "",
      work_prev_salary: "",
      nationality: "",
      province: "",
      district: "",
      county: "",
      calle: "",
      barriada_edificio: "",
      no_casa_piso_apto: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Nombre Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      fname_2: Yup.string()
        .max(60, 'Excede la cantidad de caracteres.'),
      lname: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Apellido Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      lname_2: Yup.string()
        .max(60, 'Excede la cantidad de caracteres.'),
      email: Yup.string().email('El formato del e-mail no es válido.'),
      phoneNumber: Yup.string()
        .required('Campo requerido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      work_name: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      work_cargo: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      work_address: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      work_phone: Yup.string()
        .max(15, 'Excede la cantidad de caracteres.'),
      work_phone_ext: Yup.string()
        .max(5, 'Excede la cantidad de caracteres.'),
      work_prev_name: Yup.string()
        .max(60, 'Excede la cantidad de caracteres.'),
      work_prev_month: Yup.number().required().positive().integer('Solo numeros.'),
      work_prev_salary: Yup.number().required().positive('Solo numeros.'),
      nationality: Yup.string()
        .required('Campo requerido.')

        .max(60, 'Excede la cantidad de caracteres.'),
      province: Yup.string()
        .required('Campo requerido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      district: Yup.string()
        .required('Campo requerido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      county: Yup.string()
        .required('Campo requerido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      calle: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      barriada_edificio: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
      no_casa_piso_apto: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Ingrese un Dato Válido.')
        .max(60, 'Excede la cantidad de caracteres.'),
    })
  })

  return (
    <div className="w-50 m-auto">
      <h2 className="text-center mt-4">Actualizar Datos del Prospecto</h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="mt-4">
          <label for="fname" >Primer Nombre</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('fname')}
          />
        </div>
        {touched.fname && errors.fname && <span>{errors.fname}</span>}

        <div className="mt-4">
          <label for="fname_2" className="form-label">Segundo Nombre</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('fname_2')}
          />
        </div>
        {touched.fname_2 && errors.fname_2 && <span>{errors.fname_2}</span>}

        <div className="mt-2">
          <label for="lname" className="form-label">Apellido Paterno</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('lname')}
          />
        </div>
        {touched.lname && errors.lname && <span>{errors.lname}</span>}

        <div className="mt-2">
          <label for="lname_2" className="form-label">Apellido Materno</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('lname_2')}
          />
        </div>
        {touched.lname_2 && errors.lname_2 && <span>{errors.lname_2}</span>}

        <div className="mt-2">
          <label for="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            {...getFieldProps('email')}
          />
        </div>
        {touched.email && errors.email && <span>{errors.email}</span>}

        <div className="mt-2">
          <label for="phoneNumber" className="form-label">Teléfono de Casa</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('phoneNumber')}
          />
        </div>
        {touched.phoneNumber && errors.phoneNumber && <span>{errors.phoneNumber}</span>}

        <div className="mt-2">
          <label for="work_name" className="form-label">Trabajo Actual</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_name')}
          />
        </div>
        {touched.work_name && errors.work_name && <span>{errors.work_name}</span>}

        <div className="mt-2">
          <label for="work_cargo" className="form-label">Cargo</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_cargo')}
          />
        </div>
        {touched.work_cargo && errors.work_cargo && <span>{errors.work_cargo}</span>}

        <div className="mt-2">
          <label for="work_address" className="form-label">Dirección</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_address')}
          />
        </div>
        {touched.work_address && errors.work_address && <span>{errors.work_address}</span>}

        <div className="mt-2">
          <label for="work_phone" className="form-label">Teléfono</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_phone')}
          />
        </div>
        {touched.work_phone && errors.work_phone && <span>{errors.work_phone}</span>}

        <div className="mt-2">
          <label for="work_phone_ext" className="form-label">Extensión</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_phone_ext')}
          />
        </div>
        {touched.work_phone_ext && errors.work_phone_ext && <span>{errors.work_phone_ext}</span>}

        <div className="mt-2">
          <label for="work_prev_name" className="form-label">Trabajo Anterior</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('work_prev_name')}
          />
        </div>
        {touched.work_prev_name && errors.work_prev_name && <span>{errors.work_prev_name}</span>}

        <div className="mt-2">
          <label for="work_prev_month" className="form-label">Meses Trabajando</label>
          <input
            className="form-control"
            type="number"
            {...getFieldProps('work_prev_month')}
          />
        </div>
        {touched.work_prev_month && errors.work_prev_month && <span>{errors.work_prev_month}</span>}

        <div className="mt-2">
          <label for="work_prev_salary" className="form-label">Salario</label>
          <input
            className="form-control"
            type="number"
            {...getFieldProps('work_prev_salary')}
          />
        </div>
        {touched.work_prev_salary && errors.work_prev_salary && <span>{errors.work_prev_salary}</span>}

        <div className="mt-2">
          <label for="nationality" className="form-label">Nacionalidad</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('nationality')}
          />
        </div>
        {touched.nationality && errors.nationality && <span>{errors.nationality}</span>}

        <div className="mt-2">
          <label for="province" className="form-label">Provincia</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('province')}
          />
        </div>
        {touched.province && errors.province && <span>{errors.province}</span>}

        <div className="mt-2">
          <label for="district" className="form-label">Distrito</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('district')}
          />
        </div>
        {touched.district && errors.district && <span>{errors.district}</span>}

        <div className="mt-2">
          <label for="county" className="form-label">Corregimiento</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('county')}
          />
        </div>
        {touched.county && errors.county && <span>{errors.county}</span>}

        <div className="mt-2">
          <label for="calle" className="form-label">Calle</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('calle')}
          />
        </div>
        {touched.calle && errors.calle && <span>{errors.calle}</span>}

        <div className="mt-2">
          <label for="barriada_edificio" className="form-label">Barriada y/o Edificio</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('barriada_edificio')}
          />
        </div>
        {touched.barriada_edificio && errors.barriada_edificio && <span>{errors.barriada_edificio}</span>}

        <div className="mt-2">
          <label for="no_casa_piso_apto" className="form-label"># Casa o Piso apto.</label>
          <input
            className="form-control"
            type="text"
            {...getFieldProps('no_casa_piso_apto')}
          />
        </div>
        {touched.no_casa_piso_apto && errors.no_casa_piso_apto && <span>{errors.no_casa_piso_apto}</span>}

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

export default FormikYupPage