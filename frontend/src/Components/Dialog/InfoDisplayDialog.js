import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
            <p>
                {props.bussinessData.id}}
            </p>
        </Dialog>
      </div>
    );
  
}

export default AlertDialog;