import React from 'react';
import TextField from '@material-ui/core/TextField';


function SearchField(props) {
    if(props.type === "password") {
        return(
            <div>
            <div className='normalText'>{props.label} </div>
            <TextField
                type="password"
                placeholder={props.placeholder}
                fullWidth
                onChange={props.onChange}
                InputProps={props.inputprops}
                
               />
            </div>
        );
    }
    else {
    return ( 
        
            <div>
            <div className='normalText'>{props.label} </div>
            <TextField
                defaultValue = {props.defaultValue}
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
}

export default SearchField;

