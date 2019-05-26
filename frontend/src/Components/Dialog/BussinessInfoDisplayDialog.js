import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, DialogContent, DialogActions} from '@material-ui/core';

function AlertDialog (props) {

    return (
      <div>
        
          <Dialog
            open={props.dialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth="fullWidth"
            maxWidth="sm"
          > 
              <DialogTitle id="alert-dialog-title"  style={{backgroundColor: "#e6edff"}}>
                  {props.message}
              </DialogTitle>
              <DialogContent>
                  <p> Nazwa: {props.bussinessData.name==null ? "brak" : props.bussinessData.name} </p>
                  <p> NIP: {props.bussinessData.nip==null ? "brak" : props.bussinessData.nip} </p>
                  <p> Regon: {props.bussinessData.regon==null ? "brak" : props.bussinessData.regon} </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary"> zamknij </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
  
}

export default AlertDialog;
