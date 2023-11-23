import { css } from 'styled-components';

const FONT_WEIGHT_700 = 'font-weight: 700;';
const FONT_WEIGHT_500 = 'font-weight: 500;';
const FONT_WEIGHT_300 = 'font-weight: 300;';

const bold24 = css`
  font-size: 1.5rem;
  ${FONT_WEIGHT_700}
`;
const bold16 = css`
  font-size: 1rem;
  ${FONT_WEIGHT_700}
`;
const bold14 = css`
  font-size: 0.875rem;
  ${FONT_WEIGHT_700}
`;
const bold12 = css`
  font-size: 0.75rem;
  ${FONT_WEIGHT_700}
`;
const medium24 = css`
  font-size: 1.5rem;
  ${FONT_WEIGHT_500}
`;
const medium16 = css`
  font-size: 1rem;
  ${FONT_WEIGHT_500}
`;
const medium14 = css`
  font-size: 0.875rem;
  ${FONT_WEIGHT_500}
`;
const medium12 = css`
  font-size: 0.75rem;
  ${FONT_WEIGHT_500}
`;
const light24 = css`
  font-size: 1.5rem;
  ${FONT_WEIGHT_300}
`;
const light16 = css`
  font-size: 1rem;
  ${FONT_WEIGHT_300}
`;
const light14 = css`
  font-size: 0.875rem;
  ${FONT_WEIGHT_300}
`;
const light12 = css`
  font-size: 0.75rem;
  ${FONT_WEIGHT_300}
`;

const font = {
  bold24,
  bold16,
  bold14,
  bold12,
  medium24,
  medium16,
  medium14,
  medium12,
  light24,
  light16,
  light14,
  light12,
};

const color = {
  grayscale: {
    white: '#FFFFFF',
    50: '#F5F7F9',
    100: '#D2DAE0',
    200: '#879298',
    300: '#6E8091',
    400: '#5F6E76',
    500: '#393F44',
    black: '#14212B',
  },
  mainColor: {
    blueMain: '#4B5AEA',
    blueDark: '#3443C5',
    blueLight: '#8798FF',
    blueOutline: '#C7DCFF',
    blueFocus: '#EFF8FF',
    blueGradient: 'linear-gradient(135deg, #924FFF 17.03%, #3848E6 79.69%)',
  },
  system: {
    success: '#06C755',
    info: '#4891FF',
    warning: '#FFD748',
    alert: '#FF334B',
  },
  rainbow: {
    baekjoon: '#2F77BB',
    programmers: '#222B3C',
    leetcode: '#ECA240',
    rainbowLilac: '#A8BBFF',
    rainbowViolet: '#9881E7',
    rainbowCornFlower: '#A1C4FE',
  },
};

export const theme = {
  font,
  color,
  maxWidth: '1100px',
};
