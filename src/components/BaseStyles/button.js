import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  padding: 10px 20px;
  margin: 0 auto;

  background-color: black;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;

  border: none;
  outline: none;
  overflow: hidden;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 295%;
    width: 140%;
    background: white;
    transition: all 0.4s ease-in-out;
    transform: translateX(-85%) translateY(-25%) rotate(45deg);
    z-index: -1;
  }

  &:hover {
    color: black;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);

    &:after {
      transform: translateX(-10.5%) translateY(-25%) rotate(45deg);
    }
  }

  &:active {
    color: black;
    box-shadow: none;

    &:after {
      transform: scale(1.5);
    }
  }
`

export { Button }
