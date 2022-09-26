import { FieldType } from "./FieldType";

/// Describe how a field is
export default class Field {
    constructor(id: string, name: string, type: FieldType) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    // Unique identifier of the field
    id: string;
    // Label of the field
    name: string;
    // What kind of field this is
    type: FieldType;
}