import { AnimationSegment, CanvasRendererConfig, HTMLRendererConfig, LottiePlayer, SVGRendererConfig } from "lottie-web";
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
    constructor(elemId: string, conf: LottieConfTypes);
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
export declare type LottieConfTypes = {
    renderer?: 'svg' | 'canvas' | 'html';
    loop?: boolean | number;
    autoplay?: boolean;
    path?: string;
    initialSegment?: AnimationSegment;
    name?: string;
    assetsPath?: string;
    rendererSettings?: SVGRendererConfig | CanvasRendererConfig | HTMLRendererConfig;
};
