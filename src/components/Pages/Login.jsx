import * as React from "react";
import { UseForm, UseSign } from "../../utils/hooks/index";
import { LOGIN } from "../../apollo/gql/Mutation";
import Form from "../Molecules/Form";
export default function Login() {
  const initialState = {
    username: "",
    password: "",
  };
  const user = ["login", "/"];
  const { onSubmit, onchange, values, handleClickShowPassword, showPassword } =
    UseForm(loginUser, initialState);
  const { errors, loading, sign } = UseSign(values, LOGIN, user);
  function loginUser() {
    sign();
  }
  return (
    <Form
      onSubmit={onSubmit}
      onchange={onchange}
      values={values}
      errors={errors}
      loading={loading}
      path={user[1]}
      handleClickShowPassword={handleClickShowPassword}
      showPassword={showPassword}
    />
  );
}
