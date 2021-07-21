import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import MyDrawer from "./app/MyDrawer";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <MyDrawer page="HomePage" />
          </Route>
          <Route exact path="/dashboard">
            <MyDrawer page="Dashboard" />
          </Route>
          <Route exact path="/riskanalysis">
            <MyDrawer page="RiskAnalysisPage" />
          </Route>
          <Route exact path="/watchlist">
            <MyDrawer page="Watchlist" />
          </Route>
          <Route exact path="/register">
            <MyDrawer page="RegisterPage" />
          </Route>
          <Route exact path="/login">
            <MyDrawer page="LoginPage" />
          </Route>
          <Route exact path="/logout">
            <MyDrawer page="LogoutPage" />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

export default App;
