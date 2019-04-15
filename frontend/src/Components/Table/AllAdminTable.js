import React from 'react';

import Table from './Table';


function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","Username","E-mail","Numer telefonu", "Super-admin", "Usuń"];
  var rows = props.contains;
   
  return (
      <Table header={header} row={rows} height={"250px"}/>
  );
  
}

export default ClientTable;