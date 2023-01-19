import { useState, useRef, useEffect, ChangeEvent } from 'react';
// types
import type { BoxProps } from '@/components/Box';
// styles
import {
  DropDownContainer,
  Label,
  SelectContainer,
  ChevronIcon,
  SelectButton,
  SelectDropdown,
  SelectDropdownItem,
} from './StyledDropdown';

export interface DropdownProps extends BoxProps {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  label?: string;
  namespace?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  minWidth?: string;
  sizeSmall?: boolean;
}

const isSafari = () => {
  const chromeInAgent = navigator.userAgent.indexOf('Chrome') > -1;
  const safariInAgent = navigator.userAgent.indexOf('Safari') > -1;
  return safariInAgent && !chromeInAgent;
};

const registerOpenDropdownHandlers = ({
  options,
  optionsLength,
  activeIndex,
  setActiveIndex,
  select,
  namespace,
}) => {
  const keyDownCallback = (e: KeyboardEvent): void => {
    e.preventDefault();
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? optionsLength - 1 : activeIndex - 1);
        return;
      case 'Down':
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(activeIndex + 1 === optionsLength ? 0 : activeIndex + 1);
        return;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        select(options[activeIndex].value);
        return;
      case 'Esc':
      case 'Escape':
        e.preventDefault();
        select(false);
        return;
      case 'PageUp':
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        return;
      case 'PageDown':
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;
    }
  };

  const onClick = (e: KeyboardEvent) => {
    if (
      !e
        .composedPath()
        .find((e: HTMLElement) => e.dataset && e.dataset.namespace === namespace + '-dropdown-root')
    ) {
      // Did not found in path, closing
      e.preventDefault();
      select(false);
    }
  };
  document.addEventListener('keydown', keyDownCallback);
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('keydown', keyDownCallback);
    document.removeEventListener('click', onClick);
  };
};

const registerClosedDropdownHandlers = ({ setIsDropdownOpen }) => {
  const keyDownCallback = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case ' ': // Space
      case 'Enter':
        e.preventDefault();
        setIsDropdownOpen(true);
    }
  };
  document.addEventListener('keydown', keyDownCallback);

  return () => {
    document.removeEventListener('keydown', keyDownCallback);
  };
};

const useAccessibleDropdown = ({ options, value, onChange, namespace }) => {
  const [isDropdownOpen, setIsDropdownOpenInternal] = useState(false);
  const listRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const select = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) onChange?.(event);
    setIsDropdownOpen(false);
  };

  const setIsDropdownOpen = (isOpen: boolean) => {
    if (isOpen) {
      const selected = options.findIndex(
        (option: { value: string; label: string }) => option.value === value,
      );
      setActiveIndex(selected < 0 ? 0 : selected);
      if (listRef?.current && isSafari()) {
        requestAnimationFrame(() => {
          // @ts-ignore
          listRef.current.focus();
        });
      }
    } else {
      if (listRef?.current && isSafari()) {
        requestAnimationFrame(() => {
          // @ts-ignore
          listRef.current.previousSibling.focus();
        });
      }
    }
    setIsDropdownOpenInternal(isOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      return registerOpenDropdownHandlers({
        options,
        activeIndex,
        setActiveIndex,
        optionsLength: options.length,
        select,
        namespace,
      });
    } else {
      if (isFocus)
        return registerClosedDropdownHandlers({
          setIsDropdownOpen,
        });
    }
  }, [isDropdownOpen, activeIndex, isFocus, namespace]);

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeIndex,
    setActiveIndex,
    select,
    setIsFocus,
    listRef,
  };
};

const Dropdown = ({
  label,
  options,
  value,
  namespace = 'select_namespace',
  onChange,
  minWidth,
  sizeSmall,
  ...rest
}: DropdownProps): JSX.Element => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    activeIndex,
    setActiveIndex,
    select,
    setIsFocus,
    listRef,
  } = useAccessibleDropdown({ options, value, onChange, namespace });

  const chosenOption = options.find(o => o.value === value);

  return (
    <DropDownContainer
      flexdirection="row"
      flexalign="center"
      flexjustify="center"
      flexgap="0.5em"
      width="auto"
      {...rest}
    >
      {label && <Label id={`${namespace}_label`}>{`${label}:`}</Label>}
      <SelectContainer data-namespace={`${namespace}-dropdown-root`} minWidth={minWidth}>
        <SelectButton
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          role="combobox"
          aria-autocomplete="none"
          aria-labelledby={`${namespace}_label`}
          aria-haspopup="listbox"
          aria-controls={`${namespace}_dropdown`}
          aria-expanded={isDropdownOpen}
          aria-activedescendant={`${namespace}_element_${value}`}
          $isOpen={isDropdownOpen}
          $isSmall={sizeSmall}
        >
          {chosenOption?.label}
          <ChevronIcon />
        </SelectButton>
        {isDropdownOpen && (
          <SelectDropdown ref={listRef} role="listbox" id={`${namespace}_dropdown`} tabIndex={-1}>
            {options.map(({ label, value: optionValue }, i) => (
              <SelectDropdownItem
                key={optionValue}
                id={`${namespace}_element_${optionValue}`}
                aria-selected={i === activeIndex}
                role="option"
                onMouseOver={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                $isSelected={chosenOption?.value === optionValue}
                $isSmall={sizeSmall}
              >
                <label>
                  <input
                    type="radio"
                    name={`${namespace}_radio`}
                    value={optionValue}
                    checked={chosenOption?.value === optionValue}
                    onChange={e => select(e)}
                  />
                  <span>{label}</span>
                </label>
              </SelectDropdownItem>
            ))}
          </SelectDropdown>
        )}
      </SelectContainer>
    </DropDownContainer>
  );
};

export default Dropdown;
