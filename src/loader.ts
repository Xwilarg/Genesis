import Field from "./template/field";
import { FieldType } from "./template/fieldtype";
import { characterTemplate } from "./template/impl/character";

// Load template data and display in the website
// id: element in the HTML to write in
// data: template data to be loaded
function load(id: string, data: { [name: string]: Array<Field> }) {
    document.getElementById(id)!.innerHTML = Object.entries(data)
        .map(([_, value]) => {
            return value.map(field => {

                switch (field.type) {
                    case FieldType.String:
                        return `${field.name}: <input type="text" name="${field.id}"/>`;

                    default:
                        throw `Unhandled field type ${field.type}`
                }

            }).join("<br/>");
        })
        .join("<br/>");
}

window.addEventListener('load', () => {
    load("content-tab-characters", characterTemplate);
});