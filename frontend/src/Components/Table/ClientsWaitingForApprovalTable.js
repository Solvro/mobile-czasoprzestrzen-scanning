import React from 'react';

import Table from './Table';
import DeleteIcon from '@material-ui/icons/Delete';
import ApproveIcon from '@material-ui/icons/Done';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","E-mail","Numer telefonu", "Firma","Wiadomość", "Zaakceptuj", "Odrzuć"];
  var rows = []

  for(var i=0; i < 10; i++){
      rows.push([i,'Jeicam Kujdah', 'a@a.com','888888888', <Icon>clear</Icon>,
      <IconButton /*className={classes.button}*/ aria-label="Message">
        <Icon>message</Icon>
      </IconButton>,
      <IconButton /*className={classes.button}*/ aria-label="Approve">
        <ApproveIcon />
      </IconButton>,
      <IconButton /*className={classes.button}*/ aria-label="Delete">
        <DeleteIcon />
      </IconButton>]);
  }
   
  return (
      <Table header={header} row={rows}/>
  );
  
}

export default ClientTable;
