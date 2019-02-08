import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import '../Search.css';

class SearchField extends Component {

    render () {
        return (
                <div className='SearchField'> 
                <TextField
                    style={{ }}
                    placeholder="Wyszukaj po nazwie..."
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                }}/>
                </div>
        )
    }
}

export default SearchField;