import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Plane implements ATemplate {
    getContent(): Record<string, Field[]> {
        return {
            "general": [
                new Field("name", "Name", FieldType.String)
            ], "type": [
                new Field("type", "Type", FieldType.Text, "Is your plan material (where \"normal\" worlds exists), transitive (link between 2 planes), astral...?"),
            ], "free-space": [
                new Field("free", "", FieldType.Document, "Bingo"),
            ]
        };
    }

    getName(): string {
        return "plane";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }

    getDescription(): string {
        return "If your world support the theory of <a href='https://en.wikipedia.org/wiki/Multiverse' target='_blank'>multiverse</a>, you can describe them here";
    }
}