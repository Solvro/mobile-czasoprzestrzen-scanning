import React from 'react';
import Table from './Table';


function RentsTable (props) {

  const header = props.header;
  const rows = props.rows;
   
  return (
      <Table header={header} row={rows} />
  );
  
}

export default RentsTable;
