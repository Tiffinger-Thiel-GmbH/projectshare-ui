import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

interface Column {
  key: string;
  name: string;
  sort: (isDescending: boolean) => void;
}

interface Row {
  key: string;
  values: Record<string, string>;
}

interface Props {
  columns: Column[];
  values: Row[];
  handleRowClick: (rowKey: any) => void;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    cursor: 'pointer'
  }
});

const sortRow = (row: Row, columns: Column[]) => {
  const valueKeys: string[] = Object.keys(row.values);
  const sortedValueKeys: string[] = [];

  const columnKeys = columns.map(column => column.key);

  valueKeys.forEach(vK => {
    sortedValueKeys[columnKeys.indexOf(vK)] = vK;
  });

  return sortedValueKeys;
};

export default function StringTable({ columns, values, handleRowClick }: Props) {
  const classes = useStyles();
  const [isDescending, setIsDescending] = useState(true);
  const [columnKeyToSortBy, setColumnKeyToSortBy] = useState('');

  const onSort = (column: Column) => {
    setIsDescending(prev => !prev);
    setColumnKeyToSortBy(column.key);
    column.sort(isDescending);
  };

  if (!columns || !values) {
    return <> NO COLUMNS </>;
  }
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={column.key === columnKeyToSortBy}
                    direction={isDescending ? 'desc' : 'asc'}
                    onClick={() => onSort(column)}
                  >
                    {column.name}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map(row => (
              <TableRow key={row.key} hover onClick={() => handleRowClick(row.key)}>
                {sortRow(row, columns).map(columnKey => (
                  <TableCell key={columnKey} component="th" scope="row">
                    {row.values[columnKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
