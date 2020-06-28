import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Layout from '@components/layout';

const GalleryPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet>
        <title>Gallery | Francis Ngo</title>
        <link rel="canonical" href="https://francisngo.me/gallery" />
      </Helmet>
    </Layout>
  );
};

GalleryPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GalleryPage;
