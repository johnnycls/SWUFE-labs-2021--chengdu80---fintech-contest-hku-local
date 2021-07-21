import React, { useState } from "react";
import logo from "../img/logo.png";
import "./LoginPage.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "./usersSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isRetyped, setIsRetyped] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRePasswordChanged = (e) => setRePassword(e.target.value);

  const onSubmit = async () => {
    setIsValid(true);
    if (password !== rePassword) {
      setIsRetyped(false);
      return;
    } else {
      setIsRetyped(true);
    }

    await dispatch(register({ username: username, password: password }))
      .unwrap()
      .then((data) => {
        setUsername("");
        setPassword("");
        setRePassword("");
        if (data.res === -1) {
          setIsValid(false);
          setError(data.msg);
        } else {
          history.push("/");
        }
      })
      .catch(() => {
        setUsername("");
        setPassword("");
        setRePassword("");
        setIsValid(false);
      });
  };

  return (
    <div className="login-div">
      <div className="login-form-div">
        <img className="login-logo" src={logo} alt="logo" />
        {isValid ? null : <p className="warning-text">{error}</p>}
        {isRetyped ? null : (
          <p className="warning-text">Please retype the same password</p>
        )}
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
          <input
            className="login-input-field"
            type="password"
            id="retype-password"
            name="retype-password"
            value={rePassword}
            placeholder="retype password"
            onChange={onRePasswordChanged}
          />
          <br />
          <div className="button-div">
            <input
              className="login-submit-button"
              type="button"
              value="Register"
              onClick={onSubmit}
            />
          </div>
        </form>
        <Link to="/login" className="login-text">
          Already have an account? Login
        </Link>
        <p className="copyright">Copyright © Your Website 2021.</p>
      </div>
    </div>
  );
};

export default LoginPage;
