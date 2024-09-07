"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetAsyncJobInfo;
const new_chat_1 = require("../../apis/new-chat.js");
const definitions_1 = require("../model/definitions.js");
const util_1 = require("../util.js");
function useGetAsyncJobInfo(type, id, updateMsg, partialUpdateMessage) {
    const getAsyncJobInfo = async (jobId, messageId) => {
        try {
            const { success, data: reqData, msg } = await (0, new_chat_1.getAsynJobInfo)(jobId);
            if (success) {
                const { data, jobId, jobType, status } = reqData;
                const { message, imageGenMessageResponse } = data;
                switch (jobType) {
                    case definitions_1.JobTypeEnum.RUNNING_ASYNC_STATE_MACHINE:
                    case definitions_1.JobTypeEnum.COMP_GEN_REQUEST:
                    case definitions_1.JobTypeEnum.WIDGET_AUTO_PROMPT:
                        if (message) {
                            updateMsg((0, util_1.serverMessageParser)(message, type));
                        }
                        break;
                    case definitions_1.JobTypeEnum.IMAGE_GEN_REQUEST:
                        if (imageGenMessageResponse) {
                            partialUpdateMessage?.(messageId, {
                                imageGenMessageResponse: {
                                    ...imageGenMessageResponse,
                                    genStatus: status === definitions_1.JobStatusEnum.DONE
                                        ? definitions_1.ImageGenStatus.DONE
                                        : status === definitions_1.JobStatusEnum.FAILED
                                            ? definitions_1.ImageGenStatus.ERROR
                                            : status === definitions_1.JobStatusEnum.CANCELED
                                                ? definitions_1.ImageGenStatus.CANCELED
                                                : definitions_1.ImageGenStatus.PROCESSING
                                }
                            });
                        }
                        break;
                    default:
                        break;
                }
                if (status !== definitions_1.JobStatusEnum.DOING && status !== definitions_1.JobStatusEnum.WAITING) {
                    return false;
                }
            }
            console.error(msg);
            return true;
        }
        catch (e) {
            console.error(e);
            return true;
        }
    };
    return getAsyncJobInfo;
}
