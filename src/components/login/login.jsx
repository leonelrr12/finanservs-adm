import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "../../store/user";
import AlertMessage from "../AlertMessage";
import { UserFormLayout } from "./UserFormLayout";
import { AppInput } from "../AppInput";
import { AppButton } from "../../theme";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onFormSubmit = (data) => {
    console.log(data);
    dispatch(
      signIn(
        { credentials: data }
      )
    );
  };

  const onErrors = (errors) => console.error(errors);

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