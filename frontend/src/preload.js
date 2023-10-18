const { ipcRenderer } = require("electron")

const createBtn = document.getElementById("create")
const toggleElement = document.getElementById("toggle");

toggleElement.addEventListener("click", () => {
    
    if (document.body.getAttribute("data-bs-theme") === "dark") {
        document.body.setAttribute("data-bs-theme", "light");
        document.getElementById("modal").style.background = "#fff"
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        document.getElementById("modal").style.background = "#212529"
    }
});


createBtn.addEventListener("click", (e) => {
    ipcRenderer.send('create-data')
})
