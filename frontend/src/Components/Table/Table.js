import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const CustomTableCell = withStyles(theme => ({
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
  });


// funkcja table przyjmuje w props parametry header(tablica nagłówków w tabeli) 
// oraz row(dwuwymiarowa tablica zawartości tabeli)
function table ( props ) {
    const { classes } = props;

    let header = [];
    let body = [];
    
    for (var i = 0; i < props.header.length ; i++){
      header.push(<CustomTableCell align='center'> {props.header[i]} </CustomTableCell>);
    }
    for (var j = 1; j < props.row.length ; j++){
      let children = [];
      for (i = 0; i < props.header.length ; i++){
          children.push(<CustomTableCell align='center'> {props.row[j][i]} </CustomTableCell>);
        }
      body.push(<TableRow key={props.row[j].id} className={classes.row} >{children}</TableRow>);
      
    }

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {body}
        </TableBody>
      </Table>
    );
};

table.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(table);