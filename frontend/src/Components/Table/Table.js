import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactTableContainer from "react-table-container";

const CustomTableCell = withStyles(theme => ({
    root: {
      padding: 10
    },
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    
  }))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      overflowY: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    button: {
      '&:hover': {
        background: 'transparent',
      }
    },
    input: {
      display: 'none',
    },
    blankTable: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit * 3,
    }
  });

 
function table (props) {
  const { classes } = props;

    let header = [];
    let body = [];
    
    for (var i = 0; i < props.header.length ; i++){
      header.push(<CustomTableCell key={1000+i} align='center'> {props.header[i]} </CustomTableCell>);
    }
    for (var j = 0; j < props.row.length ; j++){
      let children = [];
      for (i = 0; i < props.header.length ; i++){
          children.push(<CustomTableCell key={1020+i} align='center'> {props.row[j][i]} </CustomTableCell>);
        }
      body.push(<TableRow key={j} className={classes.row} >{children}</TableRow>);  
    }

    if(props.row.length === 0){
      body.push(<div key={1} className={classes.blankTable}> Brak rekordów </div>);
    }
  if(props.height === 'small'){
    return (
      <ReactTableContainer width="100%" height='250px' customHeader={[TableHead]} >
      <Table >
        <TableHead>
          <TableRow>
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {body}
        </TableBody>
      </Table>
      </ReactTableContainer>
);
  }
  else{
    return (
      <ReactTableContainer width="100%" style={{marginBottom:"70px"}} height='auto' customHeader={[TableHead]} >
      <Table >
        <TableHead>
          <TableRow>
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {body}
        </TableBody>
      </Table>
      </ReactTableContainer>
);
  }
  
}

table.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(table);