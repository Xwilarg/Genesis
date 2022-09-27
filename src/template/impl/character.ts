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
            new Field("species", "Species", FieldType.String, "Is he a human? an elf? a spirit?"),
            new Field("language", "Language Spoken", FieldType.String),
            new Field("gender", "Gender", FieldType.String, "Is a male, a female or does identify as something else?"),
            new Field("sexuality", "Sexuality", FieldType.String, "Is he heterosexual, homosexual, Asexual...")
        ], "physical-appearance": [
            new Field("hair", "Hair", FieldType.String, "Are they black? blue? curly? straight? greasy?"),
            new Field("eyes", "Eyes", FieldType.String, "Are they blue? brown? heterochromic? almond-shaped?"),
            new Field("scars", "Scars", FieldType.Text, "You can include lost limbs, prosthesis, implants..."),
            new Field("physique", "Physique", FieldType.Text, "Is he fat? Have squared shoulders?"),
            new Field("clothes", "Usual clothes", FieldType.Text, "Does he usually wear a hat? Jean with holes?")
        ], "medical": [
            new Field("diseases", "Diseases", FieldType.Text, "Diabetes? Brain cancer? Haemophilia?"),
            new Field("treatment", "Treatmens", FieldType.Text, "Does take medicine or follow a treatmeant?")
        ], "opinions": [
            new Field("op-clothes", "Clothes", FieldType.Text, "Does he care about the latest trends or having many pairs of shoes? Would he rather stay in pajama all day?"),
            new Field("op-food", "Food", FieldType.Text, "Does he have a frenezie for cheese? Do not like strong alcohol?"),
            new Field("op-politic", "Politic", FieldType.Text, "Does he believe that public infrastructure should be owned by the state? That the governement should get rid of old traditions?")
        ], "behavior": [
            new Field("be-openness", "Openness", FieldType.Text, "Does he like to try new things? He is imaginative?"),
            new Field("be-conscientiousness", "Conscientiousness", FieldType.Text, "Does he spend time preparing? Does he have a strict schedule?"),
            new Field("be-extraversion", "Extraversion", FieldType.Text, "Does he like being the center of attention? Does he enjoy meeting new people?"),
            new Field("be-agreeableness", "Agreeableness", FieldType.Text, "Does he cares about others? Does he like helping?"),
            new Field("be-neuroticism", "Neuroticism", FieldType.Text, "Does he often feel upset or anxious? Does he swing mood easily?"),
        ], "hobbies": [
            new Field("hobbies", "Hobbies", FieldType.Text, "What are the center of interests of your character")
        ], "free-space": [
            new Field("free", "", FieldType.Text, "Anything else to add? How he keep telling to everyone to not feed bread to ducks? Or just some personal notes you don't want to forget?"),
        ]};
    }

    getName(): string {
        return "character";
    }

    formatName(format: (name: string) => string): string {
        return format("first-name") + " " + format("last-name");
    }
}