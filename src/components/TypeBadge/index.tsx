// helpers
import { hoverVariant } from '@/animations';
import { capitalise } from '@/helpers';
// styles
import { Badge } from './StyledBadge';
// components
import TypeIcon from '@/components/TypeIcon';
import Link from 'next/link';
import type { Theme } from '@mui/material';
import { Tooltip, Typography } from '@mui/material';

export interface TypeBadgeProps {
  $iconOnly?: boolean;
  $iconWidth?: string;
  $iconHeight?: string;
  $typename: keyof Theme['palette']['types'];
  hideIcon?: boolean;
  $fill?: boolean;
}

const TypeBadge = ({
  $typename,
  hideIcon,
  $iconOnly,
  ...rest
}: TypeBadgeProps): JSX.Element | null => {
  if (!$typename) return null;

  return (
    <Link href={`/type/${$typename}`} prefetch={false} legacyBehavior passHref>
      <Tooltip title={$iconOnly ? capitalise($typename) : ''} placement="right">
        <Badge
          $typename={$typename}
          $iconOnly={$iconOnly}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
          {...rest}
        >
          {!hideIcon && <TypeIcon type={$typename} />}
          {!$iconOnly && <Typography fontWeight="500">{$typename}</Typography>}
        </Badge>
      </Tooltip>
    </Link>
  );
};

export default TypeBadge;
