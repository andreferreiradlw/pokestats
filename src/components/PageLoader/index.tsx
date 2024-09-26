// ctx
import { useLoader } from '@/context';
// components
import { Backdrop, Zoom } from '@mui/material';
import Loading from '@/components/Loading';

const PageLoader = () => {
  const { loading } = useLoader();

  return (
    <Backdrop
      open={loading}
      TransitionComponent={Zoom}
      sx={{
        zIndex: theme => theme.zIndex.drawer + 100, // Ensures it appears above other elements
      }}
    >
      <Loading
        height="100vh"
        icon="pokeball"
        text="Catching Data"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    </Backdrop>
  );
};

export default PageLoader;
