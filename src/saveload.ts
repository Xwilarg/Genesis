import { preload, setData, getData, resetData, refreshContent } from "./loader";
import { getSetting, setSetting } from "./settings/SettingsManager";
import Character from "./template/impl/Character";
import Country from "./template/impl/Country";
import Language from "./template/impl/Language";
import Species from "./template/impl/Species";
import Document from "./template/impl/Document";

const modules = [ new Character(), new Country(), new Species(), new Language(), new Document() ];

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
            <button class="tab-elem cap-word" id="tab-${name}">${name}</button>
        `;
        document.getElementById("main-content")!.innerHTML += `
            <span id="content-tab-${name}" hidden>
                <div id="filter-${name}" class="relative"></div>
                <hr/>
                <div id="content-${name}" class="flex" hidden>
                </div>
            </span>
        `;
    }
    for (const mod of modules) {
        preload(mod);
    }

    // Buttons to change display mode
    document.getElementById("main-menu")!.innerHTML += `
    <div class="settings">
        <button id="displaySolid" ${getSetting("displayMode", 0) === 0 ? "class='selected'" : ""}><i class="fa-solid fa-list"></i></button>
        <button id="displayTable" ${getSetting("displayMode", 0) === 1 ? "class='selected'" : ""}><i class="fa-solid fa-table"></i></button>
        <span></span>
        <button id="displayMinimize"><i class="fa-solid ${getSetting("minimize", false) ? "fa-maximize" : "fa-minimize"}"></i></button>
    </div>
    `;

    function refreshAllDisplay() {
        for (const mod of modules) {
            refreshContent(mod);
        }
    }

    // Listeners for display buttons // TODO: Weird behavior on click
    document.getElementById("displaySolid")!.addEventListener("click", (e: any) => {
        document.getElementById("displayTable")?.classList.remove("selected");
        e.target.classList.add("selected");
        setSetting("displayMode", 0);
        refreshAllDisplay();
    });
    document.getElementById("displayTable")!.addEventListener("click", (e: any) => {
        document.getElementById("displaySolid")?.classList.remove("selected");
        e.target.classList.add("selected");
        setSetting("displayMode", 1);
        refreshAllDisplay();
    });
    document.getElementById("displayMinimize")!.addEventListener("click", (e: any) => {
        const newValue = !getSetting("minimize", false);
        setSetting("minimize", newValue);
        e.target.innerHTML = `<i class="fa-solid ${newValue ? "fa-maximize" : "fa-minimize"}"></i>`;
        refreshAllDisplay();
    });
});