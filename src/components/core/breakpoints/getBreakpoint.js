import { window } from 'ssr-window';

export default function (breakpoints) {
  const swiper = this;
  // Get breakpoint for window width
  if (!breakpoints) return undefined;
  let breakpoint = false;
  const points = [];
  Object.keys(breakpoints)
    .forEach((point) => {
      points.push(point);
    });
  points.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    let innerWidth = window.innerWidth;
    if (typeof swiper.params.breakpointsReferenceCallback === 'function') {
      innerWidth = swiper.params.breakpointsReferenceCallback();
    }

    if (swiper.params.breakpointsInverse) {
      if (point <= innerWidth) {
        breakpoint = point;
      }
    } else if (point >= innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}
