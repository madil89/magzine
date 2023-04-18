import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Switch } from '@mui/material';

export default function UserTable({ users, handleAdminChange }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell align="right">Display Name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.uid}
              </TableCell>
              <TableCell align="right">{row.displayName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Switch onChange={(e) => handleAdminChange(row.uid, e.target.checked)} checked={row.customClaims?.admin} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  handleAdminChange: PropTypes.func.isRequired,
};
