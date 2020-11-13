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

      <div className="container">
        <h1>Account</h1>
	      
	              <Profile />
      </div>
    )
  }
}



