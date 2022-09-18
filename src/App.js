import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from './themes'

import { AppRoutes } from "./routes/AppRoutes";
import { Layout } from "./components/layout/Layout";
import "./App.css";
import { LoginProvider } from "./context/loginContext";

function App() {

  return (
    <BrowserRouter>
      <LoginProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App;