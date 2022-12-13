import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// components
import Loading from '../../Loading';
import Box from '../../Box';
// helpers
import { removeDash } from '../../../helpers/typography';
import { fadeInUpVariant } from '../../../helpers/animations';
// styles
import { SectionTitle, Table, Numbered } from '../../BaseStyles';

export default function Training({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info);
  // biology
  const pokemonBio = useSelector(state => state.pokemon.biology);
  // game version
  const gameVersion = useSelector(state => state.game.version);
  // data
  const { stats, base_experience, held_items } = pokemonInfo.data;
  const { capture_rate, base_happiness, growth_rate } = pokemonBio.data;

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
  }, [gameVersion]);

  // EV yield
  const EVYield = pokemonStats => {
    return pokemonStats.map(
      (currStat, i) =>
        currStat.effort > 0 && (
          <Numbered key={`${currStat.stat.name}-${i}`}>{`${currStat.effort} ${removeDash(
            currStat.stat.name,
          )}`}</Numbered>
        ),
    );
  };

  // catch rate
  const catchRate = rate => {
    const rateChance = Math.round((33.33 / 255) * rate);
    // return string
    return (
      <>
        {rate}
        <Numbered light>{`( ${rateChance}% with pokeball, full HP )`}</Numbered>
      </>
    );
  };

  // base happiness
  const baseHappiness = happiness => {
    let happinessRate;

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

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Training</SectionTitle>
      <AnimatePresence mode="wait">
        {pokemonBio.isLoading && <Loading height="251px" $iconWidth="15%" key="pokemon-training" />}
        {!pokemonBio.isLoading && (
          <Table
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key="pokemon-training-table"
          >
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
        )}
      </AnimatePresence>
    </Box>
  );
}
