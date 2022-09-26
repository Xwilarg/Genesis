import ATemplate from "../ATemplate";
import Field from "../Field";
import { FieldType } from "../FieldType";

/// Represent a whole tab on the main section
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

    formatName(format: (name: string) => string): string {
        return format("first-name") + " " + format("last-name");
    }
}