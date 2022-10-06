import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class City implements ATemplate {
    getContent(): Record<string, Field[]> {
        return {
            "general": [
                new Field("name", "Name", FieldType.String)
            ], "free-space": [
                new Field("free", "", FieldType.Document, "Bingo"),
            ]
        };
    }

    getName(): string {
        return "city";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }

    getDescription(): string {
        return "";
    }
}