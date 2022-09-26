import NamedData from "./data/NamedData";
import { preloadFilter, updateFilter } from "./filter";
import ATemplate from "./template/ATemplate";
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

function addNewAndClean(data: ATemplate) {
    newElem(data.getName(), data);
    updateContent(data);
}

// Create a new element
// id: id of the parent element
function newElem(id: string, data: ATemplate) {
    current[id] = new NamedData(getUniqueId(id, "unnamed"), "Unnamed", {});
    templateData[id].push(current[id]!);
    updateFilter(`filter-${id}`, templateData[id], () =>
    {
        addNewAndClean(data);
    });
    document.getElementById(`content-${id}`)!.hidden = false;
}

// Load template data and display in the website
// id: element in the HTML to write in
// data: template data to be loaded
function preload(data: ATemplate) {
    const id = data.getName();
    templateData[id] = [];
    current[id] = null;

    // Preload filter component
    preloadFilter(`filter-${id}`, () =>
    {
        addNewAndClean(data);
    });

    updateContent(data);
}

function updateContent(data: ATemplate) {
    // Display template content
    document.getElementById(`content-${data.getName()}`)!.innerHTML = Object.entries(data.getContent())
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