// helpers
import { hoverVariant } from '@/animations';
// styles
import { Badge } from './StyledBadge';
// components
import TypeIcon from '@/components/TypeIcon';
import Link from 'next/link';
import { capitalize, Theme, Tooltip, Typography } from '@mui/material';

export interface TypeBadgeProps {
  $iconOnly?: boolean;
  $iconWidth?: string;
  $iconHeight?: string;
  $typename: keyof Theme['palette']['types'];
  hideIcon?: boolean;
  flexmargin?: string;
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
      <Tooltip title={$iconOnly ? capitalize($typename) : ''} placement="right">
        <Badge
          $typename={$typename}
          $iconOnly={$iconOnly}
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
