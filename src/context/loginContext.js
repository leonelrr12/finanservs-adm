import { createContext } from "react";

const initialState = {
    isLoading: false,
    error: {},
    data: {
      id: 1,
      hash: '$2a$10$hGR.rbnxVSTSHu31SoShHefvG6ezCoA/429EzJgRvdknmM/m/xRGe',
      name: 'Leonel Rodriguez',
      is_active: 1,
      is_new: 0,
      Role: 1,
      Ruta: '700',
      Agente: 1,
      Tipo_Agente: 1,
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjI5MTA0MjYsImV4cCI6MTY2NTUwMjQyNn0.VFf_t-W6h6CLgUZgcXQvFQPgSn0b9woaJnttUxNBS1c'
    },
  }

export const LoginContext = createContext({ initialState })

export const LoginProvider = ({ children }) => {
  return <LoginContext.Provider value={ initialState }>
    { children }
  </LoginContext.Provider>
}