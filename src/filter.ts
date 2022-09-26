import NamedData from "./data/NamedData";

function preloadFilter(id: string, onNew: () => void) {
    document.getElementById(id)!.innerHTML = `<button id="new-${id}" class="tab-elem">+</button>`;
    document.getElementById(`new-${id}`)!.addEventListener("click", onNew);
}

function updateFilter(id: string, data: Array<NamedData>, onNew: () => void, onClick: (id: number) => void): Array<HTMLButtonElement> {
    let buttons = [];

    preloadFilter(id, onNew);
    for (let x of data) {
        var button = document.createElement("button");
        button.innerHTML = "" + x.id;
        button.classList.add("tab-elem");
        button.addEventListener("click", (e: any) => {
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

export { preloadFilter, updateFilter }