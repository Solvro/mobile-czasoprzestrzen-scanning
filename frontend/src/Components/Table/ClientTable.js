import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

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
  });

let id = 0;
function createData(name, email, phoneNumebr, company) {
  id += 1;
  return { id, name, email, phoneNumebr, company};
}

const rows = [
  createData('Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>),
  createData('Basia Banaszak', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>),
  createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
  createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
];

const table = ( props ) => {
    const { classes } = props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="left">Nr</CustomTableCell>
            <CustomTableCell align="center">Imię i nazwisko</CustomTableCell>
            <CustomTableCell align="center">E-mail</CustomTableCell>
            <CustomTableCell align="center">Numer telefonu</CustomTableCell>
            <CustomTableCell align="center">Firma</CustomTableCell>
            <CustomTableCell align="center">Wiadomość</CustomTableCell>
            <CustomTableCell align="center">Usuń</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.row}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell hover={true} align="center">{row.name}</TableCell>
              <TableCell hover={true} align="center">{row.email}</TableCell>
              <TableCell hover={true} align="center">{row.phoneNumebr}</TableCell>
              <TableCell hover={true} align="center">{row.company}</TableCell>
              <TableCell hover={true} align="center"><Icon>message</Icon></TableCell>
              <TableCell hover={true} align="center"><DeleteIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
};

table.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(table);