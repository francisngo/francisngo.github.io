import React, { useState, useEffect, useRef, useCallback } from 'react';
import { css } from 'styled-components';
import SliderContent from './slidercontent';
import Slide from './slide';
import Arrow from './arrow';
import Dots from './dots';

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

const Slider = props => {
  const getWidth = () => window.innerWidth;
  const contentRef = useRef(null);

  const { slides } = props;

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [slides[slides.length - 1], ...slides, slides[0]],
  });

  const { activeIndex, translate, _slides, transition } = state;

  /** smoothTransition */
  const smoothTransition = useCallback(() => {
    if (activeIndex === 0 && translate > getWidth())
      return setState({ ...state, transition: 0, translate: getWidth() });

    if (activeIndex === slides.length - 1 && translate === 0) {
      return setState({
        ...state,
        transition: 0,
        translate: getWidth() * slides.length,
      });
    }
  }, [activeIndex, slides, translate, state]);

  /** Listen for CSS transform transition. */
  useEffect(() => {
    const currentRef = contentRef.current;
    currentRef.addEventListener('transitionend', smoothTransition);
    return () =>
      currentRef.removeEventListener('transitionend', smoothTransition);
  }, [activeIndex, smoothTransition]);

  /** Reset transition once we have positioned the translate to it's proper value. */
  useEffect(() => {
    if (transition === 0) {
      setState({ ...state, transition: 0.45 });
    }
  }, [transition, state]);

  /** nextSlide */
  const nextSlide = () => {
    const next = (activeIndex + 2) * getWidth();

    if (activeIndex === slides.length - 1) {
      return setState({
        ...state,
        activeIndex: 0,
        translate: next,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: next,
    });
  };

  /** prevSlide */
  const prevSlide = () => {
    const prev = activeIndex * getWidth();

    if (activeIndex === 0) {
      return setState({
        ...state,
        activeIndex: slides.length - 1,
        translate: prev,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: prev,
    });
  };

  return (
    <div css={SliderCSS}>
      <SliderContent
        ref={contentRef}
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((_slide, i) => (
          <Slide key={_slide + i} content={_slide} images />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={slides} activeIndex={activeIndex} />
    </div>
  );
};

export default Slider;
