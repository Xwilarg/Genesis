import NamedData from "./data/nameddata";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}">+</button>`;
    document.getElementById(`new-${id}`)?.addEventListener("click", onNew);
}

function updateFilter(id: string, data: Array<NamedData>, onNew: () => void) {
    preloadFilter(id, onNew);
    document.getElementById(id)!.innerHTML +=
        data.map(x => {
            return `<button id="load-${x.id}">${x.name}</button>`;
        })
        .join(" ");
}

export { preloadFilter, updateFilter }