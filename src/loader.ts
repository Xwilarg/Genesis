import NamedData from "./data/NamedData";
import { preloadFilter, updateFilter } from "./filter";
import ATemplate from "./template/ATemplate";
import { FieldType } from "./template/FieldType";

// All data
let templateData: { [id: string]: Array<NamedData> } = {};
// Data currently being edited
let current: NamedData | null = null;

function getData(): { [id: string]: Array<NamedData> }
{
    return templateData;
}

function setData(data: { [id: string]: Array<NamedData> }, defaultTemplate: ATemplate)
{
    templateData = data;
    const elemCount = Object.keys(templateData).length;
    if (elemCount > 0)
    {
        current = templateData[defaultTemplate.getName()][0];
    }
    const buttons = readyFilter(defaultTemplate);
    updateContent(defaultTemplate);
    if (elemCount > 0) {
        buttons[0].classList.add("tab-current");
    }
}

// Ensure the id given in parameter is unique
// parentId: id of the parent element
// id: id that need to be unique
function getUniqueId(parentId: string) : number {
    let index = 1;
    while (templateData[parentId].some(x => x.id === index)) {
        index++;
    }
    return index;
}

function addNewAndClean(data: ATemplate) {
    newElem(data);
    updateContent(data);
}

// Create a new element
// id: id of the parent element
function newElem(data: ATemplate) {
    const id = data.getName();
    current = new NamedData(getUniqueId(id), {});
    templateData[id].push(current!);
    const buttons = readyFilter(data);
    buttons[buttons.length - 1].classList.add("tab-current");
}

function readyFilter(data: ATemplate): Array<HTMLButtonElement> {
    const id = data.getName();
    var buttons = updateFilter(`filter-${id}`, templateData[id], () =>
    {
        addNewAndClean(data);
    }, (elemId: number) => {
        current = templateData[id].find(x => x.id == elemId)!;
        updateContent(data);
    });
    document.getElementById(`content-${id}`)!.hidden = false;
    return buttons;
}

// Load template data and display in the website
// id: element in the HTML to write in
// data: template data to be loaded
function preload(data: ATemplate) {
    const id = data.getName();
    templateData[id] = [];
    current = null;

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
                const id = `${data.getName()}-${field.id}`;
                const value = current !== null && field.id in current.data
                    ? current.data[field.id]
                    : "";
                switch (field.type) {
                    case FieldType.String:
                        return `${field.name}: <input type="text" id="${id}" value="${value}"/>`;

                    default:
                        throw `Unhandled field type ${field.type}`
                }

            }).join("<br/>");
        })
        .join("<br/>");

    // Add change listeners to all fields
    if (current  !== null) {
        for (const [_, value] of Object.entries(data.getContent())) {
            for (const field of value) {
                const id = `${data.getName()}-${field.id}`;
                document.getElementById(id)!.addEventListener('change', (e: any) => {
                    current!.data[field.id] = e.target.value;
                });
            }
        }
    }
}


export { preload, getData, setData }