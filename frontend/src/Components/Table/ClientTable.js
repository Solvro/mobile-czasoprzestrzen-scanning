import React, { Component } from 'react';

import Table from './Table';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// const CustomTableCell = withStyles(theme => ({
//     head: {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

// const styles = theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing.unit * 3,
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 700,
//     },
//     row:{
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.primary.light,
//     },
//     },
//     button: {
//       '&:hover': {
//          background: 'transparent',
//       }
//     },
//     input: {
//       display: 'none',
//     },
//   });

// let id = 0;
// function createData(name, email, phoneNumebr, company) {
//   id += 1;
//   return { id, name, email, phoneNumebr, company};
// }

// const rows = [
//   createData('Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>),
//   createData('Basia Banaszak', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Mateusz Walczak', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>),
//   createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
//   createData('Jakub Gogola', 'a@a.com', '888888888', <Icon>clear</Icon>),
// ];

// const table = ( props ) => {
//     const { classes } = props;

//     return (
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <CustomTableCell align="left">Nr</CustomTableCell>
//             <CustomTableCell align="center">Imię i nazwisko</CustomTableCell>
//             <CustomTableCell align="center">E-mail</CustomTableCell>
//             <CustomTableCell align="center">Numer telefonu</CustomTableCell>
//             <CustomTableCell align="center">Firma</CustomTableCell>
//             <CustomTableCell align="center">Wiadomość</CustomTableCell>
//             <CustomTableCell align="center">Usuń</CustomTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id} className={classes.row}>
//               <TableCell component="th" scope="row">
//                 {row.id}
//               </TableCell>
//               <TableCell hover={true} align="center">{row.name}</TableCell>
//               <TableCell hover={true} align="center">{row.email}</TableCell>
//               <TableCell hover={true} align="center">{row.phoneNumebr}</TableCell>
//               <TableCell hover={true} align="center">{row.company}</TableCell>
//               <TableCell hover={true} align="center">
//                   <IconButton className={classes.button} aria-label="Delete">
//                     <Icon>message</Icon>
//                   </IconButton>
//               </TableCell>
//               <TableCell hover={true} align="center">
//                   <IconButton className={classes.button} aria-label="Delete">
//                     <DeleteIcon />
//                   </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     );
// };

// table.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

// export default withStyles(styles)(table);

function ClientTable (props) {

  const header = ["Nr","Imię i nazwisko","E-mail","Numer telefonu", "Firma","Wiadomość", "Usuń"];
  var rows = []

  for(var i=0; i < 10; i++){
      rows.push([i,'Jakub Gogola', 'a@a.com','888888888', <Icon>clear</Icon>,
      <IconButton /*className={classes.button}*/ aria-label="Delete">
        <Icon>message</Icon>
      </IconButton>,
      <IconButton /*className={classes.button}*/ aria-label="Delete">
        <DeleteIcon />
      </IconButton>]);
  }
   console.log("HEad "+header);
   console.log("rows "+rows);
  return (
      <Table header={header} row={rows}/>
  );
  
}

export default ClientTable;
