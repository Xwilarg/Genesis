import ATemplate from "../ATemplate";
import Field from "../display/Field";
import { FieldType } from "../display/FieldType";

/// Represent a whole tab on the main section
export default class Language implements ATemplate {
    getContent(): Record<string, Field[]> {
        return {
            "general": [
                new Field("name", "Name", FieldType.String)
            ], "syntax": [
                new Field("symbols", "Symbols", FieldType.Text, "How is the language written? Letters (a b c d)? Letters combinaison (ㅁ + ㅏ + ㄷ = 맏 pap̚)? Syllabary (か ka き ki く ku こ ko)? Logograms (指 zhǐ finger 纹 wén line)?"),
                new Field("phonetic", "Phonetic", FieldType.Text, "What are the symbols (letters, diacritic...) available? How are they pronounced?", false, ["https://en.wikipedia.org/wiki/Help:IPA/English", "https://en.wikipedia.org/wiki/International_Phonetic_Alphabet_chart", "https://en.wikipedia.org/wiki/IPA_pulmonic_consonant_chart_with_audio", "https://en.wikipedia.org/wiki/IPA_vowel_chart_with_audio"]),
                new Field("words", "Words", FieldType.Text, "How are the symboles combined together to write a word? Do you have vowels and consonnantes? Are some syllabes accentuated?")
            ], "grammar": [
                new Field("sentence", "Sentences", FieldType.Text, "How are sentences made? Subject + Adjective + Verb? Are they followed by particles that alter their meaning? Any way to emphasis a word? Can nouns be masculine and feminine?"),
                new Field("conjugaison", "Conjugaison", FieldType.Text, "How are verbs conjuged? What verb forms are available and what are they for? What pronouns? Does it differ when mentionning an inanimate object or when you speak with respect?"),
            ], "history": [
                new Field("origin", "Origin", FieldType.Text, "Where is the language coming from?")
            ], "internal": [
                new Field("validator", "Validator", FieldType.Text, "Associative array of an english letter and the local equivalent, will be used in a future update to validate if words looks valid")
            ], "free-space": [
                new Field("free", "", FieldType.Document, "Anything else to add? How [ɐ] and [ä] but people can't make the difference anymore? Or just some personal notes you don't want to forget?"),
            ]
        };
    }

    getName(): string {
        return "language";
    }

    formatName(format: (name: string) => string): string {
        return format("name");
    }

    getDescription(): string {
        return "";
    }
}