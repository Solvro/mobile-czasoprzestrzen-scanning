import React from 'react';
import Table from './Table';
import TextButton from '../Button/TextButton';
import "./TableStyle.css" 

function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","Username","E-mail","Numer telefonu", "Super-admin", "Usuń"];
  var rows = props.contains;
   
  return (
    <div className='SmallTableMargin'>
    <div style={{marginBottom: '0.5em'}}>Administratorzy </div>
      <Table header={header} row={rows} height='small'/>
      <div style={{float: 'right'}}><TextButton link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></TextButton></div>
    </div>
  );
  
}

export default ClientTable;