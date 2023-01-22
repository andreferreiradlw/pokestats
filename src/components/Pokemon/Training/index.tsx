import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
// types
import type {
  NamedAPIResource,
  PokemonHeldItemVersion,
  Pokemon,
  PokemonSpecies,
} from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { removeDash, itemMapUrl } from '@/helpers';
// styles
import { SectionTitle, Table, Numbered, UppercasedTd } from '@/components/BaseStyles';

interface TrainingProps extends BoxProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

interface PokestatsItem {
  version_details: PokemonHeldItemVersion;
  item_details: NamedAPIResource;
}

const Training = ({ pokemon, species, ...rest }: TrainingProps): JSX.Element => {
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // data
  const { stats, base_experience, held_items } = pokemon;
  const { capture_rate, base_happiness } = species;
  // held items
  const [items, setItems] = useState<PokestatsItem[]>([]);
  // memo
  const EVYield = useMemo(
    () =>
      stats.map(
        (currStat, i) =>
          currStat.effort > 0 && (
            <UppercasedTd as="p" key={`${currStat.stat.name}-${i}`}>{`${
              currStat.effort
            } ${removeDash(currStat.stat.name)}`}</UppercasedTd>
          ),
      ),
    [stats],
  );
  const catchRate = useMemo(
    () => (
      <>
        <p>{capture_rate}</p>
        <span>{`(${Math.round((33.33 / 255) * capture_rate)}% with pokeball, full HP)`}</span>
      </>
    ),
    [capture_rate],
  );
  const baseHappiness = useMemo(() => {
    let happinessRate: string;

    if (base_happiness <= 69) happinessRate = 'Lower than normal';
    if (base_happiness === 70) happinessRate = 'Normal';
    if (base_happiness >= 71 && base_happiness <= 139) happinessRate = 'Higher than normal';
    if (base_happiness >= 140) happinessRate = 'Very high';

    return (
      <>
        <p>{`${base_happiness}`}</p>
        <span>{`(${happinessRate})`}</span>
      </>
    );
  }, [base_happiness]);

  const itemSpriteUrl = useCallback((slug: string) => itemMapUrl(slug), []);

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
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>Training</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>EV Yield</th>
            <td>{stats?.length ? EVYield : 'Not available'}</td>
          </tr>
          <tr>
            <th>Catch Rate</th>
            <td>{capture_rate ? catchRate : 'Not available'}</td>
          </tr>
          <tr>
            <th>Base Happiness</th>
            <td>{base_happiness ? baseHappiness : 'Not available'}</td>
          </tr>
          <tr>
            <th>Base XP</th>
            <td>{base_experience || 'Not available'}</td>
          </tr>
          <tr>
            <th>Held Items</th>
            <td>
              {!items.length
                ? 'None'
                : items.map(({ item_details, version_details }, i) => (
                    <Box
                      key={`${item_details.name}-${i}`}
                      flexdirection="row"
                      flexjustify={{ xxs: 'flex-start', md: 'space-between' }}
                      flexgap="0.5em"
                      flexmargin="0 0 5px"
                    >
                      <Numbered style={{ width: 'auto' }}>
                        <UppercasedTd as="p" style={{ fontWeight: 500 }}>
                          {`${items.length > 1 ? `${i + 1}. ` : ``}${removeDash(
                            item_details.name,
                          )}`}
                        </UppercasedTd>
                        <span>{`( ${version_details.rarity}% chance )`}</span>
                      </Numbered>
                      <img
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${itemSpriteUrl(
                          item_details.name,
                        )}`}
                        alt={removeDash(item_details.name)}
                        width="40"
                      />
                    </Box>
                  ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default Training;
