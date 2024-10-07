import { Divider, Grid2, Stack, Skeleton } from '@mui/material';

const PokemonPageSkeleton = (): JSX.Element => {
  return (
    <Stack divider={<Divider />} gap={4}>
      <Grid2
        container
        direction={{ xxs: 'column-reverse', lg: 'row' }}
        alignItems="stretch"
        justifyContent="flex-start"
        spacing={4}
        size={12}
      >
        <Grid2 size={{ xxs: 12, lg: 5 }}>
          <Skeleton variant="text" width={150} height={40} />
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 7 }}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Grid2>
      </Grid2>

      <Grid2
        container
        direction={{ xxs: 'column', md: 'row' }}
        alignItems="stretch"
        justifyContent="space-between"
        spacing={4}
        size={12}
        wrap="wrap"
      >
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 8 }}>
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid2>
      </Grid2>

      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Stack>

      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Stack>

      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Stack>

      <Skeleton variant="rectangular" width="100%" height={200} />

      <Skeleton variant="rectangular" width="100%" height={100} />
    </Stack>
  );
};

export default PokemonPageSkeleton;
