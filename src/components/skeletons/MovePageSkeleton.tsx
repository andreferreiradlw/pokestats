import { Skeleton, Stack, Typography, Divider, Grid2 } from '@mui/material';

const MovePageSkeleton = (): JSX.Element => {
  return (
    <Stack divider={<Divider />} gap={4}>
      <Stack
        justifyContent={{ xxs: 'center', lg: 'flex-start' }}
        alignItems={{ xxs: 'center', lg: 'flex-start' }}
        gap={4}
        width="100%"
      >
        <Stack
          alignItems={{ xxs: 'center', lg: 'flex-start' }}
          flexDirection={{ xxs: 'column-reverse', lg: 'column' }}
          gap={{ xxs: 2, lg: 1 }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Typography variant="pageHeading">
            <Skeleton width="200px" />
          </Typography>
        </Stack>
        <Grid2
          container
          direction={{ xxs: 'column', lg: 'row' }}
          alignItems={{ xxs: 'center', lg: 'flex-start' }}
          justifyContent="flex-start"
          spacing={4}
          size={12}
        >
          <Grid2
            container
            size={{ xxs: 12, lg: 4 }}
            direction={{ xxs: 'column', sm: 'row', lg: 'column' }}
            spacing={2}
          >
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </Grid2>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid2>
      </Stack>

      <Grid2
        container
        justifyContent={{ xxs: 'center', lg: 'flex-start' }}
        alignItems={{ xxs: 'center', lg: 'flex-start' }}
        direction={{ xxs: 'column', lg: 'row' }}
        spacing={4}
        size={12}
      >
        <Grid2
          container
          size={{ xxs: 12, lg: 6 }}
          direction={{ xxs: 'column-reverse', lg: 'column' }}
          spacing={2}
        >
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
        <Grid2 container size={{ xxs: 12, lg: 6 }} spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
      </Grid2>

      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
};

export default MovePageSkeleton;
