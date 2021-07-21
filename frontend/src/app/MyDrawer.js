import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Logo from "../img/logo1.png";
import ListIcon from "@material-ui/icons/List";

import HomePage from "../companies/HomePage";
import Dashboard from "../companies/Dashboard";
import RiskAnalysisPage from "../companies/RiskAnalysisPage";
import Watchlist from "../companies/Watchlist";
import RegisterPage from "../users/RegisterPage";
import LoginPage from "../users/LoginPage";
import LogoutPage from "../users/LogoutPage";

import { selectUser, logout } from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 75;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    width: "4rem",
  },
  button: { fontSize: "2rem" },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const login = (history) => {
  history.push("/login");
};
const register = (history) => {
  history.push("/register");
};
const onLogout = (dispatch, history) => {
  dispatch(logout());
  history.push("/logout");
};

export default function MyDrawer(props) {
  const classes = useStyles();
  const history = useHistory();
  let user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img className={classes.logo} src={Logo} alt="logo" />
          <Typography variant="h6" className={classes.title}></Typography>
          {user ? (
            <Button
              color="inherit"
              className={classes.button}
              onClick={() => onLogout(dispatch, history)}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => register(history)}
              >
                Register
              </Button>
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => login(history)}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="Home" component={Link} to="/">
              <ListItemIcon>
                <SearchIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
            </ListItem>
            <ListItem button key="Watchlist" component={Link} to="/watchlist">
              <ListItemIcon>
                <ListIcon style={{ fontSize: 40 }} />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {
          {
            HomePage: <HomePage />,
            Dashboard: <Dashboard />,
            RiskAnalysisPage: <RiskAnalysisPage />,
            Watchlist: <Watchlist />,
            RegisterPage: <RegisterPage />,
            LoginPage: <LoginPage />,
            LogoutPage: <LogoutPage />,
          }[props.page]
        }
      </main>
    </div>
  );
}
