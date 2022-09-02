import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
const initialState = {
  user: null,
};
if (window.sessionStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(window.sessionStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    window.sessionStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}
export const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  function login(userData) {
    window.sessionStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    window.sessionStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}
