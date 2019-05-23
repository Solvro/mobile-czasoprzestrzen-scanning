import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';

function AlertDialog (props) {

    return (
      <div>
        
          <Dialog
            open={props.dialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title"  style={{backgroundColor: "#ebf3f9"}}>
                  {props.message}
              </DialogTitle>
              <div style={{padding: "20px"}}>
                <p> Nazwa: {props.bussinessData.name==null ? "brak" : props.bussinessData.name} </p>
                <p> NIP: {props.bussinessData.nip==null ? "brak" : props.bussinessData.nip} </p>
                <p> Regon: {props.bussinessData.regon==null ? "brak" : props.bussinessData.regon} </p>
                
                <Button onClick={props.handleClose} color="primary"> zamknij </Button>
              </div>
          </Dialog>
      </div>
    );
  
}

export default AlertDialog;
