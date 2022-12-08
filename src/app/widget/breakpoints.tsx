export const size: { [id: string]: number; } = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
  xxlarge: 1400,
};

export const device = {
  mobileXS: `(max-width: ${size.small}px)`,
  mobile: `(min-width: ${size.small}px)`,
  tablet: `(min-width: ${size.medium}px)`,
  tabletL: `(min-width: ${size.large}px)`,
  desktop: `(min-width: ${size.xlarge}px)`,
  desktopL: `(min-width: ${size.xxlarge}px)`,
};
