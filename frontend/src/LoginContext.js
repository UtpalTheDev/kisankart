import { createContext, useContext, useState } from "react";

const Logincontext = createContext();

export function LoginProvider({ children }) {
  const [isUserLogIn, setLogin] = useState(false);
  return (
    <Logincontext.Provider value={{ isUserLogIn, setLogin }}>
      {children}
    </Logincontext.Provider>
  );
}

export function useLogin() {
  return useContext(Logincontext);
}
