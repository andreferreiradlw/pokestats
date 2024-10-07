'use client';

import { styled } from '@mui/material';
// svg
import QuestionMarkIcon from 'public/static/iconLibrary/question_mark.svg';

export const QuestionMark = styled(QuestionMarkIcon)(({ theme }) => ({
  width: '20%',
  height: 'auto',
  fill: theme.palette.text.primary,
}));
