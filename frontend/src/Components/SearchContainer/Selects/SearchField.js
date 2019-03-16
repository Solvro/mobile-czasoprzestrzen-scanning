import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import '../Search.css';


function SearchField(props) {
    return (  
        
        <TextField
            style={{ }}
            placeholder={props.placeholder}
            fullWidth
            onChange={()=> console.log("Changed!")}
            InputLabelProps={{
            shrink: true,
        }}/>
        
    );
}

export default SearchField;

