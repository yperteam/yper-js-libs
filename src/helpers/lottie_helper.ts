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
        this.lottieInst = lottie;
        this.elem = document.getElementById(elemId);
        this.conf = conf;
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

    /**
     * Play loader animation
     */
    public play() {
        this.lottieInst.play();
    }

    /**
     * Stop loader animation
     */
    public stop() {
        this.lottieInst.stop();
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