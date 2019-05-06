import React from 'react';

import './Search.css';
import SearchField from '../Input/InputField';
import Layout from '../Layout/Layout';

function SearchContainer (props) {

const left = <div className='SearchField'> 
              <SearchField placeholder={props.placeholder}  onChange={props.onChange} rows={props.rows} onKeyDown={props.onKeyDown}/>
             </div>;

var container = <div className='SearchContent'>
<Layout layoutDivide={"66"} leftChildren={left}></Layout>
</div>;

if(props.className){
    container = <div>
    <Layout layoutDivide={"66"} leftChildren={left}></Layout>
    </div>;
}

if(props.margin === "small"){
    container = <div className='SearchContentSmallMargin'>
            <Layout layoutDivide={"66"} leftChildren={left}></Layout>
        </div>
}

return (container);
}

export default SearchContainer;