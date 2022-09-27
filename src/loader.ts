import NamedData from "./data/NamedData";
import { preloadFilter, updateCurrentName, updateFilter } from "./filter";
import ATemplate from "./template/ATemplate";
import { FieldType } from "./template/FieldType";

// All data
let templateData: { [id: string]: Array<NamedData> } = {};
// Data currently being edited
let current: NamedData | null = null;

function setCurrent(data: NamedData | null) {
    current = data;
}

function getData(): { [id: string]: Array<NamedData> }
{
    return templateData;
}

function setData(data: { [id: string]: Array<NamedData> }, defaultTemplate: ATemplate)
{
    templateData = data;
    updateDisplay(defaultTemplate);
}

// Refresh the whole display
function updateDisplay(template: ATemplate) {
    const elemCount = Object.keys(templateData[template.getName()]).length;
    if (elemCount > 0)
    {
        setCurrent(templateData[template.getName()][0]);
    }
    const buttons = readyFilter(template);
    updateContent(template);
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
    setCurrent(new NamedData(getUniqueId(id), {}));
    templateData[id].push(current!);
    const buttons = readyFilter(data);
    buttons[buttons.length - 1].classList.add("tab-current");
}

// Update the filters
function readyFilter(data: ATemplate): Array<HTMLButtonElement> {
    const id = data.getName();
    var buttons = updateFilter(data, `filter-${id}`, templateData[id], () =>
    {
        addNewAndClean(data);
    }, (elemId: number) => {
        setCurrent(templateData[id].find(x => x.id == elemId)!);
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
    setCurrent(null);

    // Preload filter component
    preloadFilter(`filter-${id}`, () =>
    {
        addNewAndClean(data);
    });

    updateContent(data);
}

// Update the main content of the page
function updateContent(data: ATemplate) {
    // Display template content
    const mainTarget = document.getElementById(`content-${data.getName()}`)!;

    if (current === null) {
        mainTarget.innerHTML = "";
        document.getElementById("introduction")!.hidden = false;
    } else {
        document.getElementById("introduction")!.hidden = true;
        mainTarget.innerHTML =
            Object.entries(data.getContent())
            .map(([key, value]) => {
                return `<h2>${key}</h2><div class='flex-break'></div>` +
                    value.map(field => {
                    const id = `${data.getName()}-${field.id}`;
                    const value = field.id in current!.data
                        ? current!.data[field.id]
                        : "";
                    const label = field.name === "" ? "" : (field.name + ": ");
                    let html = "<div>";
                    switch (field.type) {
                        case FieldType.String:
                            html += `${label} <input type="text" id="${id}" value="${value}" placeholder="${field.watermark}"/>`;
                            break;

                        default:
                            throw `Unhandled field type ${field.type}`
                    }
                    html += "</div>";
                    if (!field.isInline) { // Force break if field isn't inline
                        html += "<div class='flex-break'></div>";
                    }
                    return html;
                }).join("");
            })
            .join("<hr/>");

        var targetChangeFields: Array<string> = [];
        function filterRegister(data: string): string
        {
            targetChangeFields.push(data);
            return "";
        }
        data.formatName(filterRegister);

        // Add change listeners to all fields
        for (const [_, value] of Object.entries(data.getContent())) {
            for (const field of value) {
                const id = `${data.getName()}-${field.id}`;
                document.getElementById(id)!.addEventListener('change', (e: any) => {
                    current!.data[field.id] = e.target.value;
                });

                if (targetChangeFields.includes(field.id)) {
                    document.getElementById(id)!.addEventListener('change', (e: any) => {
                        updateCurrentName(current!, data);
                    });
                }
            }
        }

        // Add "delete" button
        var div = document.createElement("div");
        div.classList.add("settings");
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.addEventListener("click", (_: any) => {
            templateData[data.getName()] = templateData[data.getName()].filter(x => x.id !== current!.id);
            setCurrent(null);
            updateDisplay(data);
        });
        div.append(button);
        mainTarget.append(div);
    }
}


export { preload, getData, setData, updateDisplay }