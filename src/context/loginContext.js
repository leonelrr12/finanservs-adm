import { createContext, useState } from "react";

const ctxApi = JSON.parse(window.localStorage.getItem("ctx-api"));
export const LoginContext = createContext(null)

export const LoginProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(ctxApi)
  const [isAuth, setIsAuth] = useState(false)

  const value = {
    userInfo, setUserInfo,
    isAuth, setIsAuth,

  }
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>)
}