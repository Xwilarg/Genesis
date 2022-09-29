import NamedData from "./data/NamedData";
import { preloadFilter, updateCurrentName, updateFilter } from "./filter";
import { getSetting, setSetting } from "./settings/SettingsManager";
import ATemplate from "./template/ATemplate";
import { FieldType } from "./template/display/FieldType";

// All data
let templateData: { [id: string]: Array<NamedData> } = {};
// Data currently being edited
let current: Record<string, NamedData | null> = {};

function setCurrent(id: string, data: NamedData | null) {
    current[id] = data;
}

function getData(): { [id: string]: Array<NamedData> }
{
    return templateData;
}

function resetData() {
    templateData = {};
}

function setData(data: { [id: string]: Array<NamedData> }, defaultTemplate: ATemplate)
{
    if (defaultTemplate.getName() in data) {
        templateData[defaultTemplate.getName()] = data[defaultTemplate.getName()];
    } else {
        templateData[defaultTemplate.getName()] = [];
    }
    updateDisplay(defaultTemplate);
}

// Refresh the whole display
function updateDisplay(template: ATemplate) {
    const elemCount = Object.keys(templateData[template.getName()]).length;
    if (elemCount > 0)
    {
        setCurrent(template.getName(), templateData[template.getName()][0]);
    }
    const buttons = readyFilter(template);
    updateContent(template);
    if (elemCount > 0) {
        buttons[0].classList.add("selected");
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
    setCurrent(id, new NamedData(getUniqueId(id), {}));
    templateData[id].push(current[id]!);
    const buttons = readyFilter(data);
    buttons[buttons.length - 1].classList.add("selected");
}

// Update the filters
function readyFilter(data: ATemplate): Array<HTMLButtonElement> {
    const id = data.getName();
    var buttons = updateFilter(data, `filter-${id}`, templateData[id], () =>
    {
        addNewAndClean(data);
    }, (elemId: number) => {
        setCurrent(id, templateData[id].find(x => x.id == elemId)!);
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
    setCurrent(id, null);

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

    if (current[data.getName()] === null) {
        mainTarget.innerHTML = data.getDescription();
    } else {
        mainTarget.innerHTML =
            Object.entries(data.getContent())
            .map(([key, fields]) => {
                let html = "";
                for (let index = 0; index < fields.length; index++)
                {
                    const field = fields[index];

                    const id = `${data.getName()}-${field.id}`; // ID of the field
                    const value = field.id in current[data.getName()]!.data // Value to store inside the field
                        ? current[data.getName()]!.data[field.id]
                        : "";
                    const isInline = field.isInline && (index + 1 === fields.length || fields[index + 1].isInline); // Can the field be inlined
                    // If we are in minimize mode, we skip empty fields
                    if (value === "" && getSetting("minimize", false) === true) {
                        continue;
                    }

                    const label = field.name === "" ? "" : (field.name + ": ");
                    html += "<div>";
                    switch (field.type) {
                        case FieldType.String:
                            html += `<label>${label}</label> <input type="text" id="${id}" value="${value}" placeholder="${field.watermark}"/>`;
                            break;
                            
                        case FieldType.Number:
                            html += `<label>${label}</label> <input type="number" id="${id}" value="${value}" placeholder="${field.watermark}"/>`;
                            break;

                        case FieldType.Text:
                            html += `<label>${label}</label> <textarea id="${id}" placeholder="${field.watermark}" rows="8">${value}</textarea>`;
                            break;

                        case FieldType.Document:
                            html += `<label>${label}</label> <textarea id="${id}" class="document" placeholder="${field.watermark}" rows="50">${value}</textarea>`;
                            break;

                        default:
                            throw `Unhandled field type ${field.type}`
                    }
                    html += "</div>";
                    if (field.links.length > 0) {
                        html += "<div>";
                        for (const link of field.links) {
                            html += `<a href="${link}" target="_blank">Helper</a>`;
                        }
                        html += "</div>";
                    }
                    if (!isInline) { // Force break if field isn't inline
                        html += "<div class='flex-break'></div>";
                    }
                }
                return html === "" ? "" : (`<h2 class="cap-word">${key.replace("/-/g", "")}</h2><div class='flex-break'></div>` + html);
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
                const target = document.getElementById(id);
                if (target !== null) {
                    target.addEventListener('change', (e: any) => {
                        current[data.getName()]!.data[field.id] = e.target.value;
                    });
    
                    if (targetChangeFields.includes(field.id)) {
                        target.addEventListener('change', (e: any) => {
                            updateCurrentName(current[data.getName()]!, data);
                        });
                    }
                }
            }
        }

        // Add "delete" button
        var div = document.createElement("div");
        div.classList.add("settings");
        var bDelete = document.createElement("button");
        bDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        bDelete.addEventListener("click", (_: any) => {
            if (confirm("Are you sure? This action cannot be undone"))
            {
                templateData[data.getName()] = templateData[data.getName()].filter(x => x.id !== current[data.getName()]!.id);
                setCurrent(data.getName(), null);
                updateDisplay(data);
            }
        });
        div.append(bDelete);
        var bHide = document.createElement("button");
        bHide.innerHTML = `<i class="fa-solid ${getSetting("minimize", false) ? "fa-maximize" : "fa-minimize"}"></i>`;
        bHide.addEventListener("click", (_: any) => {
            const newValue = !getSetting("minimize", false);
            setSetting("minimize", newValue);
            bHide.innerHTML = `<i class="fa-solid ${newValue ? "fa-maximize" : "fa-minimize"}"></i>`;
            updateContent(data);
        });
        div.append(bHide);
        mainTarget.append(div);
    }
}


export { preload, getData, setData, resetData, updateDisplay }