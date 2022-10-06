import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Calendar implements ATemplate {
    getContent(): Record<string, Field[]> {
        return {
            "general": [
                new Field("name", "Name", FieldType.String)
            ], "data": [
                new Field("zero", "Zero", FieldType.Text, "What is the meaning of the 0 in your calendar"),
            ], "free-space": [
                new Field("free", "", FieldType.Document, "Bingo"),
            ]
        };
    }

    getName(): string {
        return "calendar";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }

    getDescription(): string {
        return "Describe how time goes by";
    }
}