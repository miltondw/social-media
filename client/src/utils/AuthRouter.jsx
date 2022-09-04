import React from "react";
import { AuthContext } from "../context/auth";
export default function AuthRouter() {
  const { user } = AuthContext();
  return <div>{user}</div>;
}
