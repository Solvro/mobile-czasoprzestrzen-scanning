import React from 'react';
import TextField from '@material-ui/core/TextField';


function SearchField(props) {
    return (  
        
        <TextField
            style={{ }}
            placeholder={props.placeholder}
            fullWidth
            onChange={props.onChange}
            InputProps={props.inputprops}
            InputLabelProps={{
            shrink: true}}
            multiline
            rowsMax={props.rows}
            />
        
    );
}

export default SearchField;

