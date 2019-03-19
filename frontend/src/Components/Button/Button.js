import React from 'react';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

import './Button.css';


function Button(props) {
    return (  
      <Link to={props.link}>
      <Fab color="primary" aria-label="Add" variant="extended" className="buttonSize" onClick={props.onClick} >
          {props.text}
          {props.icon}
      </Fab>
      </Link>
    );
}


export default (Button);