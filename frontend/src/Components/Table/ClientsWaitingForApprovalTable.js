import React from 'react';
import Table from './Table';
import "./TableStyle.css" 

function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","E-mail","Numer telefonu", "Firma", "Zaakceptuj", "Odrzuć"];
  var rows = props.contains;
   
  return (
    <div className='BigTableMargin'>
    <div style={{marginBottom: '0.5em'}}>Klienci do zaakceptowania</div>
      <Table header={header} row={rows} height='small'/>
    </div>
  );
  
}

export default ClientTable;
