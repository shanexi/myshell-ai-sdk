"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionType = void 0;
exports.default = useActionSensors;
const react_1 = require("react");
const sensors_1 = require("../../../lib/sensors/index.js");
const luiContext_1 = require("../../../common/components/lui/luiContext.js");
var ActionType;
(function (ActionType) {
    ActionType["Like"] = "Like";
    ActionType["Dislike"] = "Dislike";
    ActionType["Copy_Message"] = "Copy Message";
    ActionType["Stop_Generating"] = "Stop Generating";
    ActionType["Regenerate"] = "Regenerate";
    ActionType["Edit"] = "Edit";
    ActionType["Translate"] = "Translate";
    ActionType["Download_Voice"] = "Download Voice";
    ActionType["Share"] = "Share";
    ActionType["Delete"] = "Delete";
    ActionType["Remove_Like"] = "Remove Like";
    ActionType["Remove_Dislike"] = "Remove Dislike";
    ActionType["Regenerate_Voice"] = "Regenerate Voice";
    ActionType["Feedback"] = "Feedback";
})(ActionType || (exports.ActionType = ActionType = {}));
function useActionSensors() {
    const sensors = (0, sensors_1.useSensors)();
    const { msgId, widgetInfo, selectedBot: sensorSelectedBot } = (0, react_1.useContext)(luiContext_1.LUIButtonInteractionContext);
    const onSendActionSensors = (action_type, other) => {
        if (sensors && sensors.track && (widgetInfo?.id || sensorSelectedBot?.id)) {
            sensors?.track('MessageAction', {
                action_type,
                message_id: msgId,
                ...(widgetInfo?.id
                    ? {
                        widget_id: widgetInfo?.id,
                        widget_name: widgetInfo?.name
                    }
                    : {
                        bot_id: sensorSelectedBot?.id,
                        bot_name: sensorSelectedBot?.name
                    }),
                ...other
            });
        }
    };
    return {
        onSendActionSensors
    };
}
