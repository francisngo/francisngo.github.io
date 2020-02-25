import React from 'react';
import { css } from 'styled-components';

const Dot = ({ active }) => (
	<span
		css={css`
			padding: 5px;
			margin-right: 5px;
			cursor: pointer;
			border-radius: 50%;
			background: ${active ? 'black' : 'rgba(255, 255, 255, 0.2)'}
		`}
	/>
);

const Dots = ({ slides, activeIndex }) => (
	<div
		css={css`
			position: absolute; 
			bottom: 25px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		`}
	>
		{Array.isArray(slides) && slides.map((slides, i) => (
			<Dot key={i} active={activeIndex === i} />
		))}
	</div>
);

export default Dots;