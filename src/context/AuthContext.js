import React, { useContext } from "react";

export const AuthContext = React.createContext();

export const AuthProviderContext = ({children , user}) => {

  return(
    <AuthContext.Provider value={ user }>
      {children}
    </AuthContext.Provider>
  )
}

export function useContextAuth(){
  return useContext(AuthContext);
}