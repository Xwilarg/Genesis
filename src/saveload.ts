function save() {

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
});