import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Character implements ATemplate
{
    getContent(): Record<string, Field[]>{
        return {
            "general": [
            new Field("name", "Name", FieldType.String),
            new Field("motto", "Motto", FieldType.String, "", false, [ "https://en.wikipedia.org/wiki/List_of_national_mottos" ]),
            new Field("capital", "Capital", FieldType.String),
        ], "governement": [
            new Field("type-governement", "Governement", FieldType.String, "Democracy? Monarchy? Oligarchy?", false, [ "https://en.wikipedia.org/wiki/List_of_forms_of_government" ]),
            new Field("separation-power", "Separation of powers", FieldType.Text, "How is the goverment splitted and ensure the leader doesn't have all powers?", false, [ "https://en.wikipedia.org/wiki/Separation_of_powers" ])
        ], "economics": [
            new Field("import", "Import", FieldType.Text, "Main resources imported by the country"),
            new Field("export", "Export", FieldType.Text, "Main resources exported by the country"),
            new Field("money", "Money", FieldType.Text, "What is used as a money? Who can create it? How is inflation handled?")
        ], "history": [
            new Field("achievements", "Achievements", FieldType.Text, "Main achievements of the country, wars won, wonders built..."),
            new Field("holidays", "National Holidays", FieldType.Text, "Any national holidays? How did they originate?")
        ], "politics": [
            new Field("immigration", "Immigration", FieldType.Text, "Is anyone free to join the country? What happens to people that try to immigrate illegally?"),
            new Field("security", "Security", FieldType.Text, "How does people protect themselves? Is there a police? Are they armed? Is death sentence allowed?"),
            new Field("education", "Education", FieldType.Text, "Are books allowed? Is school mandatory? Does the governement provides help to those who can't attend school?"),
            new Field("army", "Army", FieldType.Text, "How big is the national army? Do they intervene in others countries? Are there foreign military bases in their territories?"),
            new Field("religion", "Religion", FieldType.Text, "Is religion separated from the state? Are worship signs allowed?")
        ], "free-space": [
            new Field("free", "", FieldType.Text, "Anything else to add? How camembert used to be the national cheese? Or just some personal notes you don't want to forget?"),
        ]};
    }

    getName(): string {
        return "country";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }
}