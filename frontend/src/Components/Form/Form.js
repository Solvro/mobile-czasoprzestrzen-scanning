import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

import './AddForm.css';

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

function Form(props) {

    const {classes} = props;


    return (
      <Paper>
      <form autoComplete="off" className='FormField'>
        {props.header}
        <FormControl className={classes.formControl}>

          {React.Children.map(props.children, child =>
            <div class='wrapper'>{child}</div>
          )}

        </FormControl>

        <div className='buttonPosition'>
          {props.button}
        </div>

      </form>
      </Paper>
    );

}
Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);