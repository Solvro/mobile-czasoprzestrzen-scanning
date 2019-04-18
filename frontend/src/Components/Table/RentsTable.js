import React from 'react';
import Table from './Table';


function RentsTable (props) {

  const header = ["Nr","Nazwa","Wypożyczający","Data Wypożyczenia", "Data zwrotu", "Gdzie"];
  var rows = props.contains;
   
  return (
      <Table header={header} row={rows} height={"700px"}/>
  );
  
}

export default RentsTable;
