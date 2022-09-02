import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
export default function AuthRouter() {
  const { user } = useContext(AuthContext);
  return <div>{user}</div>;
}
