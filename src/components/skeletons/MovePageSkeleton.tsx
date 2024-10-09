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
          width="100%"
        >
          <Skeleton variant="rectangular" width={150} height={40} />
          <Typography variant="pageHeading" width="100%">
            <Skeleton sx={{ width: { xxs: '100%', lg: '30%' } }} />
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
            <Skeleton variant="rectangular" width="100%" height={250} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 8 }}>
            <Skeleton variant="rectangular" width="100%" height={500} />
          </Grid2>
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
          <Stack>
            <Typography variant="sectionSubTitle" gutterBottom>
              <Skeleton sx={{ width: { xxs: '100%', md: '45%' } }} />
            </Typography>
            <Typography variant="sectionMessage" textAlign="left">
              <Skeleton width="100%" />
            </Typography>
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={400} />
          <Stack>
            <Typography variant="sectionSubTitle" gutterBottom>
              <Skeleton sx={{ width: { xxs: '100%', md: '45%' } }} />
            </Typography>
            <Typography variant="sectionMessage" textAlign="left">
              <Skeleton width="100%" />
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 container size={{ xxs: 12, lg: 6 }} spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={100} />
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default MovePageSkeleton;
