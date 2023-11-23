import 'styled-components';

interface Font {
  bold24: RuleSet<object>;
  bold16: RuleSet<object>;
  bold14: RuleSet<object>;
  bold12: RuleSet<object>;
  medium24: RuleSet<object>;
  medium16: RuleSet<object>;
  medium14: RuleSet<object>;
  medium12: RuleSet<object>;
  light24: RuleSet<object>;
  light16: RuleSet<object>;
  light14: RuleSet<object>;
  light12: RuleSet<object>;
}

interface Color {
  grayscale: {
    white: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    black: string;
  };
  mainColor: {
    blueMain: string;
    blueDark: string;
    blueLight: string;
    blueOutline: string;
    blueFocus: string;
  };
  system: {
    success: string;
    info: string;
    warning: string;
    alert: string;
  };
  rainbow: {
    baekjoon: string;
    programmers: string;
    leetcode: string;
    rainbowLilac: string;
    rainbowViolet: string;
    rainbowCornFlower: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    font: Font;
  }
}
