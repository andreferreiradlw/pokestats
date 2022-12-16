import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// types
import type { Type } from 'pokenode-ts';
// helpers
import { capitalize, hoverVariant } from '@/helpers';
// styles
import { Badge } from './StyledBadge';

export interface TypeBadgeProps {
  $iconOnly?: boolean;
  $float?: boolean;
  $iconWidth?: string;
  $iconHeight?: string;
  typename: Type['name'];
  hideIcon?: boolean;
  margin?: string;
  $fill?: boolean;
}

const TypeBadge = ({ typename, hideIcon, $iconOnly, ...rest }: TypeBadgeProps): JSX.Element => {
  const [Icon, setIcon] = useState();
  // ref
  const _isMounted = useRef(null);
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
      setIcon(null);
    };
  }, []);

  useEffect(() => {
    async function fetchSVG() {
      const importedIcon = await import(`../../assets/svg/types/${typename}.svg`);
      // if mounted, set icon state
      if (_isMounted.current) setIcon(importedIcon.default);
    }
    if (_isMounted.current) fetchSVG();
  }, [_isMounted, typename]);

  return (
    <Link href={`/type/${typename}`}>
      <Badge
        typename={typename}
        $iconOnly={$iconOnly}
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariant}
        {...rest}
      >
        {!hideIcon && typename && Icon && Icon}
        {!$iconOnly && typename && <span>{capitalize(typename)}</span>}
      </Badge>
    </Link>
  );
};

export default TypeBadge;
