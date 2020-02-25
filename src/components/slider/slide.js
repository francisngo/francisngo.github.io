import React, { memo } from 'react';
import { css } from 'styled-components';

const Slide = ({ content, images }) => (
	<>
		{images ? (
			<div
				css={css`
					height: 100%;
					width: 80%;
					background-image: url(${content});
					background-size: cover;
					background-repeat: no-repeat;
					background-position: center;
				`}
			/>
		):(
			<div
				css={css`
					height: 100%;
					width: 80%;
				`}
			>
				{content}
			</div>
		)}
	</>
);

const MemoSlide = memo(Slide);
export default MemoSlide;