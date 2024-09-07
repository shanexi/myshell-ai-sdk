export interface JsonSchema7 {
    $ref?: string;
    $id?: string;
    $schema?: string;
    title?: string;
    description?: string;
    default?: any;
    additionalItems?: boolean | JsonSchema7;
    items?: JsonSchema7 | JsonSchema7[];
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | JsonSchema7;
    definitions?: {
        [key: string]: JsonSchema7;
    };
    properties?: {
        [property: string]: JsonSchema7;
    };
    patternProperties?: {
        [pattern: string]: JsonSchema7;
    };
    dependencies?: {
        [key: string]: JsonSchema7 | string[];
    };
    enum?: any[];
    type?: string;
    allOf?: JsonSchema7[];
    anyOf?: JsonSchema7[];
    oneOf?: JsonSchema7[];
    not?: JsonSchema7;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: any[];
    contains?: JsonSchema7;
    propertyNames?: JsonSchema7;
    if?: JsonSchema7;
    then?: JsonSchema7;
    else?: JsonSchema7;
    errorMessage?: any;
}
