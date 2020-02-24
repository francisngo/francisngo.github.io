import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Layout from '@components/layout';
import Slider from '@components/slider';

const images = [
	'https://live.staticflickr.com/7315/27971877836_9aa8b93bcd_b.jpg',
	'https://live.staticflickr.com/7427/27971878006_4047ff4b76_b.jpg',
	'https://live.staticflickr.com/7651/28006510735_abd4264863_b.jpg',
	'https://live.staticflickr.com/7724/27726377880_a0ecf0a898_b.jpg',
	'https://live.staticflickr.com/7609/28006513435_9e9618c4c0_b.jpg'
]

const GalleryPage = ({ location }) => {
	return (
		<Layout location={location}>
			<Helmet>
				<title>Gallery | Francis Ngo</title>
				<link rel="canonical" href="https://francisngo.me/gallery" />
			</Helmet>

			<Slider slides={images} />
		</Layout>
	)
}

GalleryPage.propTypes = {
	location: PropTypes.object.isRequired,
};

export default GalleryPage;
