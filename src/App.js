import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import theme, { GlobalStyles } from "./theme";
import { persistor, store } from "./store";
import { AppRoutes } from "./routes/AppRoutes";
import { Layout } from "./components/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <Layout>
                <AppRoutes />
              </Layout>
            </ThemeProvider>
          </PersistGate>
        </Provider>
    </BrowserRouter>
  )
}

export default App;
