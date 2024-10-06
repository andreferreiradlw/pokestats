import { Skeleton, Stack, Typography, Divider, Grid2 } from '@mui/material';

const ItemPageSkeleton = (): JSX.Element => (
  <Stack gap={4}>
    {/* Skeleton for the Item Title and Image */}
    <Stack>
      <Stack flexDirection="row" gap={1} alignItems="center">
        <Typography variant="pageHeading">
          <Skeleton width="200px" />
        </Typography>
        <Skeleton variant="rectangular" width={100} height={100} />
      </Stack>
      <Typography variant="sectionSubTitle" gutterBottom>
        <Skeleton width="100%" />
      </Typography>
      <Typography variant="sectionMessage" textAlign="left">
        <Skeleton width="100%" />
      </Typography>
    </Stack>

    {/* Skeleton for the Grid2 layout */}
    <Grid2
      container
      spacing={4}
      direction={{ xxs: 'column-reverse', lg: 'row' }}
      size={12}
      wrap="nowrap"
    >
      <Grid2 size={{ xxs: 12, lg: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid2>
      <Grid2 size={{ xxs: 12, lg: 5 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid2>
      <Grid2 size={{ xxs: 12, lg: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid2>
    </Grid2>

    <Divider />

    {/* Skeleton for Flavor Text and Language Table */}
    <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12} wrap="nowrap">
      <Grid2 size={{ xxs: 12, lg: 9 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid2>
      <Grid2 size={{ xxs: 12, lg: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Grid2>
    </Grid2>

    <Divider />

    {/* Skeleton for Category Items */}
    <Skeleton variant="rectangular" width="100%" height={200} />

    {/* Skeleton for the Button */}
    <Grid2 size={12}>
      <Skeleton variant="rectangular" width="200px" height={56} />
    </Grid2>
  </Stack>
);

export default ItemPageSkeleton;
