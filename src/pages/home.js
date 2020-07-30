import React, { useEffect} from "react";
import { Grid } from "@material-ui/core";

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from 'prop-types'
const Home = ({data: {screams, loading}, getScreams, ...props}) => {

  useEffect(() => {
    getScreams()
  },[getScreams]);


  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
    
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, {getScreams})(Home);
