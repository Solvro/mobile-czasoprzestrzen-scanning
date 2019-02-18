import React from 'react';
import {Link} from 'react-router-dom';
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
      marginLeft: theme.spacing.unit,
    },
  });

function addButton(props) {
    return (

        <div className='AddButtonPosition'>
        <Link to="/adds">
        <Fab color="primary" aria-label="Add" style={{height: 60, width: 150}}  variant="extended" onClick={() => console.log("Add button clicked!")} >
            Dodaj
          <AddIcon />
        </Fab>
        </Link>
        </div>
    );
}

addButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(addButton);