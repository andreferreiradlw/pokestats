import {
  Skeleton,
  Stack,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SpritesPageSkeleton = (): JSX.Element => {
  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">
        <Skeleton width="200px" />
      </Typography>

      {/* Main Sprites Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="sectionTitle">
            <Skeleton width="150px" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </AccordionDetails>
      </Accordion>

      {/* Other Forms Section */}
      <Divider />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="sectionTitle">
            <Skeleton width="150px" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </AccordionDetails>
      </Accordion>

      {/* Other Sprites Section */}
      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="sectionTitle">
            <Skeleton width="150px" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </AccordionDetails>
      </Accordion>

      {/* Sprites by Generation */}
      <Divider />
      <Stack gap={4}>
        <Typography variant="sectionTitle">
          <Skeleton width="200px" />
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="sectionSubTitle">
              <Skeleton width="150px" />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Divider />

      {/* Navigation */}
      <Skeleton variant="rectangular" width="100%" height={60} />
    </Stack>
  );
};

export default SpritesPageSkeleton;
