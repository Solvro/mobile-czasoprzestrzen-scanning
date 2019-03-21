import React from 'react';

import './Search.css';
import Layout from '../Layout/Layout';
import SearchField from '../Input/InputField';
import Select from '../Selects/Select';


function SearchContainerWithSelect(props) {

    const left = <div className='SearchField'> 
            <SearchField placeholder={props.placeholder} /></div>;

    const right =  <Select />
        return (
            <div className='SearchContent'>
                <Layout layoutDivide={"66"} leftChildren={left} rightChildren={right}></Layout>
            </div>
        );
    
}

export default SearchContainerWithSelect;