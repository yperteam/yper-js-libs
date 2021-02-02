require("jquery-blockui/jquery.blockUI");
import { uuidv4 } from "@yper-script/helpers/generic_helper";

/**
 * Create a loader with a selector and attach it an id
 */
export class LoaderHelper {
    private selector;
    private readonly id: string = null;
    private readonly text;

    constructor(selector: JQuery, text = "Chargement en cours") {
        this.selector = selector;
        this.id = uuidv4();
        this.text = text;
    }

    public initLoader() {
        this.selector.block({
            message: `<div id="${this.id}" class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div><span id="text-load">${this.text}</span>`,
            css: {
                color: "#1660C6",
                border: "none",
                backgroundColor: "transparent",
            },
        });
    }

    public setSelector(selector: JQuery) {
        this.selector = selector;
    }
    public hideLoader() {
        this.selector.unblock();
    }
}
