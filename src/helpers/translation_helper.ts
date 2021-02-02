import {isSet, isUnDef} from "@yper-script/helpers/generic_helper";
import {AbstractLib} from "@yper-script/libs/abstract_lib";

/*
----------------------------
DO NOT EXPORT THE CLASS.
SINGLETON CLASS WITH WEBPACK.
----------------------------
 */
class TranslationHelper {
    private locale: string;
    private translations: object;

    /**
     * @constructor
     */
    constructor() {
    }

    /**
     * Set the locale with the locale from the user browser
     * @param locale
     */
    public setLocale(locale: string) {
        this.locale = locale;
    }

    /**
     * Get translation of a word with a keyword
     * @param keyword the keyword to get the value in the language selected
     * @param template king of keyword to look for
     * @param defaultValue Default value to return if not found
     * @return the value in the user language
     * @type string
     */
    public getTranslation(
        keyword: string,
        template: string = null,
        defaultValue: string = keyword
    ) {
        if (!keyword) {
            return defaultValue;
        }

        if (!this.translations) {
            return defaultValue;
        }

        if (!template) {
            return this.translations.hasOwnProperty(keyword)
                // @ts-ignore
                ? this.translations[keyword]
                : defaultValue;
        } else if (template.indexOf(".") > -1) {
            let templates = template.split(".");
            // @ts-ignore
            let property = this.translations[templates[0]];

            if (!isSet(property)) {
                return keyword;
            }
            templates.slice(0, 1);
            for (let templt of templates) {
                if (typeof templt !== null && property.hasOwnProperty(templt)) {
                    property = property[templt];
                }
            }

            if (property.hasOwnProperty(keyword)) {
                return property[keyword];
            }
        } else if (this.translations.hasOwnProperty(template)) {
            // @ts-ignore
            return this.translations[template].hasOwnProperty(keyword)
                // @ts-ignore
                ? this.translations[template][keyword]
                : defaultValue;
        }
        return keyword;
    }

    /**
     * Set the translations in the locale storage
     */
    public setTranslationsInLocaleStorage() {
        if (
            isUnDef(this.translations) &&
            !localStorage.getItem("translations")
        ) {
            $.ajax({
                url: "/ajax/translation/" + this.locale,
                type: "GET",
                dataType: "json",
                async: false,
            })
                .fail(data => {
                    AbstractLib.failProcess(data);
                })
                .then(data => {
                    localStorage.setItem("translations", JSON.stringify(data));
                    this.translations = JSON.parse(
                        localStorage.getItem("translations")
                    );
                });
        } else if (
            isUnDef(this.translations) &&
            localStorage.getItem("translations")
        ) {
            this.translations = JSON.parse(
                localStorage.getItem("translations")
            );
        }
    }
}

export let translationHelper = new TranslationHelper();
