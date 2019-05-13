import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

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
              <Button onClick={props.handleClose}> exit</Button>
          </Dialog>
      </div>
    );
  
}

export default AlertDialog;