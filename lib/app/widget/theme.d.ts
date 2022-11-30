import "styled-components";
export declare class TextStyleClass {
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
    constructor({ font, lineHeight, letterSpacing, style, color, }: {
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
    });
    copyWith({ color, style, fontWeight, }: {
        color?: string;
        style?: string;
        fontWeight?: string;
    }): TextStyleClass;
}
declare module "styled-components" {
    interface DefaultTheme {
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
export declare const theme: {
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
            "400": string;
            "500": string;
            "600": string;
            "700": string;
        };
        light_blue: {
            "100": string;
            "200": string;
            "300": string;
            "400": string;
            "500": string;
            "600": string;
            "700": string;
        };
        purple: {
            "100": string;
            "200": string;
            "300": string;
            "400": string;
            "500": string;
            "600": string;
            "700": string;
        };
        green: {
            "100": string;
            "200": string;
            "300": string;
            "400": string;
            "500": string;
            "600": string;
            "700": string;
        };
    };
    fontWeight: {
        regular: string;
        semiBold: string;
        bold: string;
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
};
