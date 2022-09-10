import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import '../styles/styles.css'

const FormikComponents = () => {

  return (
    <div id="divFormik">
      <h2 className="text-center my-4">Actualizar Prospecto</h2>

      <Formik
        initialValues={{
          fname: "",
          lname: "",
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
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={Yup.object({
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
        }
      >

        {formik => (
          <Form >
            <label for="fname" >Primer Nombre</label>
            <Field name="fname" type="text" />
            <ErrorMessage name="fname" component="span" />

            <label for="fname_2" className="mt-3">Segundo Nombre</label>
            <Field name="fname_2" type="text" />
            <ErrorMessage name="fname_2" component="span" />

            <label for="lname" className="mt-3">Apellido Paterno</label>
            <Field name="lname" type="text" />
            <ErrorMessage name="lname" component="span" />

            <label for="lname_2" className="mt-3">Apellido Materno</label>
            <Field name="lname_2" type="text" />
            <ErrorMessage name="lname_2" component="span" />

            <label for="email" className="mt-3">Email</label>
            <Field name="email" type="text" />
            <ErrorMessage name="email" component="span" />

            <label for="phoneNumber" className="mt-3">Teléfono de Casa</label>
            <Field name="phoneNumber" type="text" />
            <ErrorMessage name="phoneNumber" component="span" />

            <label for="work_name" className="mt-3">Trabajo Actual</label>
            <Field name="work_name" type="text" />
            <ErrorMessage name="work_name" component="span" />

            <label for="work_cargo" className="mt-3">Cargo</label>
            <Field name="work_cargo" type="text" />
            <ErrorMessage name="work_cargo" component="span" />

            <label for="work_address" className="mt-3">Dirección</label>
            <Field name="work_address" type="text" />
            <ErrorMessage name="work_address" component="span" />

            <label for="work_phone" className="mt-3">Teléfono</label>
            <Field name="work_phone" type="text" />
            <ErrorMessage name="work_phone" component="span" />

            <label for="work_phone_ext" className="mt-3">Extensión</label>
            <Field name="work_phone_ext" type="text" />
            <ErrorMessage name="work_phone_ext" component="span" />

            <label for="work_prev_name" className="mt-3">Trabajo Anterior</label>
            <Field name="work_prev_name" type="text" />
            <ErrorMessage name="work_prev_name" component="span" />

            <label for="work_prev_month" className="mt-3">Meses Trabajando</label>
            <Field name="lname" type="text" />
            <ErrorMessage name="lname" component="span" />

            <label for="work_prev_salary" className="mt-3">Salario</label>
            <Field name="work_prev_salary" type="text" />
            <ErrorMessage name="work_prev_salary" component="span" />

            <label for="nationality" className="mt-3">Nacionalidad</label>
            <Field name="nationality" type="text" />
            <ErrorMessage name="nationality" component="span" />

            <label for="province" className="mt-3">Provincia</label>
            <Field name="province" type="text" />
            <ErrorMessage name="province" component="span" />

            <label for="district" className="mt-3">Distrito</label>
            <Field name="district" type="text" />
            <ErrorMessage name="district" component="span" />

            <label for="county" className="mt-3">Corregimiento</label>
            <Field name="county" type="text" />
            <ErrorMessage name="county" component="span" />

            <label for="calle" className="mt-3">Calle</label>
            <Field name="calle" type="text" />
            <ErrorMessage name="calle" component="span" />

            <label for="barriada_edificio" className="mt-3">Barriada y/o Edificio</label>
            <Field name="barriada_edificio" type="text" />
            <ErrorMessage name="lname" component="span" />

            <label for="no_casa_piso_apto" className="mt-3"># Casa o Piso apto.</label>
            <Field name="no_casa_piso_apto" type="text" />
            <ErrorMessage name="no_casa_piso_apto" component="span" />

            <div className="my-4">
              <button
                className='btn btn-primary w-100'
                type='submit'
              >Actualizar</button>
            </div>
          </Form>
        )
        }
      </Formik>
    </div>
  )
}

export default FormikComponents