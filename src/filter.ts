function preloadFilter(id: string) {
    document.getElementById(id)!.innerHTML = `<button>+</button>`;
}

function updateFilter(id: string) {
}

export { preloadFilter, updateFilter }