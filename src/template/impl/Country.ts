import ATemplate from "../ATemplate";
import Field from "../Field";
import { FieldType } from "../FieldType";

/// Represent a whole tab on the main section
export default class Character implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return { "general": [
            new Field("name", "Name", FieldType.String, "", true)
        ]};
    }

    getName(): string {
        return "country";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }
}