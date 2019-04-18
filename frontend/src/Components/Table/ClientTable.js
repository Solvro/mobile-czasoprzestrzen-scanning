import React from 'react';

import Table from './Table';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","E-mail","Numer telefonu", "Firma","Wiadomość", "Usuń"];
  var rows = props.contains;
 
  // for(var i=0; i < 20; i++){
  //     rows.push([i,'Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>,
  //     <IconButton aria-label="Delete">
  //       <Icon>message</Icon>
  //     </IconButton>,
  //     <IconButton aria-label="Delete">
  //       <DeleteIcon />
  //     </IconButton>]);
  // }
   
  return (
      <Table header={header} row={rows} height={"700px"}/>
  );
  
}

export default ClientTable;
