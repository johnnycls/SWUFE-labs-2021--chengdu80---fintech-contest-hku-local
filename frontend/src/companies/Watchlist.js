import React, { useEffect } from "react";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import { Paper, Typography, Box, Divider } from "@material-ui/core";
import { selectUser } from "../users/usersSlice";
import { getWatchlist, selectWatchlist } from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

const Watchlist = () => {
  let user = useSelector(selectUser);
  let watchlist = useSelector(selectWatchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (watchlist === null) {
      dispatch(getWatchlist({ username: user }));
    }
  });

  return (
    <div>
      {user ? (
        <div>
          <Paper>
            <Box p={3}>
              <Typography variant="h4">Watchlist</Typography>
              <Divider />
              <CustomPaginationActionsTable rows={watchlist} />
            </Box>
          </Paper>
          <br />
        </div>
      ) : (
        <h1>Please Register or Login to view your watchlist</h1>
      )}
    </div>
  );
};

export default Watchlist;
