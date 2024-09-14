import { fadeInUpVariant, rowVariant } from '@/animations';
// components
import type { TableCellProps, TableProps } from '@mui/material';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';

interface Column {
  field: string;
  headerName: string;
}

interface Cell extends Omit<TableCellProps, 'children'> {
  render: string | number | JSX.Element;
}

interface Row {
  [key: string]: Cell;
}

export interface CustomTableProps extends TableProps {
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
      style={{ width: '100%' }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ overflow: 'hidden' }} {...rest}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field} align="center">
                  {column.headerName}
                </TableCell>
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
                    <TableCell key={column.field} align="center" {...cellProps}>
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
