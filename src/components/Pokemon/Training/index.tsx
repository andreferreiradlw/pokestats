import { useContext, useMemo } from 'react';
// types
import type {
  NamedAPIResource,
  PokemonHeldItemVersion,
  Pokemon,
  PokemonSpecies,
} from 'pokenode-ts';
// components
import type { Grid2Props } from '@mui/material';
import { Grid2, Typography, Stack } from '@mui/material';
// helpers
import { GameVersionContext } from '@/context';
import { removeDash } from '@/helpers';
// styles
import { Table, Numbered } from '@/components/BaseStyles';

interface TrainingProps extends Grid2Props {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

interface PokestatsItem {
  version_details: PokemonHeldItemVersion;
  item_details: NamedAPIResource;
}

const Training = ({ pokemon, species, ...rest }: TrainingProps): JSX.Element => {
  const { gameVersion } = useContext(GameVersionContext);
  const { stats, base_experience, held_items } = pokemon;
  const { capture_rate, base_happiness } = species;

  // Memoized EV Yield
  const EVYield = useMemo(() => {
    return stats
      .filter(stat => stat.effort > 0)
      .map(currStat => (
        <Typography textTransform="capitalize" key={currStat.stat.name}>
          {`${currStat.effort} ${removeDash(currStat.stat.name)}`}
        </Typography>
      ));
  }, [stats]);

  // Memoized Catch Rate
  const catchRate = useMemo(() => {
    if (!capture_rate) return 'Not available';

    return (
      <>
        <Typography>{capture_rate}</Typography>
        <Typography variant="body2" component="span">
          {`(${Math.round((33.33 / 255) * capture_rate)}% with Pokéball, full HP)`}
        </Typography>
      </>
    );
  }, [capture_rate]);

  // Combined Memoized Base Happiness Logic
  const baseHappinessDisplay = useMemo(() => {
    if (!base_happiness) return 'Not available';

    let happinessRate: string;
    if (base_happiness <= 69) happinessRate = 'Lower than normal';
    else if (base_happiness === 70) happinessRate = 'Normal';
    else if (base_happiness <= 139) happinessRate = 'Higher than normal';
    else happinessRate = 'Very high';

    return (
      <>
        <Typography>{base_happiness}</Typography>
        <Typography variant="body2" component="span">
          {`(${happinessRate})`}
        </Typography>
      </>
    );
  }, [base_happiness]);

  // Combined Memoized Held Items Logic
  const heldItemsDisplay = useMemo(() => {
    if (!held_items?.length || !gameVersion) return 'None';

    const versionItems = held_items
      .map(({ item, version_details }) => {
        const versionDetail = version_details.find(({ version }) => version.name === gameVersion);
        return versionDetail ? { item_details: item, version_details: versionDetail } : null;
      })
      .filter((item): item is PokestatsItem => item !== null);

    if (!versionItems.length) return 'None';

    return versionItems.map(({ item_details, version_details }, i) => (
      <Stack
        key={item_details.name}
        flexDirection="row"
        justifyContent={{ xxs: 'flex-start', md: 'space-between' }}
        gap="0.5em"
        margin="0 0 5px"
      >
        <Numbered style={{ width: 'auto' }}>
          <Typography fontWeight="500" textTransform="capitalize">
            {`${versionItems.length > 1 ? `${i + 1}. ` : ''}${removeDash(item_details.name)}`}
          </Typography>
          <Typography variant="body2" component="span">
            {`(${version_details.rarity}% chance)`}
          </Typography>
        </Numbered>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item_details.name}.png`}
          alt={item_details.name}
          width="40"
        />
      </Stack>
    ));
  }, [held_items, gameVersion]);

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="1em"
      {...rest}
    >
      <Typography variant="sectionTitle">Training</Typography>
      <Table>
        <tbody>
          <tr>
            <th>EV Yield</th>
            <td>{EVYield.length ? EVYield : 'Not available'}</td>
          </tr>
          <tr>
            <th>Catch Rate</th>
            <td>{catchRate}</td>
          </tr>
          <tr>
            <th>Base Happiness</th>
            <td>{baseHappinessDisplay}</td>
          </tr>
          <tr>
            <th>Base XP</th>
            <td>{base_experience ?? 'Not available'}</td>
          </tr>
          <tr>
            <th>Held Items</th>
            <td>{heldItemsDisplay}</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default Training;
