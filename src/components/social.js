import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { socialMedia } from '@config';
import { IconGithub, IconLinkedin, IconInstagram } from './icons';
import styled from 'styled-components';
import { theme, media } from '@styles';
const { colors } = theme;

const SocialContainer = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: 40px;
  color: ${colors.lightSlate};
  ${media.desktop`left: 25px;`};
  ${media.tablet`display: none;`};
`;
const SocialItemList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${colors.lightSlate};
  }
`;
const SocialItem = styled.li`
  &:last-of-type {
    margin-bottom: 20px;
  }
`;
const SocialLink = styled.a`
  padding: 10px;
  &:hover,
  &:focus {
    transform: translateY(-3px);
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Social = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;
    const timeout = setTimeout(() => setIsMounted(true), 2000);
    return () => clearTimeout(timeout);
  }, [isHome]);

  return (
    <SocialContainer>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? 3000: 0}>
            <SocialItemList>
              {socialMedia && socialMedia.map(({ url, name }, i) => (
                <SocialItem key={i}>
                  <SocialLink
                    href={url}
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                    aria-label={name}
                  >
                    {name === 'Github' ? (
                      <IconGithub />
                    ) : name === 'Linkedin' ? (
                      <IconLinkedin />
                    ) : name === 'Instagram' ? (
                      <IconInstagram />
                    ) : (
                      <IconGithub />
                    )}
                  </SocialLink>
                </SocialItem>
              ))}
            </SocialItemList>
          </CSSTransition>
        )}
      </TransitionGroup>
    </SocialContainer>
  );
};

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
