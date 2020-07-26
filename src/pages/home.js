import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://europe-west3-socialape-23b23.cloudfunctions.net/api/screams"
      )
      .then((res) => {
        setScreams(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let recentScreamsMarkUp = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkUp}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
