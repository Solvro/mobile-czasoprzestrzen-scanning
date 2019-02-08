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
function createData(name, whorents, date1, date2, where) {
  id += 1;
  return { id, name, whorents, date1, date2,where};
}

const rows = [
  createData('Mikrofon XYZ', 'gogolix','11.12.2018', '22.01.2019', 'polibuda'),
  createData('Głośnik bardzo głośny', 'basza', '11.12.2018', '22.01.2019', 'polibuda'),
  createData('Przedłużacz czerwony', 'starzec', '11.12.2018', '22.01.2019', 'SKS sylwester'),
  createData('Przedłużacz czerwony', 'basza', '11.12.2018', '22.01.2019', 'polibuda'),
  createData('Przedłużacz czerwony', 'basza', '11.12.2018', '22.01.2019', 'polibuda'),
  createData('Mikrofon XYZ', 'gogolix','11.12.2018', '22.01.2019', 'polibuda'),
  createData('Głośnik bardzo głośny', 'gogolix', '11.12.2018', '22.01.2019', 'polibuda'),
  createData('Przedłużacz czerwony', 'wika ', '11.12.2018', '22.01.2019', 'polibuda'),
  createData('Przedłużacz czerwony', 'wika', '11.12.2018', '22.01.2019', 'polibuda'),
];

const table = ( props ) => {
    const { classes } = props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="left">Nr</CustomTableCell>
            <CustomTableCell align="center">Nazwa</CustomTableCell>
            <CustomTableCell align="center">Wypożyczający</CustomTableCell>
            <CustomTableCell align="center">Data Wypożyczenia</CustomTableCell>
            <CustomTableCell align="center">Data zwrotu</CustomTableCell>
            <CustomTableCell align="center">Gdzie</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.row}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell hover={true} align="center">{row.name}</TableCell>
              <TableCell hover={true} align="center">{row.whorents}</TableCell>
              <TableCell hover={true} align="center">{row.date1}</TableCell>
              <TableCell hover={true} align="center">{row.date2}</TableCell>
              <TableCell hover={true} align="center">{row.where}</TableCell>
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