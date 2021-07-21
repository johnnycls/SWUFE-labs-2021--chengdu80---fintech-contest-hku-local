import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { search } from "./companiesSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  invalidtext: { fontSize: "1.5rem", color: "red" },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [valid, setValid] = useState(true);
  const [searchValue, setsearchValue] = useState("");
  const onChange = (e) => setsearchValue(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setValid(true);
    await dispatch(search({ id: searchValue }))
      .unwrap()
      .then((data) => {
        if (data.res === -1) {
          setValid(false);
        } else {
          history.push("/dashboard");
        }
      });
  };

  return (
    <div className={classes.search}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper component="form" className={classes.root} onSubmit={onSubmit}>
            <InputBase
              className={classes.input}
              placeholder="Company ID"
              onChange={onChange}
            />
            <IconButton type="submit" className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
          {valid ? null : (
            <Typography className={classes.invalidtext}>
              Please enter a valid company id
            </Typography>
          )}
          <Typography>Sample ID: 933133385, 535352782, 705310922...</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
