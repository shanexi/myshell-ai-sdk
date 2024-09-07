type RenderData = {
    text: any;
};
declare class RenderScheduler {
    renderInterval: number;
    queue: RenderData[];
    timeoutId: any;
    renderFunc: (text: RenderData) => void;
    constructor(renderInterval: number, renderFunc: (text: RenderData) => void);
    enqueue(data: RenderData): void;
    processQueue(): void;
}
export default RenderScheduler;
