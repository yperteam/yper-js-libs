import { AnimationSegment, CanvasRendererConfig, HTMLRendererConfig, LottiePlayer, SVGRendererConfig } from "lottie-web";
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
    constructor(elemId: string, conf: LottieConfTypes);
    /**
     * Load Instance
     */
    private loadLottieInstance;
    /**
     * Load loader animation with lottieJs
     */
    loaderAnimation(): void;
    /**
     * Play loader animation
     */
    play(): void;
    /**
     * Stop loader animation
     */
    stop(): void;
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
};
