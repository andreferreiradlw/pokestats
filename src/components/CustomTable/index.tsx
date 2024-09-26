// types
import { type HTMLMotionProps, motion } from 'framer-motion';
// helpers
import { fadeInUpVariant, rowVariant } from '@/animations';
// components
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type TableCellProps,
  type TableProps,
} from '@mui/material';

export interface Column {
  field: string;
  headerName: string;
}

export interface Cell extends Omit<TableCellProps, 'children'> {
  render: string | number | JSX.Element;
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
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      key={customKey}
    >
      <TableContainer component={Paper}>
        <Table sx={{ overflow: 'hidden' }} {...rest}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
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
    </motion.div>
  );
};

export default CustomTable;
