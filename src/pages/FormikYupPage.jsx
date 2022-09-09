import { useFormik } from 'formik'

import '../styles/styles.css'

const FormikYupPage = () => {

  const validate = ({ 
    fname,
    fname_2,
    lname,
    lname_2,
    email,
    phoneNumber,
    work_name,
    work_cargo,
    work_address,
    work_phone,
    work_phone_ext,
    work_prev_name,
    work_prev_month,
    work_prev_salary,
    nationality,
    province,
    district,
    county,
    calle,
    barriada_edificio,
    no_casa_piso_apto,
  }) => {
    const errors = {}
    if (fname.length < 3) errors.fname = 'Debe ingresar un nombre válido.'
    if (fname.length > 60) errors.fname = 'Ha sobrepasado el largo permitido.'
    if (fname_2 && fname_2.length > 60) errors.fname_2 = 'Ha sobrepasado el largo permitido.'
    if (lname.length < 3) errors.lname = 'Debe ingresar un apellido válido.'
    if (lname.length > 60) errors.lname = 'Ha sobrepasado el largo permitido.'
    if (lname_2 && lname_2.length > 60) errors.lname_2 = 'Ha sobrepasado el largo permitido.'

    if (email.length < 3) errors.email = 'Debe ingresar un Email válido.'
    if (email.length > 60) errors.email = 'Ha sobrepasado el largo permitido.'
    if (phoneNumber.length < 3) errors.phoneNumber = 'Debe ingresar un apellido válido.'
    if (phoneNumber.length > 15) errors.phoneNumber = 'Ha sobrepasado el largo permitido.'

    if (work_name.length < 3) errors.work_name = 'Debe ingresar un dato válido.'
    if (work_name.length > 100) errors.work_name = 'Ha sobrepasado el largo permitido.'
    if (work_cargo.length < 3) errors.work_cargo = 'Debe ingresar un dato válido.'
    if (work_cargo.length > 60) errors.work_cargo = 'Ha sobrepasado el largo permitido.'
    if (work_address.length < 3) errors.work_address = 'Debe ingresar un dato válido.'
    if (work_address.length > 60) errors.work_address = 'Ha sobrepasado el largo permitido.'

    if (work_phone.length < 3) errors.work_phone = 'Debe ingresar un dato válido.'
    if (work_phone.length > 15) errors.work_phone = 'Ha sobrepasado el largo permitido.'
    if (work_phone_ext.length < 3) errors.work_phone_ext = 'Debe ingresar un dato válido.'
    if (work_phone_ext.length > 5) errors.work_phone_ext = 'Ha sobrepasado el largo permitido.'

    if (work_prev_name.length < 3) errors.work_prev_name = 'Debe ingresar un dato válido.'
    if (work_prev_name.length > 100) errors.work_prev_name = 'Ha sobrepasado el largo permitido.'
    if (work_prev_month.length < 3) errors.work_prev_month = 'Debe ingresar un dato válido.'
    if (work_prev_month.length > 100) errors.work_prev_month = 'Ha sobrepasado el largo permitido.'
    if (work_prev_salary.length < 3) errors.work_prev_salary = 'Debe ingresar un dato válido.'
    if (work_prev_salary.length > 100) errors.work_prev_salary = 'Ha sobrepasado el largo permitido.'

    if (nationality.length < 3) errors.nationality = 'Debe ingresar un dato válido.'
    if (nationality.length > 100) errors.nationality = 'Ha sobrepasado el largo permitido.'
    if (province.length < 3) errors.province = 'Debe ingresar un dato válido.'
    if (province.length > 100) errors.province = 'Ha sobrepasado el largo permitido.'
    if (district.length < 3) errors.district = 'Debe ingresar un dato válido.'
    if (district.length > 100) errors.district = 'Ha sobrepasado el largo permitido.'
    if (county.length < 3) errors.county = 'Debe ingresar un dato válido.'
    if (county.length > 100) errors.county = 'Ha sobrepasado el largo permitido.'

    if (calle.length < 3) errors.calle = 'Debe ingresar un dato válido.'
    if (calle.length > 100) errors.calle = 'Ha sobrepasado el largo permitido.'
    if (barriada_edificio.length < 3) errors.barriada_edificio = 'Debe ingresar un dato válido.'
    if (barriada_edificio.length > 100) errors.barriada_edificio = 'Ha sobrepasado el largo permitido.'
    if (no_casa_piso_apto.length < 3) errors.no_casa_piso_apto = 'Debe ingresar un dato válido.'
    if (no_casa_piso_apto.length > 100) errors.no_casa_piso_apto = 'Ha sobrepasado el largo permitido.'

    return errors
  }

  const { 
    handleChange, values, handleSubmit, errors, touched, handleBlur
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
    validate
  })

  return (
    <div className="w-50 m-auto">
      <h2 className="text-center mt-4">Actualizar Datos del Prospecto</h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="mt-4">
          <label for="fname" >Primer Nombre</label>
          <input
          form-control-lg
            className="form-control"
            type="text"
            name="fname"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.fname }
          />
        </div>
        {touched.fname && errors.fname && <span>{errors.fname}</span>}

        <div className="mt-4">
          <label for="fname_2" className="form-label">Segundo Nombre</label>
          <input
            className="form-control"
            type="text"
            name="fname_2"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.fname_2}
          />
        </div>
        {touched.fname_2 && errors.fname_2 && <span>{errors.fname_2}</span>}

        <div className="mt-2">
          <label for="lname" className="form-label">Apellido Paterno</label>
          <input
            className="form-control"
            type="text"
            name="lname"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.lname}
          />
        </div>
        {touched.lname && errors.lname && <span>{errors.lname}</span>}

        <div className="mt-2">
          <label for="lname_2" className="form-label">Apellido Materno</label>
          <input
            className="form-control"
            type="text"
            name="lname_2"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.lname_2}
          />
        </div>
        {touched.lname_2 && errors.lname_2 && <span>{errors.lname_2}</span>}

        <div className="mt-2">
          <label for="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.email}
          />
        </div>
        {touched.email && errors.email && <span>{errors.email}</span>}

        <div className="mt-2">
          <label for="phoneNumber" className="form-label">Teléfono de Casa</label>
          <input
            className="form-control"
            type="text"
            name="phoneNumber"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.phoneNumber}
          />
        </div>
        {touched.phoneNumber && errors.phoneNumber && <span>{errors.phoneNumber}</span>}

        <div className="mt-2">
          <label for="work_name" className="form-label">Trabajo Actual</label>
          <input
            className="form-control"
            type="text"
            name="work_name"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_name}
          />
        </div>
        {touched.work_name && errors.work_name && <span>{errors.work_name}</span>}

        <div className="mt-2">
          <label for="work_cargo" className="form-label">Cargo</label>
          <input
            className="form-control"
            type="text"
            name="work_cargo"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_cargo}
          />
        </div>
        {touched.work_cargo && errors.work_cargo && <span>{errors.work_cargo}</span>}

        <div className="mt-2">
          <label for="work_address" className="form-label">Dirección</label>
          <input
            className="form-control"
            type="text"
            name="work_address"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_address}
          />
        </div>
        {touched.work_address && errors.work_address && <span>{errors.work_address}</span>}

        <div className="mt-2">
          <label for="work_phone" className="form-label">Teléfono</label>
          <input
            className="form-control"
            type="text"
            name="work_phone"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_phone}
          />
        </div>
        {touched.work_phone && errors.work_phone && <span>{errors.work_phone}</span>}

        <div className="mt-2">
          <label for="work_phone_ext" className="form-label">Extensión</label>
          <input
            className="form-control"
            type="text"
            name="work_phone_ext"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_phone_ext}
          />
        </div>
        {touched.work_phone_ext && errors.work_phone_ext && <span>{errors.work_phone_ext}</span>}

        <div className="mt-2">
          <label for="work_prev_name" className="form-label">Trabajo Anterior</label>
          <input
            className="form-control"
            type="text"
            name="work_prev_name"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_prev_name}
          />
        </div>
        {touched.work_prev_name && errors.work_prev_name && <span>{errors.work_prev_name}</span>}

        <div className="mt-2">
          <label for="work_prev_month" className="form-label">Meses Trabajando</label>
          <input
            className="form-control"
            type="text"
            name="work_prev_month"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_prev_month}
          />
        </div>
        {touched.work_prev_month && errors.work_prev_month && <span>{errors.work_prev_month}</span>}

        <div className="mt-2">
          <label for="work_prev_salary" className="form-label">Salario</label>
          <input
            className="form-control"
            type="text"
            name="work_prev_salary"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.work_prev_salary}
          />
        </div>
        {touched.work_prev_salary && errors.work_prev_salary && <span>{errors.work_prev_salary}</span>}

        <div className="mt-2">
          <label for="nationality" className="form-label">Nacionalidad</label>
          <input
            className="form-control"
            type="text"
            name="nationality"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.nationality}
          />
        </div>
        {touched.nationality && errors.nationality && <span>{errors.nationality}</span>}

        <div className="mt-2">
          <label for="province" className="form-label">Provincia</label>
          <input
            className="form-control"
            type="text"
            name="province"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.province}
          />
        </div>
        {touched.province && errors.province && <span>{errors.province}</span>}

        <div className="mt-2">
          <label for="district" className="form-label">Distrito</label>
          <input
            className="form-control"
            type="text"
            name="district"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.district}
          />
        </div>
        {touched.district && errors.district && <span>{errors.district}</span>}

        <div className="mt-2">
          <label for="county" className="form-label">Corregimiento</label>
          <input
            className="form-control"
            type="text"
            name="county"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.county}
          />
        </div>
        {touched.county && errors.county && <span>{errors.county}</span>}

        <div className="mt-2">
          <label for="calle" className="form-label">Calle</label>
          <input
            className="form-control"
            type="text"
            name="calle"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.calle}
          />
        </div>
        {touched.calle && errors.calle && <span>{errors.calle}</span>}

        <div className="mt-2">
          <label for="barriada_edificio" className="form-label">Barriada y/o Edificio</label>
          <input
            className="form-control"
            type="text"
            name="barriada_edificio"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.barriada_edificio}
          />
        </div>
        {touched.barriada_edificio && errors.barriada_edificio && <span>{errors.barriada_edificio}</span>}

        <div className="mt-2">
          <label for="no_casa_piso_apto" className="form-label"># Casa o Piso apto.</label>
          <input
            className="form-control"
            type="text"
            name="no_casa_piso_apto"
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={values.no_casa_piso_apto}
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