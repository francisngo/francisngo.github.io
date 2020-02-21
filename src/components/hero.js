import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { email } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

const HeroContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const Name = styled.h2`
  font-size: 75px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 65px;`};
  ${media.tablet`font-size: 55px;`};
  ${media.phablet`font-size: 45px;`};
  ${media.phone`font-size: 35px;`};
`;
const Subtitle = styled.h3`
  font-size: 75px;
  line-height: 1.1;
  color: ${colors.black};
  ${media.desktop`font-size: 65px;`};
  ${media.tablet`font-size: 55px;`};
  ${media.phablet`font-size: 45px;`};
  ${media.phone`font-size: 35px;`};
`;
const Blurb = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const EmailLink = styled.a`
  ${mixins.bigButton};
  font-size: ${fontSizes.smallish};
  margin-top: 50px;
`;

class Hero extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = {
    isMounted: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isMounted: true }), 1000);
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    const { data } = this.props;
    const { isMounted } = this.state;
    const { frontmatter, html } = data[0].node;

    const one = () => (
      <Name style={{ transitionDelay: '200ms' }}>{frontmatter.name}</Name>
    );
    const two = () => (
      <Subtitle style={{ transitionDelay: '300ms' }}>
        {frontmatter.subtitle}
      </Subtitle>
    );
    const three = () => (
      <Blurb
        style={{ transitionDelay: '400ms' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
    const four = () => (
      <div style={{ transitionDelay: '500ms' }}>
        <EmailLink href={`mailto:${email}`}>Get In Touch</EmailLink>
      </div>
    );

    const items = [one, two, three];

    return (
      <HeroContainer>
        <TransitionGroup>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={3000}>
                {item}
              </CSSTransition>
            ))}
        </TransitionGroup>
      </HeroContainer>
    );
  }
}

export default Hero;
