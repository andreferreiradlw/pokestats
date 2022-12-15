import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  display: flex;
  flex-basis: auto;
  font-weight: 300;
  width: 100%;

  & span {
    margin: 1rem 0;
  }
`;

const TextContainer = styled.span`
  display: flex;
  gap: 0.5em;
`;

const FooterA = styled.a`
  color: inherit;
  font-weight: 500;
  padding: 0 0 5px;
  position: relative;
  transition: ease-out 0.3s 0.1s;

  &:after {
    background: white;
    bottom: 0;
    content: '';
    height: 2px;
    left: 0px;
    position: absolute;
    transform: scaleX(0);
    transition: 0.3s;
    width: 100%;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  & img {
    height: 25px;
    vertical-align: middle;
  }

  & svg {
    fill: white;
    margin-left: 10px;
    vertical-align: bottom;
    width: 20px;
  }
`;

export { FooterContainer, TextContainer, FooterA };
