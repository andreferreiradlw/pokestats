import { useMemo } from 'react';
// types
import type { PokestatsSpritePageProps } from '@/pages/sprites/[pokemonName]';
// helpers
import { formatSpriteData, removeDash } from '@/helpers';
// components
import { Stack, Typography } from '@mui/material';
import SpriteAccordion from './SpriteAccordion';

const SpritesPage = ({ pokemon, pokemonSpecies }: PokestatsSpritePageProps): JSX.Element => {
  // data
  const { varieties } = pokemonSpecies;
  const { name, sprites } = pokemon;

  const englishName = useMemo(() => removeDash(name), [name]);

  const { generationSprites, otherSprites, forms } = useMemo(
    () => formatSpriteData(sprites, varieties),
    [varieties, sprites],
  );

  console.log(pokemon, pokemonSpecies, generationSprites, otherSprites, forms);

  return (
    <Stack gap={4} width="100%">
      <Typography
        variant="pageHeading"
        textTransform="capitalize"
      >{`${englishName} sprites`}</Typography>
      {generationSprites.length > 0 &&
        generationSprites.map(({ label, gameVersions }) => (
          <Stack key={label}>
            <Typography variant="sectionTitle" gutterBottom>
              {label}
            </Typography>
            {gameVersions.map(({ label, sprites }, index) => (
              <SpriteAccordion
                key={label}
                title={label}
                sprites={sprites}
                defaultExpanded={index === 0}
              />
            ))}
          </Stack>
        ))}
    </Stack>
  );
};

export default SpritesPage;
