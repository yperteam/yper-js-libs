/// <reference types="react" />
/** Generic Error Message */
export declare const customMessage: (type?: string) => {
    "any.required": string;
    "string.base": string;
    "string.empty": string;
    "object.missing": string;
    "object.base": string;
    "phoneNumber.base": string;
    "string.email": string;
    "number.base": string;
    "number.min": string;
    "number.max": string;
    "string.pattern.base": string;
    "any.invalid": string;
    "date.format": string;
};
declare function ErrorField(props: {
    field: string;
}): JSX.Element;
export default ErrorField;
