import "styled-components";

export class TextStyleClass {
  readonly font: {
    readonly family: string;
    readonly generic: string;
    readonly weight: string;
    readonly size: string;
  };
  readonly lineHeight: string;
  readonly letterSpacing: string;
  readonly style?: string;
  readonly color: string;

  constructor({
    font,
    lineHeight,
    letterSpacing,
    style = "normal",
    color,
  }: {
    font: {
      family: string;
      generic: string;
      weight: string;
      size: string;
    };
    lineHeight: string;
    letterSpacing: string;
    style?: string;
    color: string;
  }) {
    this.font = font;
    this.lineHeight = lineHeight;
    this.letterSpacing = letterSpacing;
    this.style = style;
    this.color = color;
  }

  public copyWith({
    color,
    style,
    fontWeight,
  }: {
    color?: string;
    style?: string;
    fontWeight?: string;
  }) {
    return new TextStyleClass({
      font: {
        family: this.font.family,
        size: this.font.size,
        generic: this.font.generic,
        weight: fontWeight ?? this.font.weight,
      },
      lineHeight: this.lineHeight,
      letterSpacing: this.letterSpacing,
      style: style ? style : "normal",
      color: color ? color + " !important" : this.color,
    });
  }
}

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      transparent: string;
      primary: {
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
      };
      secondary: {
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
      };
      information: {
        "100": string;
        "400": string;
        "700": string;
      };
      success: {
        "100": string;
        "400": string;
        "700": string;
      };
      warning: {
        "100": string;
        "400": string;
        "700": string;
      };
      error: {
        "100": string;
        "400": string;
        "700": string;
      };
      grayscale: {
        "000": string;
        "100": string;
        "200": string;
        "300": string;
        "400": string;
        "500": string;
        "600": string;
        "700": string;
      };
      coral: {
        "100": string;
        "200": string;
        "300": string;
        "500": string;
        "600": string;
        "700": string;
      };
      light_blue: {
        "100": string;
        "200": string;
        "300": string;
        "500": string;
        "600": string;
        "700": string;
      };
      purple: {
        "100": string;
        "200": string;
        "300": string;
        "500": string;
        "600": string;
        "700": string;
      };
      green: {
        "100": string;
        "200": string;
        "300": string;
        "500": string;
        "600": string;
        "700": string;
      };
    };
    textTheme: {
      body: {
        xsmall: TextStyleClass;
        small: TextStyleClass;
        medium: TextStyleClass;
        large: TextStyleClass;
      };
      label: {
        small: TextStyleClass;
        medium: TextStyleClass;
        large: TextStyleClass;
      };
      title: {
        small: TextStyleClass;
        medium: TextStyleClass;
        large: TextStyleClass;
      };
      headline: {
        small: TextStyleClass;
        medium: TextStyleClass;
        large: TextStyleClass;
      };
      display: {
        small: TextStyleClass;
        medium: TextStyleClass;
        large: TextStyleClass;
      };
    };
    fontWeight: {
      regular: string;
      semiBold: string;
      bold: string;
    };
  }
}

const colors = {
  transparent: "transparent",
  primary: {
    "100": "#e7eef6",
    "200": "#c0d0e2",
    "300": "#637691",
    "400": "#36506c",
    "500": "#233f53",
    "600": "#0f252e",
    "700": "#06161c",
  },
  secondary: {
    "100": "#fdf8e8",
    "200": "#fcedaf",
    "300": "#ffe36b",
    "400": "#ffcf00",
    "500": "#e7bb00",
    "600": "#9f731d",
    "700": "#725111",
  },
  information: {
    "100": "#DBF2FA",
    "400": "#63C8E9",
    "700": "#10586F",
  },
  success: {
    "100": "#EAFAF3",
    "400": "#6EDEA8",
    "700": "#186846",
  },
  warning: {
    "100": "#fff2e3",
    "400": "#F38D58",
    "700": "#95481D",
  },
  error: {
    "100": "#FBE9F2",
    "400": "#B62168",
    "700": "#6C143D",
  },
  grayscale: {
    "000": "#ffffff",
    "100": "#f5f9ff",
    "200": "#dfe5ed",
    "300": "#c0c8d3",
    "400": "#8f959e",
    "500": "#6D747E",
    "600": "#4C535D",
    "700": "#303036",
  },
  coral: {
    "100": "#fef4f1",
    "200": "#FDA5A5",
    "300": "#FC7D7D",
    "400": "#fa6666",
    "500": "#F05151",
    "600": "#CD3C43",
    "700": "#a02b30",
  },
  light_blue: {
    "100": "#E8F4FC",
    "200": "#BADEF7",
    "300": "#75BCEF",
    "400": "#44A4ea",
    "500": "#1573B7",
    "600": "#0D4872",
    "700": "#082B45",
  },
  purple: {
    "100": "#ECEBFA",
    "200": "#C5C2EF",
    "300": "#9B98F3",
    "400": "#5E55D3",
    "500": "#392FB6",
    "600": "#2C258E",
    "700": "#2C258E",
  },
  green: {
    "100": "#e8f9fb",
    "200": "#C2F0E8",
    "300": "#85E0D1",
    "400": "#31c2aa",
    "500": "#29A38F",
    "600": "#1F7A6B",
    "700": "#155147",
  },
};

