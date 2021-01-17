import styled from 'styled-components'

const SwitchContainer = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  width: 108px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  vertical-align: sub;

  &:hover {
    cursor: pointer;
  }
`

const SwitchInput = styled.input`
  display: none;
`

const SwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50px;
  border: 2px solid rgb(19, 29, 34);
  background-color: rgb(19, 29, 34);
`

const SwitchDisplay = styled.span`
  display: block;
  width: 200%;
  margin-left: ${({ enabled }) => (enabled ? '-100%' : '0')};
  transition: margin 0.3s ease-in-out;

  &:before,
  &:after {
    display: block;
    float: left;
    width: 50%;
    height: 27px;
    padding: 0;
    line-height: 27px;
    font-size: 16px;
    box-sizing: border-box;
  }

  &:before {
    content: 'Attack';
    padding-left: 10px;
    text-align: left;
    background-color: black;
    color: white;
  }

  &:after {
    content: 'Defense';
    padding-right: 7px;
    text-align: right;
    background-color: white;
    color: black;
  }
`

const SwitchControl = styled.span`
  display: block;
  width: 31px;
  height: 31px;
  margin: 0px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${({ enabled }) => (enabled ? '77px' : '0')};
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  border: 2px solid rgb(19, 29, 34);
  background-color: white;
`

export default function Switch({ enabled, onClick, ...rest }) {
  return (
    <SwitchContainer {...rest}>
      <SwitchInput onClick={onClick} type="checkbox" id="multiplierswitch" />
      <SwitchLabel htmlFor="multiplierswitch">
        <SwitchDisplay enabled={enabled} />
        <SwitchControl enabled={enabled} />
      </SwitchLabel>
    </SwitchContainer>
  )
}
