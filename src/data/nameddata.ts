export default class NamedData {
    constructor(id: number, data: Record<string, string>) {
        this.id = id;
        this.data = data;
    }

    id: number;
    data: Record<string, string>;
}