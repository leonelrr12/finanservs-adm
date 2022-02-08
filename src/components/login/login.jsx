import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "../../store/user";
import AlertMessage from "../AlertMessage";
import { UserFormLayout } from "./UserFormLayout";
import { AppInput } from "../AppInput";
import { AppButton } from "../../theme";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiConfig from '../../config/api'

const URL_API = apiConfig.domain

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onFormSubmit = async (data) => {
    const res = await axios.get(URL_API + '/api/login/new-user/' + data.email)
    const isNew = res.data
    if(isNew === 1) {
      navigate("/password/?email=" + data.email)
      return
    }
    dispatch(
      signIn(
        { credentials: data }
      )
    );
  };

  const onErrors = (errors) => setErrorMessage(errors)

  return (
    <UserFormLayout>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <AppInput
          label="Correo eletrónico"
          name="email"
          required
          register={register}
          type="email"
        />
        <AppInput
          label="Contraseña"
          name="password"
          register={register}
          type="password"
        />
        <AppButton
          type="submit"
          small
        >
        Iniciar sessión
        </AppButton>
      </form>
      {errorMessage ? (
        <AlertMessage
          type={"warning"}
          message={errorMessage}
          setMsg={setErrorMessage}
        />
      ) : (
        ""
      )}
    </UserFormLayout>
  );
};

export default Login;