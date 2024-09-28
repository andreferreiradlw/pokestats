// ctx
import { useLoader } from '@/context';
// components
import { Backdrop, Fade } from '@mui/material';
import Loading from '@/components/Loading';

const PageLoader = (): JSX.Element => {
  // loader trigger
  const { loading } = useLoader();

  return (
    <Backdrop
      open={loading}
      TransitionComponent={Fade}
      sx={{
        zIndex: theme => theme.zIndex.drawer + 100, // Ensures it appears above all other elements
      }}
    >
      <Loading
        height="100vh"
        icon="pokeball"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    </Backdrop>
  );
};

export default PageLoader;
