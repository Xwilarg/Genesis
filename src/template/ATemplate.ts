import Field from "./Field";

export default abstract class ATemplate
{
    abstract getContent(): Record<string, Field[]>;

    abstract getName(): string;

    abstract formatName(format: (name: string) => string): string;
}