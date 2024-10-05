// components
import {
  Accordion,
  AccordionDetails,
  type AccordionProps,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

interface SpriteAccordionProps extends Partial<AccordionProps> {
  title: string;
  sprites: { label: string; imageUrl: string | null }[];
  spriteWidth?: string | number;
  pixelatedimg?: boolean;
}

const SpriteAccordion = ({
  title,
  sprites,
  spriteWidth = 140,
  pixelatedimg,
  ...rest
}: SpriteAccordionProps): JSX.Element => (
  <Accordion {...rest}>
    <AccordionSummary aria-controls={`${title}-controls`} id={`${title}-header`}>
      {title}
    </AccordionSummary>
    <AccordionDetails>
      <Stack flexDirection="row" gap={2} justifyContent="space-evenly" flexWrap="wrap">
        {sprites.map(({ imageUrl, label }) => (
          <Stack key={label} alignItems="center" justifyContent="space-between" gap={1}>
            {imageUrl && (
              <ImageNextV2
                pixelatedimg={pixelatedimg}
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

export default SpriteAccordion;
