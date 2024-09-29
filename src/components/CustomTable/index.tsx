import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { fadeInUpVariant, rowVariant } from '@/animations';
import { visuallyHidden } from '@mui/utils';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Tooltip,
  type TableCellProps,
  type TableProps,
} from '@mui/material';

export interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
  defaultSort?: boolean;
  tooltipText?: string; // New property for tooltip text
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
  paginated?: boolean;
  itemsPerPage?: number;
}

const CustomTable = ({
  columns,
  data,
  customKey,
  paginated = false,
  itemsPerPage = 25,
  ...rest
}: CustomTableProps): JSX.Element => {
  const defaultSortColumn = columns.find(column => column.defaultSort && column.sortable);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    defaultSortColumn ? { key: defaultSortColumn.field, direction: 'asc' } : null,
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTableTop = useCallback((): void => {
    tableContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (defaultSortColumn) {
      setSortConfig({ key: defaultSortColumn.field, direction: 'asc' });
    }
  }, [defaultSortColumn]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
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
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    return rowsPerPage > 0
      ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : sortedData;
  }, [sortedData, page, rowsPerPage]);

  const handleSort = useCallback(
    (field: string) => {
      if (sortConfig?.key === field) {
        setSortConfig({ key: field, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
      } else {
        setSortConfig({ key: field, direction: 'asc' });
      }
    },
    [sortConfig],
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
      scrollToTableTop();
    },
    [scrollToTableTop],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      setRowsPerPage(value);
      setPage(0);
      scrollToTableTop();
    },
    [scrollToTableTop],
  );

  const totalRows = sortedData.length;
  const showPagination = paginated && data.length > itemsPerPage;
  const availableRowsPerPageOptions = [25, 50, 100, 250, 500].filter(option => option <= totalRows);

  const renderTableHeader = () => (
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
            {column.tooltipText ? (
              <Tooltip title={column.tooltipText} placement="top">
                <span>
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
                </span>
              </Tooltip>
            ) : column.sortable ? (
              <TableSortLabel
                active={sortConfig?.key === column.field}
                direction={sortConfig?.key === column.field ? sortConfig.direction : 'asc'}
                onClick={() => handleSort(column.field)}
              >
                {column.headerName}
                {sortConfig?.key === column.field && (
                  <Box component="span" sx={visuallyHidden}>
                    {sortConfig.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  );

  const renderTableBody = () => (
    <TableBody>
      {paginatedData.map((row, rowIndex) => (
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
  );

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
      <TableContainer component={Paper} ref={tableContainerRef}>
        <Table sx={{ overflow: 'hidden' }} {...rest}>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[...availableRowsPerPageOptions, { label: 'All', value: -1 }]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            rowsPerPage === -1
              ? `Showing all ${count} rows`
              : `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
      )}
    </Box>
  );
};

export default CustomTable;
