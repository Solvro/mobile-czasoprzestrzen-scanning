import React from 'react';
import MaterialTooltip from "@material-ui/core/Tooltip/Tooltip";

function Tooltip(props){
    
    return (
        <MaterialTooltip title={props.title} enterDelay="400">
            {props.children}
        </MaterialTooltip>
    )
}
export default Tooltip