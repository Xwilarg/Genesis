import ATemplate from "../ATemplate";
import Field from "../Field";
import { FieldType } from "../FieldType";

export default class Character implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return { "introduction": [
            new Field("first-name", "First Name", FieldType.String)
        ]};
    }

    getName(): string {
        return "character";
    }
}