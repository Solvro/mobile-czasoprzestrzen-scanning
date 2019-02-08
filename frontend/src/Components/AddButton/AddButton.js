import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import './AddButton.css';

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

function addButton(props) {
    const { classes } = props;

    return (

        <div className='AddButtonPosition'>
        
        <Fab color="primary" aria-label="Add" variant="extended" onClick={() => console.log("Add button clicked!")} >
            Dodaj
          <AddIcon />
        </Fab>
        </div>
    );
}

addButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(addButton);