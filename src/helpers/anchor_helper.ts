/**
 * Anchor Helper
 */
export class AnchorHelper {
    private url: string = window.location.href;
    private anchor: string;

    constructor() {
        this.setAnchor();
    }

    /**
     *
     * @protected
     */
    protected setAnchor() {
        this.anchor = window.location.hash;

        return this;
    }

    /**
     * Get Anchor
     */
    public getAnchor() {
        return this.anchor;
    }
}
