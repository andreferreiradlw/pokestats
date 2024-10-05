// components
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

interface SpriteAccordionProps {
  title: string;
  sprites: { label: string; imageUrl: string | null }[];
  spriteWidth?: string | number;
  defaultExpanded: boolean;
}

const SpriteAccordion = ({
  title,
  sprites,
  spriteWidth = 140,
  defaultExpanded,
}: SpriteAccordionProps): JSX.Element => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary aria-controls={`${title}-controls`} id={`${title}-header`}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack flexDirection="row" gap={2} justifyContent="space-evenly" flexWrap="wrap">
          {sprites.map(({ imageUrl, label }) => (
            <Stack key={label} alignItems="center" justifyContent="space-between" gap={1}>
              {imageUrl && (
                <ImageNextV2
                  alt={label}
                  imageUrl={imageUrl}
                  customKey={label}
                  width={spriteWidth}
                  height="auto"
                />
              )}
              <Typography>{label}</Typography>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SpriteAccordion;
