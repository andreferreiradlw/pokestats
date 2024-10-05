import { useMemo } from 'react';
// types
import type { Pokemon } from 'pokenode-ts';
// helpers
import { formatSpriteData, removeDash } from '@/helpers';
import { usePlausible } from 'next-plausible';
// components
import { Stack, Typography, type StackProps } from '@mui/material';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import SpriteAccordion from '@/components/SpriteAccordion';

interface SpritesProps extends StackProps {
  pokemon: Pokemon;
}

const Sprites = ({ pokemon, ...rest }: SpritesProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // data
  const { name, sprites } = pokemon;

  const pokemonName = useMemo(() => removeDash(name), [name]);

  const { otherSprites, mainSprites } = useMemo(() => formatSpriteData(sprites), [sprites]);

  return (
    <Stack gap={4} width="100%" {...rest}>
      <Typography
        variant="sectionTitle"
        textTransform="capitalize"
      >{`${pokemonName} Sprites`}</Typography>
      {mainSprites.length > 0 &&
        mainSprites.map(({ label, sprites }) => (
          <SpriteAccordion key={label} title={label} sprites={sprites} />
        ))}
      {otherSprites.length > 0 && (
        <Stack width="100%">
          <Typography variant="sectionSubTitle" mb={2}>
            Other Sprites
          </Typography>
          {otherSprites.map(({ label, sprites }, index) => (
            <SpriteAccordion
              key={label}
              title={label}
              sprites={sprites}
              defaultExpanded={index === 0}
            />
          ))}
        </Stack>
      )}
      <Link href={`/sprites/${name}`} legacyBehavior passHref>
        <CustomButton
          variant="contained"
          size="large"
          onClick={() => plausible('All Sprites Click')}
        >
          {`All ${pokemonName} sprites`}
        </CustomButton>
      </Link>
    </Stack>
  );
};

export default Sprites;
