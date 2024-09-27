import { useMemo } from 'react';
// types
import type { Name } from 'pokenode-ts';
// data
import { languageCodes, languageSortOrder } from '@/constants';
// components
import { Table } from '@/BaseStyles';
import { Grid2, Typography, type Grid2Props } from '@mui/material';

interface LanguageTableProps extends Grid2Props {
  names: Name[];
}

const LanguageTable = ({ names, ...rest }: LanguageTableProps): JSX.Element => {
  const sortedNames = useMemo(() => {
    return (
      names
        // Filter names that exist in the languageCodes
        .filter(({ language }) => language.name in languageCodes)
        // Sort based on the predefined languageSortOrder
        .sort(
          (a, b) =>
            languageSortOrder[languageCodes[a.language.name]] -
            languageSortOrder[languageCodes[b.language.name]],
        )
    );
  }, [names]);

  return (
    <Grid2 container size={12} spacing={2} direction="column" {...rest}>
      <Grid2 size={12} component={Typography} variant="sectionTitle">
        Other Languages
      </Grid2>
      <Grid2 size={12}>
        <Table>
          <tbody>
            {sortedNames.map(({ language, name }) => (
              <tr key={name}>
                <th>{languageCodes[language.name]}</th>
                <Typography component="td">{name}</Typography>
              </tr>
            ))}
          </tbody>
        </Table>
      </Grid2>
    </Grid2>
  );
};

export default LanguageTable;
