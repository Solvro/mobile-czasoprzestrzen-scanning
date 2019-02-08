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
function createData(name, type, availibility, delete1, edit) {
  id += 1;
  return { id, name, type, availibility, delete1, edit};
}

const rows = [
  createData('Mikrofon XYZ', 'mikrofon',<Icon >done</Icon>, 24, 4.0,2),
  createData('Głośnik bardzo głośny', 'głośnik', <Icon>clear</Icon>, 37, 4.3,2),
  createData('Przedłużacz czerwony', 'przedłużacz', <Icon>clear</Icon>, 24, 6.0,2),
  createData('Przedłużacz czerwony', 'przedłużacz', <Icon>clear</Icon>, 24, 6.0,2),
  createData('Przedłużacz czerwony', 'przedłużacz', <Icon>clear</Icon>, 24, 6.0,2),
  createData('Mikrofon XYZ', 'mikrofon',<Icon>done</Icon>, 24, 4.0,2),
  createData('Głośnik bardzo głośny', 'głośnik', <Icon>clear</Icon>, 37, 4.3,2),
  createData('Przedłużacz czerwony', 'przedłużacz', <Icon>clear</Icon>, 24, 6.0,2),
  createData('Przedłużacz czerwony', 'przedłużacz', <Icon>clear</Icon>, 24, 6.0,2),
];

const table = ( props ) => {
    const { classes } = props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="left">Nr</CustomTableCell>
            <CustomTableCell align="center">Nazwa</CustomTableCell>
            <CustomTableCell align="center">Typ</CustomTableCell>
            <CustomTableCell align="center">Dostępność</CustomTableCell>
            <CustomTableCell align="center">Edytuj</CustomTableCell>
            <CustomTableCell align="center">Usuń</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.row} >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.availibility}</TableCell>
              <TableCell align="center"><Icon>create</Icon></TableCell>
              <TableCell align="center"><DeleteIcon /></TableCell>
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