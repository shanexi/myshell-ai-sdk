import { StreamingServerMessage } from './types';
export declare class Decoder {
    decode(data: ArrayBuffer): Promise<StreamingServerMessage>;
}
