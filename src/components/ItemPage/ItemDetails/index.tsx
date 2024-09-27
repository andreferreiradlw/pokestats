// types
import type { ItemCategory } from 'pokenode-ts';
// helpers
import { findEnglishName, type ExtractedItem } from '@/helpers';
// components
import { Grid2, type Grid2Props, Typography } from '@mui/material';
import { Table } from '@/BaseStyles';
import { PokeCurrency } from './StyledItemDetails';

interface ItemDetailsProps extends Grid2Props {
  item: ExtractedItem;
  category: ItemCategory;
}

const ItemDetails = ({ item, category, ...rest }: ItemDetailsProps): JSX.Element => {
  // data
  const { cost, fling_power, id, generationIntroduced } = item;

  return (
    <Grid2 gap={2} flexDirection="column" {...rest}>
      <Typography variant="sectionTitle">Item Details</Typography>
      <Table>
        <tbody>
          <tr>
            <th>Item №</th>
            <Typography component="td">{`#${id}`}</Typography>
          </tr>
          <tr>
            <th>Introduced in</th>
            <Typography component="td">{generationIntroduced}</Typography>
          </tr>
          <tr>
            <th>Category</th>
            <Typography component="td">{findEnglishName(category.names)}</Typography>
          </tr>
          <tr>
            <th>Cost</th>
            <Typography component="td">
              <PokeCurrency>$</PokeCurrency>
              {cost}
            </Typography>
          </tr>
          {fling_power && (
            <tr>
              <th>Fling Power</th>
              <Typography component="td">{fling_power}</Typography>
            </tr>
          )}
        </tbody>
      </Table>
    </Grid2>
  );
};

export default ItemDetails;
