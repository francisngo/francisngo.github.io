import React from 'react';
import {
  IconGithub,
  IconLinkedin,
  IconInstagram,
} from './icons';
import { socialMedia } from '@config';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const FooterContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.white};
  color: ${colors.black};
  text-align: center;
  height: auto;
`;
const SocialContainer = styled.div`
  color: ${colors.black};
  width: 100%;
  max-width: 270px;
  margin: 0 auto 10px;
  display: none;
  ${media.tablet`display: block;`};
`;
const SocialItemList = styled.ul`
  ${mixins.flexBetween};
`;
const SocialLink = styled.a`
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Copy = styled.p`
  margin: 5px 0 3px;
`;
const GithubLink = styled.a`
  color: ${colors.black};
  font-family: ${fonts.Calibre};
  font-size: ${fontSizes.small};
`;

const Footer = () =>  {
  return (
    <FooterContainer>
      <SocialContainer>
        <SocialItemList>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <SocialLink
                  href={url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
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
              </li>
            ))}
        </SocialItemList>
      </SocialContainer>
      <Copy>
        <GithubLink
          href="https://github.com/francisngo/francisngo.github.io"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Designed &amp; Built by Francis Ngo
        </GithubLink>
      </Copy>
    </FooterContainer>
  );
}

export default Footer;
