import { FieldType } from "./FieldType";

/// Describe how a field is
export default class Field {
    constructor(id: string, name: string, type: FieldType, watermark = "", isInline: boolean = false) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.watermark = watermark;
        this.isInline = isInline;
    }

    // Unique identifier of the field
    id: string;
    // Label of the field
    name: string;
    // What kind of field this is
    type: FieldType;
    isInline: boolean;
    watermark: string;
}