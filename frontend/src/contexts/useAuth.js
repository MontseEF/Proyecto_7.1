import { useContext } from "react";
import { AuthCtx } from "./AuthContext.jsx";

export function useAuth() {
  return useContext(AuthCtx);
}