const font = {
  family: {
    manrope: "Manrope",
    roboto: "Roboto",
    serif: "serif",
    sans_serif: "sans-serif",
  },
  weight: {
    regular: "400",
    semi_bold: "600",
    bold: "700",
  },
  size: {
    "10": "10px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "22": "22px",
    "24": "24px",
    "28": "28px",
    "32": "32px",
    "36": "36px",
    "45": "45px",
    "57": "57px",
  },
};

export const theme = {
  color: colors,
  fontWeight: {
    regular: font.weight.regular,
    semiBold: font.weight.semi_bold,
    bold: font.weight.bold,
  },
  textTheme: {
    body: {
      xsmall: new TextStyleClass({
        font: {
          family: font.family.roboto,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["10"],
        },
        lineHeight: "14px",
        letterSpacing: "0.25px",
        color: colors.primary["300"],
      }),
      small: new TextStyleClass({
        font: {
          family: font.family.roboto,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["12"],
        },
        lineHeight: "16px",
        letterSpacing: "0.25px",
        color: colors.primary["500"],
      }),
      medium: new TextStyleClass({
        font: {
          family: font.family.roboto,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["14"],
        },
        lineHeight: "20px",
        letterSpacing: "0.25px",
        color: colors.primary["500"],
      }),
      large: new TextStyleClass({
        font: {
          family: font.family.roboto,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["16"],
        },
        lineHeight: "24px",
        letterSpacing: "0.15px",
        color: colors.primary["500"],
      }),
    },
    label: {
      small: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.bold,
          size: font.size["12"],
        },
        lineHeight: "16px",
        letterSpacing: "0.5px",
        color: colors.primary["500"],
      }),
      medium: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.bold,
          size: font.size["14"],
        },
        lineHeight: "22px",
        letterSpacing: "0.5px",
        color: colors.primary["500"],
      }),
      large: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.bold,
          size: font.size["16"],
        },
        lineHeight: "28px",
        letterSpacing: "0.1px",
        color: colors.primary["500"],
      }),
    },
    title: {
      small: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.semi_bold,
          size: font.size["14"],
        },
        lineHeight: "20px",
        letterSpacing: "0.1px",
        color: colors.primary["500"],
      }),
      medium: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.semi_bold,
          size: font.size["16"],
        },
        lineHeight: "24px",
        letterSpacing: "0.15px",
        color: colors.primary["500"],
      }),
      large: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.bold,
          size: font.size["22"],
        },
        lineHeight: "28px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
    },
    headline: {
      small: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["24"],
        },
        lineHeight: "32px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
      medium: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["28"],
        },
        lineHeight: "36px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
      large: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["32"],
        },
        lineHeight: "40px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
    },
    display: {
      small: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["36"],
        },
        lineHeight: "44px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
      medium: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["45"],
        },
        lineHeight: "52px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
      large: new TextStyleClass({
        font: {
          family: font.family.manrope,
          generic: font.family.sans_serif,
          weight: font.weight.regular,
          size: font.size["57"],
        },
        lineHeight: "64px",
        letterSpacing: "0",
        color: colors.primary["500"],
      }),
    },
  },
};
