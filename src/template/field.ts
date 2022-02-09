import { FieldType } from "./fieldtype";

export default class Field {
    constructor(id: string, name: string, type: FieldType) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    id: string;
    name: string;
    type: FieldType;
}