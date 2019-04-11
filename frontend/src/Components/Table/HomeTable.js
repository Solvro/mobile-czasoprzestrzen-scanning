import React from 'react';
import Table from './Table';

function HomeTable (props) {

    const header = ["Nr","Nazwa","Typ","Dostępność", "Edytuj", "Usuń"];
    var rows = props.contains;

    // for(var i=0; i < 20; i++){
    //     rows.push([i,"Mikrofon XYZ", "mikrofon",<Icon>done</Icon>,
    //     <IconButton /*className={classes.button}*/ aria-label="Delete">
    //         <Icon>edit</Icon>
    //     </IconButton> ,
    //     <IconButton /*className={classes.button}*/ aria-label="Delete">
    //         <DeleteIcon />
    //     </IconButton>]);
    // }
     
    return (
        <Table header={header} row={rows} height={"700px"}/>
    );
    
}

export default HomeTable;