"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateI18nSchema = void 0;
const regex = /\{\{I18n\((.*?)\)\}\}/g;
const generateI18nSchema = (schema, I18n) => {
    const schemaString = JSON.stringify(schema);
    const replacedString = schemaString.replace(regex, (match, key) => {
        return typeof I18n === 'function' ? I18n(key) : key;
    });
    return JSON.parse(replacedString);
};
exports.generateI18nSchema = generateI18nSchema;
