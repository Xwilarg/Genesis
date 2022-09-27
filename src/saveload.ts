import { preload, setData, getData, resetData } from "./loader";
import Character from "./template/impl/Character";
import Country from "./template/impl/Country";

const modules = [ new Character(), new Country() ];

function save() {
    const filename = "data.json";
    let content = JSON.stringify(getData());

    let file = document.createElement('a');
    file.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(content));
    file.setAttribute('download', filename);
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}

function upload() {
    let file = (document.getElementById("uploadInternal") as HTMLInputElement).files![0]; // Get user file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(val: any) {
            resetData();
            const json = JSON.parse(val.target.result);
            for (const mod of modules) {
                setData(json, mod);
            }
        };
        reader.readAsText(file);
    }
}

function uploadRedirect() {
    document.getElementById("uploadInternal")!.click();
}

window.addEventListener('load', () => {
    document.getElementById("save")!.addEventListener("click", save);
    document.getElementById("upload")!.addEventListener("click", uploadRedirect);
    document.getElementById("uploadInternal")!.addEventListener('change', upload);
    document.addEventListener("keydown", (e) => {
        // Block Ctrl + S to save current document
        if (e.ctrlKey && (e.key == 's' || e.key == 'S')) {
            e.preventDefault();
            save();
        }
    });
    for (const mod of modules) {
        const name = mod.getName();
        document.getElementById("main-menu")!.innerHTML += `
            <button class="tab-elem" id="tab-${name}">${name}</button>
        `;
        document.getElementById("main-content")!.innerHTML = `
            <span id="content-tab-${name}" hidden>
                <div id="filter-${name}"></div>
                <hr/>
                <div id="content-${name}" class="flex" hidden>
                </div>
            </span>
        ` + document.getElementById("main-content")!.innerHTML;
        preload(mod);
    }
});