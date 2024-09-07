export type TWidgetSetting = {
    type: 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR' | 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT' | 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT' | 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD' | 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR' | 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT' | 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT' | 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX' | 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR' | 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR' | 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD';
    fieldName: string;
    name: string;
    description: string;
    stringDefault: string;
    textSelectorDefault: string;
    numberDefault: number;
    integerDefault: number;
    fileDefaultParam: string;
    numberSelectorDefault: number;
    booleanDefault: boolean;
    textSelectorAllOf: Array<{
        label: string;
        value: string;
        iconUrl: string;
    }>;
    hasIntegerLimitation: boolean;
    hasNumberLimitation: boolean;
    integerMax: number;
    integerMin: number;
    numberMax: number;
    numberMin: number;
    fileUploadSizeMaximum: number;
    stringCharLengthLimitation: number;
    isRequired: boolean;
    supportedFileTypes: string[];
};
export type TWidget = {
    id: string;
    name: string;
    description?: string;
    logoUrl?: string;
    settings?: TWidgetSetting[];
};
