import styled from 'styled-components';

const SwitchContainer = styled.div`
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  margin-bottom: 0.5rem;
  position: relative;
  vertical-align: sub;
  width: 108px;

  &:hover {
    cursor: pointer;
  }
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchLabel = styled.label`
  background-color: rgb(19, 29, 34);
  border: 2px solid rgb(19, 29, 34);
  border-radius: 50px;
  cursor: pointer;
  display: block;
  overflow: hidden;
`;

const SwitchDisplay = styled.span<{ enabled?: MultipliersSwitchProps['enabled'] }>`
  display: block;
  margin-left: ${({ enabled }) => (enabled ? '-100%' : '0')};
  transition: margin 0.3s ease-in-out;
  width: 200%;

  &:before,
  &:after {
    box-sizing: border-box;
    display: block;
    float: left;
    font-size: 16px;
    height: 27px;
    line-height: 27px;
    padding: 0;
    width: 50%;
  }

  &:before {
    background-color: black;
    color: white;
    content: 'Attack';
    padding-left: 10px;
    text-align: left;
  }

  &:after {
    background-color: white;
    color: black;
    content: 'Defense';
    padding-right: 7px;
    text-align: right;
  }
`;

const SwitchControl = styled.span<{ enabled?: MultipliersSwitchProps['enabled'] }>`
  background-color: white;
  border: 2px solid rgb(19, 29, 34);
  border-radius: 50px;
  bottom: 0;
  display: block;
  height: 31px;
  margin: 0px;
  position: absolute;
  right: ${({ enabled }) => (enabled ? '77px' : '0')};
  top: 0;
  transition: all 0.3s ease-in-out;
  width: 31px;
`;

interface MultipliersSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  enabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const MultipliersSwitch = ({ enabled, onClick, ...rest }: MultipliersSwitchProps) => {
  return (
    <SwitchContainer {...rest}>
      <SwitchInput onClick={onClick} type="checkbox" id="multiplierswitch" />
      <SwitchLabel htmlFor="multiplierswitch">
        <SwitchDisplay enabled={enabled} />
        <SwitchControl enabled={enabled} />
      </SwitchLabel>
    </SwitchContainer>
  );
};

export default MultipliersSwitch;
