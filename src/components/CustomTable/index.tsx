import { useState, useEffect } from 'react';
// types
import { type HTMLMotionProps, motion } from 'framer-motion';
// helpers
import { fadeInUpVariant, rowVariant } from '@/animations';
import { visuallyHidden } from '@mui/utils';
// components
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type TableCellProps,
  type TableProps,
  TableSortLabel,
} from '@mui/material';

export interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
  defaultSort?: boolean;
}

export interface Cell extends Omit<TableCellProps, 'children'> {
  render: string | number | JSX.Element;
  sortBy?: string | number;
}

export interface Row {
  [key: string]: Cell;
}

export interface CustomTableProps
  extends Omit<HTMLMotionProps<'table'>, keyof TableProps>,
    TableProps {
  columns: Column[];
  data: Row[];
  customKey: string;
}

const CustomTable = ({ columns, data, customKey, ...rest }: CustomTableProps): JSX.Element => {
  const defaultSortColumn = columns.find(column => column.defaultSort && column.sortable);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    defaultSortColumn ? { key: defaultSortColumn.field, direction: 'asc' } : null,
  );

  useEffect(() => {
    if (defaultSortColumn) {
      setSortConfig({ key: defaultSortColumn.field, direction: 'asc' });
    }
  }, [defaultSortColumn]);

  const handleSort = (field: string) => {
    if (sortConfig?.key === field) {
      setSortConfig({ key: field, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key: field, direction: 'asc' });
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key].sortBy ?? a[sortConfig.key].render;
    const bValue = b[sortConfig.key].sortBy ?? b[sortConfig.key].render;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      key={customKey}
      sx={{ width: '100%' }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ overflow: 'hidden' }} {...rest}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.field}
                  sx={theme => ({
                    whiteSpace: 'nowrap',
                    cursor: column.sortable ? 'pointer' : 'default',
                    '&:hover': column.sortable
                      ? {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.getContrastText(theme.palette.primary.light),
                        }
                      : {},
                  })}
                  onClick={column.sortable ? () => handleSort(column.field) : undefined}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.key === column.field}
                      direction={sortConfig?.key === column.field ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                      {sortConfig?.key === column.field && (
                        <Box component="span" sx={visuallyHidden}>
                          {sortConfig.direction === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      )}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                component={motion.tr}
                whileHover="hover"
                whileTap="tap"
                variants={rowVariant}
                sx={{ cursor: 'pointer' }}
              >
                {columns.map(column => {
                  const { render, ...cellProps } = row[column.field];

                  return (
                    <TableCell key={column.field} {...cellProps}>
                      {render}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
