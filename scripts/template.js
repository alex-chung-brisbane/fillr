document.getElementById("toggle-menu").onclick = ToggleMenu;
document.getElementById("menu-close").onclick = ToggleMenu;

function ToggleMenu() {
    if (document.getElementById("nav-wrapper").dataset.menuToggled === "true") {
        document.getElementById("nav-wrapper").dataset.menuToggled = "false";
        setTimeout(() => {
            document.getElementById("menu-wrapper").style.display = "none";
        }, 400);
    } else {
        document.getElementById("menu-wrapper").style.display = null;
        setTimeout(() => {
            document.getElementById("nav-wrapper").dataset.menuToggled = "true";
        }, 1);
    }
}

let getJSON = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON("https://chung.digital/project-list.json",
    function (err, data) {
        if (err === null) {
            console.log(data);
            data.projects.forEach((itm) => {
                let newEl = document.createElement("li");
                newEl.innerHTML = `<a href="${itm.link}">${itm.name}</a>`;
                document.getElementById("menu").appendChild(newEl);
            });
        }
    });