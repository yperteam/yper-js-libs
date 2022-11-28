const size = {
  small: "576px",
  medium: "768px",
  large: "992px",
  xlarge: "1200px",
  xxlarge: "1400px",
};

export const device = {
  mobileXS: `(max-width: ${size.small})`,
  mobile: `(min-width: ${size.small})`,
  tablet: `(min-width: ${size.medium})`,
  tabletL: `(min-width: ${size.large})`,
  desktop: `(min-width: ${size.xlarge})`,
  desktopL: `(min-width: ${size.xxlarge})`,
};
