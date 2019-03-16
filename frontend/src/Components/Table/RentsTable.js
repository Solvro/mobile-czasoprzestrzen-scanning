import React from 'react';
import Table from './Table';


function RentsTable (props) {

  const header = ["Nr","Nazwa","Wypożyczający","Data Wypożyczenia", "Data zwrotu", "Gdzie"];
  var rows = []

  for(var i=0; i < 10; i++){
      rows.push([i,'Mikrofon XYZ', 'gogolix','11.12.2018', '22.01.2019', 'polibuda']);
  }
   
  return (
      <Table header={header} row={rows}/>
  );
  
}

export default RentsTable;
