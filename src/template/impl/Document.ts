import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Document implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return {
            "": [
            new Field("title", "Title", FieldType.String),
            new Field("Content", "Document", FieldType.Document, "")
        ]};
    }

    getName(): string {
        return "document";
    }

    formatName(format: (name: string) => string): string {
        return format("title");
    }

    getDescription(): string {
        return "Do you somehow need a big area to write about a specific topic? You can do it here!";
    }
}