import { useMemo } from 'react';
// types
import type { PokestatsSpritePageProps } from '@/pages/sprites/[pokemonName]';
// helpers
import { capitalise, findEnglishName, formatSpriteData, removeDash } from '@/helpers';
import { usePlausible } from 'next-plausible';
// components
import { Divider, Stack, Typography } from '@mui/material';
import SpriteAccordion from '../SpriteAccordion';
import Link from 'next/link';
import CustomButton from '../CustomButton';

const SpritesPage = ({
  pokemon,
  otherFormsData,
  pokemonSpecies,
}: PokestatsSpritePageProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // data
  const { name, sprites } = pokemon;

  const englishName = useMemo(() => removeDash(name), [name]);

  const speciesEnglishName = useMemo(
    () => (pokemonSpecies?.names ? findEnglishName(pokemonSpecies.names) : ''),
    [pokemonSpecies],
  );

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
            key={label}
            title={label}
            sprites={sprites}
            onChange={() => plausible('Pokemon Sprite Accordion Click')}
          />
        ))}
      <Link href={`/pokemon/${name}`} legacyBehavior passHref>
        <CustomButton
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
        >{`${englishName} Pokémon Page`}</CustomButton>
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
                onChange={() => plausible('Pokemon Sprite Accordion Click')}
              />
            ))}
            {otherFormsData && (
              <Stack flexDirection="row" gap={2} mt={4}>
                {otherFormsData.map(({ name }) => (
                  <Link key={name} href={`/sprites/${name}`} legacyBehavior passHref>
                    <CustomButton variant="contained">{`${capitalise(removeDash(name))} Sprites`}</CustomButton>
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
                onChange={() => plausible('Pokemon Sprite Accordion Click')}
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
                    key={label}
                    title={label}
                    sprites={sprites}
                    defaultExpanded={index === 0}
                    onChange={() => plausible('Pokemon Sprite Accordion Click')}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default SpritesPage;
