import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from './Button';

import './Button.css';

function AddButton(props) {
    return (  
      <Button link={props.link} onClick={props.onClick} text={props.text} mobile={props.mobile} icon={<AddIcon />} button={props.button}></Button>
    );
}


export default (AddButton);