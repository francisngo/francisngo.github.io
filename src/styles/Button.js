import styled from 'styled-components';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const Button = styled.button`
  color: ${colors.black};
  background-color: transparent;
  border: 1px solid ${colors.black};
  border-radius: ${theme.borderRadius};
  font-size: ${fontSizes.small};
  font-family: ${fonts.Calibre};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: ${theme.transition};
  padding: 18px 23px;

  &:hover,
  &:focus,
  &:active {
    background-color: ${colors.transGreen};
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

export default Button;
