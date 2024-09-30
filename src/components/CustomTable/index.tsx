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
  sortBy?: string | number | null; // Value used for sorting, if different from render
}

// Row interface defines the structure of a data row
export interface Row {
  [key: string]: Cell; // A row contains multiple cells, keyed by the column field
}

type ItemsPerPageOptions = 25 | 50 | 100 | 150 | 250 | 500 | -1;

// Props for the CustomTable component
export interface CustomTableProps
  extends Omit<HTMLMotionProps<'table'>, keyof TableProps>,
    TableProps {
  columns: Column[]; // Array of columns to render
  data: Row[]; // Array of rows to display in the table
  customKey: string; // Unique key for motion animations
  paginated?: boolean; // Whether the table is paginated
  itemsPerPage?: ItemsPerPageOptions; // Number of items to display per page (default is 50)
}

const CustomTable = ({
  columns,
  data,
  customKey,
  paginated = false,
  itemsPerPage = 50,
  ...rest
}: CustomTableProps): JSX.Element => {
  const defaultSortColumn = columns.find(column => column.defaultSort && column.sortable);

  // State for the current sort configuration
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    defaultSortColumn ? { key: defaultSortColumn.field, direction: 'asc' } : null,
  );
  const [page, setPage] = useState(0); // Current page number for pagination
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage); // Number of rows to display per page

  // Refs
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Helper function to scroll to the top of the table
  const scrollToTableTop = useCallback((): void => {
    tableContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Update the sortConfig state when the default sort column is changed
  // Only set the default sorting when the component first mounts
  useEffect(() => {
    if (defaultSortColumn && isFirstRender.current) {
      setSortConfig({ key: defaultSortColumn.field, direction: 'asc' });
      isFirstRender.current = false; // Set to false after the initial mount
    }
  }, [defaultSortColumn]);

  const totalRows = data.length; // Total number of rows from data

  useEffect(() => {
    // List of valid per-page options
    const availableRowsPerPageOptions: Partial<ItemsPerPageOptions[]> = [
      25, 50, 100, 150, 250, 500,
    ];

    // If the current rowsPerPage exceeds totalRows, find the closest available option
    if (rowsPerPage > totalRows && rowsPerPage !== -1) {
      const closestAvailableOption =
        availableRowsPerPageOptions.find(option => option! <= totalRows) || 25;
      setRowsPerPage(closestAvailableOption);
      setPage(0); // Reset to the first page
    }
  }, [totalRows, rowsPerPage]);

  // Memoize sorted data to avoid recalculating on every render
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    setPage(0); // Reset to the first page

    return [...data].sort((a, b) => {
      let aValue: string | number | JSX.Element | null =
        a[sortConfig.key].sortBy ?? a[sortConfig.key].render;
      let bValue: string | number | JSX.Element | null =
        b[sortConfig.key].sortBy ?? b[sortConfig.key].render;

      // Treat "-" as undefined or null (no value)
      if (aValue === '-') aValue = null;
      if (bValue === '-') bValue = null;

      // Handle null or undefined values: move them to the top for ascending order and bottom for descending order
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;

      // Regular comparison for strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Regular comparison for numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig]);

  // Memoize paginated data to only recalculate when relevant state changes
  const paginatedData = useMemo(() => {
    // If pagination is disabled, return the full sortedData
    if (!paginated) {
      return sortedData;
    }

    // Otherwise, apply pagination logic
    return rowsPerPage > 0
      ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : sortedData;
  }, [sortedData, page, rowsPerPage, paginated]);

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

      // Ensure that value is one of the valid numbers (25, 50, 100, 150, 250, 500, -1)
      if ([25, 50, 100, 150, 250, 500, -1].includes(value)) {
        const validValue = value as ItemsPerPageOptions; // Type assertion to ensure TypeScript understands this is valid

        setRowsPerPage(validValue);
        setPage(0);

        // Delay the scroll to ensure the table re-renders with the correct number of rows before scrolling
        setTimeout(scrollToTableTop, 100); // Delay slightly to ensure rendering is complete
      }
    },
    [scrollToTableTop],
  );

  const showPagination = paginated && totalRows > itemsPerPage; // Whether to show pagination
  const availableRowsPerPageOptions = [25, 50, 100, 150, 250, 500].filter(
    option => option <= totalRows,
  ); // Filter rowsPerPage options based on data length

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
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={rowVariant}
          sx={{ cursor: 'pointer' }}
        >
          {columns.map(column => {
            const { render, sortBy, ...cellProps } = row[column.field]; // eslint-disable-line

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
