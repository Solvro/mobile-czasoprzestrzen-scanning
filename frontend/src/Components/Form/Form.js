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
  paper: {
    marginBottom: 100
  }
});

function Form(props) {

    const {classes} = props;


    return (
      <Paper className={classes.paper}>
      <form autoComplete="off" className='FormField' onKeyDown={props.onKeyDown} onSubmit={props.onSubmit}>
        {props.header}
        <FormControl className={classes.formControl}>

          {React.Children.map(props.children, child =>
            <div className='wrapper'>{child}</div>
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