import { Skeleton, Stack, Typography, Divider, Grid2 } from '@mui/material';

const TypePageSkeleton = (): JSX.Element => {
  return (
    <Stack divider={<Divider />} gap={4}>
      <Grid2 container spacing={4} direction="column">
        <Grid2>
          <Typography variant="pageHeading">
            <Skeleton width="200px" />
          </Typography>
        </Grid2>
        <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12}>
          <Grid2 size={{ xxs: 12, lg: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={150} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 6 }}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={150} />
          </Grid2>
        </Grid2>
      </Grid2>
      <Skeleton variant="rectangular" width="100%" height={400} />
    </Stack>
  );
};

export default TypePageSkeleton;
