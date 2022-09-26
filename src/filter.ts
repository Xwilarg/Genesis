import NamedData from "./data/NamedData";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}">+</button>`;
    document.getElementById(`new-${id}`)!.addEventListener("click", onNew);
}

function updateFilter(id: string, data: Array<NamedData>, onNew: () => void) {
    preloadFilter(id, onNew);
    for (let x of data) {
        var button = document.createElement("button");
        button.id = `load-${id}-${x.id}`;
        button.innerHTML = "" + x.id;
        document.getElementById(id)!.append(button);
    }
}

export { preloadFilter, updateFilter }