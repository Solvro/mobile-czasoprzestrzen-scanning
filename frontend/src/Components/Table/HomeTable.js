import React from 'react';
import Table from './Table';

function HomeTable (props) {

    const header = ["Nr","Nazwa","Typ","Dostępność", "Usuń", "Edycja"];
    var rows = props.contains;    


    return (
        <Table header={header} row={rows} />
    );
    
}

export default HomeTable;