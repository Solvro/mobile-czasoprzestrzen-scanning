import React from 'react';
import Table from './Table';

function HomeTable (props) {

    const header = ["Nr","Nazwa","Typ","Dostępność", "Edytuj", "Usuń"];
    var rows = props.contains;
     
    return (
        <Table header={header} row={rows} height={"700px"}/>
    );
    
}

export default HomeTable;