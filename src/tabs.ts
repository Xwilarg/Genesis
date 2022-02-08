window.addEventListener('load', () => {
    Array.prototype.forEach.call(document.getElementsByClassName("tab-elem"), function(elem: HTMLElement) {
        elem.addEventListener("click", () => {
            // Hide/Show the current tabs
            Array.prototype.forEach.call(document.getElementsByClassName("tab-elem"), function(elem2: HTMLElement) {
                let isCurrent = elem.id === elem2.id;
                document.getElementById(`content-${elem2.id}`)!.hidden = !isCurrent;
                if (isCurrent) {
                    document.getElementById(elem2.id)!.classList.add("tab-current");
                } else {
                    document.getElementById(elem2.id)!.classList.remove("tab-current");
                }
            });
        })
    });
});