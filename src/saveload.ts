import { preload } from "./loader";
import Character from "./template/impl/Character";

const modules = [ new Character() ];

function save() {
    const filename = "data.json";
    let content = JSON.stringify(modules);

    let file = document.createElement('a');
    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
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
        reader.onload = function(val) {
            console.log(val);
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
            <button class="tab-elem tab-current" id="tab-${name}">${name}</button>
        `;
        document.getElementById("main-content")!.innerHTML += `
            <span id="content-tab-${name}">
                <div id="filter-${name}"></div>
                <hr/>
                <div id="content-${name}" hidden>
                </div>
            </span>
        `;
        preload(mod);
    }
});