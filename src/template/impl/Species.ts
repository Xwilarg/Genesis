import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Species implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return {
            "general": [
            new Field("name", "Name", FieldType.String),
            new Field("lifespan", "Average lifespan", FieldType.Number, ""),
            new Field("Height", "Average height", FieldType.Number, "cm")
        ], "free-space": [
            new Field("free", "", FieldType.Text, "Anything else to add? How they don't like sand because it's rough and irritating? Or just some personal notes you don't want to forget?"),
        ]};
    }

    getName(): string {
        return "species";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }
}