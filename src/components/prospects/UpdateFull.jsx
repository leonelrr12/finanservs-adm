import { Formik, Form, Field, ErrorMessage } from 'formik';

function Prospect() {

  const handleSubmit = (values) => {
    alert('ffff')
    console.log(values)
  }

  const handleValidate = (values) => {
    const errors = {}
    console.log(values.fname.length)
    if(values.fname.length < 3) errors.fname = 'Debe ingresar un nombre valido.'
    return errors
  }

  return (
    <div>
      <Formik
        initialValues={{
          fname: "",
          fname_2: "",
          lname: "",
          lname_2: "",
          
        }}
        onSubmit={ handleSubmit }
        validate={ handleValidate }
      >
        <Form>
          <Field name="fname" type="text" />
          <ErrorMessage name="fname" />
          <Field name="fname_2" type="text" />
          <Field name="lname" type="text" />
          <Field name="lname_2" type="text" />
          <button type='submit'>Actualizar</button>
        </Form>

      </Formik>
    </div>
  );
}


export default Prospect;


// estado: "",
//           email: "",
//           cellphone: "",
//           phoneNumber: "",
//           gender: "",
//           birthDate: "",
//           contractType: "",
//           jobSector: "",
//           occupation: "",
//           paymentFrecuency: "",
//           profession: "",
//           residenceType: "",
//           residenceMonthly: "",
//           work_name: "",
//           work_cargo: "",
//           work_address: "",
//           work_phone: "",
//           work_phone_ext: "",
//           work_phone_2: "",
//           work_phone_ext_2: "",
//           work_month: "",
//           work_prev_name: "",
//           work_prev_month: "",
//           work_prev_salary: "",
//           civil_status: "",
//           nationality: "",
//           province: "",
//           district: "",
//           county: "",
//           calle: "",
//           barriada_edificio: "",
//           no_casa_piso_apto: "",
//           barrio_casa_calle: "",
//           salary: "",
//           disponible: "",
//           honorarios: "",
//           viaticos: "",
//           weight: "",
//           weightUnit: "",
//           height: "",
//           heightUnit: "",
//           doctor: "",
//           doctorSpecialty: "",
//           healthCenter: "",
//           department: "",
//           specialty: "",
//           startDate: "",
//           phoneNumber_2: "",
//           cellPhone_2: "",
//           socialSecurity: "",
//           placeOfBirth: "",
//           reason: "",
//           otherReason: ""