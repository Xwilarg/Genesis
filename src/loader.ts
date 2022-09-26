import NamedData from "./data/NamedData";
import { preloadFilter, updateFilter } from "./filter";
import Field from "./template/Field";
import { FieldType } from "./template/FieldType";

// All data
let templateData: { [id: string]: Array<NamedData> } = {};
// Data currently being edited
let current: { [id: string]: NamedData | null } = {};

// Ensure the id given in parameter is unique
// parentId: id of the parent element
// id: id that need to be unique
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
// id: id of the parent element
function newElem(id: string) {
    current[id] = new NamedData(getUniqueId(id, "unnamed"), "Unnamed", {});
    templateData[id].push(current[id]!);
    updateFilter(`filter-${id}`, templateData[id], () => { newElem(id); });
    document.getElementById(`content-${id}`)!.hidden = false;
}

// Load template data and display in the website
// id: element in the HTML to write in
// data: template data to be loaded
function preload(id: string, data: { [name: string]: Array<Field> }) {
    templateData[id] = [];
    current[id] = null;

    // Preload filter component
    preloadFilter(`filter-${id}`, () => { newElem(id); });

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


export { preload }