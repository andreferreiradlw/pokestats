// helpers
import localFont from 'next/font/local';
import { Josefin_Sans, Montserrat, Quicksand } from 'next/font/google';

export const oriFont = localFont({ src: '../../../public/fonts/ori_font.woff2' });

export const JosefinSansFont = Josefin_Sans({ weight: '700', subsets: ['latin'], style: 'normal' });

export const MontserratFont = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const QuicksandFont = Quicksand({ weight: ['600', '700'], subsets: ['latin'] });
