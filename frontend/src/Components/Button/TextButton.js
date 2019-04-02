import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: '1em'
  },
  input: {
    display: 'none',
  },
});

function TextButton(props) {
  const { classes } = props;
  return (
    <div>
      <Link to={props.link}>
      <Button size="small" className={classes.button} onClick={props.onClick} >{props.text}</Button>
      </Link>
    </div>
  );
}

TextButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButton);