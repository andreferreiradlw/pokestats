import { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
// types
import type { Location } from '@/pages/regions/kanto-gen1';
// styles
import { SectionMessage, UppercasedTd } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTableEl,
  TableBody,
  NameTH,
  DataCell,
  NameTD,
  TableRow,
} from '@/components/MovesTable/StyledMovesTable';
// components
import { AnimatePresence, HTMLMotionProps } from 'framer-motion';

interface LocationTableProps extends HTMLMotionProps<'div'> {
  location: Location;
}

const LocationTable = ({ location, ...rest }: LocationTableProps): JSX.Element => {
  console.log('table area', location);

  const { key, label, locationAreas } = location;

  return (
    <AnimatePresence mode="wait">
      <TableContainer {...rest}>
        <MovesTableEl>
          <thead>
            <tr>
              <th colSpan={8}>{label}</th>
            </tr>
            <tr>
              <th colSpan={2} rowSpan={2}>
                Pokemon
              </th>
              <th rowSpan={2}>Method</th>
              <th rowSpan={2}>Levels</th>
              <th colSpan={3}>Chance</th>
              <th rowSpan={2}>Versions</th>
            </tr>
            <tr>
              <td>Morning</td>
              <td>Day</td>
              <td>Night</td>
            </tr>
          </thead>
          <TableBody>
            {locationAreas.map(
              ({ pokemon_encounters, names: areaNames, name: areaName, id: areaId }) => (
                <Fragment key={`${key}-${areaName}-${areaId}`}>
                  <tr>
                    <td colSpan={8}>{areaNames[0].name}</td>
                  </tr>
                  {pokemon_encounters.length > 0 ? (
                    <>
                      {pokemon_encounters.map(({ pokemon, version_details }, i) => {
                        const { name: pokemonName, url } = pokemon;

                        return (
                          <TableRow key={`${areaName}-${areaId}-${pokemonName}`}>
                            <UppercasedTd>{pokemonName}</UppercasedTd>
                          </TableRow>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={8}>No Pokemon Encounters</td>
                    </tr>
                  )}
                </Fragment>
              ),
            )}
          </TableBody>
        </MovesTableEl>
      </TableContainer>
    </AnimatePresence>
  );
};

export default LocationTable;
