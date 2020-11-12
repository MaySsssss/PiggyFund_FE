import React, { Component } from 'react';
import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  makeStyles
  
} from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default class Account extends Component {
  render() {
    return(

      <div>
        <h1>Account</h1>
	      
	      <Container maxWidth="lg">
	        <Grid
	            item
	            lg={4}
	            md={6}
	            xs={12}
	          >
	            <div className="left_container">
	              <Profile />
	          	</div>
	        </Grid>
	        <Grid
	            item
	            lg={12}
	            md={16}
	            xs={12}
	          >
	        		<div className="right_container">
	              <ProfileDetails />
	            </div>
	        </Grid>
	        </Container>
      </div>
    )
  }
}



