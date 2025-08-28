import { createContext, useState } from "react"

export const ContextAuth = createContext()

function AuthContext({ children }) {
  const [authStatus, setAuthStatus] = useState(!!localStorage.getItem("token"))

  return (
    <ContextAuth.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </ContextAuth.Provider>
  );
}

export default AuthContext
