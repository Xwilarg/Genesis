import NamedData from "./data/nameddata";
import { preloadFilter, updateFilter } from "./filter";
import Field from "./template/field";
import { FieldType } from "./template/fieldtype";
import { characterTemplate } from "./template/impl/character";

// All data
let templateData: { [id: string]: Array<NamedData> } = {};
// Data currently being edited
let current: { [id: string]: NamedData | null } = {};

function getUniqueId(parentId: string, id: string) : string{
    function getId(id: string, index: number) {
        if (index === 1) {
            return id;
        } else {
            return `${id}-${index}`;
        }
    }

    let index = 1;
    while (templateData[parentId].some(x => x.id === getId(id, index))) {
        index++;
    }
    return getId(id, index);
}

// Create a new element
function newElem(id: string) {
    current[id] = new NamedData(getUniqueId(id, "unnamed"), "Unnamed", {});
    templateData[id].push(current[id]!);
}

// Load template data and display in the website
// id: element in the HTML to write in
// data: template data to be loaded
function load(id: string, data: { [name: string]: Array<Field> }) {
    templateData[id] = [];
    current[id] = null;

    // Preload filter component
    preloadFilter(`filter-${id}`, () => { newElem(id); });

    // When clicking the "+", unhide main content
    document.getElementById(`filter-${id}`)!.addEventListener("click", () => {
        current = {};
        updateFilter(`filter-${id}`, templateData[id], () => { newElem(id); });
        document.getElementById(`content-${id}`)!.hidden = false;
    });

    // Display template content
    document.getElementById(`content-${id}`)!.innerHTML = Object.entries(data)
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
    load("characters", characterTemplate);
});