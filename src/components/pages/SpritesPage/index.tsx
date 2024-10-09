'use client';

import { useMemo } from 'react';
// types
import type { PokestatsSpritePageProps } from '@/app/sprites/[pokemonName]/page';
// helpers
import { findEnglishName, formatSpriteData, removeDash } from '@/helpers';
import { useUmami } from '@/hooks';
// components
import { Divider, Stack, Typography } from '@mui/material';
import SpriteAccordion from '@/components/SpriteAccordion';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import Navigation from '@/components/Navigation';

const SpritesPage = ({
  pokemon,
  otherFormsData,
  pokemonSpecies,
  allPokemonData,
}: PokestatsSpritePageProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  // data
  const { name, sprites } = pokemon;
  const { id, names } = pokemonSpecies;

  const englishName = useMemo(() => removeDash(name), [name]);

  const speciesEnglishName = useMemo(() => (names ? findEnglishName(names) : ''), [names]);

  const { generationSprites, otherSprites, mainSprites, otherForms } = useMemo(
    () => formatSpriteData(sprites, otherFormsData),
    [otherFormsData, sprites],
  );

  return (
    <Stack gap={4} width="100%">
      <Typography
        variant="pageHeading"
        textTransform="capitalize"
      >{`${englishName} sprites`}</Typography>
      {mainSprites.length > 0 &&
        mainSprites.map(({ label, sprites }) => (
          <SpriteAccordion
            pixelatedimg
            key={label}
            title={label}
            sprites={sprites}
            onChange={() => track('Pokemon Sprite Page - Accordion Click')}
          />
        ))}
      <Link href={`/pokemon/${name}`} legacyBehavior passHref>
        <CustomButton variant="contained">{`${englishName} Pokémon Page`}</CustomButton>
      </Link>
      {otherForms && otherForms.length > 0 && (
        <>
          <Divider />
          <Stack>
            <Typography variant="sectionTitle" textTransform="capitalize" mb={4}>
              {`Other ${speciesEnglishName} varieties`}
            </Typography>
            {otherForms.map(({ label, sprites }, index) => (
              <SpriteAccordion
                key={label}
                title={label}
                sprites={sprites}
                defaultExpanded={index === 0}
                onChange={() => track('Pokemon Sprite Page - Accordion Click')}
              />
            ))}
            {otherFormsData && (
              <Stack flexDirection="row" gap={2} mt={4} flexWrap="wrap">
                {otherFormsData.map(({ name }) => (
                  <Link key={name} href={`/sprites/${name}`} legacyBehavior passHref>
                    <CustomButton variant="contained">{`${removeDash(name)} Sprites`}</CustomButton>
                  </Link>
                ))}
              </Stack>
            )}
          </Stack>
        </>
      )}
      {otherSprites.length > 0 && (
        <>
          <Divider />
          <Stack>
            <Typography variant="sectionTitle" mb={4}>
              Other Sprites
            </Typography>
            {otherSprites.map(({ label, sprites }, index) => (
              <SpriteAccordion
                key={label}
                title={label}
                sprites={sprites}
                defaultExpanded={index === 0}
                onChange={() => track('Pokemon Sprite Page - Accordion Click')}
              />
            ))}
          </Stack>
        </>
      )}
      {generationSprites.length > 0 && (
        <>
          <Divider />
          <Stack gap={4}>
            <Typography variant="sectionTitle">Sprites by Generation</Typography>
            {generationSprites.map(({ label, gameVersions }) => (
              <Stack key={label}>
                <Typography variant="sectionSubTitle" gutterBottom>
                  {label}
                </Typography>
                {gameVersions.map(({ label, sprites }, index) => (
                  <SpriteAccordion
                    pixelatedimg
                    key={label}
                    title={label}
                    sprites={sprites}
                    defaultExpanded={index === 0}
                    onChange={() => track('Pokemon Sprite Page - Accordion Click')}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </>
      )}
      <Divider />
      <Navigation prefix="sprites" allPokemon={allPokemonData} speciesId={id} />
    </Stack>
  );
};

export default SpritesPage;
