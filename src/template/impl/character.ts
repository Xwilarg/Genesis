import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Character implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return {
            "introduction": [
            new Field("first-name", "Name", FieldType.String, "First Name", true),
            new Field("last-name", "", FieldType.String, "Last Name"),
            new Field("aliases", "Aliases", FieldType.Text),
            new Field("height", "Height", FieldType.Number, "cm"),
            new Field("weight", "Weight", FieldType.Number, "kg"),
            new Field("race", "Race", FieldType.String, "If fantasy settings, is he a human? an elf? a spirit?"),
            new Field("gender", "Gender", FieldType.String, "Is a male, a female or does identify as something else?"),
            new Field("sexuality", "Sexuality", FieldType.String, "Is he heterosexual, homosexual, Asexual...")
        ], "physical-appearance": [
            new Field("hair", "Hair", FieldType.String, "Are they black? blue? curly? straight? greasy?"),
            new Field("eyes", "Eyes", FieldType.String, "Are they blue? brown? heterochromic? almond-shaped?"),
            new Field("scars", "Scars", FieldType.Text, "You can include lost limbs, prosthesis, implants..."),
            new Field("physique", "Physique", FieldType.Text, "Is he fat? Have squared shoulders?"),
            new Field("clothes", "Usual clothes", FieldType.Text, "Does he usually wear a hat? Jean with holes?")
        ]};
    }

    getName(): string {
        return "character";
    }

    formatName(format: (name: string) => string): string {
        return format("first-name") + " " + format("last-name");
    }
}