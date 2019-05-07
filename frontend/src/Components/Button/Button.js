import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import './Button.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  sizeButton: {
    width: '15em',
    height: '5em',
    margin: '0 1em'
  },
  smallAddButton: {
    width: '6em',
    height: '6em',
    borderRadius: '50%',
    margin: '0 1em'
  },
  verticalButton: {
    width: '20em',
    height: '7.5em',
    display: 'block',
    margin: '28px',
  }
});

function Button(props) {
  const { classes } = props;
  var button;
  
  if (props.button === "verticalButton") {
    if (props.disabled === true) {
      console.log(props.disabled)
      button = <Fab disabled={true} color="primary" variant="extended"
        className={classes.verticalButton} onClick={props.onClick} >
        {props.text}
        {props.icon}
      </Fab>
    }
    else {
      button = <Fab color="primary" aria-label="Add" variant="extended"
        className={classes.verticalButton} onClick={props.onClick} >
        {props.text}
        {props.icon}
      </Fab>
    }

  } else if(props.button === "smallAddButton"){
    button = <Fab color="primary" aria-label="Add" variant="extended"
      className={classes.smallAddButton} onClick={props.onClick} >
      {props.text}
      {props.icon}
    </Fab>
    
  } 
  else {
    button = <Fab color="primary" aria-label="Add" variant="extended"
      className={classes.sizeButton} onClick={props.onClick} >
      {props.text}
      {props.icon}
    </Fab>
  }

  return (
    <Link to={props.link} style={{ textDecoration: 'none' }}>
      {button}
    </Link>
  );
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Button);