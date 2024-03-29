import NamedData from "./data/NamedData";
import ATemplate from "./template/ATemplate";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}">+</button>`;
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
    document.getElementById(`filter-${template.getName()}`)!.getElementsByClassName("selected")[0].innerHTML = getName(x, template);
}

// Update the display of the filter at the top
function updateFilter(template: ATemplate, id: string, data: Array<NamedData>, onNew: () => void, onClick: (id: number) => void): Array<HTMLButtonElement> {
    let buttons = [];

    preloadFilter(id, onNew);

    for (let x of data.sort((a, b) => {
        const aN = getName(a, template);
        const bN = getName(b, template);
        if (aN < bN) return -1;
        if (aN > bN) return 1;
        return 0;
    })) {
        var button = document.createElement("button");
        button.innerHTML = getName(x, template);
        button.addEventListener("click", (e: any) => {
            // When we click a button, we update the tab currently selected and call onClick
            for (const elem of document.getElementById(id)!.getElementsByClassName("selected")) {
                elem.classList.remove("selected");
            }
            e.target.classList.add("selected");
            onClick(x.id);
        });
        button.dataset.id = x.id.toString();
        document.getElementById(id)!.append(button);
        buttons.push(button);
    }

    return buttons;
}

export { preloadFilter, updateFilter, updateCurrentName }