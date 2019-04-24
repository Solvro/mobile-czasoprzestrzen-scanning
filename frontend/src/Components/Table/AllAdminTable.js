import React from 'react';
import Table from './Table';
import "./TableStyle.css" 

function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","Username","E-mail","Numer telefonu", "Super-admin", "Usuń"];
  var rows = props.contains;
   
  return (
    <div className='SmallTableMargin'>
      <Table header={header} row={rows} height='small'/>
    </div>
  );
  
}

export default ClientTable;