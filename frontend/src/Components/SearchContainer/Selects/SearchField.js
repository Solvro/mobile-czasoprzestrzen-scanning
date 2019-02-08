import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import '../Search.css';

class SearchField extends Component {

    render () {
        return (
                <div className='SearchField'> 
                <TextField
                    style={{ }}
                    placeholder="Wyszukaj po nazwie..."
                    fullWidth
                    onChange={()=> console.log("Changed!")}
                    InputLabelProps={{
                    shrink: true,
                }}/>
                </div>
        )
    }
}

export default SearchField;