import React from 'react';

import './Search.css';
import Layout from '../Layout/Layout';
import SearchField from '../Input/InputField';
import Select from '../Selects/Select';


function SearchContainerWithSelect(props) {

    var onSearchFieldChange = (e) =>{
        props.onChange("name", e.target.value)
    }

    var onSelectChange = (e) =>{
        props.onChange("type", e.target.value)
    }

    const left = <div className='SearchField'> 
                    <SearchField placeholder={props.placeholder} onChange={onSearchFieldChange} rows={props.rows} onKeyDown={props.onKeyDown}/>
                </div>;

    const right =  <Select itemTypes={props.itemTypes} onChange={onSelectChange} />
        return (
            <div className='SearchContent'>
                <Layout layoutDivide={"66"} leftChildren={left} rightChildren={right}></Layout>
            </div>
        );
    
}

export default SearchContainerWithSelect;