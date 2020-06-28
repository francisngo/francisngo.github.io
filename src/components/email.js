import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { email } from '@config';
import styled from 'styled-components';
import { theme, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const EmailContainer = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  right: 40px;
  color: ${colors.lightSlate};
  ${media.desktop`right: 25px;`};
  ${media.tablet`display: none;`};
`;
const EmailLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${colors.lightSlate};
  }
`;
const EmailLink = styled.a`
  font-family: ${fonts.Calibre};
  font-size: ${fontSizes.small};
  letter-spacing: 0.5px;
  writing-mode: vertical-rl;
  margin: 20px auto;
  padding: 10px;

  &:hover,
  &:focus {
    transform: translateY(-3px);
  }
`;

const Email = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;
    const timeout = setTimeout(() => setIsMounted(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <EmailContainer>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={isHome ? 3000 : 0} classNames={isHome ? 'fade' : ''}>
            <EmailLinkWrapper>
              <EmailLink href={`mailto:${email}`}>{email}</EmailLink>
            </EmailLinkWrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    </EmailContainer>
  );
}

Email.propTypes = {
  isHome: PropTypes.bool,
}

export default Email;
