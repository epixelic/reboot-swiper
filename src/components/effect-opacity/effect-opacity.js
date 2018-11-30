import Utils from '../../utils/utils';

const Opacity = {
  setTranslate() {
    const swiper = this;
    const { slides } = swiper;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = swiper.slides.eq(i);
      const slideOpacity = 1 - Math.min(Math.min(Math.abs($slideEl[0].progress), 1), 1 - swiper.params.opacityEffect.minOpacity);
      $slideEl.css({ opacity: slideOpacity });
    }
  },
  setTransition(duration) {
    const swiper = this;
    const { slides } = swiper;
    slides.transition(duration);
  },
};

export default {
  name: 'effect-opacity',
  params: {
    opacityEffect: {
      minOpacity: 0.2,
    },
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      opacityEffect: {
        setTranslate: Opacity.setTranslate.bind(swiper),
        setTransition: Opacity.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'opacity') return;
      swiper.classNames.push(`${swiper.params.containerModifierClass}opacity`);
      const overwriteParams = {
        watchSlidesProgress: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      if (swiper.params.effect !== 'opacity') return;
      swiper.opacityEffect.setTranslate();
    },
    setTransition(duration) {
      const swiper = this;
      if (swiper.params.effect !== 'opacity') return;
      swiper.opacityEffect.setTransition(duration);
    },
  },
};
