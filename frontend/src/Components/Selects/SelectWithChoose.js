import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import {addNewItemType} from "../../services/itemsService";
import Dialog from '../../Components/Dialog/InputDialog';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    display: 'block',
  },
  formControl: {
    width: '90%',
    minWidth: 50,
  },
  iconAdd:{
    marginLeft: '0.3em'
  }
});

class ControlledOpenSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        typeName: '',
        dialogOpen: false,
        open: false,
        chosen: ''
    };
}


handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogCloseRefuse = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogCloseAgree = () => {
    this.setState({ dialogOpen: false });
    addNewItemType(this.state.typeName);
    this.props.action();
    this.forceUpdate();
  };

  handleChangeType = event => {
    this.setState({ typeName: event.target.value });
  }


handleChange = chosen => event => {
  this.setState({ [chosen]: event.target.value });
  this.props.onChange(event);
 
};


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const {classes} = this.props;
    
    
    return (
        <div>
        <FormControl className={classes.formControl}>
          <NativeSelect
            className={classes.selectEmpty}
            value={this.state.chosen}
            // onChange={this.props.onChange}
            onChange={this.handleChange('chosen')}>

            <option value='' disabled>
              Wybierz typ
            </option>
            {this.props.itemTypes.map(
              (data) => /*option key={i} value={i}>{itemType}</option>*/
              <option key={data.id} value={data.id}>{data.type_name}</option>
              )}
          </NativeSelect>
        </FormControl>
        <IconButton aria-label="Add an alarm" className={classes.iconAdd} onClick={this.handleDialogOpen}>
          <Icon>add</Icon></IconButton>
      <Dialog dialogOpen={this.state.dialogOpen} handleCloseRefuse={this.handleDialogCloseRefuse} 
      handleCloseAgree={() =>  {this.handleDialogCloseAgree()}} handleChangeType={this.handleChangeType}>
      </Dialog>
      </div>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);