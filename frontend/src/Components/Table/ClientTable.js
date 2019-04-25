import React from 'react';
import Table from './Table';


function ClientTable (props) {

  const header = [
    "Nr",
    "Nazwa użytkownika", 
    "Imię i nazwisko",
    "E-mail",
    "Numer telefonu", 
    "Firma",
  //  "Wiadomość", 
    "Usuń"
  ];
  var rows = props.contains;

  return (
      <Table header={header} row={rows} height={"700px"}/>
  );
  
}

export default ClientTable;
