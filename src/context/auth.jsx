import { createContext, useContext, useReducer } from "react";
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

const Context = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

export const AuthContext = () => useContext(Context);

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
    <Context.Provider value={{ user: state.user, login, logout }} {...props} />
  );
}
