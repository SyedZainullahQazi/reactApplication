import {  Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext";

export function ProtectedRoute({ elementBody: Component,}) {
  const { userCredentials } = useContext(AuthContext);

  return (
    <>
      {userCredentials ? (
        Component
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}
