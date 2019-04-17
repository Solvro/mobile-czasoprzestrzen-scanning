import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog (props) {

    return (
      <div>
        <Dialog
          open={props.dialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {props.message}
          </DialogTitle>
          <DialogActions>
            <Button onClick={props.handleCloseRefuse} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleCloseAgree} color="primary" autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default AlertDialog;