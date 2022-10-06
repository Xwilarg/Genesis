import NamedData from "./data/NamedData";
import { preloadFilter, updateCurrentName, updateFilter } from "./filter";
import { getSetting } from "./settings/SettingsManager";
import ATemplate from "./template/ATemplate";
import Field from "./template/display/Field";
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
    refreshContent(template);
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
    refreshContent(data);
}

// Create a new element
// id: id of the parent element
function newElem(data: ATemplate) {
    const id = data.getName();
    const namedData = new NamedData(getUniqueId(id), {});
    setCurrent(id, namedData);
    templateData[id].push(current[id]!);
    const buttons = readyFilter(data);
    buttons.find(x => x.dataset.id === namedData.id.toString())!.classList.add("selected");
}

// Update the filters
function readyFilter(data: ATemplate): Array<HTMLButtonElement> {
    const id = data.getName();
    var buttons = updateFilter(data, `filter-${id}`, templateData[id], () =>
    {
        addNewAndClean(data);
    }, (elemId: number) => {
        setCurrent(id, templateData[id].find(x => x.id == elemId)!);
        refreshContent(data);
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

    refreshContent(data);
}

function getFieldHtml(field: Field, id: string, value: string) {
    // Change how we display the element depending of its type
    switch (field.type) {
        case FieldType.String:
            return `<input type="text" id="${id}" value="${value}" placeholder="${field.watermark}"/>`;

        case FieldType.Number:
            return `<input type="number" id="${id}" value="${value}" placeholder="${field.watermark}"/>`;

        case FieldType.Text:
            return `<textarea id="${id}" placeholder="${field.watermark}" rows="8">${value}</textarea>`;

        case FieldType.Document:
            return `<textarea id="${id}" class="document" placeholder="${field.watermark}" rows="50">${value}</textarea>`;

        default:
            throw `Unhandled field type ${field.type}`
    }
}

// Update the main content of the page
function refreshContent(data: ATemplate) {
    // Display template content
    const mainTarget = document.getElementById(`content-${data.getName()}`)!;
    const mainFilter = document.getElementById(`filter-${data.getName()}`)!;
    const displayMode = getSetting("displayMode", 0);

    if (displayMode === 0) { // Form display
        mainFilter.hidden = false;
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
                        html += `<div><label>${label}</label> <span id="${id}-editmode" hidden>`;
                        html += getFieldHtml(field, id, value);

                        // We display a non-editable field (called display mode) and buttons to switch between the 2
                        html +=
                            `<button class="small" id="${id}-enabledisplay"><i class="fa-solid fa-floppy-disk"></i></button></span>
                            <span id="${id}-displaymode">
                                <span id="${id}-displaymodevalue">${value}</span> <button class="small" id="${id}-enableedit"><i class="fa-solid fa-pen-to-square"></i></button>
                            </span></div>`;
                        if (field.links.length > 0) { // If there is any helper link, we add it
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
    
            let targetChangeFields: Array<string> = [];
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

                        document.getElementById(`${id}-enableedit`)!.addEventListener("click", () => {
                            document.getElementById(`${id}-editmode`)!.hidden = false;
                            document.getElementById(`${id}-displaymode`)!.hidden = true;
                        });
                        document.getElementById(`${id}-enabledisplay`)!.addEventListener("click", () => {
                            document.getElementById(`${id}-editmode`)!.hidden = true;
                            document.getElementById(`${id}-displaymode`)!.hidden = false;

                            const ttarget: any = target;
                            current[data.getName()]!.data[field.id] = ttarget.value;
                            if (targetChangeFields.includes(field.id)) {
                                updateCurrentName(current[data.getName()]!, data);
                            }

                            document.getElementById(`${id}-displaymodevalue`)!.innerHTML = ttarget.value;
                        });
                    }
                }
            }
    
            // Add "delete" button
            var divMain = document.createElement("div");
            divMain.classList.add("settings");
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
            divMain.append(bDelete);
            mainTarget.append(divMain);
        }
    } else if (displayMode === 1) { // Grid display
        mainFilter.hidden = true;

        mainTarget.innerHTML = `<div id='table-${data.getName()}'></div>`;

        // Get all headers
        let finalData = [];
        let headers: Array<Field> = [];
        for (let field of Object.values(data.getContent()).flat()) {
            // Don't show field if we are in minimize mode and there is no data for this field
            if (getSetting("minimize", false) === false || templateData[data.getName()].some(x => field.id in x.data && x.data[field.id] !== "")) {
                headers.push(field);
            }
        }

        // Fill all data
        for (const elem of templateData[data.getName()]) {
            let currData: Array<string> = [];
            for (let field of headers) {
                const value = field.id in elem.data // Value to store inside the field
                ? elem.data[field.id]
                : "";
                currData.push(value);
            }
            finalData.push(currData);
        }

        // @ts-ignore, because of course JS can never work properly
        const table = new Handsontable(document.getElementById(`table-${data.getName()}`)!, {
            data: finalData, // All data
            colHeaders: headers.map(x => x.name), // Column header
            licenseKey: 'non-commercial-and-evaluation', // No key needed, this is a free to use website
            currentRowClassName: 'current-row', // Allow to color a row when we press it
            fixedColumnsStart: 1, // We always display the first column
            filters: true, // Allow filters
            dropdownMenu: ['filter_by_condition', 'filter_action_bar'] // Define how filters act
        });

        // Handle data editing
        table.addHook('afterChange', (e: Array<any>) => {
            var a = e[0];
            const elemTarget = templateData[data.getName()][a[0]];
            const fieldTarget = headers[a[1]];
            const newValue = a[3];
            elemTarget.data[fieldTarget.id] = newValue;
        });
    }
}


export { preload, getData, setData, resetData, updateDisplay, refreshContent }