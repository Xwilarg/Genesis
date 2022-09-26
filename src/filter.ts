import NamedData from "./data/NamedData";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}" class="tab-elem">+</button>`;
    document.getElementById(`new-${id}`)!.addEventListener("click", onNew);
}

function updateFilter(id: string, data: Array<NamedData>, onNew: () => void): Array<HTMLButtonElement> {
    let buttons = [];

    preloadFilter(id, onNew);
    for (let x of data) {
        var button = document.createElement("button");
        button.id = `load-${id}-${x.id}`;
        button.innerHTML = "" + x.id;
        button.classList.add("tab-elem");
        document.getElementById(id)!.append(button);
        buttons.push(button);
    }

    return buttons;
}

export { preloadFilter, updateFilter }