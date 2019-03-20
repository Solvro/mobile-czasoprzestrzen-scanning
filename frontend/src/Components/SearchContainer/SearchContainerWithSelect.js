import React from 'react';

import './Search.css';
import Grid from '@material-ui/core/Grid';
import theme, {spacing} from '../../theme';
import SearchField from '../Input/InputField';
import Select from '../Selects/Select';


function SearchContainerWithSelect(props) {

        return (
                    <div className='SearchContent'>
                    <Grid container spacing={spacing}>
                        <Grid item xs={6}>
                            <div className='SearchField'> 
                                <SearchField placeholder={props.placeholder} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Select />
                        </Grid></Grid>
                    </div>
        );
    
}

export default SearchContainerWithSelect;