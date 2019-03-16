import React, { Component } from 'react';

import Table from './Table';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

function HomeTable (props) {

    const header = ["Nr","Nazwa","Typ","Dostępność", "Edytuj", "Usuń"];
    var rows = []

    for(var i=0; i < 10; i++){
        rows.push([i,"Mikrofon XYZ", "mikrofon",<Icon>done</Icon>,
        <IconButton /*className={classes.button}*/ aria-label="Delete">
            <Icon>edit</Icon>
        </IconButton> ,
        <IconButton /*className={classes.button}*/ aria-label="Delete">
            <DeleteIcon />
        </IconButton>]);
    }
     
    return (
        <Table header={header} row={rows}/>
    );
    
}

export default HomeTable;