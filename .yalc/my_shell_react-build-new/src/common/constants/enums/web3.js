"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaucetCurrency = exports.FaucetTaskStatus = exports.FaucetTaskStepStatus = exports.FaucetTaskStepType = exports.FaucetTaskType = void 0;
var FaucetTaskType;
(function (FaucetTaskType) {
    FaucetTaskType["FAUCET_TASK_TYPE_UNSPECIFIED"] = "FAUCET_TASK_TYPE_UNSPECIFIED";
    FaucetTaskType["FAUCET_TASK_TYPE_CLAIM_GAS"] = "FAUCET_TASK_TYPE_CLAIM_GAS";
    FaucetTaskType["FAUCET_TASK_TYPE_CLAIM_TOKEN"] = "FAUCET_TASK_TYPE_CLAIM_TOKEN";
    FaucetTaskType["FAUCET_TASK_TYPE_SWAP_GAS"] = "FAUCET_TASK_TYPE_SWAP_GAS";
    FaucetTaskType["FAUCET_TASK_TYPE_SWAP_TOKEN"] = "FAUCET_TASK_TYPE_SWAP_TOKEN";
})(FaucetTaskType || (exports.FaucetTaskType = FaucetTaskType = {}));
var FaucetTaskStepType;
(function (FaucetTaskStepType) {
    FaucetTaskStepType["FAUCET_TASK_STEP_UNSPECIFIED"] = "FAUCET_TASK_STEP_UNSPECIFIED";
    FaucetTaskStepType["FAUCET_TASK_STEP_CHECK_TWEET"] = "FAUCET_TASK_STEP_CHECK_TWEET";
    FaucetTaskStepType["FAUCET_TASK_STEP_CLAIM"] = "FAUCET_TASK_STEP_CLAIM";
    FaucetTaskStepType["FAUCET_TASK_STEP_COMPLETED"] = "FAUCET_TASK_STEP_COMPLETED";
})(FaucetTaskStepType || (exports.FaucetTaskStepType = FaucetTaskStepType = {}));
var FaucetTaskStepStatus;
(function (FaucetTaskStepStatus) {
    FaucetTaskStepStatus["FAUCET_TASK_STEP_STATUS_UNSPECIFIED"] = "FAUCET_TASK_STEP_STATUS_UNSPECIFIED";
    FaucetTaskStepStatus["FAUCET_TASK_STEP_STATUS_INIT"] = "FAUCET_TASK_STEP_STATUS_INIT";
    FaucetTaskStepStatus["FAUCET_TASK_STEP_STATUS_PROCESSING"] = "FAUCET_TASK_STEP_STATUS_PROCESSING";
    FaucetTaskStepStatus["FAUCET_TASK_STEP_STATUS_DONE"] = "FAUCET_TASK_STEP_STATUS_DONE";
    FaucetTaskStepStatus["FAUCET_TASK_STEP_STATUS_FAILED"] = "FAUCET_TASK_STEP_STATUS_FAILED";
})(FaucetTaskStepStatus || (exports.FaucetTaskStepStatus = FaucetTaskStepStatus = {}));
var FaucetTaskStatus;
(function (FaucetTaskStatus) {
    FaucetTaskStatus["FAUCET_TASK_STATUS_UNSPECIFIED"] = "FAUCET_TASK_STATUS_UNSPECIFIED";
    FaucetTaskStatus["FAUCET_TASK_STATUS_INIT"] = "FAUCET_TASK_STATUS_INIT";
    FaucetTaskStatus["FAUCET_TASK_STATUS_COMPLETED"] = "FAUCET_TASK_STATUS_COMPLETED";
})(FaucetTaskStatus || (exports.FaucetTaskStatus = FaucetTaskStatus = {}));
var FaucetCurrency;
(function (FaucetCurrency) {
    FaucetCurrency["FAUCET_CURRENCY_TYPE_UNSPECIFIED"] = "FAUCET_CURRENCY_TYPE_UNSPECIFIED";
    FaucetCurrency["FAUCET_CURRENCY_TYPE_SHELL_COIN"] = "FAUCET_CURRENCY_TYPE_SHELL_COIN";
    FaucetCurrency["FAUCET_CURRENCY_TYPE_SHELL_GAS"] = "FAUCET_CURRENCY_TYPE_SHELL_GAS";
    FaucetCurrency["FAUCET_CURRENCY_TYPE_SHELL_TOKEN"] = "FAUCET_CURRENCY_TYPE_SHELL_TOKEN";
})(FaucetCurrency || (exports.FaucetCurrency = FaucetCurrency = {}));
