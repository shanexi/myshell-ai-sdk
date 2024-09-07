"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGalleryStore = void 0;
const zustand_1 = require("zustand");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
const DEFAULT_STATE = {
    galleryList: [],
    galleryUserList: []
};
const computeState = (state) => ({
    history: []
});
exports.useGalleryStore = (0, zustand_1.create)()((0, zustand_computed_1.default)((set, get) => ({
    ...DEFAULT_STATE,
    setGalleryList: (galleryList) => {
        set({ galleryList });
    },
    setGalleryUserList: (galleryUserList) => {
        set({ galleryUserList });
    }
}), computeState));
