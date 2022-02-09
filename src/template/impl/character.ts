import Field from "../field";
import { FieldType } from "../fieldtype";

const characterTemplate = {
    "introduction": [
        new Field("first-name", "First Name", FieldType.String)
    ]
};

export { characterTemplate }