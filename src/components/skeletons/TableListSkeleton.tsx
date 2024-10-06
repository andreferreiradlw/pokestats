import { Stack, Skeleton, Typography } from '@mui/material';

interface TableListSkeletonProps {
  rowCount?: number;
}

const TableListSkeleton = ({ rowCount = 5 }: TableListSkeletonProps): JSX.Element => {
  return (
    <Stack gap={4} width="100%">
      {/* Skeleton for the page heading */}
      <Typography variant="pageHeading">
        <Skeleton width="30%" />
      </Typography>

      {/* Skeleton for the search form */}
      <Stack flexDirection="row" flexWrap="wrap" gap={2} component="form">
        {/* Skeleton for input */}
        <Skeleton variant="rectangular" width={250} height={56} />
        {/* Skeleton for firmness dropdown */}
        <Skeleton variant="rectangular" width={175} height={56} />
        {/* Skeleton for category dropdown */}
        <Skeleton variant="rectangular" width={175} height={56} />
        {/* Skeleton for reset button */}
        <Skeleton variant="rectangular" width={150} height={56} />
      </Stack>

      {/* Skeleton for table rows */}
      <Stack gap={2}>
        {Array.from({ length: rowCount }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={40} width="100%" />
        ))}
      </Stack>
    </Stack>
  );
};

export default TableListSkeleton;
