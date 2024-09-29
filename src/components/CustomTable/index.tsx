import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
// helpers
import { fadeInUpVariant, rowVariant } from '@/animations';
import { visuallyHidden } from '@mui/utils';
// components
import { type HTMLMotionProps, motion } from 'framer-motion';
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

// Column interface defines the structure of a column in the table
export interface Column {
  field: string;
  headerName: string;
  sortable?: boolean; // Whether the column can be sorted
  defaultSort?: boolean; // Whether this column is the default sorted column
  tooltipText?: string; // Tooltip text to display on hover
}

// Cell interface defines the structure of a cell in a row
export interface Cell extends Omit<TableCellProps, 'children'> {
  render: string | number | JSX.Element; // What is rendered in the cell
  sortBy?: string | number; // Value used for sorting, if different from render
}

// Row interface defines the structure of a data row
export interface Row {
  [key: string]: Cell; // A row contains multiple cells, keyed by the column field
}

// Props for the CustomTable component
export interface CustomTableProps
  extends Omit<HTMLMotionProps<'table'>, keyof TableProps>,
    TableProps {
  columns: Column[]; // Array of columns to render
  data: Row[]; // Array of rows to display in the table
  customKey: string; // Unique key for motion animations
  paginated?: boolean; // Whether the table is paginated
  itemsPerPage?: number; // Number of items to display per page (default is 25)
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

  // State for the current sort configuration
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    defaultSortColumn ? { key: defaultSortColumn.field, direction: 'asc' } : null,
  );
  const [page, setPage] = useState(0); // Current page number for pagination
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage); // Number of rows to display per page

  // Ref to the table container for scrolling to the top when page changes
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to scroll to the top of the table
  const scrollToTableTop = useCallback((): void => {
    tableContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Update the sortConfig state when the default sort column is changed
  useEffect(() => {
    if (defaultSortColumn) {
      setSortConfig({ key: defaultSortColumn.field, direction: 'asc' });
    }
  }, [defaultSortColumn]);

  // Memoize sorted data to avoid recalculating on every render
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

  // Memoize paginated data to only recalculate when relevant state changes
  const paginatedData = useMemo(() => {
    return rowsPerPage > 0
      ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : sortedData;
  }, [sortedData, page, rowsPerPage]);

  // Handler to manage sorting when a column is clicked
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

  // Handler to manage page change and scroll to the top
  const handleChangePage = useCallback(
    (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      scrollToTableTop();
    },
    [scrollToTableTop],
  );

  // Handler to change the number of rows per page and reset to the first page
  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);

      // Check if the user selected "All"
      if (value === -1) {
        setRowsPerPage(value);
        setPage(0);
        // Delay the scroll to ensure the table re-renders with all rows before scrolling
        setTimeout(scrollToTableTop, 0);
      } else {
        setRowsPerPage(value);
        setPage(0);
        scrollToTableTop();
      }
    },
    [scrollToTableTop],
  );

  const totalRows = sortedData.length; // Total number of rows after sorting
  const showPagination = paginated && data.length > itemsPerPage; // Whether to show pagination
  const availableRowsPerPageOptions = [25, 50, 100, 250, 500].filter(option => option <= totalRows); // Filter rowsPerPage options based on data length

  // Helper function to render the column label, with optional sorting and tooltip
  const renderColumnLabel = (column: Column) => {
    const columnLabel = column.sortable ? (
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
    );

    // If tooltipText is provided, wrap the label with Tooltip
    return column.tooltipText ? (
      <Tooltip title={column.tooltipText} placement="top">
        <span>{columnLabel}</span>
      </Tooltip>
    ) : (
      columnLabel
    );
  };

  // Renders the table header, including tooltips if provided
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
            {renderColumnLabel(column)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  // Renders the table body with the paginated data
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
      {/* TableContainer holds the table and makes it scrollable */}
      <TableContainer component={Paper} ref={tableContainerRef}>
        <Table sx={{ overflow: 'hidden' }} {...rest}>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </TableContainer>

      {/* Conditionally render pagination if applicable */}
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
