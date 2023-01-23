import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';
import { motion } from 'framer-motion';
// styles
import { UppercasedTd } from '@/components/BaseStyles';
// icon
import SoundIcon from 'public/static/iconLibrary/sound.svg';

const TypeContainer = styled(Box)`
  gap: 1em;
`;

const IconContainer = styled(motion.div)`
  display: none;
  margin-top: 10px;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      display: block;
    }
  `}
`;

const CriesIcon = styled(SoundIcon)`
  height: auto;
  width: 2.5em;

  &:hover {
    cursor: pointer;

    path:first-of-type {
      fill: black;
    }
  }
`;

const AbilityName = styled(UppercasedTd)`
  font-weight: 500;
`;

const Genera = styled.p`
  font-weight: 700;
`;

const Flavor = styled.p`
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      text-align: left;
    }
  `}
`;

export { TypeContainer, IconContainer, CriesIcon, AbilityName, Genera, Flavor };
