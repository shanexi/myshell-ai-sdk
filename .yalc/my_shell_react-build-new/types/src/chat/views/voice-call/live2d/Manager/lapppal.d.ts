export declare class LAppPal {
    static loadFileAsBytes(filePath: string, callback: (arrayBuffer: ArrayBuffer, size: number) => void): void;
    static getDeltaTime(): number;
    static updateTime(): void;
    static printMessage(message: string): void;
    static lastUpdate: number;
    static s_currentFrame: number;
    static s_lastFrame: number;
    static s_deltaTime: number;
}
