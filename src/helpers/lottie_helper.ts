import lottie, {
    AnimationSegment,
    CanvasRendererConfig,
    HTMLRendererConfig,
    LottiePlayer,
    SVGRendererConfig
} from "lottie-web";

/**
 * Lottie Helper
 */
export default class LottieHelper {
    protected elem: HTMLElement;
    protected conf: LottieConfTypes;
    protected lottieInst: LottiePlayer;

    /**
     * @constructor
     */
    constructor(elemId: string, conf: LottieConfTypes) {
        this.elem = document.getElementById(elemId);
        this.conf = conf;
        this.lottieInst = lottie;
    }

    /**
     * Load loader animation with lottieJs
     */
    public loaderAnimation() {
        this.lottieInst.loadAnimation({
            container: this.elem, // the dom element that will contain the animation
            ...this.conf
        })
    }

    public start() {
        this.loaderAnimation();
    }

    /**
     * Destroy loader animation with lottieJs
     */
    public stop() {
        this.lottieInst.destroy();
    }
}

export type LottieConfTypes = {
    renderer?: 'svg' | 'canvas' | 'html';
    loop?: boolean | number;
    autoplay?: boolean;
    path?: string;
    initialSegment?: AnimationSegment;
    name?: string;
    assetsPath?: string;
    rendererSettings?: SVGRendererConfig | CanvasRendererConfig | HTMLRendererConfig;
}