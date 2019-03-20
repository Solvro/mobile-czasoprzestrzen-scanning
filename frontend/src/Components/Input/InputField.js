import React from 'react';
import TextField from '@material-ui/core/TextField';


function SearchField(props) {
    return (  
        <div>
        <div class='normalText'>{props.label} </div>
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
        </div>
    );
}

export default SearchField;

