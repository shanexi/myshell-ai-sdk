import type { EditableSchema } from "./types";
/**
 * Defines plain text schema.
 */
export declare const plainSchema: ({ multiline, }?: {
    multiline?: boolean;
}) => EditableSchema<string>;
