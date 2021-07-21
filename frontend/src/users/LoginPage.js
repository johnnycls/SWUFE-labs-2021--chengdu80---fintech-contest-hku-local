import React, { useState } from "react";
import logo from "../img/logo.png";
import "./LoginPage.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, getWatchlist } from "./usersSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onSubmit = async () => {
    await dispatch(login({ username: username, password: password }))
      .unwrap()
      .then((data) => {
        setUsername("");
        setPassword("");
        if (data.res === -1) {
          setIsValid(false);
          setError(data.msg);
        } else {
          dispatch(getWatchlist({ username }));
          history.push("/");
        }
      })
      .catch(() => {
        setUsername("");
        setPassword("");
        setIsValid(false);
      });
  };

  return (
    <div className="login-div">
      <div className="login-form-div">
        <img className="login-logo" src={logo} alt="logo" />
        {isValid ? null : <p className="warning-text">{error}</p>}
        <form className="login-input-form">
          <input
            className="login-input-field"
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="username"
            onChange={onUsernameChanged}
          />
          <br />
          <input
            className="login-input-field"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={onPasswordChanged}
          />
          <br />
          <div className="checkbox-div">
            <input type="checkbox" id="RememberMe" className="checkbox" />
            <label htmlFor="RememberMe" className="checkbox-label">
              Remember me
            </label>
            <br />
          </div>
          <div className="button-div">
            <input
              className="login-submit-button"
              type="button"
              value="Log In"
              onClick={onSubmit}
            />
          </div>
        </form>
        <div className="login-text-div">
          <a href="/#" className="login-text">
            Forgot Password?
          </a>
          <Link to="/register" className="login-text">
            Don't have an account? Register
          </Link>
        </div>
        <p className="copyright">Copyright © Your Website 2021.</p>
      </div>
    </div>
  );
};

export default LoginPage;
