import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Grid } from "@mui/material/";
import apiConfig from "../config/api";
import Search from "../components/prospects/Search";
import { CustomSelect } from "../components/CustomSelect";

import "../styles/styles.css";

const FormikComponents = () => {
  const [loading, setLoading] = useState(true);
  const [ID, setID] = useState(null);
  const [prospects, setProspects] = useState([]);
  const [prospect, setProspect] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [counties, setCounties] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [entities, setEntities] = useState([]);
  const [estados, setEstados] = useState([]);

  const getProspects = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/prospects/update/");
    const da = await res.data;
    setProspects(da);
  };
  const getProvinces = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/provinces");
    const da = await res.data;
    setProvinces(da.map((p) => ({ value: p.id, label: p.name })));
  };
  const getDistricts = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/districts");
    const da = await res.data;
    setDistricts(
      da.map((p) => ({ idProv: p.idProv, value: p.id, label: p.name }))
    );
  };
  const getCounties = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/counties");
    const da = await res.data;
    setCounties(
      da.map((p) => ({
        idProv: p.idProv,
        idDIst: p.idDist,
        value: p.id,
        label: p.name,
      }))
    );
  };
  const getNationalities = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/nationality");
    const da = await res.data;
    setNationalities(da.map((p) => ({ value: p.id, label: p.name })));
  };
  const getEntities = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/entities_f");
    const da = await res.data;
    setEntities(da.map((p) => ({ value: p.id_ruta, label: p.name })));
  };
  const getEstados = async () => {
    const res = await axios.get(apiConfig.domain + "/adm/estados_tramite");
    const da = await res.data;
    setEstados(da.map((p) => ({ value: p.id, label: p.name })));
  };

  useEffect(() => {
    const load = async () => {
      await getProvinces();
      await getDistricts();
      await getCounties();
      await getNationalities();
      await getEntities();
      await getEstados();
      await getProspects();
      setLoading(false);
    };
    load();
  }, []);

  const getProspect = async () => {
    const res = await axios.get(
      apiConfig.domain + "/adm/prospects/update/" + ID
    );
    const da = await res.data;

    let data = da[0];
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element == null) {
          // console.log('2222', key, element)
          if (key === "disponible") {
            data = { ...data, [key]: "0" };
          } else {
            data = { ...data, [key]: "" };
          }
        }
      }
    }
    setProspect(data);
    setLoading(false);
  };

  const handleSubmit = async (data) => {
    const res = await axios.put(
      apiConfig.domain + "/adm/prospects/update/",
      data
    );
    console.log(res);
    setID(null);
  };

  useEffect(() => {
    if (ID) {
      getProspect();
    }
    // eslint-disable-next-line
  }, [ID]);

  if (loading) {
    return (
      <div>
        <h1>Cargando ...</h1>
      </div>
    );
  }

  if (!ID) {
    return <Search prospects={prospects} setID={setID} />;
  }

  if (ID) {
    return (
      <div id="divFormik">
        <h2 className="text-center my-4">Actualizar Prospecto</h2>

        <Formik
          enableReinitialize={true}
          initialValues={prospect}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={Yup.object({
            fname: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Nombre Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            fname_2: Yup.string().max(60, "Excede la cantidad de caracteres."),
            lname: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Apellido Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            lname_2: Yup.string().max(60, "Excede la cantidad de caracteres."),
            email: Yup.string().email("El formato del e-mail no es válido."),
            phoneNumber: Yup.string()
              .required("Campo requerido.")
              .max(60, "Excede la cantidad de caracteres."),
            work_name: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            work_cargo: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            work_address: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            work_phone: Yup.string().max(
              15,
              "Excede la cantidad de caracteres."
            ),
            work_phone_ext: Yup.string().max(
              5,
              "Excede la cantidad de caracteres."
            ),
            work_prev_name: Yup.string().max(
              60,
              "Excede la cantidad de caracteres."
            ),
            work_prev_month: Yup.number().required().integer("Solo numeros."),
            work_prev_salary: Yup.number().required("Solo numeros."),
            nationality: Yup.string()
              .required("Campo requerido.")
              .max(60, "Excede la cantidad de caracteres."),
            province: Yup.string()
              .required("Campo requerido.")
              .max(60, "Excede la cantidad de caracteres."),
            district: Yup.string()
              .required("Campo requerido.")
              .max(60, "Excede la cantidad de caracteres."),
            county: Yup.string()
              .required("Campo requerido.")
              .max(60, "Excede la cantidad de caracteres."),
            calle: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            barriada_edificio: Yup.string()
              .required("Campo requerido.")
              .min(3, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
            no_casa_piso_apto: Yup.string()
              .required("Campo requerido.")
              .min(2, "Ingrese un Dato Válido.")
              .max(60, "Excede la cantidad de caracteres."),
          })}
        >
          {(formik) => (
            <Form>
              <Grid container spacing={{ sm: 2 }} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={6}>
                  <button className="btn btn-primary w-100" type="submit">
                    Actualizar
                  </button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <button
                    className="btn btn-warning w-100"
                    type="button"
                    onClick={() => setID(null)}
                  >
                    Cancelar
                  </button>
                </Grid>
              </Grid>

              <label for="fname">Entidad Financiera</label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("entity_f", value.value)
                }
                value={formik.values.entity_f}
                options={entities}
              />
              {formik.errors.entity_f ? (
                <div className="error">{formik.errors.entity_f}</div>
              ) : null}

              <label for="fname">Estado del Trámite</label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("estado", value.value)
                }
                value={formik.values.estado}
                options={estados}
              />
              {formik.errors.estado ? (
                <div className="error">{formik.errors.estado}</div>
              ) : null}

              <label for="fname">Primer Nombre</label>
              <Field name="fname" type="text" />
              <ErrorMessage name="fname" component="span" />

              <label for="fname_2">
                Segundo Nombre
              </label>
              <Field name="fname_2" type="text" />
              <ErrorMessage name="fname_2" component="span" />

              <label for="lname">
                Apellido Paterno
              </label>
              <Field name="lname" type="text" />
              <ErrorMessage name="lname" component="span" />

              <label for="lname_2">
                Apellido Materno
              </label>
              <Field name="lname_2" type="text" />
              <ErrorMessage name="lname_2" component="span" />

              <label for="email">
                Email
              </label>
              <Field name="email" type="text" />
              <ErrorMessage name="email" component="span" />

              <label for="phoneNumber">
                Teléfono de Casa
              </label>
              <Field name="phoneNumber" type="text" />
              <ErrorMessage name="phoneNumber" component="span" />

              <label for="work_name">
                Trabajo Actual
              </label>
              <Field name="work_name" type="text" />
              <ErrorMessage name="work_name" component="span" />

              <label for="work_cargo">
                Cargo
              </label>
              <Field name="work_cargo" type="text" />
              <ErrorMessage name="work_cargo" component="span" />

              <label for="work_address">
                Dirección
              </label>
              <Field name="work_address" type="text" />
              <ErrorMessage name="work_address" component="span" />

              <label for="work_phone">
                Teléfono
              </label>
              <Field name="work_phone" type="text" />
              <ErrorMessage name="work_phone" component="span" />

              <label for="work_phone_ext">
                Extensión
              </label>
              <Field name="work_phone_ext" type="text" />
              <ErrorMessage name="work_phone_ext" component="span" />

              <label for="work_prev_name">
                Trabajo Anterior
              </label>
              <Field name="work_prev_name" type="text" />
              <ErrorMessage name="work_prev_name" component="span" />

              <label for="work_prev_month">
                Meses Trabajando
              </label>
              <Field name="work_prev_month" type="text" />
              <ErrorMessage name="work_prev_month" component="span" />

              <label for="work_prev_salary">
                Salario
              </label>
              <Field name="work_prev_salary" type="text" />
              <ErrorMessage name="work_prev_salary" component="span" />

              <label for="nationality">
                Nacionalidad
              </label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("nationality", value.value)
                }
                value={formik.values.nationality}
                options={nationalities}
              />
              {formik.errors.nationality ? (
                <div className="error">{formik.errors.nationality}</div>
              ) : null}

              <label for="province">
                Provincia
              </label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("province", value.value)
                }
                value={formik.values.province}
                options={provinces}
              />
              {formik.errors.province ? (
                <div className="error">{formik.errors.province}</div>
              ) : null}

              <label for="district">
                Distrito
              </label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("district", value.value)
                }
                value={formik.values.district}
                options={districts.filter(
                  (p) => p.idProv === formik.values.province
                )}
              />
              {formik.errors.district ? (
                <div className="error">{formik.errors.district}</div>
              ) : null}

              <label for="county">
                Corregimiento
              </label>
              <CustomSelect
                className="input"
                onChange={(value) =>
                  formik.setFieldValue("county", value.value)
                }
                value={formik.values.county}
                options={counties.filter(
                  (p) =>
                    p.idProv === formik.values.province &&
                    p.idDIst === formik.values.district
                )}
              />
              {formik.errors.counties ? (
                <div className="error">{formik.errors.counties}</div>
              ) : null}

              <label for="calle">
                Calle
              </label>
              <Field name="calle" type="text" />
              <ErrorMessage name="calle" component="span" />

              <label for="barriada_edificio">
                Barriada y/o Edificio
              </label>
              <Field name="barriada_edificio" type="text" />
              <ErrorMessage name="lname" component="span" />

              <label for="no_casa_piso_apto">
                # Casa o Piso apto.
              </label>
              <Field name="no_casa_piso_apto" type="text" />
              <ErrorMessage name="no_casa_piso_apto" component="span" />

              <div className="my-4">
                <Grid container spacing={{ sm: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <button className="btn btn-primary w-100" type="submit">
                      Actualizar
                    </button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <button
                      className="btn btn-warning w-100"
                      type="button"
                      onClick={() => setID(null)}
                    >
                      Cancelar
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default FormikComponents;

// initialValues={{
//   fname: "",
//   fname_2: "",
//   lname: "",
//   lname_2: "",
//   email: "",
//   phoneNumber: "",
//   work_name: "",
//   work_cargo: "",
//   work_address: "",
//   work_phone: "",
//   work_phone_ext: "",
//   work_prev_name: "",
//   work_prev_month: "",
//   work_prev_salary: "",
//   nationality: "",
//   province: "",
//   district: "",
//   county: "",
//   calle: "",
//   barriada_edificio: "",
//   no_casa_piso_apto: "",
// }}
