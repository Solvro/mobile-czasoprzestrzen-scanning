import React from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
// import styles from './styleButton';
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
  styleButton: {
    'width': '15em',
    'height': '5em',
    display: 'block',
    'margin': '20px',
    
  }
});

function AdminButton(props) {
  const { classes } = props;
    return (  
      <Link to={props.link}>
      <Fab color="primary" aria-label="Add" variant="extended" className={classes.styleButton} onClick={props.onClick} >
          {props.text}
          {props.icon}
      </Fab>
      </Link>
    );
}

AdminButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AdminButton);