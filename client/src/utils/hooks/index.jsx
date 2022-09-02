import { useState } from "react";
import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export const UseForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onchange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return {
    onchange,
    onSubmit,
    values,
  };
};

export const UseSign = (values, GqlMutation, user) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const [sign, { loading }] = useMutation(GqlMutation, {
    update(_, { data }) {
      context.login(data[user[0]]);
      navigate(user[1]);
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  return {
    errors,
    sign,
    loading,
  };
};
