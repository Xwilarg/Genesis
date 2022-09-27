import ATemplate from "../ATemplate";
import Field from "../Field";
import { FieldType } from "../FieldType";

/// Represent a whole tab on the main section
export default class Character implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return { "introduction": [
            new Field("first-name", "Name", FieldType.String, "First Name", true),
            new Field("last-name", "", FieldType.String, "Last Name"),
            new Field("aliases", "Aliases", FieldType.Text)
        ]};
    }

    getName(): string {
        return "character";
    }

    formatName(format: (name: string) => string): string {
        return format("first-name") + " " + format("last-name");
    }
}