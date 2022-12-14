import styled from 'styled-components';
// types
import type { BoxProps } from '@/components/Box';
// config
import { boxConfig } from '@/components/Box/config';
// helpers
import { responsiveProps } from '@/helpers/box';
// components
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoxWrapper from '@/components/Box/StyledBox';

interface LayoutProps extends BoxProps {
  children?: React.ReactNode;
  withFooter?: boolean;
  withHeader?: boolean;
  withMain?: boolean;
  withGameVersion?: boolean;
  mainKey?: string;
}

const LayoutContainer = styled(BoxWrapper)`
  min-height: 100vh;
`;

// main container
export const MainContainer = styled(motion.main)<{
  align?: BoxProps['align'];
  justify?: BoxProps['justify'];
  $constrained?: BoxProps['$constrained'];
  $withGutter?: BoxProps['$withGutter'];
}>`
  align-items: ${({ align }) => (align ? align : 'center')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  margin: 0 auto;
  width: 100%;

  ${({ $constrained }) => $constrained && `max-width: ${boxConfig.constrained};`}
  ${({ $withGutter }) => $withGutter && responsiveProps('padding', boxConfig.gutterWidth)}
`;

export default function Layout({
  withFooter,
  withHeader,
  withMain = true,
  withGameVersion = true,
  children,
  mainKey,
  ...rest
}: LayoutProps): JSX.Element {
  return (
    <LayoutContainer direction="column" width="100%">
      {withHeader && <Header withGameVersion={withGameVersion} />}
      {withMain ? (
        <MainContainer key={mainKey} {...rest}>
          {children}
        </MainContainer>
      ) : (
        children
      )}
      {withFooter && <Footer />}
    </LayoutContainer>
  );
}
