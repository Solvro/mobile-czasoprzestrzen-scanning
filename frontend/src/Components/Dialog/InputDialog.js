import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import InputField from '../Input/InputField';

function AlertDialog (props) {

    return (
        <div>
        <Dialog
          open={props.dialogOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Dodaj nowy typ sprzętu</DialogTitle>
          <DialogContent>
          <InputField placeholder={"Nazwa typu"} rows={"1"} onChange={props.handleChangeType}>
            </InputField>

          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleCloseRefuse} color="primary">
              Anuluj
            </Button>
            <Button onClick={props.handleCloseAgree} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default AlertDialog;