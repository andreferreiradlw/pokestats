import styled, { css } from 'styled-components';
// types
import type { DropdownProps } from './index';
// components
import Box from '@/components/Box';
// icons
import Chevron from 'public/static/iconLibrary/chevron.svg';

const DropDownContainer = styled(Box)``;

const Label = styled.label`
  font-weight: 500;
`;

const SelectContainer = styled.div<{ minWidth?: DropdownProps['minWidth'] }>`
  position: relative;
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
`;

const ChevronIcon = styled(Chevron)`
  transition: transform 0.2s ease-in-out;
  width: 1.5em;
`;

const SelectButton = styled.button<{ $isOpen: Boolean }>`
  align-items: center;
  border-radius: ${({ $isOpen }) => ($isOpen ? '5px 5px 0 0' : '5px')};
  display: flex;
  font-size: 1em;
  font-weight: 500;
  gap: 0.5em;
  justify-content: space-between;
  padding: 0.2em 0.5em;
  position: relative;
  transition: background 0.2s ease-in-out;
  width: 100%;
  z-index: 2;

  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    border: 2px solid ${theme.colors.secondary.main};
    color: ${theme.colors.primary.contrastText};
  `}

  ${({ $isOpen }) => css`
    border-radius: ${$isOpen ? '5px 5px 0 0' : '5px'};

    ${$isOpen &&
    css`
      ${ChevronIcon} {
        transform: rotate(180deg);
      }
    `}
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    cursor: pointer;
  }
`;

const SelectDropdown = styled.ul`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    border: 2px solid ${theme.colors.secondary.main};
    color: ${theme.colors.primary.contrastText};
  `}

  border-radius: 0 0 5px 5px;
  border-top: none;
  font-size: 1em;
  font-weight: 500;
  list-style: none;
  margin: 0;
  min-width: 100%;
  padding: 0;
  position: absolute;
  z-index: 1;
`;

const SelectDropdownItem = styled.li<{
  $isSelected: Boolean;
}>`
  ${({ $isSelected, theme }) =>
    $isSelected
      ? css`
          background: ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.contrastText};
        `
      : css`
          &:hover {
            background: ${theme.colors.primary.light};
          }
        `}

  label {
    cursor: pointer;
    display: flex;
    padding: 0.2em 0.5em;
    white-space: nowrap;
    width: 100%;

    input[type='radio'] {
      height: 0;
      margin: 0;
      opacity: 0;
      overflow: hidden;
      padding: 0;
      width: 0;
    }
  }
`;

export {
  DropDownContainer,
  Label,
  SelectContainer,
  ChevronIcon,
  SelectButton,
  SelectDropdown,
  SelectDropdownItem,
};
