import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '@components/layout';
import Hero from '@sections/hero';
import About from '@sections/about';
import Jobs from '@sections/Jobs';
import Contact from '@sections/contact';

import styled from 'styled-components';
import { mixins, Main } from '../styles';

const MainContainer = styled(Main)`
  ${mixins.padding}
  counter-reset: section;
`;

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <MainContainer id="content">
      <Hero data={data.hero.edges} />
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
      <Contact data={data.contact.edges} />
    </MainContainer>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default IndexPage;

/* eslint no-undef: off */
export const query = graphql`
         query IndexQuery {
           hero: allMarkdownRemark(
             filter: { fileAbsolutePath: { regex: "/hero/" } }
           ) {
             edges {
               node {
                 frontmatter {
                   title
                   name
                   subtitle
                   contactText
                 }
                 html
               }
             }
           }
           about: allMarkdownRemark(
             filter: { fileAbsolutePath: { regex: "/about/" } }
           ) {
             edges {
               node {
                 frontmatter {
                   title
                   avatar {
                     childImageSharp {
                       fluid(
                         maxWidth: 700
                         quality: 90
                         traceSVG: { color: "#8892b0" }
                       ) {
                         ...GatsbyImageSharpFluid_withWebp_tracedSVG
                       }
                     }
                   }
                   skills
                 }
                 html
               }
             }
           }
           jobs: allMarkdownRemark(
             filter: { fileAbsolutePath: { regex: "/jobs/" } }
             sort: { fields: [frontmatter___date], order: DESC }
           ) {
             edges {
               node {
                 frontmatter {
                   title
                   company
                   location
                   range
                   url
                 }
                 html
               }
             }
           }
           contact: allMarkdownRemark(
             filter: { fileAbsolutePath: { regex: "/contact/" } }
           ) {
             edges {
               node {
                 frontmatter {
                   title
                 }
                 html
               }
             }
           }
         }
       `;
