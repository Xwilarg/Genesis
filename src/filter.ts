import NamedData from "./data/NamedData";
import ATemplate from "./template/ATemplate";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}" class="tab-elem">+</button>`;
    document.getElementById(`new-${id}`)!.addEventListener("click", onNew);
}

function getName(x: NamedData, template: ATemplate): string {
    function format(name: string): string {
        return name in x.data ? x.data[name] : "";
    }

    const name = template.formatName(format);
    return name.trim() == "" ? "Unnamed" : name;
}

function updateCurrentName(x: NamedData, template: ATemplate) {
    document.getElementById(`filter-${template.getName()}`)!.getElementsByClassName("tab-current")[0].innerHTML = getName(x, template);
}

// Update the display of the filter at the top
function updateFilter(template: ATemplate, id: string, data: Array<NamedData>, onNew: () => void, onClick: (id: number) => void): Array<HTMLButtonElement> {
    let buttons = [];

    preloadFilter(id, onNew);

    for (let x of data) {
        var button = document.createElement("button");
        button.innerHTML = getName(x, template);
        button.classList.add("tab-elem");
        button.addEventListener("click", (e: any) => {
            // When we click a button, we update the tab currently selected and call onClick
            for (const elem of document.getElementById(id)!.getElementsByClassName("tab-current")) {
                elem.classList.remove("tab-current");
            }
            e.target.classList.add("tab-current");
            onClick(x.id);
        });
        document.getElementById(id)!.append(button);
        buttons.push(button);
    }

    return buttons;
}

export { preloadFilter, updateFilter, updateCurrentName }