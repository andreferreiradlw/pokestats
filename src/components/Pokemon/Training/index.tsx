import { useState, useEffect, useContext } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { removeDash } from '@/helpers/typography';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';

// EV yield
const EVYield = (pokemonStats: Pokemon['stats']): JSX.Element[] =>
  pokemonStats.map(
    (currStat, i) =>
      currStat.effort > 0 && (
        <Numbered key={`${currStat.stat.name}-${i}`}>{`${currStat.effort} ${removeDash(
          currStat.stat.name,
        )}`}</Numbered>
      ),
  );

// catch rate
const catchRate = (rate: PokemonSpecies['capture_rate']): JSX.Element => {
  const rateChance = Math.round((33.33 / 255) * rate);

  return (
    <>
      {rate}
      <Numbered light>{`( ${rateChance}% with pokeball, full HP )`}</Numbered>
    </>
  );
};

// base happiness
const baseHappiness = (happiness: PokemonSpecies['base_happiness']): string => {
  let happinessRate: string;

  if (happiness <= 69) {
    happinessRate = 'Lower than normal';
  } else if (happiness === 70) {
    happinessRate = 'Normal';
  } else if (happiness >= 71 && happiness <= 139) {
    happinessRate = 'Higher than normal';
  } else if (happiness >= 140) {
    happinessRate = 'Very high';
  }

  return `${happiness} ( ${happinessRate} )`;
};

interface TrainingProps extends BoxProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const Training = ({ pokemon, species, ...rest }: TrainingProps): JSX.Element => {
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // data
  const { stats, base_experience, held_items } = pokemon;
  const { capture_rate, base_happiness, growth_rate } = species;

  // held items
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (held_items?.length && gameVersion) {
      // filter items with current version
      const versionItems = held_items
        .map(({ item, version_details }) => {
          const filteredVersions = version_details.filter(
            ({ version }) => version.name === gameVersion,
          );
          // organize item info
          if (filteredVersions.length > 0) {
            return {
              item_details: item,
              version_details: filteredVersions[0],
            };
          }
          return null;
        })
        .filter(currItem => currItem);
      // set items state
      setItems(versionItems);
    }
  }, [gameVersion, held_items]);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <SectionTitle>Training</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>EV Yield</th>
            <td>{EVYield(stats)}</td>
          </tr>
          <tr>
            <th>Catch Rate</th>
            <td>{catchRate(capture_rate)}</td>
          </tr>
          <tr>
            <th>Base Happiness</th>
            <td>{baseHappiness(base_happiness)}</td>
          </tr>
          <tr>
            <th>Base Exp.</th>
            <td>{base_experience}</td>
          </tr>
          <tr>
            <th>Growth Rate</th>
            <td>{removeDash(growth_rate.name)}</td>
          </tr>
          <tr>
            <th>Held Items</th>
            <td>
              {!items.length
                ? 'None'
                : items.map((item, i) => (
                    <Numbered key={`${item.item_details.name}-${i}`}>
                      {`${items.length > 1 ? `${i + 1}. ` : ``}${removeDash(
                        item.item_details.name,
                      )} ( ${item.version_details.rarity}% chance )`}
                    </Numbered>
                  ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default Training;
