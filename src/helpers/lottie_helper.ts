import lottie, {
    AnimationSegment,
    CanvasRendererConfig,
    HTMLRendererConfig,
    LottiePlayer,
    SVGRendererConfig
} from "lottie-web";
import Lottie from "lottie-web";

/**
 * Lottie Helper
 */
export default class LottieHelper {
    protected elem: HTMLElement;
    protected conf: LottieConfTypes;
    protected lottieInst: LottiePlayer | null;

    /**
     * @constructor
     */
    constructor(elemId: string, conf: LottieConfTypes) {
        this.elem = document.getElementById(elemId);
        this.conf = conf;
    }

    /**
     * Load Instance
     */
    private loadLottieInstance() {
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

    /**
     * Play loader animation
     */
    public play() {
        if (this.lottieInst) {
            this.lottieInst.play();
        } else {
            this.loadLottieInstance();
            this.loaderAnimation();
        }
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