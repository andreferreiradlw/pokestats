// types
import type { Type } from 'pokenode-ts';
// helpers
import { hoverVariant } from '@/helpers';
// styles
import { Badge } from './StyledBadge';
// components
import TypeIcon from '@/components/TypeIcon';
import Link from 'next/link';

export interface TypeBadgeProps {
  $iconOnly?: boolean;
  $iconWidth?: string;
  $iconHeight?: string;
  $typename: Type['name'];
  hideIcon?: boolean;
  flexmargin?: string;
  $fill?: boolean;
}

const TypeBadge = ({ $typename, hideIcon, $iconOnly, ...rest }: TypeBadgeProps): JSX.Element => {
  if (!$typename) return null;

  return (
    <Link href={`/type/${$typename}`} prefetch={false} legacyBehavior passHref>
      <Badge
        $typename={$typename}
        $iconOnly={$iconOnly}
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariant}
        title={$iconOnly && $typename.toUpperCase()}
        {...rest}
      >
        {!hideIcon && <TypeIcon type={$typename} />}
        {!$iconOnly && <span>{$typename}</span>}
      </Badge>
    </Link>
  );
};

export default TypeBadge;
