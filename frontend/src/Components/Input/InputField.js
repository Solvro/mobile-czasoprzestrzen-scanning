import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';


function SearchField(props) {
    return (  
        
        <TextField
            style={{ }}
            placeholder={props.placeholder}
            fullWidth
            onChange={()=> console.log("Changed!")}
            InputProps={props.inputprops}
            InputLabelProps={{
            shrink: true}}
            multiline
            rowsMax={props.rows}
            />
        
    );
}

export default SearchField;

