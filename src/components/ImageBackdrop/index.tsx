import { useState, useCallback, type MouseEvent } from 'react';
// components
import { Backdrop, Button, Grid2, Stack, Snackbar, Alert } from '@mui/material';
import ImageNextV2 from '../ImageNextV2';
// icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageIcon from '@mui/icons-material/Image';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import TabIcon from '@mui/icons-material/Tab';

interface ImageBackdropProps {
  src: string;
  alt: string;
  key: string;
}

const ImageBackdrop = ({ src, alt, key }: ImageBackdropProps): JSX.Element => {
  // States
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Toggle Backdrop
  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // Copy Image URL
  const handleCopyUrl = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Prevent the Backdrop from closing
      try {
        await navigator.clipboard.writeText(src);
        setSnackbarMessage('Image URL copied to clipboard!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to copy URL:', error);
        setSnackbarMessage('Failed to copy URL');
        setSnackbarOpen(true);
      }
    },
    [src],
  );

  // Save Image
  const handleSaveImage = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Prevent the Backdrop from closing

      try {
        // Fetch the image as a blob
        const response = await fetch(src);
        const blob = await response.blob();

        // Create a link element and set it up for downloading the blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = alt || 'downloaded-image';

        // Append to the body, trigger click, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL after download to free up memory
        window.URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Failed to save the image:', error);
        setSnackbarMessage('Failed to save image');
        setSnackbarOpen(true);
      }
    },
    [src, alt],
  );

  // Fullscreen Mode
  const handleFullscreen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the Backdrop from closing
    const imageElement = document.getElementById('fullscreen-image');
    if (imageElement?.requestFullscreen) {
      imageElement.requestFullscreen().catch(error => {
        console.error('Error entering fullscreen mode:', error);
        setSnackbarMessage('Failed to enter fullscreen');
        setSnackbarOpen(true);
      });
    }
  }, []);

  // Snackbar Close
  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <Stack width="100%">
      <ImageNextV2
        imageUrl={src}
        alt={alt}
        key={key}
        onClick={handleToggle}
        sx={{ cursor: 'pointer' }}
        whileHover="hover"
        whileTap="tap"
      />
      <Backdrop
        sx={theme => ({
          zIndex: theme.zIndex.drawer + 1,
          padding: { xxs: 2, md: 4 },
        })}
        open={open}
        onClick={handleToggle}
      >
        <Grid2
          container
          size={12}
          spacing={4}
          py={4}
          maxWidth={theme => theme.breakpoints.values.xl}
          direction={{ xxs: 'column', lg: 'row' }}
        >
          <Grid2 size={{ xxs: 12, lg: 8 }} justifyContent="flex-end" alignItems="flex-start">
            <ImageNextV2
              imageUrl={src}
              alt={alt}
              key={key}
              maxHeight="90vh"
              id="fullscreen-image"
            />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 4 }}>
            <Stack
              gap={2}
              flexDirection={{ xxs: 'row', lg: 'column' }}
              flexWrap="wrap"
              justifyContent={{ xxs: 'center', lg: 'flex-start' }}
            >
              <Button
                size="large"
                variant="contained"
                endIcon={<ContentCopyIcon />}
                onClick={handleCopyUrl}
                aria-label="Copy image URL"
              >
                Copy Image URL
              </Button>
              <Button
                size="large"
                variant="contained"
                endIcon={<ImageIcon />}
                onClick={handleSaveImage}
                aria-label="Save image"
              >
                Download Image
              </Button>
              <Button
                size="large"
                variant="contained"
                endIcon={<FullscreenIcon />}
                onClick={handleFullscreen}
                aria-label="Fullscreen mode"
              >
                Fullscreen Mode
              </Button>
              <Button
                href={src}
                target="_blank"
                size="large"
                variant="contained"
                endIcon={<TabIcon />}
                aria-label="Open in a new tab"
              >
                Open in a new tab
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
      </Backdrop>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ImageBackdrop;
