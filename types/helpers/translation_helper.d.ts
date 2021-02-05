declare class TranslationHelper {
    private locale;
    private translations;
    /**
     * @constructor
     */
    constructor();
    /**
     * Set the locale with the locale from the user browser
     * @param locale
     */
    setLocale(locale: string): void;
    /**
     * Get translation of a word with a keyword
     * @param keyword the keyword to get the value in the language selected
     * @param template king of keyword to look for
     * @param defaultValue Default value to return if not found
     * @return the value in the user language
     * @type string
     */
    getTranslation(keyword: string, template?: string, defaultValue?: string): any;
    /**
     * Set the translations in the locale storage
     */
    setTranslationsInLocaleStorage(): void;
}
export declare let translationHelper: TranslationHelper;
export {};
