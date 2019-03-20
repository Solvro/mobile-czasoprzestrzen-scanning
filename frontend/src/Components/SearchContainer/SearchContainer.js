import React from 'react';

import './Search.css';
import Grid from '@material-ui/core/Grid';
import SearchField from '../Input/InputField';
import theme, {spacing} from '../../theme';

function SearchContainer (props) {

return (
    <div className='SearchContent'>
    <Grid container spacing={spacing}>
        <Grid item xs={6}>
            <div className='SearchField'> 
            <SearchField placeholder={props.placeholder} />
            </div>
        </Grid>
        <Grid item xs={6}>
        </Grid></Grid>
    </div>
);
}

export default SearchContainer;