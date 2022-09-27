import { FieldType } from "./FieldType";

/// Describe how a field is
export default class Field {
    constructor(id: string, name: string, type: FieldType, watermark = "", isInline: boolean = false, links: Array<string> = []) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.watermark = watermark;
        this.isInline = isInline;
        this.links = links;
    }

    // Unique identifier of the field
    id: string;
    // Label of the field
    name: string;
    // What kind of field this is
    type: FieldType;
    // Does it stays on the same line of the next field
    isInline: boolean;
    // Small hint text present in the field
    watermark: string;
    // External links used to guide the user
    links: Array<string>;
}