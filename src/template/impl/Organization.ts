import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Organization implements ATemplate {
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
        return "organization";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }

    getDescription(): string {
        return "For organization, either intergovernemental (NATO, BRICS) or non-gouvernemental (MSF, WWF)";
    }
}