/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import CallbackHelper from "../../helpers/callback_helper";
/**
 * PasswordCheckerHelper used to check password
 */
export default class PasswordChecker {
    /** Check conditions */
    protected readonly checkLowerCaseLetters: RegExp;
    protected readonly checkUpperCaseLetters: RegExp;
    protected readonly checkOneNumber: RegExp;
    protected readonly checkOneAlphaNumeric: RegExp;
    protected readonly checkMaxLength = 8;
    /** Selectors */
    protected cHelper: CallbackHelper;
    /** Selectors */
    protected $input: JQuery<HTMLElement>;
    protected $parentView: JQuery<HTMLElement>;
    protected $checkLowerCase: JQuery<HTMLElement>;
    protected $checkUpperCase: JQuery<HTMLElement>;
    protected $checkOneSpecialCharCase: JQuery<HTMLElement>;
    protected $checkOneNumberCase: JQuery<HTMLElement>;
    protected $checkLengthCase: JQuery<HTMLElement>;
    /**
     * Constructor
     */
    constructor($input?: JQuery<HTMLElement>, $parentView?: JQuery<HTMLElement>);
    /**
     *
     */
    setCases(): void;
    /**
     *
     * @param $input
     */
    setInput($input: JQuery<HTMLElement>): this;
    /**
     *
     */
    getParentChecksView(): JQuery<HTMLElement>;
    /**
     *
     */
    setValidationCallback(callback: Function): this;
    /**
     *
     * @param $input
     */
    bindInputPassword($input: JQuery<HTMLElement>): void;
    /**
     *
     * @param password
     */
    checkValidCases(password: string): boolean;
    /**
     *
     * @param password
     */
    checkInvalidCases(password: string): boolean;
    /**
     *
     * @param password
     */
    checkLowerCaseLetter(password: string): boolean;
    /**
     *
     * @param password
     */
    checkUpperCaseLetter(password: string): boolean;
    /**
     *
     * @param password
     */
    checkAlphaNumeric(password: string): boolean;
    /**
     *
     * @param password
     */
    checkNumber(password: string): boolean;
    /**
     *
     * @param password
     */
    checkLength(password: string): boolean;
    renderChecksView(): string;
    /**
     *
     * @param $case
     * @private
     */
    private setBasicCase;
    /**
     *
     * @param $case
     * @private
     */
    private setValidCase;
    /**
     *
     * @param $case
     * @private
     */
    private setInvalidCase;
}
