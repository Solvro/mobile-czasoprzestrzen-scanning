import React from 'react';

import Table from './Table';


function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","E-mail","Numer telefonu", "Firma", "Zaakceptuj", "Odrzuć"];
  var rows = props.contains;
   
  return (
      <Table header={header} row={rows} height={"400px"}/>
  );
  
}

export default ClientTable;
