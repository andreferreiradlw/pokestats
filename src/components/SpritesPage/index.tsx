import { useMemo } from 'react';
// types
import type { PokestatsSpritePageProps } from '@/pages/sprites/[pokemonName]';
// helpers
import { formatSpriteData, removeDash } from '@/helpers';
import { usePlausible } from 'next-plausible';
// components
import { Divider, Stack, Typography } from '@mui/material';
import SpriteAccordion from './SpriteAccordion';

const SpritesPage = ({ pokemon, otherFormsData }: PokestatsSpritePageProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // data
  const { name, sprites } = pokemon;

  const englishName = useMemo(() => removeDash(name), [name]);

  const { generationSprites, otherSprites, mainSprites, otherForms } = useMemo(
    () => formatSpriteData(sprites, otherFormsData),
    [otherFormsData, sprites],
  );

  console.log(pokemon, otherFormsData, otherForms);

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
      <Divider />
      {otherForms && otherForms.length > 0 && (
        <Stack>
          <Typography variant="sectionTitle" textTransform="capitalize" mb={4}>
            {`${englishName} forms`}
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
        </Stack>
      )}
      <Divider />
      {otherSprites.length > 0 && (
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
      )}
      <Divider />
      {generationSprites.length > 0 && (
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
      )}
    </Stack>
  );
};

export default SpritesPage;
