import { Divider, Grid2, Stack, Skeleton, Typography } from '@mui/material';

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
          <Stack
            alignItems={{ xxs: 'center', lg: 'flex-start' }}
            flexDirection={{ xxs: 'column-reverse', lg: 'column' }}
            gap={1}
            width="100%"
          >
            <Stack width="100%">
              <Skeleton variant="rectangular" width={85} height={50} />
              <Typography variant="pageHeading" width="100%">
                <Skeleton sx={{ width: { xxs: '100%', lg: '60%' } }} />
              </Typography>
              <Stack flexDirection="row" gap={2} mb={1}>
                <Skeleton variant="rounded" width={100} height={30} />
                <Skeleton variant="rounded" width={100} height={30} />
              </Stack>
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
            </Stack>
            <Skeleton variant="rectangular" width="100%" height={450} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 7 }}>
          <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
            <Skeleton variant="rectangular" width="50%" height={350} />
          </Stack>
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
          <Stack width="100%" gap={1}>
            <Typography variant="sectionTitle">
              <Skeleton width="150px" />
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Stack width="100%" gap={1}>
            <Typography variant="sectionTitle">
              <Skeleton width="150px" />
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={280} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Stack width="100%" gap={1}>
            <Typography variant="sectionTitle">
              <Skeleton width="150px" />
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={250} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, md: 6, lg: 4 }}>
          <Stack width="100%" gap={1}>
            <Typography variant="sectionTitle">
              <Skeleton width="150px" />
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={250} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 8 }}>
          <Stack width="100%" gap={1}>
            <Typography variant="sectionTitle">
              <Skeleton width="150px" />
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={250} />
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default PokemonPageSkeleton;
