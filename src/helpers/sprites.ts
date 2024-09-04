// @ts-nocheck

import type { PokemonSpecies, PokemonSprites } from 'pokenode-ts';

const spriteExtractor = (
  pokemonSprites: PokemonSprites,
  pokemonVarieties: PokemonSpecies['varieties'],
) => {
  const { other, versions } = pokemonSprites;

  /**
   * OTHER SPRITES
   */
  // @ts-expect-error
  const { dream_world, home, showdown } = other;

  // Extracting and formatting the 'other' sprites
  const otherSprites = [
    {
      label: 'Official Artwork',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: other?.['official-artwork']?.front_default,
        },
        {
          label: 'Front Shiny',
          // @ts-expect-error
          imageUrl: other['official-artwork'].front_shiny,
        },
      ],
    },
    {
      label: 'Dream World',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: dream_world.front_default,
        },
        {
          label: 'Front Female',
          imageUrl: dream_world.front_female,
        },
      ],
    },
    {
      label: 'Home',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: home.front_default,
        },
        {
          label: 'Front Female',
          imageUrl: home.front_female,
        },
        {
          label: 'Front Shiny',
          imageUrl: home.front_shiny,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: home.front_shiny_female,
        },
      ],
    },
    {
      label: 'Showdown',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: showdown.front_default,
        },
        {
          label: 'Front Female',
          imageUrl: showdown.front_female,
        },
        {
          label: 'Front Shiny',
          imageUrl: showdown.front_shiny,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: showdown.front_shiny_female,
        },
        {
          label: 'Back Default',
          imageUrl: showdown.back_default,
        },
        {
          label: 'Back Female',
          imageUrl: showdown.back_female,
        },
        {
          label: 'Back Shiny',
          imageUrl: showdown.back_shiny,
        },
        {
          label: 'Back Shiny Female',
          imageUrl: showdown.back_shiny_female,
        },
      ],
    },
  ];

  // Filter out otherSprites where all sprite URLs are null
  const filteredOtherSprites = otherSprites
    .map(category => {
      const filteredSprites = category.sprites.filter(sprite => sprite.imageUrl !== null);
      return {
        ...category,
        sprites: filteredSprites,
      };
    })
    .filter(category => category.sprites.length > 0);

  /**
   * GENERATION SPRITES
   */
  const generations = [
    {
      label: 'Generation I',
      gameVersions: [
        {
          label: 'Red / Blue',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-i']?.['red-blue']?.front_default,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-i']?.['red-blue']?.back_default,
            },
            {
              label: 'Front Gray',
              imageUrl: versions['generation-i']?.['red-blue']?.front_gray,
            },
            {
              label: 'Back Gray',
              imageUrl: versions['generation-i']?.['red-blue']?.back_gray,
            },
          ],
        },
        {
          label: 'Yellow',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-i']?.yellow?.front_default,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-i']?.yellow?.back_default,
            },
            {
              label: 'Front Gray',
              imageUrl: versions['generation-i']?.yellow?.front_gray,
            },
            {
              label: 'Back Gray',
              imageUrl: versions['generation-i']?.yellow?.back_gray,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation II',
      gameVersions: [
        {
          label: 'Crystal',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-ii']?.crystal?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.crystal?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.crystal?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.crystal?.back_shiny,
            },
          ],
        },
        {
          label: 'Gold',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-ii']?.gold?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.gold?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.gold?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.gold?.back_shiny,
            },
          ],
        },
        {
          label: 'Silver',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-ii']?.silver?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.silver?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.silver?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.silver?.back_shiny,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation III',
      gameVersions: [
        {
          label: 'Emerald',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iii']?.emerald?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iii']?.emerald?.front_shiny,
            },
          ],
        },
        {
          label: 'Ruby / Sapphire',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.back_shiny,
            },
          ],
        },
        {
          label: 'FireRed / LeafGreen',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.back_shiny,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation IV',
      gameVersions: [
        {
          label: 'Diamond / Pearl',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_shiny_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_shiny_female,
            },
          ],
        },
        {
          label: 'HeartGold / SoulSilver',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_shiny_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_shiny_female,
            },
          ],
        },
        {
          label: 'Platinum',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-iv']?.platinum?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.platinum?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.platinum?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-iv']?.platinum?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-iv']?.platinum?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.platinum?.front_shiny_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.platinum?.back_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-iv']?.platinum?.back_shiny_female,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation V',
      gameVersions: [
        {
          label: 'Black / White',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-v']?.['black-white']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-v']?.['black-white']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-v']?.['black-white']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-v']?.['black-white']?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-v']?.['black-white']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.front_shiny_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-v']?.['black-white']?.back_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.back_shiny_female,
            },
          ],
        },
        {
          label: 'Black 2 / White 2',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.front_shiny,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.back_default,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.front_shiny_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.back_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-v']?.['black-2-white-2']?.back_shiny_female,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation VI',
      gameVersions: [
        {
          label: 'Omega Ruby / Alpha Sapphire',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_shiny_female,
            },
          ],
        },
        {
          label: 'X / Y',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-vi']?.['x-y']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-vi']?.['x-y']?.front_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-vi']?.['x-y']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-vi']?.['x-y']?.front_shiny_female,
            },
          ],
        },
      ],
    },
    {
      label: 'Generation VII',
      gameVersions: [
        {
          label: 'Sun / Moon',
          sprites: [
            {
              label: 'Icon',
              imageUrl: versions['generation-vii']?.icons?.front_default,
            },
            {
              label: 'Front Default',
              imageUrl: versions['generation-vii']?.['ultra-sun-ultra-moon']?.front_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-vii']?.['ultra-sun-ultra-moon']?.front_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-vii']?.['ultra-sun-ultra-moon']?.front_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-vii']?.['ultra-sun-ultra-moon']?.front_shiny_female,
            },
          ],
        },
      ],
    },
  ];

  // Filter out generations and game versions where all sprite keys are null
  const filteredGenerationSprites = generations
    .map(generation => {
      const filteredGameVersions = generation.gameVersions
        .map(gameVersion => {
          const filteredSprites = gameVersion.sprites.filter(sprite => sprite.imageUrl !== null);
          return {
            ...gameVersion,
            sprites: filteredSprites,
          };
        })
        .filter(gameVersion => gameVersion.sprites.length > 0);

      return {
        ...generation,
        gameVersions: filteredGameVersions,
      };
    })
    .filter(generation => generation.gameVersions.length > 0);

  /**
   * FORMS
   */
  const forms = pokemonVarieties
    .filter(({ is_default }) => !is_default) // Filter out default forms
    ?.map(({ pokemon: { name } }) => {
      // Split the name into parts, transform the case, and rejoin
      const formName = name
        .split('-')
        .slice(1) // Remove the first part (base name)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
        .join('-');

      return { name: formName };
    });

  return {
    generationSprites: filteredGenerationSprites,
    otherSprites: filteredOtherSprites,
    forms,
  };
};

export { spriteExtractor };
