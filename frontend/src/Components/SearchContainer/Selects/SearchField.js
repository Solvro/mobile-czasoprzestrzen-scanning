import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Aux from '../../../hoc/Aux';
import SearchIcon from '@material-ui/icons/Search';
import '../Search.css';

class SearchField extends Component {

    render () {
        return (
            <Aux>
                <div className='SearchField'> 
                <TextField
                    style={{ }}
                    placeholder="Wyszukaj po nazwie..."
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                }}/>
                </div>
            </Aux>
        )
    }
}

export default SearchField;