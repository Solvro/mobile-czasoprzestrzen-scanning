import React from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import styles from  '../Styles/materialStyles';

import './AddButton.css';

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
      height: '5em'
    }
  });

function Button(props) {
  const { classes } = props;
    return (  
      <Link to={props.link}>
      <Fab color="primary" aria-label="Add" variant="extended" className={classes.sizeButton} onClick={() => console.log("Add button clicked!")} >
          {props.text}
        <AddIcon />
      </Fab>
      </Link>
    );
}

Button.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Button);