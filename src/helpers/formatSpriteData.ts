import type { Pokemon, PokemonSprites } from 'pokenode-ts';
import { removeDash } from './typography';

export const formatSpriteData = (
  pokemonSprites: PokemonSprites,
  pokemonVarieties?: Pokemon[] | null,
) => {
  const { other, versions } = pokemonSprites;

  /**
   * MAIN SPRITES
   */
  const mainSprites = [
    {
      label: 'Main Sprites',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: pokemonSprites.front_default,
        },
        {
          label: 'Back Default',
          imageUrl: pokemonSprites.back_default,
        },
        {
          label: 'Front Shiny',
          imageUrl: pokemonSprites.front_shiny,
        },
        {
          label: 'Back Shiny',
          imageUrl: pokemonSprites.back_shiny,
        },
        {
          label: 'Front Female',
          imageUrl: pokemonSprites.front_female,
        },
        {
          label: 'Back Female',
          imageUrl: pokemonSprites.back_female,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: pokemonSprites.front_shiny_female,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: pokemonSprites.back_shiny_female,
        },
      ],
    },
  ];

  const filteredMainSprites = mainSprites.map(group => ({
    ...group,
    sprites: group.sprites.filter(sprite => sprite.imageUrl !== null),
  }));

  /**
   * OTHER SPRITES
   */
  // @ts-expect-error: incorrect types
  const { dream_world, home, showdown } = other;

  // Extracting and formatting the 'other' sprites
  const otherSprites = [
    {
      label: 'Showdown',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: showdown.front_default,
        },
        {
          label: 'Back Default',
          imageUrl: showdown.back_default,
        },
        {
          label: 'Front Shiny',
          imageUrl: showdown.front_shiny,
        },
        {
          label: 'Back Shiny',
          imageUrl: showdown.back_shiny,
        },
        {
          label: 'Front Female',
          imageUrl: showdown.front_female,
        },
        {
          label: 'Back Female',
          imageUrl: showdown.back_female,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: showdown.front_shiny_female,
        },
        {
          label: 'Back Shiny Female',
          imageUrl: showdown.back_shiny_female,
        },
      ],
    },
    {
      label: 'Official Artwork',
      sprites: [
        {
          label: 'Front Default',
          imageUrl: other?.['official-artwork']?.front_default,
        },
        {
          label: 'Front Shiny',
          // @ts-expect-error: incorrect type
          imageUrl: other['official-artwork'].front_shiny,
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
            {
              label: 'Front Transparent',
              imageUrl: versions['generation-i']?.['red-blue']?.front_transparent,
            },
            {
              label: 'Back Transparent',
              imageUrl: versions['generation-i']?.['red-blue']?.back_transparent,
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
            {
              label: 'Front Transparent',
              imageUrl: versions['generation-i']?.yellow?.front_transparent,
            },
            {
              label: 'Back Transparent',
              imageUrl: versions['generation-i']?.yellow?.back_transparent,
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
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.crystal?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.crystal?.front_shiny,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.crystal?.back_shiny,
            },
            {
              label: 'Front Transparent',
              imageUrl: versions['generation-ii']?.crystal?.front_transparent,
            },
            {
              label: 'Back Transparent',
              imageUrl: versions['generation-ii']?.crystal?.back_transparent,
            },
            {
              label: 'Front Shiny Transparent',
              imageUrl: versions['generation-ii']?.crystal?.front_shiny_transparent,
            },
            {
              label: 'Back Shiny Transparent',
              imageUrl: versions['generation-ii']?.crystal?.back_shiny_transparent,
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
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.gold?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.gold?.front_shiny,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.gold?.back_shiny,
            },
            {
              label: 'Front Transparent',
              imageUrl: versions['generation-ii']?.gold?.front_transparent,
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
              label: 'Back Default',
              imageUrl: versions['generation-ii']?.silver?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-ii']?.silver?.front_shiny,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-ii']?.silver?.back_shiny,
            },
            {
              label: 'Front Transparent',
              imageUrl: versions['generation-ii']?.silver?.front_transparent,
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
              label: 'Back Default',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iii']?.['ruby-sapphire']?.front_shiny,
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
              label: 'Back Default',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iii']?.['firered-leafgreen']?.front_shiny,
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
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_shiny,
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
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.back_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.['diamond-pearl']?.front_shiny_female,
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
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_shiny,
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
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.back_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.['heartgold-soulsilver']?.front_shiny_female,
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
              label: 'Back Default',
              imageUrl: versions['generation-iv']?.platinum?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-iv']?.platinum?.front_shiny,
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
              label: 'Back Female',
              imageUrl: versions['generation-iv']?.platinum?.back_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-iv']?.platinum?.front_shiny_female,
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
          label: 'Animated',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.front_default,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.front_shiny,
            },
            {
              label: 'Back Shiny',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.back_shiny,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.front_female,
            },
            {
              label: 'Back Female',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.back_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.front_shiny_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.animated?.back_shiny_female,
            },
          ],
        },
        {
          label: 'Black / White',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-v']?.['black-white']?.front_default,
            },
            {
              label: 'Back Default',
              imageUrl: versions['generation-v']?.['black-white']?.back_default,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-v']?.['black-white']?.front_shiny,
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
              label: 'Back Female',
              imageUrl: versions['generation-v']?.['black-white']?.back_female,
            },
            {
              label: 'Front Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.front_shiny_female,
            },
            {
              label: 'Back Shiny Female',
              imageUrl: versions['generation-v']?.['black-white']?.back_shiny_female,
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
              label: 'Front Female',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_female,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-vi']?.['omegaruby-alphasapphire']?.front_shiny,
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
              label: 'Front Female',
              imageUrl: versions['generation-vi']?.['x-y']?.front_female,
            },
            {
              label: 'Front Shiny',
              imageUrl: versions['generation-vi']?.['x-y']?.front_shiny,
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
          label: 'Ultra Sun / Ultra Moon',
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
    {
      label: 'Generation VIII',
      gameVersions: [
        {
          label: 'Icons',
          sprites: [
            {
              label: 'Front Default',
              imageUrl: versions['generation-viii']?.icons?.front_default,
            },
            {
              label: 'Front Female',
              imageUrl: versions['generation-viii']?.icons?.front_female,
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
   * OTHER FORMS
   */

  const otherForms = pokemonVarieties
    ?.map(({ name, sprites }) => {
      const filteredSprites = [
        {
          label: 'Front Default',
          imageUrl: sprites.front_default,
        },
        {
          label: 'Back Default',
          imageUrl: sprites.back_default,
        },
        {
          label: 'Front Shiny',
          imageUrl: sprites.front_shiny,
        },
        {
          label: 'Back Shiny',
          imageUrl: sprites.back_shiny,
        },
        {
          label: 'Front Female',
          imageUrl: sprites.front_female,
        },
        {
          label: 'Back Female',
          imageUrl: sprites.back_female,
        },
        {
          label: 'Front Shiny Female',
          imageUrl: sprites.front_shiny_female,
        },
        {
          label: 'Back Shiny Female',
          imageUrl: sprites.back_shiny_female,
        },
      ].filter(sprite => sprite.imageUrl !== null);

      return {
        label: removeDash(name),
        sprites: filteredSprites,
      };
    })
    .sort((a, b) => {
      const aGmax = a.label.toLowerCase().includes('gmax');
      const bGmax = b.label.toLowerCase().includes('gmax');

      // Sort: Entries with 'gmax' in label should come first
      return aGmax === bGmax ? 0 : aGmax ? -1 : 1;
    });

  return {
    generationSprites: filteredGenerationSprites,
    otherSprites: filteredOtherSprites,
    mainSprites: filteredMainSprites,
    otherForms,
  };
};
