// types
import type { ItemCategory } from 'pokenode-ts';
// helpers
import { findEnglishName, removeDash, type ExtractedItem } from '@/helpers';
// components
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  type Grid2Props,
  Stack,
  Typography,
} from '@mui/material';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import { QuestionMark } from './styledCategoryItems';

export interface CategoryItemsProps extends Grid2Props {
  category: ItemCategory;
  categoryItems: ExtractedItem[];
}

const CategoryItems = ({ category, categoryItems, ...rest }: CategoryItemsProps): JSX.Element => (
  <Grid2 container size={12} spacing={2} direction="column" {...rest}>
    <Grid2 size={12} component={Typography} variant="sectionTitle">
      {`Other ${removeDash(findEnglishName(category.names))} Category Items`}
    </Grid2>
    <Grid2 container size={12} gap={2} flexWrap="wrap">
      {categoryItems.map(({ id, sprite, names, shortEntry, name }) => (
        <Grid2 size={{ xxs: 12, xs: 6, md: 4, lg: 2 }} key={id}>
          <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack alignItems="center" justifyContent="center">
              {sprite === '' ? (
                <Stack width="100%" height={100} justifyContent="center" alignItems="center">
                  <QuestionMark />
                </Stack>
              ) : (
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={sprite}
                  alt={`image of ${name} item`}
                />
              )}
            </Stack>
            <CardContent>
              <Typography variant="sectionSubTitle" gutterBottom>
                {findEnglishName(names)}
              </Typography>
              {shortEntry && <Typography variant="subtitle2">{shortEntry}</Typography>}
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <CustomButton
                variant="contained"
                color="secondary"
                size="small"
                component={Link}
                href={`/item/${name}`}
              >
                Item Details
              </CustomButton>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  </Grid2>
);

export default CategoryItems;
