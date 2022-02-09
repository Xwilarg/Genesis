export default class NamedData {
    constructor(id: string, name: string, data: any) {
        this.id = id;
        this.name = name;
        this.data = data;
    }

    id: string;
    name: string;
    data: any;
}